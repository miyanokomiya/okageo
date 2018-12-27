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

describe('rotate 座標回転', () => {
  describe('第3引数省略の場合', () => {
    it('原点を起点として回転したベクトルが取得できること', () => {
      const a: IVec2 = { x: 1, y: 1 }
      const res: IVec2 = geo.rotate(a, Math.PI / 2)
      expect(res.x).toBeCloseTo(-1)
      expect(res.y).toBeCloseTo(1)
    })
  })
  describe('第3引数指定の場合', () => {
    it('第3引数を起点として回転したベクトルが取得できること', () => {
      const a: IVec2 = { x: 2, y: 5 }
      const b: IVec2 = { x: 1, y: 4 }
      const res: IVec2 = geo.rotate(a, -Math.PI / 2, b)
      expect(res.x).toBeCloseTo(2)
      expect(res.y).toBeCloseTo(3)
    })
  })
})

describe('solveEquationOrder2 2次元方程式の解', () => {
  describe('1次方程式の場合', () => {
    it('解が正しいこと', () => {
      const res = geo.solveEquationOrder2(0, 2, 3)
      expect(res).toEqual([-3 / 2])
    })
  })
  describe('重解の場合', () => {
    it('解が正しいこと', () => {
      const res = geo.solveEquationOrder2(1, -6, 9)
      expect(res).toEqual([3])
    })
  })
  describe('解が２つの場合', () => {
    it('解が正しいこと', () => {
      const res = geo.solveEquationOrder2(1, -5, 6)
      expect(res).toEqual([3, 2])
    })
  })
  describe('解なし(複素数解)の場合', () => {
    it('空配列が取得できること', () => {
      const res = geo.solveEquationOrder2(1, 4, 6)
      expect(res).toEqual([])
    })
  })
})

describe('getPedal 垂線の足', () => {
  it('計算結果が正しいこと', () => {
    const p: IVec2 = { x: 1, y: 0 }
    const line: IVec2[] = [{ x: 2, y: 0 }, { x: 0, y: 2 }]
    const res = geo.getPedal(p, line)
    expect(res.x).toBeCloseTo(1.5)
    expect(res.y).toBeCloseTo(0.5)
  })
  it('直線引数エラーの場合、例外が投げられること', () => {
    expect(() => {
      const p: IVec2 = { x: 1, y: 0 }
      const line: IVec2[] = [{ x: 2, y: 0 }]
      geo.getPedal(p, line)
    }).toThrow()
  })
})

describe('getCrossLineAndBezier 2次ベジェ曲線と直線の交点', () => {
  describe('交点が1つの場合', () => {
    it('計算結果が正しいこと', () => {
      const p0: IVec2 = { x: 0, y: 0 }
      const p1: IVec2 = { x: 1, y: 2 }
      const p2: IVec2 = { x: 2, y: 0 }
      const p: IVec2 = { x: 1, y: 2 }
      const q: IVec2 = { x: 2, y: 0 }
      const res = geo.getCrossLineAndBezier(p0, p1, p2, p, q)
      expect(res.length).toBe(1)
      expect(res[0].x).toBeCloseTo(2)
      expect(res[0].y).toBeCloseTo(0)
    })
  })
  describe('交点が2つの場合', () => {
    it('計算結果が正しいこと', () => {
      const p0: IVec2 = { x: 0, y: 0 }
      const p1: IVec2 = { x: 1, y: 2 }
      const p2: IVec2 = { x: 2, y: 0 }
      const p: IVec2 = { x: 0, y: 0 }
      const q: IVec2 = { x: 2, y: 0 }
      const res = geo.getCrossLineAndBezier(p0, p1, p2, p, q)
      expect(res.length).toBe(2)
      expect(res[0].x).toBeCloseTo(2)
      expect(res[0].y).toBeCloseTo(0)
      expect(res[1].x).toBeCloseTo(0)
      expect(res[1].y).toBeCloseTo(0)
    })
  })
  describe('交点がない場合', () => {
    it('計算結果が正しいこと', () => {
      const p0: IVec2 = { x: 0, y: 0 }
      const p1: IVec2 = { x: 1, y: 2 }
      const p2: IVec2 = { x: 2, y: 0 }
      const p: IVec2 = { x: 0, y: 3 }
      const q: IVec2 = { x: 2, y: 3 }
      const res = geo.getCrossLineAndBezier(p0, p1, p2, p, q)
      expect(res.length).toBe(0)
    })
  })
})

describe('isCrossSegAndSeg 線分交差判定', () => {
  it('交差している場合trueが取得できること', () => {
    const seg1: IVec2[] = [{ x: 0, y: 0 }, { x: 4, y: 0 }]
    const seg2: IVec2[] = [{ x: 0, y: 1 }, { x: 4, y: -1 }]
    expect(geo.isCrossSegAndSeg(seg1, seg2)).toBe(true)
  })
  it('交差していない場合falseが取得できること', () => {
    const seg1: IVec2[] = [{ x: 0, y: 0 }, { x: 4, y: 0 }]
    const seg2: IVec2[] = [{ x: 0, y: 1 }, { x: 4, y: 2 }]
    expect(geo.isCrossSegAndSeg(seg1, seg2)).toBe(false)
  })
})

describe('isParallel 平行判定', () => {
  it('平行な場合trueが取得できること', () => {
    const a: IVec2 = { x: 4, y: 0 }
    const b: IVec2 = { x: -2, y: 0 }
    expect(geo.isParallel(a, b)).toBe(true)
  })
  it('平行ではない場合falseが取得できること', () => {
    const a: IVec2 = { x: 4, y: 0 }
    const b: IVec2 = { x: -2, y: 1 }
    expect(geo.isParallel(a, b)).toBe(false)
  })
})

describe('isOnLine 直線上判定', () => {
  it('直線上の場合trueが取得できること', () => {
    const a: IVec2 = { x: 1, y: 0 }
    const line: IVec2[] = [{ x: 0, y: 0 }, { x: 2, y: 0 }]
    expect(geo.isOnLine(a, line)).toBe(true)
  })
  it('直線上ではない場合falseが取得できること', () => {
    const a: IVec2 = { x: 1, y: 1 }
    const line: IVec2[] = [{ x: 0, y: 0 }, { x: 2, y: 0 }]
    expect(geo.isOnLine(a, line)).toBe(false)
  })
})

describe('getCrossSegAndLine 線分と直線の交点', () => {
  it('平行な場合、nullが取得できること', () => {
    const seg: IVec2[] = [{ x: 0, y: 1 }, { x: 2, y: 1 }]
    const line: IVec2[] = [{ x: 0, y: 0 }, { x: 2, y: 0 }]
    expect(geo.getCrossSegAndLine(seg, line)).toBe(null)
  })
  it('線分始点で交わる場合、その点が取得できること', () => {
    const seg: IVec2[] = [{ x: 0, y: 0 }, { x: 2, y: 1 }]
    const line: IVec2[] = [{ x: 0, y: 0 }, { x: 2, y: 0 }]
    expect(geo.getCrossSegAndLine(seg, line)).toEqual({ x: 0, y: 0 })
  })
  it('線分終点で交わる場合、その点が取得できること', () => {
    const seg: IVec2[] = [{ x: 0, y: 1 }, { x: 2, y: 0 }]
    const line: IVec2[] = [{ x: 0, y: 0 }, { x: 2, y: 0 }]
    expect(geo.getCrossSegAndLine(seg, line)).toEqual({ x: 2, y: 0 })
  })
  it('線分内で交わる場合、その点が取得できること', () => {
    const seg: IVec2[] = [{ x: 0, y: 1 }, { x: 2, y: -1 }]
    const line: IVec2[] = [{ x: 0, y: 0 }, { x: -2, y: 0 }]
    expect(geo.getCrossSegAndLine(seg, line)).toEqual({ x: 1, y: 0 })
  })
})
