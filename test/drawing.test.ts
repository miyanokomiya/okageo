import * as drawing from '../src/drawing'

describe('resizeByLeft', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  describe('widthが正になる場合', () => {
    it('xの変化に合わせてwidthが変動', () => {
      expect(drawing.resizeByLeft(rec, 3)).toEqual({ x: 4, width: 7 })
      expect(drawing.resizeByLeft(rec, 10)).toEqual({ x: 11, width: 0 })
    })
  })
  describe('widthが負になる場合', () => {
    it('widthが正になるよう形を保つ', () => {
      expect(drawing.resizeByLeft(rec, 11)).toEqual({ x: 11, width: 1 })
    })
  })
})

describe('resizeByRight', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  describe('widthが正になる場合', () => {
    it('widthが変動', () => {
      expect(drawing.resizeByRight(rec, 3)).toEqual({ width: 13 })
      expect(drawing.resizeByRight(rec, -3)).toEqual({ width: 7 })
    })
  })
  describe('widthが負になる場合', () => {
    it('widthが正になるよう形を保つ', () => {
      expect(drawing.resizeByRight(rec, -11)).toEqual({ x: 0, width: 1 })
    })
  })
})

describe('resizeByTop', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  describe('heightが正になる場合', () => {
    it('yの変化に合わせてheightが変動', () => {
      expect(drawing.resizeByTop(rec, 3)).toEqual({ y: 5, height: 17 })
      expect(drawing.resizeByTop(rec, 20)).toEqual({ y: 22, height: 0 })
    })
  })
  describe('heightが負になる場合', () => {
    it('heightが正になるよう形を保つ', () => {
      expect(drawing.resizeByTop(rec, 21)).toEqual({ y: 22, height: 1 })
    })
  })
})

describe('resizeByBottom', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  describe('heightが正になる場合', () => {
    it('heightが変動', () => {
      expect(drawing.resizeByBottom(rec, 3)).toEqual({ height: 23 })
      expect(drawing.resizeByBottom(rec, -20)).toEqual({ height: 0 })
    })
  })
  describe('heightが負になる場合', () => {
    it('heightが正になるよう形を保つ', () => {
      expect(drawing.resizeByBottom(rec, -21)).toEqual({ y: 1, height: 1 })
    })
  })
})

describe('resizeByLeftTop', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  it('左上頂点からリサイズ', () => {
    expect(drawing.resizeByLeftTop(rec, { x: 3, y: 4 })).toEqual({
      x: 4,
      width: 7,
      y: 6,
      height: 16,
    })
    expect(drawing.resizeByLeftTop(rec, { x: 11, y: 21 })).toEqual({
      x: 11,
      width: 1,
      y: 22,
      height: 1,
    })
  })
})

describe('resizeByRightTop', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  it('右上頂点からリサイズ', () => {
    expect(drawing.resizeByRightTop(rec, { x: 3, y: -4 })).toEqual({
      width: 13,
      y: -2,
      height: 24,
    })
    expect(drawing.resizeByRightTop(rec, { x: -11, y: 21 })).toEqual({
      x: 0,
      width: 1,
      y: 22,
      height: 1,
    })
  })
})

describe('resizeByRightBottom', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  it('右下頂点からリサイズ', () => {
    expect(drawing.resizeByRightBottom(rec, { x: 3, y: 4 })).toEqual({
      width: 13,
      height: 24,
    })
    expect(drawing.resizeByRightBottom(rec, { x: -11, y: -21 })).toEqual({
      x: 0,
      width: 1,
      y: 1,
      height: 1,
    })
  })
})

describe('resizeByLeftBottom', () => {
  const rec = { x: 1, y: 2, width: 10, height: 20 }

  it('左下頂点からリサイズ', () => {
    expect(drawing.resizeByLeftBottom(rec, { x: -3, y: 4 })).toEqual({
      x: -2,
      width: 13,
      height: 24,
    })
    expect(drawing.resizeByLeftBottom(rec, { x: 11, y: -21 })).toEqual({
      x: 11,
      width: 1,
      y: 1,
      height: 1,
    })
  })
})
