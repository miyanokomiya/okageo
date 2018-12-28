export const configs: ISvgConfigs = {
  bezierSplitSize: 10,
  ellipseSplitSize: 20
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
