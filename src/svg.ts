import * as geo from './geo'

export const configs: ISvgConfigs = {
  bezierSplitSize: 10,
  ellipseSplitSize: 20
}

/**
 * SVG文字列から図形のパス情報を取得する
 * 対応タグ: path,rect,ellipse,circle
 * @param svgString SVGリソース文字列
 * @return パス情報リスト
 */
export function parseSvgGraphicsStr (svgString: string): ISvgPath[] {
  const domParser = new DOMParser()
  const svgDom = domParser.parseFromString(svgString, 'image/svg+xml')
  return parseSvgGraphics(svgDom.childNodes[0] as SVGElement)
}

/**
 * SVGタグから図形のパス情報を取得する
 * 対応タグ: path,rect,ellipse,circle
 * @param svgTag SVGタグ
 * @return パス情報リスト
 */
export function parseSvgGraphics (svgTag: SVGElement): ISvgPath[] {
  const ret: ISvgPath[] = []

  // パス
  const tagPathList = svgTag.getElementsByTagName('path')
  for (let i = 0; i < tagPathList.length; i++) {
    const elm = tagPathList[i] as SVGPathElement
    ret.push({
      d: parsePath(elm),
      style:  parseTagStyle(elm)
    })
  }

  // 矩形
  const tagRectList = svgTag.getElementsByTagName('rect')
  for (let i = 0; i < tagRectList.length; i++) {
    const elm = tagRectList[i] as SVGRectElement
    ret.push({
      d : parseRect(elm),
      style : parseTagStyle(elm)
    })
  }

  // 楕円
  const tagEllipseList = svgTag.getElementsByTagName('ellipse')
  for (let i = 0; i < tagEllipseList.length; i++) {
    const elm = tagEllipseList[i] as SVGEllipseElement
    ret.push({
      d : parseEllipse(elm),
      style : parseTagStyle(elm)
    })
  }

  // 円
  const tagCircleList = svgTag.getElementsByTagName('circle')
  for (let i = 0; i < tagCircleList.length; i++) {
    const elm = tagCircleList[i] as SVGCircleElement
    ret.push({
      d : parseCircle(elm),
      style : parseTagStyle(elm)
    })
  }

  // gタグ→「getElementsByTagName」は子孫全検索なので再帰必要なし

  return ret
}

/**
 * pathタグを解析する
 * @param svgPath SVGのpathタグDOM
 * @return 座標リスト
 */
export function parsePath (svgPath: SVGPathElement): IVec2[] {
  let ret: IVec2[] = []

  const dStr = svgPath.getAttribute('d')
  if (!dStr) return []

  // d属性分解
  const elementList: string[][] = splitD(dStr)

  // 前回座標
  let pastVec: IVec2 = { x: 0, y: 0 }
  // 前回制御点
  let pastControlVec: IVec2 = { x: 0,y: 0 }
  elementList.forEach((current) => {
    let pList: IVec2[] = []

    let b0: IVec2 | null = null
    let b1: IVec2 | null = null
    let b2: IVec2 | null = null
    let b3: IVec2 | null = null

    switch (current[0]) {
      case 'M':
      case 'L':
        // 直線(絶対)
        pList.push({ x: parseFloat(current[1]), y: parseFloat(current[2]) })
        break
      case 'm':
      case 'l':
        // 直線(相対)
        pList.push({ x: pastVec.x + parseFloat(current[1]), y: pastVec.y + parseFloat(current[2]) })
        break
      case 'H':
        // 水平(絶対)
        pList.push({ x: parseFloat(current[1]), y: pastVec.y })
        break
      case 'V':
        // 垂直(絶対)
        pList.push({ x: pastVec.x, y: parseFloat(current[1]) })
        break
      case 'h':
        // 垂直(相対)
        pList.push({ x: pastVec.x + parseFloat(current[1]), y: pastVec.y })
        break
      case 'v':
        // 垂直(相対)
        pList.push({ x: pastVec.x, y: pastVec.y + parseFloat(current[1]) })
        break
      case 'Q' :
        // 制御点準備
        b0 = pastVec
        b1 = {
          x: parseFloat(current[1]),
          y: parseFloat(current[2])
        }
        b2 = {
          x: parseFloat(current[3]),
          y: parseFloat(current[4])
        }
        // 近似
        pList = geo.approximateBezier([b0, b1, b2], configs.bezierSplitSize)
        // 始点は前回点なので除去
        pList.shift()
        break
      case 'q' :
        // 制御点準備
        b0 = pastVec
        b1 = {
          x : b0.x + parseFloat(current[1]),
          y : b0.y + parseFloat(current[2])
        }
        b2 = {
          x : b0.x + parseFloat(current[3]),
          y : b0.y + parseFloat(current[4])
        }
        // 近似
        pList = geo.approximateBezier([b0, b1, b2], configs.bezierSplitSize)
        // 始点は前回点なので除去
        pList.shift()
        break
      case 'T' :
        // 制御点準備
        b0 = pastVec
        b1 = geo.getSymmetry(b0, pastControlVec)
        b2 = {
          x : parseFloat(current[1]),
          y : parseFloat(current[2])
        }
        // 近似
        pList = geo.approximateBezier([b0, b1, b2], configs.bezierSplitSize)
        // 始点は前回点なので除去
        pList.shift()
        break
      case 't' :
        // 制御点準備
        b0 = pastVec
        b1 = geo.getSymmetry(b0, pastControlVec)
        b2 = {
          x : b0.x + parseFloat(current[1]),
          y : b0.y + parseFloat(current[2])
        }
        // 近似
        pList = geo.approximateBezier([b0, b1, b2], configs.bezierSplitSize)
        // 始点は前回点なので除去
        pList.shift()
        break
      case 'C' :
        // 制御点準備
        b0 = pastVec
        b1 = {
          x : parseFloat(current[1]),
          y : parseFloat(current[2])
        }
        b2 = {
          x : parseFloat(current[3]),
          y : parseFloat(current[4])
        }
        b3 = {
          x : parseFloat(current[5]),
          y : parseFloat(current[6])
        }
        // 近似
        pList = geo.approximateBezier([b0, b1, b2, b3], configs.bezierSplitSize)
        // 始点は前回点なので除去
        pList.shift()
        break
      case 'c' :
        // 制御点準備
        b0 = pastVec
        b1 = {
          x : b0.x + parseFloat(current[1]),
          y : b0.y + parseFloat(current[2])
        }
        b2 = {
          x : b0.x + parseFloat(current[3]),
          y : b0.y + parseFloat(current[4])
        }
        b3 = {
          x : b0.x + parseFloat(current[5]),
          y : b0.y + parseFloat(current[6])
        }
        // 近似
        pList = geo.approximateBezier([b0, b1, b2, b3], configs.bezierSplitSize)
        // 始点は前回点なので除去
        pList.shift()
        break
      case 'S' :
        // 制御点準備
        b0 = pastVec
        b1 = geo.getSymmetry(b0, pastControlVec)
        b2 = {
          x : parseFloat(current[1]),
          y : parseFloat(current[2])
        }
        b3 = {
          x : parseFloat(current[3]),
          y : parseFloat(current[4])
        }
        // 近似
        pList = geo.approximateBezier([b0, b1, b2, b3], configs.bezierSplitSize)
        // 始点は前回点なので除去
        pList.shift()
        break
      case 's' :
        // 制御点準備
        b0 = pastVec
        b1 = geo.getSymmetry(b0, pastControlVec)
        b2 = {
          x : b0.x + parseFloat(current[1]),
          y : b0.y + parseFloat(current[2])
        }
        b3 = {
          x : b0.x + parseFloat(current[3]),
          y : b0.y + parseFloat(current[4])
        }
        // 近似
        pList = geo.approximateBezier([b0, b1, b2, b3], configs.bezierSplitSize)
        // 始点は前回点なので除去
        pList.shift()
        break
      case 'A':
        b0 = pastVec
        b1 = {
          x : parseFloat(current[6]),
          y : parseFloat(current[7])
        }

        pList = geo.approximateArcWithPoint(
          parseFloat(current[1]),
          parseFloat(current[2]),
          b0,
          b1,
          !!parseInt(current[4], 10),
          !!parseInt(current[5], 10),
          parseFloat(current[3]) / 180 * Math.PI,
          configs.bezierSplitSize
        )
        // 始点は前回点なので除去
        pList.shift()
        break
      case 'a':
        b0 = pastVec
        b1 = {
          x : b0.x + parseFloat(current[6]),
          y : b0.y + parseFloat(current[7])
        }

        pList = geo.approximateArcWithPoint(
          parseFloat(current[1]),
          parseFloat(current[2]),
          b0,
          b1,
          !!parseInt(current[4], 10),
          !!parseInt(current[5], 10),
          parseFloat(current[3]) / 180 * Math.PI,
          configs.bezierSplitSize
        )
        // 始点は前回点なので除去
        pList.shift()
        break
    }

    if (pList.length > 0) {
      pastVec = pList[pList.length - 1]
      ret = ret.concat(pList)

      if (pList.length > 1) {
        // 前回制御点記録
        pastControlVec = pList[pList.length - 2]
      }
    }
  })

  // トランスフォーム
  ret = adoptTransform(svgPath.getAttribute('transform'), ret)

  return ret
}

/**
 * rectタグを解析する
 * @param SVGのrectタグDOM
 * @return 座標リスト
 */
export function parseRect (svgRect: SVGRectElement): IVec2[] {
  let ret = []

  const x = parseFloat(svgRect.getAttribute('x') || '0')
  const y = parseFloat(svgRect.getAttribute('y') || '0')
  const width = parseFloat(svgRect.getAttribute('width') || '0')
  const height = parseFloat(svgRect.getAttribute('height') || '0')

  ret.push({ x, y })
  ret.push({ x : x + width, y })
  ret.push({ x : x + width, y : y + height })
  ret.push({ x, y : y + height })

  // トランスフォーム
  ret = adoptTransform(svgRect.getAttribute('transform'), ret)

  return ret
}

/**
 * ellipseタグを解析する
 * @param svgEllipse SVGのellipseタグDOM
 * @return 座標リスト
 */
export function parseEllipse (svgEllipse: SVGEllipseElement): IVec2[] {
  let ret = []

  const cx = parseFloat(svgEllipse.getAttribute('cx') || '0')
  const cy = parseFloat(svgEllipse.getAttribute('cy') || '0')
  const rx = parseFloat(svgEllipse.getAttribute('rx') || '1')
  const ry = parseFloat(svgEllipse.getAttribute('ry') || '1')

  ret = geo.approximateArc(
    rx, ry,
    0, Math.PI * 2,
    { x: cx,y: cy },
    0, configs.ellipseSplitSize
  )

  // トランスフォーム
  ret = adoptTransform(svgEllipse.getAttribute('transform'), ret)
  return ret
}

/**
 * circleタグを解析する
 * @param svgCircle  SVGのcircleタグDOM
 * @return 座標リスト
 */
export function parseCircle (svgCircle: SVGCircleElement): IVec2[] {
  let ret = []
  const cx = parseFloat(svgCircle.getAttribute('cx') || '0')
  const cy = parseFloat(svgCircle.getAttribute('cy') || '0')
  const r = parseFloat(svgCircle.getAttribute('r') || '1')

  // 近似方法は楕円と同様
  ret = geo.approximateArc(
    r, r,
    0, Math.PI * 2,
    { x: cx,y: cy },
    0, configs.ellipseSplitSize
  )

  // トランスフォーム
  ret = adoptTransform(svgCircle.getAttribute('transform'), ret)
  return ret
}

/**
 * transformを行う
 * @param commandStr コマンド文字列
 * @param points 変換前座標リスト
 * @return 変形後座標リスト
 */
export function adoptTransform (commandStr: string | null, points: IVec2[]): IVec2[] {
  if (!commandStr) return points

  let ret: IVec2[] = geo.cloneVectors(points)
  // 複数コマンドの場合もあるのでループ
  const commandList = commandStr.split(/\)/)
  commandList.forEach((current) => {
    const tmp = current.split(/\(/)
    if (tmp.length === 2) {
      const command = tmp[0]
      const params: number[] = []
      tmp[1].split(/,/).forEach((str) => params.push(parseFloat(str)))

      switch (command.trim().toLowerCase()) {
        case 'matrix':
          ret = geo.transform(ret, params)
          break
        case 'translate':
          ret = ret.map((p) => ({
            x: p.x + params[0],
            y: p.y + params[1]
          }))
          break
        case 'scale':
          const scaleX = params[0]
          // XY等倍の場合を考慮
          let scaleY = params[0]
          if (params.length > 1) {
            scaleY = params[1]
          }
          ret = ret.map((p) => ({
            x: p.x * scaleX,
            y: p.y * scaleY
          }))
          break
        case 'rotate':
        // 回転基準点
          let base: IVec2 = { x: 0, y: 0 }
          if (params.length > 2) {
            base = { x : params[1], y : params[2] }
          }
          ret = ret.map((p) => geo.rotate(p, params[0] * Math.PI / 180, base))
          break
        case 'skewx':
          ret = ret.map((p) => ({
            x: p.x + Math.tan(params[0] * Math.PI / 180) * p.y,
            y: p.y
          }))
          break
        case 'skewy':
          ret = ret.map((p) => ({
            x: p.x,
            y: p.y + Math.tan(params[0] * Math.PI / 180) * p.x
          }))
          break
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
export function splitD (dString: string): string[][] {
  // 全コマンドリスト(BbRr非対応)
  const allCommand = /M|m|L|l|H|h|V|v|C|c|S|s|Q|q|T|t|A|a|Z|z/
  // 要素分割
  const strList = dString.trim().split(/,| /).filter((str) => str)
  // 直前のコマンド
  let pastCommand = 'M'

  const ret = []
  for (let i = 0; i < strList.length;) {
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
export function serializeSvgString (pathList: ISvgPath[]): string {
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
export function serializeSvg (pathList: ISvgPath[]): SVGElement {
  const dom = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

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
export function serializePath (pointList: IVec2[], style: ISvgStyle): SVGPathElement {
  const dom = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  dom.setAttribute('d', serializePointList(pointList))
  dom.setAttribute('style', serializeStyle(style))
  return dom
}

/**
 * 座標リストをd属性文字列に変換する
 * @param pointList 座標リスト
 * @return d属性文字列
 */
export function serializePointList (pointList: IVec2[]): string {
  let ret = ''

  pointList.forEach((p, i) => {
    if (i === 0) {
      ret += 'M ' + p.x + ',' + p.y
    } else {
      ret += ' L ' + p.x + ',' + p.y
      if (i === pointList.length - 1) {
        ret += ' Z'
      }
    }
  })

  return ret
}

/**
 * pathタグのスタイルを取得する
 * @param svgPath SVGのpathタグDOM
 * @return スタイルオブジェクト
 */
export function parseTagStyle (svgPath: SVGElement): ISvgStyle {
  const ret: ISvgStyle = {
    fill: false,
    fillGlobalAlpha: 1,
    fillStyle: '',
    lineCap: '',
    lineDash: [],
    lineJoin: '',
    lineWidth: 1,
    stroke: false,
    strokeGlobalAlpha: 1,
    strokeStyle: ''
  }

  // スタイル候補要素リスト
  const styleObject: any = {}

  const styleAttr = svgPath.getAttributeNode('style')
  if (!styleAttr) {
    // 要素から直接取得
    svgPath.getAttributeNames().forEach((name) => {
      const attr = svgPath.getAttributeNode(name)
      if (!attr) return
      styleObject[attr.name] = attr.value
    })
  } else {
    // style要素から取得
    const styleStr = styleAttr.value
    styleStr.split(';').forEach((elem: string) => {
      const splited = elem.split(':')
      if (splited.length !== 2) return
      styleObject[splited[0].trim()] = splited[1].trim()
    })
  }

  Object.keys(styleObject).forEach((key) => {
    key = key.toLowerCase()
    const val = styleObject[key]

    if (key === 'fill') {
      if (val === 'none') {
        ret.fillStyle = ''
        ret.fill = false
      } else {
        ret.fillStyle = val
        ret.fill = true
      }
    } else if (key === 'stroke') {
      if (val === 'none') {
        ret.strokeStyle = ''
        ret.stroke = false
      } else {
        ret.strokeStyle = val
        ret.stroke = true
      }
    } else if (key === 'stroke-width') {
      ret.lineWidth = parseFloat(val)
    } else if (key === 'stroke-opacity') {
      ret.strokeGlobalAlpha = parseFloat(val)
    } else if (key === 'fill-opacity') {
      ret.fillGlobalAlpha = parseFloat(val)
    } else if (key === 'stroke-linecap') {
      ret.lineCap = val
    } else if (key === 'stroke-linejoin') {
      ret.lineJoin = val
    } else if (key === 'stroke-dasharray') {
      if (val.toLowerCase() === 'none') {
        ret.lineDash = []
      } else {
        const strArray = val.split(',')
        ret.lineDash = []
        strArray.forEach((str: string) => {
          ret.lineDash.push(parseFloat(str))
        })
      }
    } else {
      // 無視
    }
  })

  return ret
}

/**
 * スタイル情報をstyle属性文字列に変換する
 * @method serializeStyle
 * @param style スタイル情報
 * @return style属性文字列
 */
export function serializeStyle (style: ISvgStyle) {
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
