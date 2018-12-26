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

describe('getUnit 単位ベクトル取得', () => {
  describe('ゼロベクトルではないとき', () => {
    it('単位ベクトルが取得できること', () => {
      const a: IVec2 = { x: 3, y: 4 }
      const unit = geo.getUnit(a)
      expect(unit.x).toBeCloseTo(3 / 5)
      expect(unit.y).toBeCloseTo(4 / 5)
    })
  })
  describe('ゼロベクトルのとき', () => {
    it('例外が投げられること', () => {
      const a: IVec2 = { x: 0, y: 0 }
      expect(() => {
        geo.getUnit(a)
      }).toThrow()
    })
  })
})

describe('getCross 外積取得', () => {
  it('計算結果が正しいこと', () => {
    const a: IVec2 = { x: 1, y: 2 }
    const b: IVec2 = { x: 3, y: 4 }
    expect(geo.getCross(a, b)).toBeCloseTo(-2)
  })
})

describe('getInner 外積取得', () => {
  it('計算結果が正しいこと', () => {
    const a: IVec2 = { x: 1, y: 2 }
    const b: IVec2 = { x: 3, y: 4 }
    expect(geo.getInner(a, b)).toBeCloseTo(11)
  })
})

describe('cloneVectors ベクトル配列複製', () => {
  it('別オブジェクトとして複製されていること', () => {
    const vectors: IVec2[] = [{ x: 1, y: 2 }, { x: 3, y: 4 }]
    const clone = geo.cloneVectors(vectors)
    expect(clone).toEqual(vectors)
    expect(clone).not.toBe(vectors)
    expect(clone[0]).not.toBe(vectors[0])
    expect(clone[1]).not.toBe(vectors[1])
  })
})

describe('getCenter 中点取得', () => {
  it('計算結果が正しいこと', () => {
    const a: IVec2 = { x: 1, y: 2 }
    const b: IVec2 = { x: 3, y: 4 }
    expect(geo.getCenter(a, b)).toEqual({ x: 2, y: 3 })
  })
})

describe('getRadian 中点取得', () => {
  describe('第2引数省略の場合', () => {
    it('原点を起点としたラジアンが取得できること', () => {
      const a: IVec2 = { x: Math.cos(Math.PI / 6), y: Math.sin(Math.PI / 6) }
      expect(geo.getRadian(a)).toBeCloseTo(Math.PI / 6)
    })
  })
  describe('第2引数指定の場合', () => {
    it('第2引数を起点としたラジアンが取得できること', () => {
      const a: IVec2 = { x: Math.cos(Math.PI / 6) + 1, y: Math.sin(Math.PI / 6) + 2 }
      const b: IVec2 = { x: 1, y: 2 }
      expect(geo.getRadian(a, b)).toBeCloseTo(Math.PI / 6)
    })
  })
})

describe('getSymmetry 中点取得', () => {
  describe('第2引数省略の場合', () => {
    it('原点を起点とした点対称なベクトルが取得できること', () => {
      const a: IVec2 = { x: 2, y: 5 }
      expect(geo.getSymmetry(a)).toEqual({ x: -2, y: -5 })
    })
  })
  describe('第2引数指定の場合', () => {
    it('第2引数を起点とした点対称なベクトルが取得できること', () => {
      const a: IVec2 = { x: 2, y: 5 }
      const b: IVec2 = { x: 1, y: 2 }
      expect(geo.getSymmetry(a, b)).toEqual({ x: 0, y: -1 })
    })
  })
})
