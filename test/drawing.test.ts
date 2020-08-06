import * as drawing from '../src/drawing'

describe('resizeByLeft', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  describe('widthが正になる場合', () => {
    it('xの変化に合わせてwidthが変動', () => {
      expect(drawing.resizeRectByLeft(rec, 3)).toEqual({
        ...rec,
        x: 4,
        width: 7,
      })
      expect(drawing.resizeRectByLeft(rec, 10)).toEqual({
        ...rec,
        x: 11,
        width: 0,
      })
    })
  })
  describe('widthが負になる場合', () => {
    it('widthが正になるよう形を保つ', () => {
      expect(drawing.resizeRectByLeft(rec, 11)).toEqual({
        ...rec,
        x: 11,
        width: 1,
      })
    })
  })
})

describe('resizeByRight', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  describe('widthが正になる場合', () => {
    it('widthが変動', () => {
      expect(drawing.resizeRectByRight(rec, 3)).toEqual({ ...rec, width: 13 })
      expect(drawing.resizeRectByRight(rec, -3)).toEqual({ ...rec, width: 7 })
    })
  })
  describe('widthが負になる場合', () => {
    it('widthが正になるよう形を保つ', () => {
      expect(drawing.resizeRectByRight(rec, -11)).toEqual({
        ...rec,
        x: 0,
        width: 1,
      })
    })
  })
})

describe('resizeByTop', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  describe('heightが正になる場合', () => {
    it('yの変化に合わせてheightが変動', () => {
      expect(drawing.resizeRectByTop(rec, 3)).toEqual({
        ...rec,
        y: 5,
        height: 17,
      })
      expect(drawing.resizeRectByTop(rec, 20)).toEqual({
        ...rec,
        y: 22,
        height: 0,
      })
    })
  })
  describe('heightが負になる場合', () => {
    it('heightが正になるよう形を保つ', () => {
      expect(drawing.resizeRectByTop(rec, 21)).toEqual({
        ...rec,
        y: 22,
        height: 1,
      })
    })
  })
})

describe('resizeByBottom', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  describe('heightが正になる場合', () => {
    it('heightが変動', () => {
      expect(drawing.resizeRectByBottom(rec, 3)).toEqual({ ...rec, height: 23 })
      expect(drawing.resizeRectByBottom(rec, -20)).toEqual({
        ...rec,
        height: 0,
      })
    })
  })
  describe('heightが負になる場合', () => {
    it('heightが正になるよう形を保つ', () => {
      expect(drawing.resizeRectByBottom(rec, -21)).toEqual({
        ...rec,
        y: 1,
        height: 1,
      })
    })
  })
})

describe('resizeByLeftTop', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  describe('アスペクト比維持なし', () => {
    it('左上頂点からリサイズ', () => {
      expect(drawing.resizeRectByLeftTop(rec, { x: 3, y: 4 })).toEqual({
        ...rec,
        x: 4,
        width: 7,
        y: 6,
        height: 16,
      })
      expect(drawing.resizeRectByLeftTop(rec, { x: 11, y: 21 })).toEqual({
        ...rec,
        x: 11,
        width: 1,
        y: 22,
        height: 1,
      })
    })
  })
  describe('アスペクト比維持あり', () => {
    const rec = { x: 0, y: 0, width: 10, height: 20 }
    it('左下頂点からリサイズ', () => {
      expect(drawing.resizeRectByLeftTop(rec, { x: -10, y: 0 }, true)).toEqual({
        ...rec,
        x: -2,
        y: -4,
        width: 12,
        height: 24,
      })
    })
  })
})

describe('resizeByRightTop', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  describe('アスペクト比維持なし', () => {
    it('右上頂点からリサイズ', () => {
      expect(drawing.resizeRectByRightTop(rec, { x: 3, y: -4 })).toEqual({
        ...rec,
        width: 13,
        y: -2,
        height: 24,
      })
      expect(drawing.resizeRectByRightTop(rec, { x: -11, y: 21 })).toEqual({
        ...rec,
        x: 0,
        width: 1,
        y: 22,
        height: 1,
      })
    })
  })
  describe('アスペクト比維持あり', () => {
    const rec = { x: 0, y: 0, width: 10, height: 20 }
    it('左下頂点からリサイズ', () => {
      expect(drawing.resizeRectByRightTop(rec, { x: -10, y: 0 }, true)).toEqual(
        {
          ...rec,
          y: 4,
          width: 8,
          height: 16,
        }
      )
    })
  })
})

describe('resizeByRightBottom', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  describe('アスペクト比維持なし', () => {
    it('右下頂点からリサイズ', () => {
      expect(drawing.resizeRectByRightBottom(rec, { x: 3, y: 4 })).toEqual({
        ...rec,
        width: 13,
        height: 24,
      })
      expect(drawing.resizeRectByRightBottom(rec, { x: -11, y: -21 })).toEqual({
        ...rec,
        x: 0,
        width: 1,
        y: 1,
        height: 1,
      })
    })
  })
  describe('アスペクト比維持あり', () => {
    const rec = { x: 0, y: 0, width: 10, height: 20 }
    it('左下頂点からリサイズ', () => {
      expect(
        drawing.resizeRectByRightBottom(rec, { x: -10, y: 0 }, true)
      ).toEqual({
        ...rec,
        x: 0,
        width: 8,
        height: 16,
      })
    })
  })
})

describe('resizeByLeftBottom', () => {
  describe('アスペクト比維持なし', () => {
    const rec = { x: 1, y: 2, width: 10, height: 20 }
    it('左下頂点からリサイズ', () => {
      expect(drawing.resizeRectByLeftBottom(rec, { x: -3, y: 4 })).toEqual({
        ...rec,
        x: -2,
        width: 13,
        height: 24,
      })
      expect(drawing.resizeRectByLeftBottom(rec, { x: 11, y: -21 })).toEqual({
        ...rec,
        x: 11,
        width: 1,
        y: 1,
        height: 1,
      })
    })
  })
  describe('アスペクト比維持あり', () => {
    const rec = { x: 0, y: 0, width: 10, height: 20 }
    it('左下頂点からリサイズ', () => {
      expect(
        drawing.resizeRectByLeftBottom(rec, { x: -10, y: 0 }, true)
      ).toEqual({
        ...rec,
        x: -2,
        width: 12,
        height: 24,
      })
    })
  })
})
