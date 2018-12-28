import * as geo from './geo'

export const configs: ISvgConfigs = {
  bezierSplitSize: 10,
  ellipseSplitSize: 20
}

/**
 * transformを行う
 * @param commandStr コマンド文字列
 * @param points 変換前座標リスト
 * @return 変形後座標リスト
 */
export function adoptTransform (commandStr: string, points: IVec2[]): IVec2[] {
  let ret: IVec2[] = geo.cloneVectors(points)

  // transformタグない場合もある
  // const transformAttr = svgTag.getAttributeNode('transform')
  // if (!transformAttr) return ret

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
      // 2つ
      info = info.concat(strList.slice(i, i + 2))
      i += 2
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
