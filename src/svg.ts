import { AffineMatrix, ISvgConfigs, ISvgPath, ISvgStyle, IVec2 } from './types'
import * as geo from './geo'

const HTTP_SVG = 'http://www.w3.org/2000/svg'
// Unary plus operator seems faster than native parseFloat
const _parseFloat = (v: string) => +v

export const configs: ISvgConfigs = {
  bezierSplitSize: 10,
  ellipseSplitSize: 20,
}

/**
 * 描画
 * @param ctx 描画要素
 * @param pathInfo 図形情報
 */
export function draw(ctx: CanvasRenderingContext2D, pathInfo: ISvgPath): void {
  ctx.lineCap = pathInfo.style.lineCap as any
  ctx.lineJoin = pathInfo.style.lineJoin as any

  ctx.beginPath()
  pathInfo.d.forEach((p, i) => {
    if (i === 0) {
      ctx.moveTo(p.x, p.y)
    } else {
      ctx.lineTo(p.x, p.y)
    }
  })
  ctx.closePath()

  if (pathInfo.included) {
    pathInfo.included.forEach((poly) => {
      poly.forEach((p, i) => {
        if (i === 0) {
          ctx.moveTo(p.x, p.y)
        } else {
          ctx.lineTo(p.x, p.y)
        }
      })
      ctx.closePath()
    })
  }

  if (pathInfo.style.fill) {
    ctx.fillStyle = pathInfo.style.fillStyle
    ctx.globalAlpha = pathInfo.style.fillGlobalAlpha
    ctx.fill()
  }

  // 枠
  if (pathInfo.style.stroke) {
    ctx.strokeStyle = pathInfo.style.strokeStyle
    ctx.globalAlpha = pathInfo.style.strokeGlobalAlpha
    ctx.lineWidth = pathInfo.style.lineWidth
    ctx.setLineDash(pathInfo.style.lineDash)
    ctx.stroke()
  }
  ctx.globalAlpha = 1
}

/**
 * 矩形に収まるよう調整
 * @param pathInfoList パス情報リスト
 * @param x 矩形x座標
 * @param y 矩形y座標
 * @param width 矩形width
 * @param height 矩形height
 * @return 調整後パス情報リスト
 */
export function fitRect(
  pathInfoList: ISvgPath[],
  x: number,
  y: number,
  width: number,
  height: number
): ISvgPath[] {
  let minX: number = Infinity
  let maxX: number = -Infinity
  let minY: number = Infinity
  let maxY: number = -Infinity
  pathInfoList.forEach((info) => {
    info.d.forEach((p) => {
      minX = Math.min(minX, p.x)
      maxX = Math.max(maxX, p.x)
      minY = Math.min(minY, p.y)
      maxY = Math.max(maxY, p.y)
    })
  })

  // 原点基準に移動
  const fromBaseList = pathInfoList.map((info) => ({
    ...info,
    d: info.d.map((p) => geo.vec(p.x - minX, p.y - minY)),
  }))
  // 伸縮
  const orgWidth = maxX - minX
  const orgHeight = maxY - minY
  const rateX = width / orgWidth
  const rateY = height / orgHeight
  const rate = Math.min(rateX, rateY)
  const scaledList = fromBaseList.map((info) => ({
    ...info,
    d: info.d.map((p) => geo.vec(p.x * rate, p.y * rate)),
  }))
  // 矩形位置に移動
  const difX = x + (width - orgWidth * rate) / 2
  const difY = y + (height - orgHeight * rate) / 2
  const convertedList: ISvgPath[] = scaledList.map((info) => ({
    ...info,
    d: info.d.map((p) => geo.vec(p.x + difX, p.y + difY)),
    included: (info.included || []).map((poly: IVec2[]) => {
      return poly.map((p) =>
        geo.vec((p.x - minX) * rate + difX, (p.y - minY) * rate + difY)
      )
    }),
  }))

  return convertedList
}

/**
 * SVG文字列から図形のパス情報を取得する
 * 対応タグ: path,rect,ellipse,circle
 * @param svgString SVGリソース文字列
 * @return パス情報リスト
 */
export function parseSvgGraphicsStr(svgString: string): ISvgPath[] {
  const domParser = new DOMParser()
  const svgDom = domParser.parseFromString(svgString, 'image/svg+xml')
  const svgTags = svgDom.getElementsByTagName('svg')
  if (!svgTags || svgTags.length === 0) return []
  return parseSvgGraphics(svgTags[0] as SVGElement)
}

/**
 * parse SVG tree
 * @param elm SVGElement
 * @return path informations
 */
function parseSvgTree(
  elm: SVGElement,
  parentInfo?: { style?: ISvgStyle; transform?: AffineMatrix }
): ISvgPath[] {
  const style = { ...(parentInfo?.style ?? {}), ...parseTagStyle(elm) }

  const transformStr = elm.getAttribute('transform')
  const parentTransform = parentInfo?.transform ?? geo.IDENTITY_AFFINE

  let ret: ISvgPath[] = []

  const svgPath = parseSVGShape(elm)
  if (svgPath) {
    ret.push({
      ...svgPath,
      d: svgPath.d.map((v) => geo.applyAffine(parentTransform, v)),
    })
  }

  if (elm.children.length > 0) {
    const transform = transformStr
      ? geo.multiAffine(parentTransform, parseTransform(transformStr))
      : parentTransform

    Array.from(elm.children).forEach((child) => {
      ret = ret.concat(parseSvgTree(child as SVGElement, { style, transform }))
    })
  }

  return ret
}

function parseSVGShape(elm: SVGElement): ISvgPath | undefined {
  switch (elm.tagName.toLowerCase()) {
    case 'path':
      return {
        d: parsePath(elm as SVGPathElement),
        style: parseTagStyle(elm),
      }
    case 'rect':
      return {
        d: parseRect(elm as SVGRectElement),
        style: parseTagStyle(elm),
      }
    case 'ellipse':
      return {
        d: parseEllipse(elm as SVGEllipseElement),
        style: parseTagStyle(elm),
      }
    case 'circle':
      return {
        d: parseCircle(elm as SVGCircleElement),
        style: parseTagStyle(elm),
      }
    default:
      return undefined
  }
}

/**
 * SVGタグから図形のパス情報を取得する
 * 対応タグ: path,rect,ellipse,circle
 * @param svgTag SVGタグ
 * @return パス情報リスト
 */
export function parseSvgGraphics(svgTag: SVGElement): ISvgPath[] {
  return parseSvgTree(svgTag)
}

/**
 * opentype.jsのpath.commandをd文字列に変換する
 * @param fontPath opentype.jsのpath.command
 * @return d文字列
 */
export function openCommandToD(command: any): string {
  let d: string = command.type
  if ('x1' in command) d += ` ${command.x1}`
  if ('y1' in command) d += ` ${command.y1}`
  if ('x2' in command) d += ` ${command.x2}`
  if ('y2' in command) d += ` ${command.y2}`
  if ('x3' in command) d += ` ${command.x3}`
  if ('y3' in command) d += ` ${command.y3}`
  if ('x' in command) d += ` ${command.x}`
  if ('y' in command) d += ` ${command.y}`
  return d
}

/**
 * opentype.jsのpathを解析する
 * @param fontPath opentype.jsのpath
 * @return パス情報リスト
 */
export function parseOpenPath(fontPath: { commands: any[] }): ISvgPath[] {
  const pathInfoList: ISvgPath[] = []
  let current: string = ''
  fontPath.commands.forEach((c: any) => {
    current += openCommandToD(c) + ' '
    if (current && c.type.toUpperCase() === 'Z') {
      const pathList = parsePathD(current)
      pathInfoList.push({
        d: pathList,
        style: {
          ...createStyle(),
          fill: true,
          fillStyle: 'black',
          stroke: false,
        },
      })
      current = ''
    }
  })
  return pathInfoList
}

export type PathSegmentRaw =
  | ['Z' | 'z']
  | ['H' | 'h' | 'V' | 'v', number]
  | ['M' | 'm' | 'L' | 'l' | 'T' | 't', number, number]
  | ['Q' | 'q' | 'S' | 's', number, number, number, number]
  | ['C' | 'c', number, number, number, number, number, number]
  | ['A' | 'a', number, number, number, boolean, boolean, number, number]

function parsePathSegmentRaw(segment: string[]): PathSegmentRaw {
  if (segment.length === 8) {
    return [
      segment[0],
      _parseFloat(segment[1]),
      _parseFloat(segment[2]),
      _parseFloat(segment[3]),
      segment[4] !== '0',
      segment[5] !== '0',
      _parseFloat(segment[6]),
      _parseFloat(segment[7]),
    ] as PathSegmentRaw
  } else {
    const [c, ...values] = segment
    return [c, ...values.map(_parseFloat)] as PathSegmentRaw
  }
}

export function parsePathSegmentRaws(dStr: string): PathSegmentRaw[] {
  return splitD(dStr).map((c) => parsePathSegmentRaw(c))
}

export function pathSegmentRawsToString(segs: PathSegmentRaw[]): string {
  return segs.map(pathSegmentRawToString).join(' ')
}

export function pathSegmentRawToString(seg: PathSegmentRaw): string {
  return seg
    .map((v) => {
      if (v === true) {
        return '1'
      } else if (v === false) {
        return '0'
      } else {
        return v.toString()
      }
    })
    .join(' ')
}

type PathSegment =
  | {
      command: string
      lerpFn: (t: number) => IVec2
      curve: true
    }
  | {
      command: string
      segment: [IVec2, IVec2]
      curve?: undefined
    }

export function parsePathSegments(dStr: string): PathSegment[] {
  return _parsePathSegments(parsePathSegmentRaws(dStr))
}

function _parsePathSegments(segments: PathSegmentRaw[]): PathSegment[] {
  const ret: PathSegment[] = []
  let startP = geo.vec(0, 0)
  let currentP = startP
  let currentControlP = startP
  let currentBezier: 1 | 2 | 3 = 1
  segments.forEach((current) => {
    switch (current[0]) {
      case 'M': {
        const p1 = geo.vec(current[1], current[2])
        ret.push({ command: 'M', segment: [p1, p1] })
        startP = p1
        currentControlP = p1
        currentBezier = 1
        currentP = p1
        break
      }
      case 'm': {
        const p1 = geo.vec(current[1], current[2])
        ret.push({ command: 'm', segment: [p1, p1] })
        startP = p1
        currentP = p1
        currentControlP = p1
        currentBezier = 1
        break
      }
      case 'L': {
        const p0 = currentP
        const p1 = geo.vec(current[1], current[2])
        ret.push({ command: 'L', segment: [p0, p1] })
        startP ??= p1
        currentControlP = p1
        currentBezier = 1
        currentP = p1
        break
      }
      case 'l': {
        const p0 = currentP
        const p1 = geo.add(currentP, geo.vec(current[1], current[2]))
        ret.push({ command: 'l', segment: [p0, p1] })
        startP ??= p1
        currentControlP = p1
        currentBezier = 1
        currentP = p1
        break
      }
      case 'H': {
        const p0 = currentP
        const p1 = geo.vec(current[1], p0.y)
        ret.push({ command: 'H', segment: [p0, p1] })
        currentControlP = p1
        currentBezier = 1
        currentP = p1
        break
      }
      case 'h': {
        const p0 = currentP
        const p1 = geo.vec(current[1] + p0.x, p0.y)
        ret.push({ command: 'h', segment: [p0, p1] })
        currentControlP = p1
        currentBezier = 1
        currentP = p1
        break
      }
      case 'V': {
        const p0 = currentP
        const p1 = geo.vec(p0.x, current[1])
        ret.push({ command: 'V', segment: [p0, p1] })
        currentControlP = p1
        currentBezier = 1
        currentP = p1
        break
      }
      case 'v': {
        const p0 = currentP
        const p1 = geo.vec(p0.x, current[1] + p0.y)
        ret.push({ command: 'v', segment: [p0, p1] })
        currentControlP = p1
        currentBezier = 1
        currentP = p1
        break
      }
      case 'Q': {
        const p0 = currentP
        const p1 = geo.vec(current[1], current[2])
        const p2 = geo.vec(current[3], current[4])
        ret.push({
          command: 'Q',
          lerpFn: geo.getBezier2LerpFn([p0, p1, p2]),
          curve: true,
        })
        currentControlP = p1
        currentBezier = 2
        currentP = p2
        break
      }
      case 'q': {
        const p0 = currentP
        const p1 = geo.add(p0, geo.vec(current[1], current[2]))
        const p2 = geo.add(p0, geo.vec(current[3], current[4]))
        ret.push({
          command: 'q',
          lerpFn: geo.getBezier2LerpFn([p0, p1, p2]),
          curve: true,
        })
        currentControlP = p1
        currentBezier = 2
        currentP = p2
        break
      }
      case 'T': {
        const p0 = currentP
        const p1 =
          currentBezier === 2 ? geo.getSymmetry(currentControlP, p0) : p0
        const p2 = geo.vec(current[1], current[2])
        ret.push({
          command: 'T',
          lerpFn: geo.getBezier2LerpFn([p0, p1, p2]),
          curve: true,
        })
        currentControlP = p1
        currentBezier = 2
        currentP = p2
        break
      }
      case 't': {
        const p0 = currentP
        const p1 =
          currentBezier === 2 ? geo.getSymmetry(currentControlP, p0) : p0
        const p2 = geo.add(p0, geo.vec(current[1], current[2]))
        ret.push({
          command: 't',
          lerpFn: geo.getBezier2LerpFn([p0, p1, p2]),
          curve: true,
        })
        currentControlP = p1
        currentBezier = 2
        currentP = p2
        break
      }
      case 'C': {
        const p0 = currentP
        const p1 = geo.vec(current[1], current[2])
        const p2 = geo.vec(current[3], current[4])
        const p3 = geo.vec(current[5], current[6])
        ret.push({
          command: 'C',
          lerpFn: geo.getBezier3LerpFn([p0, p1, p2, p3]),
          curve: true,
        })
        currentControlP = p2
        currentBezier = 3
        currentP = p3
        break
      }
      case 'c': {
        const p0 = currentP
        const p1 = geo.add(p0, geo.vec(current[1], current[2]))
        const p2 = geo.add(p0, geo.vec(current[3], current[4]))
        const p3 = geo.add(p0, geo.vec(current[5], current[6]))
        ret.push({
          command: 'c',
          lerpFn: geo.getBezier3LerpFn([p0, p1, p2, p3]),
          curve: true,
        })
        currentControlP = p2
        currentBezier = 3
        currentP = p3
        break
      }
      case 'S': {
        const p0 = currentP
        const p1 =
          currentBezier === 3 ? geo.getSymmetry(currentControlP, p0) : p0
        const p2 = geo.vec(current[1], current[2])
        const p3 = geo.vec(current[3], current[4])
        ret.push({
          command: 'S',
          lerpFn: geo.getBezier3LerpFn([p0, p1, p2, p3]),
          curve: true,
        })
        currentControlP = p2
        currentBezier = 3
        currentP = p3
        break
      }
      case 's': {
        const p0 = currentP
        const p1 =
          currentBezier === 3 ? geo.getSymmetry(currentControlP, p0) : p0
        const p2 = geo.add(p0, geo.vec(current[1], current[2]))
        const p3 = geo.add(p0, geo.vec(current[3], current[4]))
        ret.push({
          command: 's',
          lerpFn: geo.getBezier3LerpFn([p0, p1, p2, p3]),
          curve: true,
        })
        currentControlP = p2
        currentBezier = 3
        currentP = p3
        break
      }
      case 'A': {
        const p0 = currentP
        const rx = current[1]
        const ry = current[2]
        const large = current[4]
        const sweep = current[5]
        const radian = (current[3] / 180) * Math.PI
        const p1 = geo.vec(current[6], current[7])
        ret.push({
          command: 'A',
          lerpFn: geo.getArcLerpFn(rx, ry, p0, p1, large, sweep, radian),
          curve: true,
        })
        currentControlP = p1
        currentBezier = 1
        currentP = p1
        break
      }
      case 'a': {
        const p0 = currentP
        const rx = current[1]
        const ry = current[2]
        const large = current[4]
        const sweep = current[5]
        const radian = (current[3] / 180) * Math.PI
        const p1 = geo.add(p0, geo.vec(current[6], current[7]))
        ret.push({
          command: 'a',
          lerpFn: geo.getArcLerpFn(rx, ry, p0, p1, large, sweep, radian),
          curve: true,
        })
        currentControlP = p1
        currentBezier = 1
        currentP = p1
        break
      }
      case 'Z':
      case 'z': {
        const p0 = currentP
        const p1 = startP
        ret.push({
          command: current[0],
          segment: [p0, p1],
        })
        currentControlP = p1
        currentBezier = 1
        currentP = p1
        break
      }
    }
  })

  return ret
}

export interface PathLengthStruct {
  lerpFn: (t: number) => IVec2
  length: number
}

export function getPathLengthStructs(
  dStr: string,
  split = configs.bezierSplitSize
): PathLengthStruct[] {
  return parsePathSegments(dStr).map((seg) => ({
    lerpFn: seg.curve
      ? seg.lerpFn
      : (t) => geo.lerpPoint(seg.segment[0], seg.segment[1], t),
    length: geo.getPolylineLength(
      seg.curve ? geo.getApproPoints(seg.lerpFn, split) : seg.segment
    ),
  }))
}

/**
 * Execute "getPathTotalLength" with cacheable structs generated by "getPathLengthStructs"
 */
export function getPathTotalLengthFromStructs(
  structs: PathLengthStruct[]
): number {
  return structs.reduce((p, s) => p + s.length, 0)
}

/**
 * Alternative function of "SVGGeometryElement.getTotalLength"
 * @param dStr d string of path element
 * @param split the number of segments to approximate a curve
 * @return total length of the path
 */
export function getPathTotalLength(
  dStr: string,
  split = configs.bezierSplitSize
): number {
  return getPathTotalLengthFromStructs(getPathLengthStructs(dStr, split))
}

/**
 * Execute "getPathPointAtLength" with cacheable structs generated by "getPathLengthStructs"
 */
export function getPathPointAtLengthFromStructs(
  structs: PathLengthStruct[],
  distance: number,
  split = configs.bezierSplitSize
): IVec2 {
  if (structs.length === 0) return geo.vec(0, 0)
  if (distance === 0) {
    return structs[0].lerpFn(0)
  }

  let l = Math.max(distance, 0)
  for (let i = 0; i < structs.length; i++) {
    const s = structs[i]
    if (l < s.length) {
      return seekDistantPointOfLerpFn(s, l, split)
    } else if (l === s.length) {
      return s.lerpFn(1)
    } else {
      l -= s.length
    }
  }
  return structs[structs.length - 1].lerpFn(1)
}

function seekDistantPointOfLerpFn(
  pathStruct: PathLengthStruct,
  distant: number,
  split = configs.bezierSplitSize
): IVec2 {
  const step = 1 / split
  let prev = pathStruct.lerpFn(0)
  let sum = 0
  for (let i = 1; i < split; i++) {
    const t = step * i
    const p = pathStruct.lerpFn(t)
    const d = geo.getDistance(prev, p)
    const nextSum = sum + d
    if (distant < nextSum) {
      return pathStruct.lerpFn(t - (nextSum - distant) / pathStruct.length)
    }

    prev = p
    sum = nextSum
  }

  return pathStruct.lerpFn(1)
}

/**
 * Alternative function of "SVGGeometryElement.getPointAtLength"
 * @param dStr d string of path element
 * @param distance target length
 * @param split the number of segments to approximate a curve
 * @return the point at the target length
 */
export function getPathPointAtLength(
  dStr: string,
  distance: number,
  split = configs.bezierSplitSize
): IVec2 {
  return getPathPointAtLengthFromStructs(
    getPathLengthStructs(dStr, split),
    distance,
    split
  )
}

function getPathAbsPoints(segments: PathSegmentRaw[]): {
  controls: IVec2[]
  points: IVec2[]
} {
  const points: IVec2[] = []
  const controls: IVec2[] = []

  let seg: PathSegmentRaw
  let startP = geo.vec(0, 0)
  let absP = startP
  let preC = startP
  let preCType: 1 | 2 | 3 = 1
  for (let i = 0; i < segments.length; i++) {
    seg = segments[i]
    switch (seg[0]) {
      case 'M': {
        const p = geo.vec(seg[1], seg[2])
        startP = absP = preC = p
        preCType = 1
        break
      }
      case 'm': {
        const p = geo.add(geo.vec(seg[1], seg[2]), absP)
        startP = absP = preC = p
        preCType = 1
        break
      }
      case 'L': {
        const p = geo.vec(seg[1], seg[2])
        startP ??= p
        absP = preC = p
        preCType = 1
        break
      }
      case 'l': {
        const p = geo.add(geo.vec(seg[1], seg[2]), absP)
        startP ??= p
        absP = preC = p
        preCType = 1
        break
      }
      case 'H': {
        const p = geo.vec(seg[1], absP.y)
        absP = preC = p
        preCType = 1
        break
      }
      case 'h': {
        const p = geo.vec(seg[1] + absP.x, absP.y)
        absP = preC = p
        preCType = 1
        break
      }
      case 'V': {
        const p = geo.vec(absP.x, seg[1])
        absP = preC = p
        preCType = 1
        break
      }
      case 'v': {
        const p = geo.vec(absP.x, seg[1] + absP.y)
        absP = preC = p
        preCType = 1
        break
      }
      case 'Q': {
        const p = geo.vec(seg[1], seg[2])
        preC = p
        absP = geo.vec(seg[3], seg[4])
        preCType = 2
        break
      }
      case 'q': {
        const p = geo.vec(seg[1] + absP.x, seg[2] + absP.y)
        preC = p
        absP = geo.vec(seg[3] + absP.x, seg[4] + absP.y)
        preCType = 2
        break
      }
      case 'T': {
        const p = preCType === 2 ? geo.lerpPoint(preC, absP, 2) : absP
        preC = p
        absP = geo.vec(seg[1], seg[2])
        preCType = 2
        break
      }
      case 't': {
        const p = preCType === 2 ? geo.lerpPoint(preC, absP, 2) : absP
        preC = p
        absP = geo.vec(seg[1] + absP.x, seg[2] + absP.y)
        preCType = 2
        break
      }
      case 'C': {
        const p = geo.vec(seg[3], seg[4])
        preC = p
        absP = geo.vec(seg[5], seg[6])
        preCType = 3
        break
      }
      case 'c': {
        const p = geo.vec(seg[3] + absP.x, seg[4] + absP.y)
        preC = p
        absP = geo.vec(seg[5] + absP.x, seg[6] + absP.y)
        preCType = 3
        break
      }
      case 'S': {
        const p = preCType === 3 ? geo.lerpPoint(preC, absP, 2) : absP
        preC = p
        absP = geo.vec(seg[3], seg[4])
        preCType = 3
        break
      }
      case 's': {
        const p = preCType === 3 ? geo.lerpPoint(preC, absP, 2) : absP
        preC = p
        absP = geo.vec(seg[3] + absP.x, seg[4] + absP.y)
        preCType = 3
        break
      }
      case 'A': {
        const p = geo.vec(seg[6], seg[7])
        absP = preC = p
        preCType = 1
        break
      }
      case 'a': {
        const p = geo.vec(seg[6] + absP.x, seg[7] + absP.y)
        absP = preC = p
        preCType = 1
        break
      }
      case 'Z':
      case 'z': {
        absP = preC = startP
        preCType = 1
        break
      }
      default:
        throw getUnknownError()
    }

    controls.push(preC)
    points.push(absP)
  }

  return { points, controls }
}

function isCurveCommand(c: string) {
  return /Q|q|T|t|C|c|S|s|A|a/.test(c)
}

/**
 * The first segment has to be either "M", "m", "L" or "l".
 *
 * The last segment will be converted to normalized value.
 * e.g. [m, l, v, z] => [M, v, l, z]
 *
 * "T", "t", "S" or "s" will be converted to "Q", "q", "C" or "c"
 */
export function reversePath(segments: PathSegmentRaw[]): PathSegmentRaw[] {
  if (segments.length < 2) return segments

  const ret: PathSegmentRaw[] = []

  const { points: absPoints, controls: absContolPoints } =
    getPathAbsPoints(segments)

  const length = segments.length
  let current: PathSegmentRaw
  let absP: IVec2
  let closeCount = false
  for (let i = length - 1; 0 <= i; i--) {
    current = segments[i]
    absP = absPoints[i === 0 ? length - 1 : i - 1]

    switch (current[0]) {
      case 'M':
        if (closeCount) {
          if (isCurveCommand(ret[ret.length - 1][0])) {
            ret.push(['Z'])
          } else {
            ret[ret.length - 1] = ['Z']
          }
          closeCount = false
        }
        ret.push([current[0], absP.x, absP.y])
        break
      case 'm':
        if (closeCount) {
          if (isCurveCommand(ret[ret.length - 1][0])) {
            ret.push(['z'])
          } else {
            ret[ret.length - 1] = ['z']
          }
          closeCount = false
        }
        if (i === 0) {
          ret.push(['M', absP.x, absP.y])
        } else {
          ret.push([current[0], -current[1], -current[2]])
        }
        break
      case 'L':
        if (closeCount && i === 0) {
          if (isCurveCommand(ret[ret.length - 1][0])) {
            ret.push(['Z'])
          } else {
            ret[ret.length - 1] = ['Z']
          }
          closeCount = false
        }
        ret.push([current[0], absP.x, absP.y])
        break
      case 'l':
        if (closeCount && i === 0) {
          if (isCurveCommand(ret[ret.length - 1][0])) {
            ret.push(['z'])
          } else {
            ret[ret.length - 1] = ['z']
          }
          closeCount = false
        }
        if (i === 0) {
          ret.push(['L', absP.x, absP.y])
        } else {
          ret.push([current[0], -current[1], -current[2]])
        }
        break
      case 'H':
        ret.push([current[0], absP.x])
        break
      case 'h':
        ret.push([current[0], -current[1]])
        break
      case 'V':
        ret.push([current[0], absP.y])
        break
      case 'v':
        ret.push([current[0], -current[1]])
        break
      case 'Q': {
        ret.push([current[0], current[1], current[2], absP.x, absP.y])
        break
      }
      case 'q': {
        ret.push([
          current[0],
          current[1] - current[3],
          current[2] - current[4],
          -current[3],
          -current[4],
        ])
        break
      }
      case 'T': {
        const c = absContolPoints[i]
        ret.push(['Q', c.x, c.y, absP.x, absP.y])
        break
      }
      case 't': {
        const b = absPoints[i]
        const c = absContolPoints[i]
        ret.push(['q', c.x - b.x, c.y - b.y, -current[1], -current[2]])
        break
      }
      case 'C': {
        ret.push([
          current[0],
          current[3],
          current[4],
          current[1],
          current[2],
          absP.x,
          absP.y,
        ])
        break
      }
      case 'c': {
        ret.push([
          current[0],
          current[3] - current[5],
          current[4] - current[6],
          current[1] - current[5],
          current[2] - current[6],
          -current[5],
          -current[6],
        ])
        break
      }
      case 'S': {
        const c = absContolPoints[i]
        ret.push(['C', current[1], current[2], c.x, c.y, absP.x, absP.y])
        break
      }
      case 's': {
        const b = absPoints[i]
        const c = absContolPoints[i]
        ret.push([
          'c',
          current[1] - current[3],
          current[2] - current[4],
          c.x - b.x,
          c.y - b.y,
          -current[3],
          -current[4],
        ])
        break
      }
      case 'A': {
        ret.push([
          current[0],
          current[1],
          current[2],
          current[3],
          current[4],
          !current[5],
          absP.x,
          absP.y,
        ])
        break
      }
      case 'a': {
        ret.push([
          current[0],
          current[1],
          current[2],
          current[3],
          current[4],
          !current[5],
          -current[6],
          -current[7],
        ])
        break
      }
      case 'Z':
        closeCount = true
        ret.push(['L', absP.x, absP.y])
        break
      case 'z': {
        closeCount = true
        const absPP = absPoints[i]
        ret.push(['l', absP.x - absPP.x, absP.y - absPP.y])
        break
      }
    }
  }

  ret.unshift(ret.pop()!)

  return ret
}

/**
 * Slide segments.
 * Relative segments will not be slided by this function.
 */
export function slidePath(
  segments: PathSegmentRaw[],
  diff: IVec2
): PathSegmentRaw[] {
  return segments.map((current) => {
    const slided: PathSegmentRaw = [...current]
    switch (slided[0]) {
      case 'H':
        slided[1] += diff.x
        break
      case 'V':
        slided[1] += diff.y
        break
      case 'A':
        slided[6] += diff.x
        slided[7] += diff.y
        break
      default:
        if (slided[0] === slided[0].toUpperCase()) {
          for (let i = 1; i < slided.length - 1; i += 2) {
            ;(slided[i] as number) += diff.x
            ;(slided[i + 1] as number) += diff.y
          }
        }
        break
    }
    return slided
  })
}

/**
 * Scale segments.
 * Both abstract and relative segments will be scaled by this function.
 */
export function scalePath(
  segments: PathSegmentRaw[],
  scale: IVec2
): PathSegmentRaw[] {
  return segments.map((current) => {
    const slided: PathSegmentRaw = [...current]
    switch (slided[0]) {
      case 'H':
      case 'h':
        slided[1] *= scale.x
        break
      case 'V':
      case 'v':
        slided[1] *= scale.y
        break
      case 'A':
      case 'a':
        slided[1] *= Math.abs(scale.x)
        slided[2] *= Math.abs(scale.y)
        if (scale.x * scale.y < 0) {
          slided[5] = !slided[5]
        }
        slided[6] *= scale.x
        slided[7] *= scale.y
        break
      default:
        for (let i = 1; i < slided.length - 1; i += 2) {
          ;(slided[i] as number) *= scale.x
          ;(slided[i + 1] as number) *= scale.y
        }
        break
    }
    return slided
  })
}

function convertHVToL(segments: PathSegmentRaw[]): PathSegmentRaw[] {
  // If neither "H" nor "V" exists, abstract points doesn't have to be computed.
  const absVHExisted = segments.some((s) => /H|V/.test(s[0]))
  const { points } = getPathAbsPoints(absVHExisted ? segments : [])

  return segments.map((s, i) => {
    switch (s[0]) {
      case 'H':
        return ['L', s[1], points[i].y]
      case 'h':
        return ['l', s[1], 0]
      case 'V':
        return ['L', points[i].x, s[1]]
      case 'v':
        return ['l', 0, s[1]]
      default:
        return s
    }
  })
}

/**
 * Rotate segments.
 * Both abstract and relative segments will be rotated by this function.
 * "H", "h", "V" and "v" will be converted to "L" or "l"
 */
export function rotatePath(
  segments: PathSegmentRaw[],
  radian: number
): PathSegmentRaw[] {
  const sin = Math.sin(radian)
  const cos = Math.cos(radian)
  return convertHVToL(segments).map((current) => {
    const slided: PathSegmentRaw = [...current]
    switch (slided[0]) {
      case 'A':
      case 'a': {
        slided[3] += (radian * 180) / Math.PI
        const x = slided[6]
        const y = slided[7]
        slided[6] = cos * x - sin * y
        slided[7] = sin * x + cos * y
        break
      }
      default:
        for (let i = 1; i < slided.length - 1; i += 2) {
          const x = slided[i] as number
          const y = slided[i + 1] as number
          ;(slided[i] as number) = cos * x - sin * y
          ;(slided[i + 1] as number) = sin * x + cos * y
        }
        break
    }
    return slided
  })
}

/**
 * Parse path d string and approximate it as a polyline
 * Note:
 * - Jump information by M/m commands doesn't remain in a polyline
 * - Z/z commands are ignored => The tail point doesn't become the same as the head one by these commands
 * @param dStr d string of path element
 * @return approximated polyline
 */
export function parsePathD(
  dStr: string,
  split = configs.bezierSplitSize
): IVec2[] {
  const _split = Math.max(1, split)
  let ret: IVec2[] = []
  let step = 1 / _split
  parsePathSegments(dStr).forEach((seg) => {
    if (seg.command === 'Z' || seg.command === 'z') return

    if (seg.curve) {
      for (let i = 1; i <= _split; i++) {
        ret.push(seg.lerpFn(step * i))
      }
    } else {
      ret.push(seg.segment[1])
    }
  })
  return ret
}

/**
 * pathタグを解析する
 * @param svgPath SVGのpathタグDOM
 * @return 座標リスト
 */
export function parsePath(svgPath: SVGPathElement): IVec2[] {
  const dStr = svgPath.getAttribute('d')
  return dStr
    ? adoptTransform(svgPath.getAttribute('transform'), parsePathD(dStr))
    : []
}

/**
 * rectタグを解析する
 * @param SVGのrectタグDOM
 * @return 座標リスト
 */
export function parseRect(svgRect: SVGRectElement): IVec2[] {
  const x = _parseFloat(svgRect.getAttribute('x') || '0')
  const y = _parseFloat(svgRect.getAttribute('y') || '0')
  const width = _parseFloat(svgRect.getAttribute('width') || '0')
  const height = _parseFloat(svgRect.getAttribute('height') || '0')

  // トランスフォーム
  return adoptTransform(svgRect.getAttribute('transform'), [
    geo.vec(x, y),
    geo.vec(x + width, y),
    geo.vec(x + width, y + height),
    geo.vec(x, y + height),
  ])
}

/**
 * ellipseタグを解析する
 * @param svgEllipse SVGのellipseタグDOM
 * @return 座標リスト
 */
export function parseEllipse(svgEllipse: SVGEllipseElement): IVec2[] {
  const cx = _parseFloat(svgEllipse.getAttribute('cx') || '0')
  const cy = _parseFloat(svgEllipse.getAttribute('cy') || '0')
  const rx = _parseFloat(svgEllipse.getAttribute('rx') || '1')
  const ry = _parseFloat(svgEllipse.getAttribute('ry') || '1')

  // トランスフォーム
  return adoptTransform(
    svgEllipse.getAttribute('transform'),
    geo.approximateArc(
      rx,
      ry,
      0,
      Math.PI * 2,
      geo.vec(cx, cy),
      0,
      configs.ellipseSplitSize
    )
  )
}

/**
 * circleタグを解析する
 * @param svgCircle  SVGのcircleタグDOM
 * @return 座標リスト
 */
export function parseCircle(svgCircle: SVGCircleElement): IVec2[] {
  const cx = _parseFloat(svgCircle.getAttribute('cx') || '0')
  const cy = _parseFloat(svgCircle.getAttribute('cy') || '0')
  const r = _parseFloat(svgCircle.getAttribute('r') || '1')

  // トランスフォーム
  return adoptTransform(
    svgCircle.getAttribute('transform'),
    geo.approximateArc(
      r,
      r,
      0,
      Math.PI * 2,
      geo.vec(cx, cy),
      0,
      configs.ellipseSplitSize
    )
  )
}

/**
 * transformを行う
 * @param commandStr コマンド文字列
 * @param points 変換前座標リスト
 * @return 変形後座標リスト
 */
export function adoptTransform(
  commandStr: string | null,
  points: IVec2[]
): IVec2[] {
  if (!commandStr) return points

  let ret: IVec2[] = geo.cloneVectors(points)
  // 複数コマンドの場合もあるのでループ
  const commandList = commandStr.split(/\)/)
  commandList.forEach((current) => {
    const tmp = current.split(/\(/)
    if (tmp.length === 2) {
      const command = tmp[0].trim().toLowerCase()
      const params = parseNumbers(tmp[1])

      switch (command) {
        case 'matrix': {
          ret = geo.transform(ret, params)
          break
        }
        case 'translate': {
          ret = ret.map((p) => geo.vec(p.x + params[0], p.y + params[1]))
          break
        }
        case 'scale': {
          const scaleX = params[0]
          // XY等倍の場合を考慮
          let scaleY = params[0]
          if (params.length > 1) {
            scaleY = params[1]
          }
          ret = ret.map((p) => geo.vec(p.x * scaleX, p.y * scaleY))
          break
        }
        case 'rotate': {
          // 回転基準点
          let base: IVec2 = geo.vec(0, 0)
          if (params.length > 2) {
            base = geo.vec(params[1], params[2])
          }
          ret = ret.map((p) => geo.rotate(p, (params[0] * Math.PI) / 180, base))
          break
        }
        case 'skewx': {
          ret = ret.map((p) =>
            geo.vec(p.x + Math.tan((params[0] * Math.PI) / 180) * p.y, p.y)
          )
          break
        }
        case 'skewy': {
          ret = ret.map((p) =>
            geo.vec(p.x, p.y + Math.tan((params[0] * Math.PI) / 180) * p.x)
          )
          break
        }
      }
    }
  })

  return ret
}

// All commands (BbRr isn't supported)
const allCommand = /M|m|L|l|H|h|V|v|C|c|S|s|Q|q|T|t|A|a|Z|z/g

/**
 * pathタグd属性文字列を分割する
 * @param dString pathのd要素文字列
 * @return コマンド単位の情報配列の配列
 */
export function splitD(dString: string): string[][] {
  // 要素分割
  const strList = dString
    .replace(allCommand, ' $& ')
    // Insert space before each signature, but don't destruct exponent exporession such as 2.2e-10.
    .replace(/([^e])(-|\+)/g, '$1 $2')
    .split(/,| /)
    .filter((str) => str)
    .flatMap(complementDecimalShorthand)
  // 直前のコマンド
  let pastCommand = 'M'

  const ret: string[][] = []
  for (let i = 0; i < strList.length; ) {
    const info: string[] = []
    // Check if a command exists
    if (strList[i].match(allCommand)) {
      info.push(strList[i])
      pastCommand = info[0]
      i++
    } else if (pastCommand.toUpperCase() !== 'Z') {
      // Reuse previous command
      // Avoid reusing 'Z' that can cause infinite loop
      info.push(pastCommand)
    }

    switch (info[0].toUpperCase()) {
      case 'Z':
        break
      case 'V':
      case 'H':
        info.push(strList[i])
        i += 1
        break
      case 'M':
      case 'L':
      case 'T':
        info.push(strList[i], strList[i + 1])
        i += 2
        break
      case 'Q':
      case 'S':
        info.push(strList[i], strList[i + 1], strList[i + 2], strList[i + 3])
        i += 4
        break
      case 'C':
        info.push(
          strList[i],
          strList[i + 1],
          strList[i + 2],
          strList[i + 3],
          strList[i + 4],
          strList[i + 5]
        )
        i += 6
        break
      case 'A':
        info.push(
          strList[i],
          strList[i + 1],
          strList[i + 2],
          strList[i + 3],
          strList[i + 4],
          strList[i + 5],
          strList[i + 6]
        )
        i += 7
        break
      default:
        throw getUnknownError()
    }

    ret.push(info)
  }

  return ret
}

/**
 * '1.2.3' => ['1.2', '0.3']
 */
function complementDecimalShorthand(str: string): string[] {
  const list = str.split(/\./)
  return list.length <= 2
    ? [str]
    : [`${list[0]}.${list[1]}`, ...list.slice(2).map((v) => `0.${v}`)]
}

/**
 * svg文字列を生成する
 * @param pathList path情報リスト
 * @return xml文字列
 */
export function serializeSvgString(pathList: ISvgPath[]): string {
  const svg = serializeSvg(pathList)
  const xmlSerializer = new XMLSerializer()
  const textXml = xmlSerializer.serializeToString(svg)
  return textXml
}

/**
 * svgタグを生成する
 * @param pathList path情報リスト
 * @return svgタグ
 */
export function serializeSvg(pathList: ISvgPath[]): SVGElement {
  const dom = document.createElementNS(HTTP_SVG, 'svg')

  // キャンバスサイズ
  let width = 1
  let height = 1

  pathList.forEach((path) => {
    dom.appendChild(serializePath(path.d, path.style))
    path.d.forEach((p) => {
      width = Math.max(width, p.x)
      height = Math.max(height, p.y)
    })
  })

  width *= 1.1
  height *= 1.1

  dom.setAttribute('width', `${width}`)
  dom.setAttribute('height', `${height}`)

  return dom
}

/**
 * pathタグを生成する
 * @param pointList 座標リスト
 * @param style スタイル情報
 * @return pathタグ
 */
export function serializePath(
  pointList: IVec2[],
  style: ISvgStyle
): SVGPathElement {
  const dom = document.createElementNS(HTTP_SVG, 'path')
  dom.setAttribute('d', serializePointList(pointList))
  dom.setAttribute('style', serializeStyle(style))
  return dom
}

/**
 * 座標リストをd属性文字列に変換する
 * @param pointList 座標リスト
 * @param open 閉じないフラグ
 * @return d属性文字列
 */
export function serializePointList(pointList: IVec2[], open?: boolean): string {
  if (pointList.length === 0) return ''
  const [head, ...body] = pointList
  return (
    `M ${head.x},${head.y}` +
    body.map((p) => ` L ${p.x},${p.y}`).join('') +
    (open ? '' : ' Z')
  )
}

/**
 * デフォルトstyle作成
 * @return スタイルオブジェクト
 */
export function createStyle(): ISvgStyle {
  return {
    fill: false,
    fillGlobalAlpha: 1,
    fillStyle: '',
    lineCap: 'butt',
    lineDash: [],
    lineJoin: 'bevel',
    lineWidth: 1,
    stroke: false,
    strokeGlobalAlpha: 1,
    strokeStyle: '',
  }
}

/**
 * pathタグのスタイルを取得する
 * @param svgPath SVGのpathタグDOM
 * @return スタイルオブジェクト
 */
export function parseTagStyle(svgPath: SVGElement): ISvgStyle {
  // スタイル候補要素リスト
  const styleObject: { [key: string]: string } = {}

  svgPath.getAttributeNames().forEach((name) => {
    const attr = svgPath.getAttributeNode(name)
    if (!attr) return
    styleObject[attr.name] = attr.value
  })

  const styleAttr = svgPath.getAttributeNode('style')
  if (styleAttr) {
    // style要素から取得
    const styleStr = styleAttr.value
    styleStr.split(';').forEach((elem: string) => {
      const splited = elem.split(':')
      if (splited.length !== 2) return
      styleObject[splited[0].trim()] = splited[1].trim()
    })
  }

  return Object.entries(styleObject).reduce<ISvgStyle>((ret, [key, val]) => {
    switch (key.toLowerCase()) {
      case 'fill':
        if (val === 'none') {
          ret.fillStyle = ''
          ret.fill = false
        } else {
          ret.fillStyle = val
          ret.fill = true
        }
        break
      case 'stroke':
        if (val === 'none') {
          ret.strokeStyle = ''
          ret.stroke = false
        } else {
          ret.strokeStyle = val
          ret.stroke = true
        }
        break
      case 'stroke-width':
        ret.lineWidth = _parseFloat(val)
        break
      case 'stroke-opacity':
        ret.strokeGlobalAlpha = _parseFloat(val)
        break
      case 'fill-opacity':
        ret.fillGlobalAlpha = _parseFloat(val)
        break
      case 'stroke-linecap':
        ret.lineCap = val
        break
      case 'stroke-linejoin':
        ret.lineJoin = val
        break
      case 'stroke-dasharray':
        if (val.toLowerCase() === 'none') {
          ret.lineDash = []
        } else {
          ret.lineDash = parseNumbers(val)
        }
        break
      default:
        // 無視
        break
    }

    return ret
  }, createStyle())
}

/**
 * スタイル情報をstyle属性文字列に変換する
 * @method serializeStyle
 * @param style スタイル情報
 * @return style属性文字列
 */
export function serializeStyle(style: ISvgStyle): string {
  let ret = ''

  // fill情報
  if (!style.fill) {
    ret += 'fill:none;'
  } else {
    ret += 'fill:' + style.fillStyle + ';'
  }
  if (style.fillGlobalAlpha) {
    ret += 'fill-opacity:' + style.fillGlobalAlpha + ';'
  }

  // stroke情報
  if (!style.stroke) {
    ret += 'stroke:none;'
  } else {
    ret += 'stroke:' + style.strokeStyle + ';'
  }
  if (style.lineWidth) {
    ret += 'stroke-width:' + style.lineWidth + ';'
  }
  if (style.strokeGlobalAlpha) {
    ret += 'stroke-opacity:' + style.strokeGlobalAlpha + ';'
  }
  if (style.lineCap) {
    ret += 'stroke-linecap:' + style.lineCap + ';'
  }
  if (style.lineJoin) {
    ret += 'stroke-linejoin:' + style.lineJoin + ';'
  }
  if (style.lineDash) {
    if (style.lineDash.length > 0) {
      ret += 'stroke-dasharray:' + style.lineDash.join(',') + ';'
    } else {
      ret += 'stroke-dasharray:none;'
    }
  }

  return ret
}

/**
 * パス分割
 * @param path 対象パス
 * @param line 分割線
 * @return 分割後のパスリスト
 */
export function splitPath(path: ISvgPath, line: IVec2[]): ISvgPath[] {
  let splited = geo.splitPolyByLine(path.d, line)
  if (splited.length < 2) return [path]

  // 本体と回転方向が一致しているかで分類
  const rootLoopwise = geo.getLoopwise(path.d)
  const sameLoopwiseList: IVec2[][] = []
  const oppositeLoopwiseList: IVec2[][] = []
  if (path.included) {
    path.included.forEach((s) => {
      if (geo.getLoopwise(s) === rootLoopwise) {
        sameLoopwiseList.push(s)
      } else {
        oppositeLoopwiseList.push(s)
      }
    })
  }

  // 本体と同回転のものはそのまま分割
  sameLoopwiseList.forEach((poly) => {
    const sp = geo.splitPolyByLine(poly, line)
    splited = [...splited, ...(sp.length > 0 ? sp : [poly])]
  })

  // 本体と逆回転のものは特殊処理
  const notPolyList: IVec2[][] = []
  oppositeLoopwiseList.forEach((poly) => {
    const sp = geo.splitPolyByLine(poly, line)
    if (sp.length > 0) {
      // 分割されたらブーリアン差をとるために集める
      notPolyList.push(poly)
    } else {
      // 分割なしならそのまま
      splited.push(poly)
    }
  })

  // 切断されたくり抜き領域を差し引いたポリゴンを生成
  const splitedAfterNot = splited.map((s) =>
    notPolyList.reduce((p, c) => geo.getPolygonNotPolygon(p, c), s)
  )

  return geo.getIncludedPolygonGroups(splitedAfterNot).map((group) => {
    const [d, ...included] = group
    return { d: d, included, style: path.style }
  })
}

/**
 * ポリゴンリストをグルーピングしたパスリストに変換する
 * @param polygons ポリゴンリスト
 * @param style パススタイル
 * @return パスリスト
 */
export function getGroupedPathList(
  polygons: IVec2[][],
  style: ISvgStyle = createStyle()
): ISvgPath[] {
  return geo.getIncludedPolygonGroups(polygons).map((group) => {
    const [d, ...included] = group
    return { d, included, style }
  })
}

/**
 * convert affine matrix to transform attribute value
 * @param matrix affine matrix
 * @return transform attribute value
 */
export function affineToTransform(matrix: AffineMatrix): string {
  return `matrix(${matrix.join(',')})`
}

/**
 * parse transform attribute value as affine matrix
 * @param transform attribute value
 * @return transform value
 */
export function parseTransform(transformStr: string): AffineMatrix {
  const transformStrList = transformStr.split(')').map((s) => `${s})`)
  const affines = transformStrList.map((str) => parseUnitTransform(str))
  return geo.multiAffines(affines)
}

function parseUnitTransform(str: string): AffineMatrix {
  if (/translateX/.test(str)) return parseTranslateX(str)
  if (/translateY/.test(str)) return parseTranslateY(str)
  if (/translate/.test(str)) return parseTranslate(str)
  if (/skewX/.test(str)) return parseSkewX(str)
  if (/skewY/.test(str)) return parseSkewY(str)
  if (/scaleX/.test(str)) return parseScaleX(str)
  if (/scaleY/.test(str)) return parseScaleY(str)
  if (/scale/.test(str)) return parseScale(str)
  if (/rotate/.test(str)) return parseRotate(str)
  if (/matrix/.test(str)) return parseMatrix(str)
  return [...geo.IDENTITY_AFFINE]
}

function parseNumbers(str: string): number[] {
  const list = str.trim().replace(/,/g, ' ').split(/ +/)
  return list.map((s) => _parseFloat(s))
}

/**
 * parse transform attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */
export function parseTranslate(str: string): AffineMatrix {
  const splited = str.match(/translate\((.+)\)/)
  if (!splited || splited.length < 1) return [...geo.IDENTITY_AFFINE]

  const numbers = parseNumbers(splited[1])
  if (numbers.length < 1) {
    return [...geo.IDENTITY_AFFINE]
  } else if (numbers.length === 1) {
    return [1, 0, 0, 1, numbers[0], 0]
  } else {
    return [1, 0, 0, 1, numbers[0], numbers[1]]
  }
}

/**
 * parse translateX attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */
export function parseTranslateX(str: string): AffineMatrix {
  const splited = str.match(/translateX\((.+)\)/)
  if (!splited || splited.length < 1) return [...geo.IDENTITY_AFFINE]

  const numbers = parseNumbers(splited[1])
  if (numbers.length < 1) {
    return [...geo.IDENTITY_AFFINE]
  } else {
    return [1, 0, 0, 1, numbers[0], 0]
  }
}

/**
 * parse translateY attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */
export function parseTranslateY(str: string): AffineMatrix {
  const splited = str.match(/translateY\((.+)\)/)
  if (!splited || splited.length < 1) return [...geo.IDENTITY_AFFINE]

  const numbers = parseNumbers(splited[1])
  if (numbers.length < 1) {
    return [...geo.IDENTITY_AFFINE]
  } else {
    return [1, 0, 0, 1, 0, numbers[0]]
  }
}

/**
 * parse skewX attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */
export function parseSkewX(str: string): AffineMatrix {
  const splited = str.match(/skewX\((.+)\)/)
  if (!splited || splited.length < 1) return [...geo.IDENTITY_AFFINE]

  const numbers = parseNumbers(splited[1])
  if (numbers.length < 1) {
    return [...geo.IDENTITY_AFFINE]
  } else {
    return [1, 0, Math.tan((numbers[0] * Math.PI) / 180), 1, 0, 0]
  }
}

/**
 * parse skewY attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */
export function parseSkewY(str: string): AffineMatrix {
  const splited = str.match(/skewY\((.+)\)/)
  if (!splited || splited.length < 1) return [...geo.IDENTITY_AFFINE]

  const numbers = parseNumbers(splited[1])
  if (numbers.length < 1) {
    return [...geo.IDENTITY_AFFINE]
  } else {
    return [1, Math.tan((numbers[0] * Math.PI) / 180), 0, 1, 0, 0]
  }
}

/**
 * parse transform attribute value of scale as affine matrix
 * @param transform attribute value
 * @return transform value
 */
export function parseScale(str: string): AffineMatrix {
  const splited = str.match(/scale\((.+)\)/)
  if (!splited || splited.length < 2) return [...geo.IDENTITY_AFFINE]

  const numbers = parseNumbers(splited[1])
  if (numbers.length < 1) {
    return [...geo.IDENTITY_AFFINE]
  } else if (numbers.length === 1) {
    return [numbers[0], 0, 0, numbers[0], 0, 0]
  } else {
    return [numbers[0], 0, 0, numbers[1], 0, 0]
  }
}

/**
 * parse ScaleX attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */
export function parseScaleX(str: string): AffineMatrix {
  const splited = str.match(/scaleX\((.+)\)/)
  if (!splited || splited.length < 1) return [...geo.IDENTITY_AFFINE]

  const numbers = parseNumbers(splited[1])
  if (numbers.length < 1) {
    return [...geo.IDENTITY_AFFINE]
  } else {
    return [numbers[0], 0, 0, 1, 0, 0]
  }
}

/**
 * parse ScaleY attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */
export function parseScaleY(str: string): AffineMatrix {
  const splited = str.match(/scaleY\((.+)\)/)
  if (!splited || splited.length < 1) return [...geo.IDENTITY_AFFINE]

  const numbers = parseNumbers(splited[1])
  if (numbers.length < 1) {
    return [...geo.IDENTITY_AFFINE]
  } else {
    return [1, 0, 0, numbers[0], 0, 0]
  }
}

/**
 * parse transform attribute value of rotate as affine matrix
 * @param transform attribute value
 * @return transform value
 */
export function parseRotate(str: string): AffineMatrix {
  const splited = str.match(/rotate\((.+)\)/)
  if (!splited || splited.length < 2) return [...geo.IDENTITY_AFFINE]

  const numbers = parseNumbers(splited[1])
  if (parseNumbers.length < 1) return [...geo.IDENTITY_AFFINE]

  const rad = (numbers[0] / 180) * Math.PI
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  const rot: AffineMatrix = [cos, sin, -sin, cos, 0, 0]

  if (numbers.length > 2) {
    return geo.multiAffine(
      geo.multiAffine([1, 0, 0, 1, numbers[1], numbers[2]], rot),
      [1, 0, 0, 1, -numbers[1], -numbers[2]]
    )
  } else {
    return rot
  }
}

/**
 * parse transform attribute value of matrix as affine matrix
 * @param transform attribute value
 * @return transform value
 */
export function parseMatrix(str: string): AffineMatrix {
  const splited = str.match(/matrix\((.+)\)/)
  if (!splited || splited.length < 2) return [...geo.IDENTITY_AFFINE]

  const numbers = parseNumbers(splited[1])
  if (numbers.length < 5) return [...geo.IDENTITY_AFFINE]

  return numbers.slice(0, 6) as AffineMatrix
}

function getUnknownError(): Error {
  return new Error(`Unexpected error`)
}
