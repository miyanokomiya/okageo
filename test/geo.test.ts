import * as geo from '../src/geo'

describe('add ベクトル足し算', () => {
  it('計算結果が正しいこと', () => {
    const a: IVec2 = { x: 1, y: 2 }
    const b: IVec2 = { x: 1, y: 3 }
    expect(geo.add(a, b)).toEqual({ x: 2, y: 5 })
  })
})

describe('sub ベクトル引き算', () => {
  it('計算結果が正しいこと', () => {
    const a: IVec2 = { x: 1, y: 2 }
    const b: IVec2 = { x: 1, y: 3 }
    expect(geo.sub(a, b)).toEqual({ x: 0, y: -1 })
  })
})

describe('multi ベクトル掛け算', () => {
  it('計算結果が正しいこと', () => {
    const a: IVec2 = { x: 1, y: 2 }
    const b: number = 2
    expect(geo.multi(a, b)).toEqual({ x: 2, y: 4 })
  })
})

describe('isSame 同座標判定', () => {
  it('一致判定が正しいこと', () => {
    const a: IVec2 = { x: 1, y: 2 }
    const b: IVec2 = { x: 1, y: 2 }
    expect(geo.isSame(a, b)).toBe(true)
  })
  it('不一致判定が正しいこと', () => {
    const a: IVec2 = { x: 1, y: 2 }
    const b: IVec2 = { x: 2, y: 2 }
    expect(geo.isSame(a, b)).toBe(false)
  })
})

describe('getDistance 距離取得', () => {
  it('計算結果が正しいこと', () => {
    const a: IVec2 = { x: 1, y: 1 }
    const b: IVec2 = { x: 4, y: 5 }
    expect(geo.getDistance(a, b)).toBe(5)
  })
})

describe('getNorm ノルム取得', () => {
  it('計算結果が正しいこと', () => {
    const a: IVec2 = { x: 3, y: 4 }
    expect(geo.getNorm(a)).toEqual(5)
  })
})

describe('isZero ゼロベクトル判定', () => {
  it('ゼロベクトル検出が正しいこと', () => {
    const a: IVec2 = { x: 0, y: 0 }
    expect(geo.isZero(a)).toBe(true)
  })
  it('非ゼロベクトル検出が正しいこと', () => {
    const a: IVec2 = { x: 1, y: 0 }
    expect(geo.isZero(a)).toBe(false)
  })
})
