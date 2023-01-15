import { AffineMatrix, ISvgConfigs, ISvgPath, ISvgStyle, IVec2 } from './types'
import * as geo from './geo'

const HTTP_SVG = 'http://www.w3.org/2000/svg'
const _parseFloat = parseFloat

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
  ctx.lineCap = pathInfo.style.lineCap as CanvasLineCap
  ctx.lineJoin = pathInfo.style.lineJoin as CanvasLineJoin

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
  const ret: PathSegment[] = []
  let startP = geo.vec(0, 0)
  let currentP = geo.vec(0, 0)
  let currentControlP = geo.vec(0, 0)
  splitD(dStr).forEach((current) => {
    switch (current[0]) {
      case 'M': {
        const p1 = geo.vec(_parseFloat(current[1]), _parseFloat(current[2]))
        ret.push({ command: 'M', segment: [p1, p1] })
        startP = p1
        currentControlP = p1
        currentP = p1
        break
      }
      case 'm': {
        const p1 = geo.vec(_parseFloat(current[1]), _parseFloat(current[2]))
        ret.push({ command: 'm', segment: [p1, p1] })
        startP = p1
        currentP = p1
        currentControlP = p1
        break
      }
      case 'L': {
        const p0 = currentP
        const p1 = geo.vec(_parseFloat(current[1]), _parseFloat(current[2]))
        ret.push({ command: 'L', segment: [p0, p1] })
        startP ??= p1
        currentControlP = p1
        currentP = p1
        break
      }
      case 'l': {
        const p0 = currentP
        const p1 = geo.add(
          currentP,
          geo.vec(_parseFloat(current[1]), _parseFloat(current[2]))
        )
        ret.push({ command: 'l', segment: [p0, p1] })
        startP ??= p1
        currentControlP = p1
        currentP = p1
        break
      }
      case 'H': {
        const p0 = currentP
        const p1 = geo.vec(_parseFloat(current[1]), p0.y)
        ret.push({ command: 'H', segment: [p0, p1] })
        currentControlP = p1
        currentP = p1
        break
      }
      case 'h': {
        const p0 = currentP
        const p1 = geo.vec(_parseFloat(current[1]) + p0.x, p0.y)
        ret.push({ command: 'h', segment: [p0, p1] })
        currentControlP = p1
        currentP = p1
        break
      }
      case 'V': {
        const p0 = currentP
        const p1 = geo.vec(p0.x, _parseFloat(current[1]))
        ret.push({ command: 'V', segment: [p0, p1] })
        currentControlP = p1
        currentP = p1
        break
      }
      case 'v': {
        const p0 = currentP
        const p1 = geo.vec(p0.x, _parseFloat(current[1]) + p0.y)
        ret.push({ command: 'v', segment: [p0, p1] })
        currentControlP = p1
        currentP = p1
        break
      }
      case 'Q': {
        const p0 = currentP
        const p1 = geo.vec(_parseFloat(current[1]), _parseFloat(current[2]))
        const p2 = geo.vec(_parseFloat(current[3]), _parseFloat(current[4]))
        ret.push({
          command: 'Q',
          lerpFn: geo.getBezier2LerpFn([p0, p1, p2]),
          curve: true,
        })
        currentControlP = p1
        currentP = p2
        break
      }
      case 'q': {
        const p0 = currentP
        const p1 = geo.add(
          p0,
          geo.vec(_parseFloat(current[1]), _parseFloat(current[2]))
        )
        const p2 = geo.add(
          p0,
          geo.vec(_parseFloat(current[3]), _parseFloat(current[4]))
        )
        ret.push({
          command: 'q',
          lerpFn: geo.getBezier2LerpFn([p0, p1, p2]),
          curve: true,
        })
        currentControlP = p1
        currentP = p2
        break
      }
      case 'T': {
        const p0 = currentP
        const p1 = geo.getSymmetry(currentControlP, p0)
        const p2 = geo.vec(_parseFloat(current[1]), _parseFloat(current[2]))
        ret.push({
          command: 'T',
          lerpFn: geo.getBezier2LerpFn([p0, p1, p2]),
          curve: true,
        })
        currentControlP = p1
        currentP = p2
        break
      }
      case 't': {
        const p0 = currentP
        const p1 = geo.getSymmetry(currentControlP, p0)
        const p2 = geo.add(
          p0,
          geo.vec(_parseFloat(current[1]), _parseFloat(current[2]))
        )
        ret.push({
          command: 't',
          lerpFn: geo.getBezier2LerpFn([p0, p1, p2]),
          curve: true,
        })
        currentControlP = p1
        currentP = p2
        break
      }
      case 'C': {
        const p0 = currentP
        const p1 = geo.vec(_parseFloat(current[1]), _parseFloat(current[2]))
        const p2 = geo.vec(_parseFloat(current[3]), _parseFloat(current[4]))
        const p3 = geo.vec(_parseFloat(current[5]), _parseFloat(current[6]))
        ret.push({
          command: 'C',
          lerpFn: geo.getBezier3LerpFn([p0, p1, p2, p3]),
          curve: true,
        })
        currentControlP = p2
        currentP = p3
        break
      }
      case 'c': {
        const p0 = currentP
        const p1 = geo.add(
          p0,
          geo.vec(_parseFloat(current[1]), _parseFloat(current[2]))
        )
        const p2 = geo.add(
          p0,
          geo.vec(_parseFloat(current[3]), _parseFloat(current[4]))
        )
        const p3 = geo.add(
          p0,
          geo.vec(_parseFloat(current[5]), _parseFloat(current[6]))
        )
        ret.push({
          command: 'c',
          lerpFn: geo.getBezier3LerpFn([p0, p1, p2, p3]),
          curve: true,
        })
        currentControlP = p2
        currentP = p3
        break
      }
      case 'S': {
        const p0 = currentP
        const p1 = geo.getSymmetry(currentControlP, p0)
        const p2 = geo.vec(_parseFloat(current[1]), _parseFloat(current[2]))
        const p3 = geo.vec(_parseFloat(current[3]), _parseFloat(current[4]))
        ret.push({
          command: 'S',
          lerpFn: geo.getBezier3LerpFn([p0, p1, p2, p3]),
          curve: true,
        })
        currentControlP = p2
        currentP = p3
        break
      }
      case 's': {
        const p0 = currentP
        const p1 = geo.getSymmetry(currentControlP, p0)
        const p2 = geo.add(
          p0,
          geo.vec(_parseFloat(current[1]), _parseFloat(current[2]))
        )
        const p3 = geo.add(
          p0,
          geo.vec(_parseFloat(current[3]), _parseFloat(current[4]))
        )
        ret.push({
          command: 's',
          lerpFn: geo.getBezier3LerpFn([p0, p1, p2, p3]),
          curve: true,
        })
        currentControlP = p2
        currentP = p3
        break
      }
      case 'A': {
        const p0 = currentP
        const rx = _parseFloat(current[1])
        const ry = _parseFloat(current[2])
        const large = current[4] !== '0'
        const sweep = current[5] !== '0'
        const radian = (_parseFloat(current[3]) / 180) * Math.PI
        const p1 = geo.vec(_parseFloat(current[6]), _parseFloat(current[7]))
        ret.push({
          command: 'A',
          lerpFn: geo.getArcLerpFn(rx, ry, p0, p1, large, sweep, radian),
          curve: true,
        })
        currentControlP = p1
        currentP = p1
        break
      }
      case 'a': {
        const p0 = currentP
        const rx = _parseFloat(current[1])
        const ry = _parseFloat(current[2])
        const large = current[4] !== '0'
        const sweep = current[5] !== '0'
        const radian = (_parseFloat(current[3]) / 180) * Math.PI
        const p1 = geo.add(
          p0,
          geo.vec(_parseFloat(current[6]), _parseFloat(current[7]))
        )
        ret.push({
          command: 'a',
          lerpFn: geo.getArcLerpFn(rx, ry, p0, p1, large, sweep, radian),
          curve: true,
        })
        currentControlP = p1
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
  distance: number
): IVec2 {
  let l = Math.max(distance, 0)
  for (let i = 0; i < structs.length; i++) {
    const s = structs[i]
    if (l < s.length) {
      return s.lerpFn(l / s.length)
    } else {
      l -= s.length
    }
  }
  return structs[structs.length - 1].lerpFn(1)
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
    distance
  )
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
  let ret: IVec2[] = []
  parsePathSegments(dStr).forEach((seg) => {
    if (seg.command === 'Z' || seg.command === 'z') return

    if (seg.curve) {
      const list = geo.getApproPoints(seg.lerpFn, split)
      list.shift()
      ret = ret.concat(list)
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

/**
 * pathタグd属性文字列を分割する
 * @param dString pathのd要素文字列
 * @return コマンド単位の情報配列の配列
 */
export function splitD(dString: string): string[][] {
  // 全コマンドリスト(BbRr非対応)
  const allCommand = /M|m|L|l|H|h|V|v|C|c|S|s|Q|q|T|t|A|a|Z|z/g
  // 要素分割
  const strList = dString
    .replace(allCommand, ' $& ')
    .replace(/([^e])(-\d(\d*\.?)\d*)/g, '$1 $2 ')
    .split(/,| /)
    .filter((str) => str)
  // 直前のコマンド
  let pastCommand = 'M'

  const ret = []
  for (let i = 0; i < strList.length; ) {
    let info = []
    // コマンドがあるか？
    if (strList[i].match(allCommand)) {
      // あるので回収
      info[0] = strList[i].trim()
      pastCommand = info[0]
      // 進む
      i++
    } else {
      // 前回同様
      info[0] = pastCommand
    }

    // 情報数で場合分け
    if (info[0].match(/Z|z/)) {
      // 0つ
    } else if (info[0].match(/V|v|H|h/)) {
      // 1つ
      info = info.concat(strList.slice(i, i + 1))
      i += 1
    } else if (info[0].match(/M|m|L|l|T|t/)) {
      // 2つ
      info = info.concat(strList.slice(i, i + 2))
      i += 2
    } else if (info[0].match(/Q|q|S|s/)) {
      // 4つ
      info = info.concat(strList.slice(i, i + 4))
      i += 4
    } else if (info[0].match(/C|c/)) {
      // 6つ
      info = info.concat(strList.slice(i, i + 6))
      i += 6
    } else if (info[0].match(/A|a/)) {
      // 7つ
      info = info.concat(strList.slice(i, i + 7))
      i += 7
    } else {
      // 不適
      break
    }

    ret.push(info)
  }

  return ret
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
export function createStyle() {
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
export function serializeStyle(style: ISvgStyle) {
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
