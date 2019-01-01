import * as geo from '../src/geo'
import * as svg from '../src/svg'
import { ISvgConfigs, ISvgPath, ISvgStyle, IVec2 } from '../types/index'

function parseSvg (svgString: string): Document {
  const domParser = new DOMParser()
  try {
    return domParser.parseFromString(svgString, 'image/svg+xml')
  } catch (e) {
    throw e
  }
}

function wrapSvg (svgContent: string): string {
  return ` <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="5 5 10 10" width="100" height="100">${svgContent}</svg> `
}

function parseSvgElement (elmString: string): SVGElement {
  const svgDom: SVGElement = parseSvg(wrapSvg(elmString)).childNodes[0] as SVGElement
  return svgDom.childNodes[0] as SVGElement
}

describe('fitRect 矩形内調整', () => {
  const style: ISvgStyle = {
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
  describe('拡大', () => {
    it('結果が正しいこと', () => {
      const pathInfoList: ISvgPath[] = [
        {
          d: [{ x: 0, y: 0 }, { x: 1, y: 2 }],
          style
        }
      ]
      const res = svg.fitRect(pathInfoList, 0, 0, 2, 4)
      expect(res.length).toBe(1)
      expect(res[0].d).toEqual([{ x: 0, y: 0 }, { x: 2, y: 4 }])
    })
  })
  describe('縮小', () => {
    it('結果が正しいこと', () => {
      const pathInfoList: ISvgPath[] = [
        {
          d: [{ x: 0, y: 0 }, { x: 2, y: 4 }],
          style
        }
      ]
      const res = svg.fitRect(pathInfoList, 0, 0, 1, 2)
      expect(res.length).toBe(1)
      expect(res[0].d).toEqual([{ x: 0, y: 0 }, { x: 1, y: 2 }])
    })
  })
  describe('中央揃え', () => {
    it('縦方向、結果が正しいこと', () => {
      const pathInfoList: ISvgPath[] = [
        {
          d: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
          style
        }
      ]
      const res = svg.fitRect(pathInfoList, 0, 0, 1, 2)
      expect(res.length).toBe(1)
      expect(res[0].d).toEqual([{ x: 0, y: 0.5 }, { x: 1, y: 1.5 }])
    })
    it('横方向、結果が正しいこと', () => {
      const pathInfoList: ISvgPath[] = [
        {
          d: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
          style
        }
      ]
      const res = svg.fitRect(pathInfoList, 0, 0, 2, 1)
      expect(res.length).toBe(1)
      expect(res[0].d).toEqual([{ x: 0.5, y: 0 }, { x: 1.5, y: 1 }])
    })
  })
})

describe('loadSvgGraphicsPath svg文字列解析', () => {
  it('結果が正しいこと', () => {
    const elmStr = '<path d="M 1,2 L 3,4 L 5,6 z" fill="red" />'
    const svgStr = wrapSvg(elmStr)
    const res = svg.parseSvgGraphicsStr(svgStr)
    expect(res.length).toBe(1)
    expect(res[0].d).toEqual([{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }])
    expect(res[0].style.fillStyle).toBe('red')
  })
})

describe('parseSvgGraphics svg解析', () => {
  describe('path解析', () => {
    it('結果が正しいこと', () => {
      const elmStr = '<path d="M 1,2 L 3,4 L 5,6 z" fill="red" />'
      const svgDom: SVGElement = parseSvg(wrapSvg(elmStr)).childNodes[0] as SVGElement
      const res = svg.parseSvgGraphics(svgDom)
      expect(res.length).toBe(1)
      expect(res[0].d).toEqual([{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }])
      expect(res[0].style.fillStyle).toBe('red')
    })
  })
  describe('rect解析', () => {
    it('結果が正しいこと', () => {
      const elmStr = '<rect x="1" y="2" width="3" height="4" fill="red" />'
      const svgDom: SVGElement = parseSvg(wrapSvg(elmStr)).childNodes[0] as SVGElement
      const res = svg.parseSvgGraphics(svgDom)
      expect(res.length).toBe(1)
      expect(res[0].d).toEqual([
        { x: 1, y: 2 },
        { x: 4, y: 2 },
        { x: 4, y: 6 },
        { x: 1, y: 6 }
      ])
      expect(res[0].style.fillStyle).toBe('red')
    })
  })
  describe('ellipse解析', () => {
    it('結果が正しいこと', () => {
      const elmStr = '<ellipse x="1" y="2" rx="1" ry="2" fill="red" />'
      const svgDom: SVGElement = parseSvg(wrapSvg(elmStr)).childNodes[0] as SVGElement
      const res = svg.parseSvgGraphics(svgDom)
      expect(res.length).toBe(1)
      expect(res[0].d.length).toBe(svg.configs.ellipseSplitSize + 1)
      expect(res[0].style.fillStyle).toBe('red')
    })
  })
  describe('circle解析', () => {
    it('結果が正しいこと', () => {
      const elmStr = '<circle x="1" y="2" r="1" fill="red" />'
      const svgDom: SVGElement = parseSvg(wrapSvg(elmStr)).childNodes[0] as SVGElement
      const res = svg.parseSvgGraphics(svgDom)
      expect(res.length).toBe(1)
      expect(res[0].d.length).toBe(svg.configs.ellipseSplitSize + 1)
      expect(res[0].style.fillStyle).toBe('red')
    })
  })
  describe('g考慮', () => {
    it('g内も取得されること', () => {
      const elmStr = '<g><circle x="1" y="2" r="1" fill="red" /></g>'
      const svgDom: SVGElement = parseSvg(wrapSvg(elmStr)).childNodes[0] as SVGElement
      const res = svg.parseSvgGraphics(svgDom)
      expect(res.length).toBe(1)
      expect(res[0].d.length).toBe(svg.configs.ellipseSplitSize + 1)
      expect(res[0].style.fillStyle).toBe('red')
    })
  })
})

describe('parsePath path解析', () => {
  describe('M L解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 L 3,4" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      expect(res.length).toBe(2)
      expect(res[0].x).toBeCloseTo(1)
      expect(res[0].y).toBeCloseTo(2)
      expect(res[1].x).toBeCloseTo(3)
      expect(res[1].y).toBeCloseTo(4)
    })
  })
  describe('m l解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="m 1,2 l 3,4" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      expect(res.length).toBe(2)
      expect(res[0].x).toBeCloseTo(1)
      expect(res[0].y).toBeCloseTo(2)
      expect(res[1].x).toBeCloseTo(4)
      expect(res[1].y).toBeCloseTo(6)
    })
  })
  describe('H解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 H 3" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      expect(res.length).toBe(2)
      expect(res[0].x).toBeCloseTo(1)
      expect(res[0].y).toBeCloseTo(2)
      expect(res[1].x).toBeCloseTo(3)
      expect(res[1].y).toBeCloseTo(2)
    })
  })
  describe('h解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 h 3" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      expect(res.length).toBe(2)
      expect(res[0].x).toBeCloseTo(1)
      expect(res[0].y).toBeCloseTo(2)
      expect(res[1].x).toBeCloseTo(4)
      expect(res[1].y).toBeCloseTo(2)
    })
  })
  describe('V解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 V 3" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      expect(res.length).toBe(2)
      expect(res[0].x).toBeCloseTo(1)
      expect(res[0].y).toBeCloseTo(2)
      expect(res[1].x).toBeCloseTo(1)
      expect(res[1].y).toBeCloseTo(3)
    })
  })
  describe('v解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 v 3" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      expect(res.length).toBe(2)
      expect(res[0].x).toBeCloseTo(1)
      expect(res[0].y).toBeCloseTo(2)
      expect(res[1].x).toBeCloseTo(1)
      expect(res[1].y).toBeCloseTo(5)
    })
  })
  describe('Q解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 Q 3,4 5,6" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      const pList = geo.approximateBezier(
        [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }],
        svg.configs.bezierSplitSize
      )
      expect(pList.length).toBe(res.length)
      pList.forEach((p, i) => {
        expect(p.x).toBeCloseTo(res[i].x)
        expect(p.y).toBeCloseTo(res[i].y)
      })
    })
  })
  describe('q解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 q 3,4 5,6" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      const pList = geo.approximateBezier(
        [{ x: 1, y: 2 }, { x: 4, y: 6 }, { x: 6, y: 8 }],
        svg.configs.bezierSplitSize
      )
      expect(pList.length).toBe(res.length)
      pList.forEach((p, i) => {
        expect(p.x).toBeCloseTo(res[i].x)
        expect(p.y).toBeCloseTo(res[i].y)
      })
    })
  })
  describe('T解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 T 3,4" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      const pList = geo.approximateBezier(
        [{ x: 1, y: 2 }, { x: -1, y: -2 }, { x: 3, y: 4 }],
        svg.configs.bezierSplitSize
      )
      expect(pList.length).toBe(res.length)
      pList.forEach((p, i) => {
        expect(p.x).toBeCloseTo(res[i].x)
        expect(p.y).toBeCloseTo(res[i].y)
      })
    })
  })
  describe('t解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 t 3,4" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      const pList = geo.approximateBezier(
        [{ x: 1, y: 2 }, { x: -1, y: -2 }, { x: 4, y: 6 }],
        svg.configs.bezierSplitSize
      )
      expect(pList.length).toBe(res.length)
      pList.forEach((p, i) => {
        expect(p.x).toBeCloseTo(res[i].x)
        expect(p.y).toBeCloseTo(res[i].y)
      })
    })
  })
  describe('C解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 C 3,4 5,6 7,8" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      const pList = geo.approximateBezier(
        [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }, { x: 7, y: 8 }],
        svg.configs.bezierSplitSize
      )
      expect(pList.length).toBe(res.length)
      pList.forEach((p, i) => {
        expect(p.x).toBeCloseTo(res[i].x)
        expect(p.y).toBeCloseTo(res[i].y)
      })
    })
  })
  describe('c解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 c 3,4 5,6 7,8" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      const pList = geo.approximateBezier(
        [{ x: 1, y: 2 }, { x: 4, y: 6 }, { x: 6, y: 8 }, { x: 8, y: 10 }],
        svg.configs.bezierSplitSize
      )
      expect(pList.length).toBe(res.length)
      pList.forEach((p, i) => {
        expect(p.x).toBeCloseTo(res[i].x)
        expect(p.y).toBeCloseTo(res[i].y)
      })
    })
  })
  describe('S解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 S 3,4 5,6" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      const pList = geo.approximateBezier(
        [{ x: 1, y: 2 }, { x: -1, y: -2 }, { x: 3, y: 4 }, { x: 5, y: 6 }],
        svg.configs.bezierSplitSize
      )
      expect(pList.length).toBe(res.length)
      pList.forEach((p, i) => {
        expect(p.x).toBeCloseTo(res[i].x)
        expect(p.y).toBeCloseTo(res[i].y)
      })
    })
  })
  describe('s解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 s 3,4 5,6" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      const pList = geo.approximateBezier(
        [{ x: 1, y: 2 }, { x: -1, y: -2 }, { x: 4, y: 6 }, { x: 6, y: 8 }],
        svg.configs.bezierSplitSize
      )
      expect(pList.length).toBe(res.length)
      pList.forEach((p, i) => {
        expect(p.x).toBeCloseTo(res[i].x)
        expect(p.y).toBeCloseTo(res[i].y)
      })
    })
  })
  describe('A解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 A 3 4 30 1 0 5,6" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      const pList = geo.approximateArcWithPoint(
        3, 4, { x: 1, y: 2 }, { x: 5, y: 6 }, true, false, 30 / 180 * Math.PI,
        svg.configs.bezierSplitSize
      )
      expect(pList.length).toBe(res.length)
      pList.forEach((p, i) => {
        expect(p.x).toBeCloseTo(res[i].x)
        expect(p.y).toBeCloseTo(res[i].y)
      })
    })
  })
  describe('a解析', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 a 3 4 30 1 0 5,6" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      const pList = geo.approximateArcWithPoint(
        3, 4, { x: 1, y: 2 }, { x: 6, y: 8 }, true, false, 30 / 180 * Math.PI,
        svg.configs.bezierSplitSize
      )
      expect(pList.length).toBe(res.length)
      pList.forEach((p, i) => {
        expect(p.x).toBeCloseTo(res[i].x)
        expect(p.y).toBeCloseTo(res[i].y)
      })
    })
  })
  describe('コマンド連続', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 L 3,4 l 1,2" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      expect(res.length).toBe(3)
      expect(res[0].x).toBeCloseTo(1)
      expect(res[0].y).toBeCloseTo(2)
      expect(res[1].x).toBeCloseTo(3)
      expect(res[1].y).toBeCloseTo(4)
      expect(res[2].x).toBeCloseTo(4)
      expect(res[2].y).toBeCloseTo(6)
    })
  })
  describe('d属性なし', () => {
    it('空配列が取得できること', () => {
      const str = '<path />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      expect(res.length).toBe(0)
    })
  })
  describe('変形あり', () => {
    it('結果が正しいこと', () => {
      const str = '<path d="M 1,2 L 3,4" transform="translate(1,2)" />'
      const elm = parseSvgElement(str) as SVGPathElement
      const res = svg.parsePath(elm)
      expect(res.length).toBe(2)
      expect(res[0].x).toBeCloseTo(2)
      expect(res[0].y).toBeCloseTo(4)
      expect(res[1].x).toBeCloseTo(4)
      expect(res[1].y).toBeCloseTo(6)
    })
  })
})

describe('parseRect rect解析', () => {
  it('結果が正しいこと', () => {
    const str = '<rect x="1" y="2" width="3" height="4" transform="translate(1,2)" />'
    const elm = parseSvgElement(str) as SVGRectElement
    const res = svg.parseRect(elm)
    expect(res.length).toBe(4)
    expect(res[0].x).toBeCloseTo(2)
    expect(res[0].y).toBeCloseTo(4)
    expect(res[1].x).toBeCloseTo(5)
    expect(res[1].y).toBeCloseTo(4)
    expect(res[2].x).toBeCloseTo(5)
    expect(res[2].y).toBeCloseTo(8)
    expect(res[3].x).toBeCloseTo(2)
    expect(res[3].y).toBeCloseTo(8)
  })
})

describe('parseEllipse ellipse解析', () => {
  it('結果が正しいこと', () => {
    const str = '<ellipse cx="1" cy="2" rx="3" ry="4" transform="translate(1,2)" />'
    const elm = parseSvgElement(str) as SVGEllipseElement
    const res = svg.parseEllipse(elm)
    expect(res.length).toBe(svg.configs.ellipseSplitSize + 1)
    expect(res[0].x).toBeCloseTo(5)
    expect(res[0].y).toBeCloseTo(4)
  })
})

describe('parseCircle circle解析', () => {
  it('結果が正しいこと', () => {
    const str = '<circle cx="1" cy="2" r="1" transform="translate(1,2)" />'
    const elm = parseSvgElement(str) as SVGCircleElement
    const res = svg.parseCircle(elm)
    expect(res.length).toBe(svg.configs.ellipseSplitSize + 1)
    expect(res[0].x).toBeCloseTo(3)
    expect(res[0].y).toBeCloseTo(4)
  })
})

describe('adoptTransform 変形実行', () => {
  const points: IVec2[] = [{ x: 1, y: 2 }]
  describe('matrix', () => {
    it('結果が正しいこと', () => {
      const str = 'matrix(1,2,3,4,5,6)'
      const res = svg.adoptTransform(str, points)
      expect(res.length).toBe(1)
      expect(res[0].x).toBeCloseTo(1 + 2 * 3 + 5)
      expect(res[0].y).toBeCloseTo(2 + 2 * 4 + 6)
    })
  })
  describe('translate', () => {
    it('結果が正しいこと', () => {
      const str = 'translate(1,2)'
      const res = svg.adoptTransform(str, points)
      expect(res.length).toBe(1)
      expect(res[0].x).toBeCloseTo(2)
      expect(res[0].y).toBeCloseTo(4)
    })
  })
  describe('scale', () => {
    it('x,y等倍の場合、結果が正しいこと', () => {
      const str = 'scale(2)'
      const res = svg.adoptTransform(str, points)
      expect(res.length).toBe(1)
      expect(res[0].x).toBeCloseTo(2)
      expect(res[0].y).toBeCloseTo(4)
    })
    it('x,y異なる倍率の場合、結果が正しいこと', () => {
      const str = 'scale(2, 3)'
      const res = svg.adoptTransform(str, points)
      expect(res.length).toBe(1)
      expect(res[0].x).toBeCloseTo(2)
      expect(res[0].y).toBeCloseTo(6)
    })
  })
  describe('rotate', () => {
    it('基準点省略の場合、結果が正しいこと', () => {
      const str = 'rotate(90)'
      const res = svg.adoptTransform(str, points)
      expect(res.length).toBe(1)
      expect(res[0].x).toBeCloseTo(-2)
      expect(res[0].y).toBeCloseTo(1)
    })
    it('基準点指定の場合、結果が正しいこと', () => {
      const str = 'rotate(90,1,1)'
      const res = svg.adoptTransform(str, points)
      expect(res.length).toBe(1)
      expect(res[0].x).toBeCloseTo(0)
      expect(res[0].y).toBeCloseTo(1)
    })
  })
  describe('skewx', () => {
    it('結果が正しいこと', () => {
      const str = 'skewx(45)'
      const res = svg.adoptTransform(str, points)
      expect(res.length).toBe(1)
      expect(res[0].x).toBeCloseTo(3)
      expect(res[0].y).toBeCloseTo(2)
    })
  })
  describe('skewy', () => {
    it('結果が正しいこと', () => {
      const str = 'skewy(45)'
      const res = svg.adoptTransform(str, points)
      expect(res.length).toBe(1)
      expect(res[0].x).toBeCloseTo(1)
      expect(res[0].y).toBeCloseTo(3)
    })
  })
  describe('重ねがけ変換', () => {
    it('結果が正しいこと', () => {
      const str = 'translate(1,2)skewy(45)'
      const res = svg.adoptTransform(str, points)
      expect(res.length).toBe(1)
      expect(res[0].x).toBeCloseTo(2)
      expect(res[0].y).toBeCloseTo(6)
    })
  })
  describe('変換なし', () => {
    it('結果が正しいこと', () => {
      const res = svg.adoptTransform(null, points)
      expect(res.length).toBe(1)
      expect(res[0].x).toBeCloseTo(1)
      expect(res[0].y).toBeCloseTo(2)
    })
  })
})

describe('splitD pathのd要素分解', () => {
  describe('Z zの分解', () => {
    it('結果が正しいこと', () => {
      const dString = 'Z z'
      const res = svg.splitD(dString)
      expect(res.length).toBe(2)
      expect(res[0]).toEqual(['Z'])
      expect(res[1]).toEqual(['z'])
    })
  })
  describe('V v H hの分解', () => {
    it('結果が正しいこと', () => {
      const dString = 'V 1 H 2 v 3 h 4'
      const res = svg.splitD(dString)
      expect(res.length).toBe(4)
      expect(res[0]).toEqual(['V', '1'])
      expect(res[1]).toEqual(['H', '2'])
      expect(res[2]).toEqual(['v', '3'])
      expect(res[3]).toEqual(['h', '4'])
    })
  })
  describe('M m L l T tの分解', () => {
    it('結果が正しいこと', () => {
      const dString = 'M 0,1 L 2,3 T 4,5 m 0,1 l 2,3 t 4,5'
      const res = svg.splitD(dString)
      expect(res.length).toBe(6)
      expect(res[0]).toEqual(['M', '0', '1'])
      expect(res[1]).toEqual(['L', '2', '3'])
      expect(res[2]).toEqual(['T', '4', '5'])
      expect(res[3]).toEqual(['m', '0', '1'])
      expect(res[4]).toEqual(['l', '2', '3'])
      expect(res[5]).toEqual(['t', '4', '5'])
    })
  })
  describe('Q q S sの分解', () => {
    it('結果が正しいこと', () => {
      const dString = 'Q 0,1 2,3 q 4,5 6,7 S 8,9 10,11 s 12,13 14,15'
      const res = svg.splitD(dString)
      expect(res.length).toBe(4)
      expect(res[0]).toEqual(['Q', '0', '1', '2', '3'])
      expect(res[1]).toEqual(['q', '4', '5', '6', '7'])
      expect(res[2]).toEqual(['S', '8', '9', '10', '11'])
      expect(res[3]).toEqual(['s', '12', '13', '14', '15'])
    })
  })
  describe('C cの分解', () => {
    it('結果が正しいこと', () => {
      const dString = 'C 0,1 2,3 4,5 c 6,7 8,9 10,11'
      const res = svg.splitD(dString)
      expect(res.length).toBe(2)
      expect(res[0]).toEqual(['C', '0', '1', '2', '3', '4', '5'])
      expect(res[1]).toEqual(['c', '6', '7', '8', '9', '10', '11'])
    })
  })
  describe('A aの分解', () => {
    it('結果が正しいこと', () => {
      const dString = 'A 0,1,2,3,4,5,6 a 7 8 9 10 11 12 13'
      const res = svg.splitD(dString)
      expect(res.length).toBe(2)
      expect(res[0]).toEqual(['A', '0', '1', '2', '3', '4', '5', '6'])
      expect(res[1]).toEqual(['a', '7', '8', '9', '10', '11', '12', '13'])
    })
  })
  describe('コマンド省略対応', () => {
    it('結果が正しいこと', () => {
      const dString = 'M 0,1 L 2,3 4,5'
      const res = svg.splitD(dString)
      expect(res.length).toBe(3)
      expect(res[0]).toEqual(['M', '0', '1'])
      expect(res[1]).toEqual(['L', '2', '3'])
      expect(res[2]).toEqual(['L', '4', '5'])
    })
  })
  describe('ホワイトスペース対応', () => {
    it('結果が正しいこと', () => {
      const dString = 'M 0,   1  L  2,3  '
      const res = svg.splitD(dString)
      expect(res.length).toBe(2)
      expect(res[0]).toEqual(['M', '0', '1'])
      expect(res[1]).toEqual(['L', '2', '3'])
    })
  })
  describe('コマンド前後のホワイトスペースなし', () => {
    it('結果が正しいこと', () => {
      const dString = 'M0,1L2,3  '
      const res = svg.splitD(dString)
      expect(res.length).toBe(2)
      expect(res[0]).toEqual(['M', '0', '1'])
      expect(res[1]).toEqual(['L', '2', '3'])
    })
  })
})

describe.skip('serializeSvgString svg文字列生成(XMLSerializerがテスト環境で未定義なためskip)', () => {
  it('結果が正しいこと', () => {
    const points: IVec2[] = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 }
    ]
    const style: ISvgStyle = {
      fill: true,
      fillGlobalAlpha: 1,
      fillStyle: 'red',
      lineCap: '',
      lineDash: [],
      lineJoin: '',
      lineWidth: 1,
      stroke: false,
      strokeGlobalAlpha: 1,
      strokeStyle: ''
    }
    const svgStr: string = svg.serializeSvgString([{ d: points, style }])
    expect(svgStr).toEqual(expect.stringContaining('<svg'))
    expect(svgStr).toEqual(expect.stringContaining('</svg>'))
  })
})

describe('serializeSvg svgタグ生成', () => {
  it('結果が正しいこと', () => {
    const points: IVec2[] = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 }
    ]
    const style: ISvgStyle = {
      fill: true,
      fillGlobalAlpha: 1,
      fillStyle: 'red',
      lineCap: '',
      lineDash: [],
      lineJoin: '',
      lineWidth: 1,
      stroke: false,
      strokeGlobalAlpha: 1,
      strokeStyle: ''
    }
    const svgElm = svg.serializeSvg([{ d: points, style }])
    const widthStr = svgElm.getAttribute('width')
    const heightStr = svgElm.getAttribute('height')
    expect(widthStr).not.toBeNull()
    expect(heightStr).not.toBeNull()
    expect(parseFloat(widthStr || '0')).toBeCloseTo(2.2)
    expect(parseFloat(heightStr || '0')).toBeCloseTo(2.2)
    const elm = svgElm.childNodes[0] as SVGPathElement
    expect(elm.getAttribute('d')).toBe('M 1,1 L 2,1 L 1,2 Z')
    expect(elm.getAttribute('style')).toEqual(expect.stringContaining('fill:red;'))
  })
})

describe('serializePath pathタグ生成', () => {
  it('結果が正しいこと', () => {
    const points: IVec2[] = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 }
    ]
    const style: ISvgStyle = {
      fill: true,
      fillGlobalAlpha: 1,
      fillStyle: 'red',
      lineCap: '',
      lineDash: [],
      lineJoin: '',
      lineWidth: 1,
      stroke: false,
      strokeGlobalAlpha: 1,
      strokeStyle: ''
    }
    const elm = svg.serializePath(points, style)
    expect(elm.getAttribute('d')).toBe('M 1,1 L 2,1 L 1,2 Z')
    expect(elm.getAttribute('style')).toEqual(expect.stringContaining('fill:red;'))
  })
})

describe('serializePointList d属性へのシリアライス', () => {
  it('結果が正しいこと', () => {
    const points: IVec2[] = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 }
    ]
    expect(svg.serializePointList(points)).toBe('M 1,1 L 2,1 L 1,2 Z')
  })
})

describe('parseTagStyle スタイル取得', () => {
  describe('属性から取得', () => {
    describe('fillなし', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path fill="none" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.fill).toBe(false)
      })
    })
    describe('fillあり', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path fill="red" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.fill).toBe(true)
        expect(style.fillStyle).toBe('red')
      })
    })
    describe('strokeなし', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path stroke="none" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.stroke).toBe(false)
      })
    })
    describe('strokeあり', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path stroke="red" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.stroke).toBe(true)
        expect(style.strokeStyle).toBe('red')
      })
    })
    describe('stroke-width', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path stroke-width="2" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.lineWidth).toBe(2)
      })
    })
    describe('stroke-opacity', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path stroke-opacity="0.5" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.strokeGlobalAlpha).toBe(0.5)
      })
    })
    describe('fill-opacity', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path fill-opacity="0.5" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.fillGlobalAlpha).toBe(0.5)
      })
    })
    describe('stroke-linecap', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path stroke-linecap="abc" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.lineCap).toBe('abc')
      })
    })
    describe('stroke-linejoin', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path stroke-linejoin="abc" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.lineJoin).toBe('abc')
      })
    })
    describe('stroke-dasharray', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path stroke-dasharray="1,2,3" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.lineDash).toEqual([1, 2, 3])
      })
    })
    describe('不明属性', () => {
      it('エラーにならないこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path unknown-attr="1,2,3" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.fill).toBe(false)
      })
    })
  })
  describe('style属性から取得', () => {
    describe('fillなし', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="fill: none;" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.fill).toBe(false)
      })
      it('セミコロン省略可能であること', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="fill: none" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.fill).toBe(false)
      })
    })
    describe('fillあり', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="fill: red" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.fill).toBe(true)
        expect(style.fillStyle).toBe('red')
      })
    })
    describe('strokeなし', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="stroke: none" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.stroke).toBe(false)
      })
    })
    describe('strokeあり', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="stroke: red" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.stroke).toBe(true)
        expect(style.strokeStyle).toBe('red')
      })
    })
    describe('stroke-width', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="stroke-width: 2" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.lineWidth).toBe(2)
      })
    })
    describe('stroke-opacity', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="stroke-opacity: 0.5" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.strokeGlobalAlpha).toBe(0.5)
      })
    })
    describe('fill-opacity', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="fill-opacity: 0.5" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.fillGlobalAlpha).toBe(0.5)
      })
    })
    describe('stroke-linecap', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="stroke-linecap: abc" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.lineCap).toBe('abc')
      })
    })
    describe('stroke-linejoin', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="stroke-linejoin: abc" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.lineJoin).toBe('abc')
      })
    })
    describe('stroke-dasharray', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="stroke-dasharray: 1,2,3" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.lineDash).toEqual([1, 2, 3])
      })
    })
    describe('複数指定', () => {
      it('結果が正しいこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="fill: red; stroke-dasharray: 1,2,3" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.fillStyle).toBe('red')
        expect(style.lineDash).toEqual([1, 2, 3])
      })
    })
    describe('不明属性', () => {
      it('エラーにならないこと', () => {
        const pathDom: SVGElement = parseSvgElement('<path style="unknown-attr: 1,2,3" />')
        const style: ISvgStyle = svg.parseTagStyle(pathDom)
        expect(style.fill).toBe(false)
      })
    })
  })
})

describe('serializeStyle', () => {
  const style: ISvgStyle = {
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
  describe('fillなし', () => {
    it('正しく取得できること', () => {
      const str = svg.serializeStyle({ ...style, fill: false })
      expect(str).toEqual(expect.stringContaining('fill:none;'))
    })
  })
  describe('fillあり', () => {
    it('正しく取得できること', () => {
      const str = svg.serializeStyle({ ...style, fill: true, fillStyle: 'red' })
      expect(str).toEqual(expect.stringContaining('fill:red;'))
    })
  })
  describe('strokeなし', () => {
    it('正しく取得できること', () => {
      const str = svg.serializeStyle({ ...style, stroke: false })
      expect(str).toEqual(expect.stringContaining('stroke:none;'))
    })
  })
  describe('strokeあり', () => {
    it('正しく取得できること', () => {
      const str = svg.serializeStyle({ ...style, stroke: true, strokeStyle: 'red' })
      expect(str).toEqual(expect.stringContaining('stroke:red;'))
    })
  })
  describe('fill-opacity', () => {
    it('正しく取得できること', () => {
      const str = svg.serializeStyle({ ...style, fillGlobalAlpha: 0.5 })
      expect(str).toEqual(expect.stringContaining('fill-opacity:0.5;'))
    })
  })
  describe('stroke-width', () => {
    it('正しく取得できること', () => {
      const str = svg.serializeStyle({ ...style, lineWidth: 2 })
      expect(str).toEqual(expect.stringContaining('stroke-width:2;'))
    })
  })
  describe('stroke-opacity', () => {
    it('正しく取得できること', () => {
      const str = svg.serializeStyle({ ...style, strokeGlobalAlpha: 0.5 })
      expect(str).toEqual(expect.stringContaining('stroke-opacity:0.5;'))
    })
  })
  describe('stroke-linecap', () => {
    it('正しく取得できること', () => {
      const str = svg.serializeStyle({ ...style, lineCap: 'abc' })
      expect(str).toEqual(expect.stringContaining('stroke-linecap:abc;'))
    })
  })
  describe('stroke-linejoin', () => {
    it('正しく取得できること', () => {
      const str = svg.serializeStyle({ ...style, lineJoin: 'abc' })
      expect(str).toEqual(expect.stringContaining('stroke-linejoin:abc;'))
    })
  })
  describe('stroke-dasharray', () => {
    it('正しく取得できること', () => {
      const str = svg.serializeStyle({ ...style, lineDash: [1, 2, 3] })
      expect(str).toEqual(expect.stringContaining('stroke-dasharray:1,2,3;'))
    })
  })
})
