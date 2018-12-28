import * as svg from '../src/svg'

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
