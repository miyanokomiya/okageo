import * as geo from '../src/geo'
import { IVec2, IRectangle, AffineMatrix } from '../src/types'

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

describe('getPolylineLength', () => {
  it('should return the length of target polyline', () => {
    expect(
      geo.getPolylineLength([
        { x: 0, y: 0 },
        { x: 3, y: 0 },
        { x: 3, y: 4 },
      ])
    ).toBe(7)
  })
  it('should treat target as a polygon when "closed" is true', () => {
    expect(
      geo.getPolylineLength(
        [
          { x: 0, y: 0 },
          { x: 3, y: 0 },
          { x: 3, y: 4 },
        ],
        true
      )
    ).toBe(12)
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
    const vectors: IVec2[] = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]
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

describe('getRectCenter 矩形中心取得', () => {
  it('計算結果が正しいこと', () => {
    const a: IRectangle = { x: 4, y: 10, width: 10, height: 20 }
    expect(geo.getRectCenter(a)).toEqual({ x: 9, y: 20 })
  })
})

describe('getPolygonCenter', () => {
  it('returns center of the polygon', () => {
    const polygon: IVec2[] = [
      { x: 1, y: 2 },
      { x: 10, y: 11 },
      { x: 1, y: 2 },
    ]
    expect(geo.getPolygonCenter(polygon)).toEqual({ x: 4, y: 5 })
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
      const a: IVec2 = {
        x: Math.cos(Math.PI / 6) + 1,
        y: Math.sin(Math.PI / 6) + 2,
      }
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
    const line: IVec2[] = [
      { x: 2, y: 0 },
      { x: 0, y: 2 },
    ]
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
      expect(res).toHaveLength(1)
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
      expect(res).toHaveLength(2)
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
      expect(res).toHaveLength(0)
    })
  })
})

describe('isCrossSegAndSeg 線分交差判定', () => {
  it('交差している場合trueが取得できること', () => {
    const seg1: IVec2[] = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
    ]
    const seg2: IVec2[] = [
      { x: 0, y: 1 },
      { x: 4, y: -1 },
    ]
    expect(geo.isCrossSegAndSeg(seg1, seg2)).toBe(true)
  })
  it('端点で接触している場合falseが取得できること', () => {
    const seg1: IVec2[] = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
    ]
    const seg2: IVec2[] = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ]
    expect(geo.isCrossSegAndSeg(seg1, seg2)).toBe(false)
  })
  it('端点同士で接触している場合falseが取得できること', () => {
    const seg1: IVec2[] = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
    ]
    const seg2: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ]
    expect(geo.isCrossSegAndSeg(seg1, seg2)).toBe(false)
  })
  it('交差していない場合falseが取得できること', () => {
    const seg1: IVec2[] = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
    ]
    const seg2: IVec2[] = [
      { x: 0, y: 1 },
      { x: 4, y: 2 },
    ]
    expect(geo.isCrossSegAndSeg(seg1, seg2)).toBe(false)
  })
})

describe('isTouchSegAndSeg 線分交差判定', () => {
  it('交差している場合trueが取得できること', () => {
    const seg1: IVec2[] = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
    ]
    const seg2: IVec2[] = [
      { x: 0, y: 1 },
      { x: 4, y: -1 },
    ]
    expect(geo.isTouchSegAndSeg(seg1, seg2)).toBe(true)
  })
  it('端点で接触している場合trueが取得できること', () => {
    const seg1: IVec2[] = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
    ]
    const seg2: IVec2[] = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ]
    expect(geo.isTouchSegAndSeg(seg1, seg2)).toBe(true)
  })
  it('端点同士で接触している場合trueが取得できること', () => {
    const seg1: IVec2[] = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
    ]
    const seg2: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ]
    expect(geo.isTouchSegAndSeg(seg1, seg2)).toBe(true)
  })
  it('交差していない場合falseが取得できること', () => {
    const seg1: IVec2[] = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
    ]
    const seg2: IVec2[] = [
      { x: 0, y: 1 },
      { x: 4, y: 2 },
    ]
    expect(geo.isTouchSegAndSeg(seg1, seg2)).toBe(false)
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
    const line: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ]
    expect(geo.isOnLine(a, line)).toBe(true)
  })
  it('直線上ではない場合falseが取得できること', () => {
    const a: IVec2 = { x: 1, y: 1 }
    const line: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ]
    expect(geo.isOnLine(a, line)).toBe(false)
  })
})

describe('isOnSeg 線分上判定', () => {
  it('線分上の場合trueが取得できること', () => {
    const a: IVec2 = { x: 1, y: 0 }
    const line: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ]
    expect(geo.isOnSeg(a, line)).toBe(true)
  })
  it('端点上の場合trueが取得できること', () => {
    const a: IVec2 = { x: 0, y: 0 }
    const b: IVec2 = { x: 2, y: 0 }
    const line: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ]
    expect(geo.isOnSeg(a, line)).toBe(true)
    expect(geo.isOnSeg(b, line)).toBe(true)
  })
  it('線分上ではない場合falseが取得できること', () => {
    const a: IVec2 = { x: 1, y: 1 }
    const b: IVec2 = { x: 1, y: -1 }
    const line: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ]
    expect(geo.isOnSeg(a, line)).toBe(false)
    expect(geo.isOnSeg(b, line)).toBe(false)
  })
  it('直線上だが線分上ではない場合falseが取得できること', () => {
    const a: IVec2 = { x: -1, y: 0 }
    const b: IVec2 = { x: 3, y: 0 }
    const line: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ]
    expect(geo.isOnSeg(a, line)).toBe(false)
    expect(geo.isOnSeg(b, line)).toBe(false)
  })
})

describe('isOnPolygon 面上判定', () => {
  describe('凸面', () => {
    const polygon: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
    ]
    it('面上の場合trueが取得できること', () => {
      const a: IVec2 = { x: 1, y: 0.5 }
      expect(geo.isOnPolygon(a, polygon)).toBe(true)
    })
    it('面外の場合falseが取得できること', () => {
      const a: IVec2 = { x: 1, y: 2 }
      expect(geo.isOnPolygon(a, polygon)).toBe(false)
    })
  })
  describe('凹面', () => {
    const polygon: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 4, y: 1 },
      { x: 4, y: 0 },
      { x: 6, y: 0 },
      { x: 6, y: 2 },
      { x: 0, y: 2 },
    ]
    it('面上の場合trueが取得できること', () => {
      const a: IVec2 = { x: 1, y: 0.5 }
      expect(geo.isOnPolygon(a, polygon)).toBe(true)
    })
    it('面外の場合falseが取得できること', () => {
      const a: IVec2 = { x: 3, y: 0.5 }
      expect(geo.isOnPolygon(a, polygon)).toBe(false)
    })
  })
  describe('頂点上の場合', () => {
    const polygon: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
    ]
    it('trueが取得できること', () => {
      const a: IVec2 = { x: 0, y: 0 }
      expect(geo.isOnPolygon(a, polygon)).toBe(true)
    })
  })
  describe('辺上の場合', () => {
    const polygon: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
    ]
    describe('水平な辺上の場合（判定方法依存の特殊ケース）', () => {
      it('trueが取得できること', () => {
        const a: IVec2 = { x: 1, y: 0 }
        expect(geo.isOnPolygon(a, polygon)).toBe(true)
      })
    })
    describe('水平でない辺上の場合', () => {
      it('trueが取得できること', () => {
        const a: IVec2 = { x: 2, y: 1 }
        expect(geo.isOnPolygon(a, polygon)).toBe(true)
      })
    })
  })
  describe('L字のくぼみと同じ水平線上の場合', () => {
    const polygon: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 0 },
    ]
    it('領域内はtrueが取得できること', () => {
      const a: IVec2 = { x: 0.5, y: 1 }
      expect(geo.isOnPolygon(a, polygon)).toBe(true)
    })
    it('領域外はfalseが取得できること', () => {
      const a: IVec2 = { x: -1, y: 1 }
      expect(geo.isOnPolygon(a, polygon)).toBe(false)
    })
  })
  describe('2箇所のL字のくぼみと同じ水平線上の場合', () => {
    const polygon: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ]
    it('領域内はtrueが取得できること', () => {
      const a: IVec2 = { x: 0.5, y: 1 }
      expect(geo.isOnPolygon(a, polygon)).toBe(true)
    })
    it('領域外はfalseが取得できること', () => {
      const a: IVec2 = { x: -1, y: 1 }
      expect(geo.isOnPolygon(a, polygon)).toBe(false)
    })
  })
  describe('長さ0の辺が存在する場合', () => {
    const polygon: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 0 },
      { x: 0, y: 0 },
    ]
    it('領域内はtrueが取得できること', () => {
      const a: IVec2 = { x: 1, y: 1 }
      expect(geo.isOnPolygon(a, polygon)).toBe(true)
    })
    it('領域外はfalseが取得できること', () => {
      const a: IVec2 = { x: -1, y: 1 }
      expect(geo.isOnPolygon(a, polygon)).toBe(false)
    })
  })
  describe('判定点と同一y座標上に正多角形の頂点がある場合', () => {
    const polygon: IVec2[] = [
      { x: 2, y: 0 },
      { x: 0, y: 2 },
      { x: 4, y: 2 },
      { x: 2, y: 4 },
    ]
    it('領域内はtrueが取得できること', () => {
      const a: IVec2 = { x: 2, y: 2 }
      expect(geo.isOnPolygon(a, polygon)).toBe(true)
    })
  })
})

describe('getCrossSegAndLine 線分と直線の交点', () => {
  it('平行な場合、nullが取得できること', () => {
    const seg: IVec2[] = [
      { x: 0, y: 1 },
      { x: 2, y: 1 },
    ]
    const line: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ]
    expect(geo.getCrossSegAndLine(seg, line)).toBe(null)
  })
  it('線分始点で交わる場合、その点が取得できること', () => {
    const seg: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 1 },
    ]
    const line: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ]
    expect(geo.getCrossSegAndLine(seg, line)).toEqual({ x: 0, y: 0 })
  })
  it('線分終点で交わる場合、その点が取得できること', () => {
    const seg: IVec2[] = [
      { x: 0, y: 1 },
      { x: 2, y: 0 },
    ]
    const line: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ]
    expect(geo.getCrossSegAndLine(seg, line)).toEqual({ x: 2, y: 0 })
  })
  it('線分内で交わる場合、その点が取得できること', () => {
    const seg: IVec2[] = [
      { x: 0, y: 1 },
      { x: 2, y: -1 },
    ]
    const line: IVec2[] = [
      { x: 0, y: 0 },
      { x: -2, y: 0 },
    ]
    expect(geo.getCrossSegAndLine(seg, line)).toEqual({ x: 1, y: 0 })
  })
})

describe('splitPolyByLine 直線によるポリゴン分割', () => {
  it('分割されない場合、空配列が取得できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ]
    const line: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ]
    expect(geo.splitPolyByLine(pol, line)).toEqual([])
  })
  it('分割される場合、分割されたポリゴンが取得できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ]
    const line: IVec2[] = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ]
    expect(geo.splitPolyByLine(pol, line)).toEqual([
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
      ],
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 1, y: 2 },
      ],
    ])
  })
  it('3つ以上に分割される場合、分割されたポリゴンが全て取得できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 3, y: 0 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 3 },
      { x: 0, y: 3 },
    ]
    const line: IVec2[] = [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
    ]
    const res = geo.splitPolyByLine(pol, line)
    expect(res).toHaveLength(3)
    expect(res[0]).toEqual([
      { x: 0, y: 0 },
      { x: 3, y: 0 },
      { x: 3, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ])
    expect(res[1]).toEqual([
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 0, y: 3 },
      { x: 0, y: 2 },
    ])
    expect(res[2]).toEqual([
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 2, y: 2 },
    ])
  })
})

describe('triangleSplit 三角分割', () => {
  it('凸なポリゴンが分割できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ]
    const res = geo.triangleSplit(pol)
    expect(res).toHaveLength(2)
    expect(res[0]).toEqual([
      { x: 2, y: 2 },
      { x: 0, y: 2 },
      { x: 2, y: 0 },
    ])
    expect(res[1]).toEqual([
      { x: 2, y: 0 },
      { x: 0, y: 2 },
      { x: 0, y: 0 },
    ])
  })
  it('凹なポリゴンが分割できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 3, y: 0 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 3 },
      { x: 0, y: 3 },
    ]
    const res = geo.triangleSplit(pol)
    expect(res).toHaveLength(6)
  })
})

describe('isPointOnTriangle 点が三角形内部にあるか判定', () => {
  it('内包される場合、trueが取得できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]
    const p: IVec2 = { x: 0.2, y: 0.5 }
    expect(geo.isPointOnTriangle(pol, p)).toBe(true)
  })
  it('辺上の場合、trueが取得できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]
    const p: IVec2 = { x: 0, y: 0.5 }
    expect(geo.isPointOnTriangle(pol, p)).toBe(true)
  })
  it('点上の場合、trueが取得できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]
    const p: IVec2 = { x: 0, y: 1 }
    expect(geo.isPointOnTriangle(pol, p)).toBe(true)
  })
  it('含まれない場合、falseが取得できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]
    const p: IVec2 = { x: 0, y: 2 }
    expect(geo.isPointOnTriangle(pol, p)).toBe(false)
  })
})

describe('convertLoopwise 面を時計回りに変換', () => {
  it('時計回りに変換されること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]
    expect(geo.convertLoopwise(pol)).toEqual([
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 0, y: 0 },
    ])
  })
})

describe('getLoopwise 面の時計回りに判定', () => {
  it('時計回りの場合、1が取得できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ]
    expect(geo.getLoopwise(pol)).toBe(1)
  })
  it('反時計回りの場合、-1が取得できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]
    expect(geo.getLoopwise(pol)).toBe(-1)
  })
  it('面が成立しない場合、0が取得できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ]
    expect(geo.getLoopwise(pol)).toBe(0)
  })
})

describe('getArea 面積取得', () => {
  it('第2引数を省略した場合、非負の面積が取得できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]
    expect(geo.getArea(pol)).toBeCloseTo(1 / 2)
  })
  it('第2引数をtrueにした場合、負値を許した面積が取得できること', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]
    expect(geo.getArea(pol, true)).toBeCloseTo(-1 / 2)
  })
})

describe('approximateBezier ベジェ曲線近似', () => {
  describe('2次ベジェの場合', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 0 },
    ]
    it('サイズ1の近似が正しいこと', () => {
      const res = geo.approximateBezier(pol, 1)
      expect(res).toHaveLength(2)
      expect(res[0]).toEqual({ x: 0, y: 0 })
      expect(res[1]).toEqual({ x: 2, y: 0 })
    })
    it('サイズ2の近似が正しいこと', () => {
      const res = geo.approximateBezier(pol, 2)
      expect(res).toHaveLength(3)
      expect(res[0]).toEqual({ x: 0, y: 0 })
      expect(res[1]).toEqual({ x: 1, y: 1 })
      expect(res[2]).toEqual({ x: 2, y: 0 })
    })
  })
  describe('3次ベジェの場合', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 3, y: -2 },
      { x: 4, y: 0 },
    ]
    it('サイズ1の近似が正しいこと', () => {
      const res = geo.approximateBezier(pol, 1)
      expect(res).toHaveLength(2)
      expect(res[0]).toEqual({ x: 0, y: 0 })
      expect(res[1]).toEqual({ x: 4, y: 0 })
    })
    it('サイズ2の近似が正しいこと', () => {
      const res = geo.approximateBezier(pol, 2)
      expect(res).toHaveLength(3)
      expect(res[0]).toEqual({ x: 0, y: 0 })
      expect(res[1]).toEqual({ x: 2, y: 0 })
      expect(res[2]).toEqual({ x: 4, y: 0 })
    })
    it('サイズ3の近似が正しいこと', () => {
      const res = geo.approximateBezier(pol, 3)
      expect(res).toHaveLength(4)
      expect(res[0]).toEqual({ x: 0, y: 0 })
      expect(res[1].x).toBeGreaterThan(1.1)
      expect(res[1].x).toBeLessThan(1.9)
      expect(res[1].y).toBeGreaterThan(0.1)
      expect(res[1].y).toBeLessThan(1.9)
      expect(res[2].x).toBeGreaterThan(2.1)
      expect(res[2].x).toBeLessThan(2.9)
      expect(res[2].y).toBeGreaterThan(-1.9)
      expect(res[2].y).toBeLessThan(-0.1)
      expect(res[3]).toEqual({ x: 4, y: 0 })
    })
  })
  describe('3次より高次ベジェの場合', () => {
    const pol: IVec2[] = [
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 3, y: -2 },
      { x: 4, y: 0 },
      { x: 5, y: 1 },
    ]
    it('例外が投げられること', () => {
      expect(() => {
        geo.approximateBezier(pol, 1)
      }).toThrow()
    })
  })
})

describe('getPointOnBezier2', () => {
  const pointList = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 0 },
  ] as const
  it.each([
    [0, { x: 0, y: 0 }],
    [0.5, { x: 1, y: 1 }],
    [1, { x: 2, y: 0 }],
  ])('getPointOnBezier2(pointList, %s) => %s', (rate, expected) => {
    expect(geo.getPointOnBezier2(pointList, rate)).toEqual(expected)
  })
})

describe('getPointOnBezier3', () => {
  const pointList = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 3, y: -2 },
    { x: 4, y: 0 },
  ] as const
  it.each([
    [0, { x: 0, y: 0 }],
    [0.5, { x: 2, y: 0 }],
    [1, { x: 4, y: 0 }],
  ])('getPointOnBezier3(pointList, %s) => %s', (rate, expected) => {
    expect(geo.getPointOnBezier3(pointList, rate)).toEqual(expected)
  })
})

describe('getYOnBezier3AtX', () => {
  const pointList = [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 10 },
    { x: 4, y: 10 },
  ] as const
  it.each([
    [0, 0],
    [2, 5],
    [4, 10],
  ])('getYOnBezier3AtX(pointList, %s) => %s', (x, expected) => {
    expect(geo.getYOnBezier3AtX(pointList, x)).toBeCloseTo(expected)
  })
  it('expo in', () => {
    const pointList = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
    ] as const
    expect(geo.getYOnBezier3AtX(pointList, 0)).toBeCloseTo(0)
    expect(geo.getYOnBezier3AtX(pointList, 8)).toBeLessThan(1)
    expect(geo.getYOnBezier3AtX(pointList, 10)).toBeCloseTo(10)
  })
  it('expo out', () => {
    const pointList = [
      { x: 0, y: 0 },
      { x: 0, y: 10 },
      { x: 0, y: 10 },
      { x: 10, y: 10 },
    ] as const
    expect(geo.getYOnBezier3AtX(pointList, 0)).toBeCloseTo(0)
    expect(geo.getYOnBezier3AtX(pointList, 2)).toBeGreaterThan(9)
    expect(geo.getYOnBezier3AtX(pointList, 10)).toBeCloseTo(10)
  })
  it('wave', () => {
    const pointList = [
      { x: 0, y: 0 },
      { x: 5, y: 20 },
      { x: 5, y: -10 },
      { x: 10, y: 10 },
    ] as const
    expect(geo.getYOnBezier3AtX(pointList, 0)).toBeCloseTo(0)
    expect(geo.getYOnBezier3AtX(pointList, 2.5)).toBeGreaterThan(5)
    expect(geo.getYOnBezier3AtX(pointList, 5)).toBeCloseTo(5)
    expect(geo.getYOnBezier3AtX(pointList, 7.5)).toBeLessThan(5)
    expect(geo.getYOnBezier3AtX(pointList, 10)).toBeCloseTo(10)
  })
  it('complex case 1', () => {
    const pointList = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 50, y: 250 },
      { x: 60, y: 250 },
    ] as const
    expect(geo.getYOnBezier3AtX(pointList, 0)).toBeCloseTo(0)
    expect(geo.getYOnBezier3AtX(pointList, 30)).toBeCloseTo(125)
    expect(geo.getYOnBezier3AtX(pointList, 60)).toBeCloseTo(250)
  })
})

describe('approximateArc 円弧近似', () => {
  it('サイズ2の近似が正しいこと', () => {
    const res = geo.approximateArc(2, 1, 0, Math.PI, { x: 0, y: 0 }, 0, 2)
    expect(res).toHaveLength(3)
    expect(res[0].x).toBeCloseTo(2)
    expect(res[0].y).toBeCloseTo(0)
    expect(res[1].x).toBeCloseTo(0)
    expect(res[1].y).toBeCloseTo(1)
    expect(res[2].x).toBeCloseTo(-2)
    expect(res[2].y).toBeCloseTo(0)
  })
  it('サイズ3の近似が正しいこと', () => {
    const res = geo.approximateArc(1, 1, 0, Math.PI, { x: 0, y: 0 }, 0, 3)
    expect(res).toHaveLength(4)
    expect(res[0].x).toBeCloseTo(1)
    expect(res[0].y).toBeCloseTo(0)
    expect(res[1].x).toBeCloseTo(1 / 2)
    expect(res[1].y).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res[2].x).toBeCloseTo(-1 / 2)
    expect(res[2].y).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res[3].x).toBeCloseTo(-1)
    expect(res[3].y).toBeCloseTo(0)
  })
  it('回転ありの近似が正しいこと', () => {
    const res = geo.approximateArc(
      2,
      1,
      0,
      Math.PI,
      { x: 0, y: 0 },
      Math.PI / 2,
      2
    )
    expect(res).toHaveLength(3)
    expect(res[0].x).toBeCloseTo(1)
    expect(res[0].y).toBeCloseTo(0)
    expect(res[1].x).toBeCloseTo(0)
    expect(res[1].y).toBeCloseTo(2)
    expect(res[2].x).toBeCloseTo(-1)
    expect(res[2].y).toBeCloseTo(0)
  })
  it('移動ありの近似が正しいこと', () => {
    const res = geo.approximateArc(
      2,
      1,
      0,
      Math.PI,
      { x: 1, y: 2 },
      Math.PI / 2,
      2
    )
    expect(res).toHaveLength(3)
    expect(res[0].x).toBeCloseTo(2)
    expect(res[0].y).toBeCloseTo(2)
    expect(res[1].x).toBeCloseTo(1)
    expect(res[1].y).toBeCloseTo(4)
    expect(res[2].x).toBeCloseTo(0)
    expect(res[2].y).toBeCloseTo(2)
  })
})

describe('approximateArcWithPoint 楕円の近似', () => {
  it('サイズ1の近似が正しいこと', () => {
    const res0 = geo.approximateArcWithPoint(
      1,
      2,
      { x: 1, y: 0 },
      { x: 0, y: 2 },
      false,
      false,
      0,
      1
    )
    expect(res0).toHaveLength(2)
    expect(res0[0].x).toBeCloseTo(1)
    expect(res0[0].y).toBeCloseTo(0)
    expect(res0[1].x).toBeCloseTo(0)
    expect(res0[1].y).toBeCloseTo(2)

    const res = geo.approximateArcWithPoint(
      1,
      2,
      { x: 1, y: 0 },
      { x: 0, y: 2 },
      false,
      false,
      Math.PI / 4,
      1
    )
    expect(res).toHaveLength(2)
    expect(res[0].x).toBeCloseTo(1)
    expect(res[0].y).toBeCloseTo(0)
    expect(res[1].x).toBeCloseTo(0)
    expect(res[1].y).toBeCloseTo(2)
  })
  it('サイズ2の近似が正しいこと(時計回り、小さい円弧)', () => {
    const res = geo.approximateArcWithPoint(
      1,
      1,
      { x: Math.sqrt(3) / 2, y: 1 / 2 },
      { x: Math.sqrt(3) / 2, y: -1 / 2 },
      false,
      true,
      Math.PI / 2,
      2
    )
    expect(res).toHaveLength(3)
    expect(res[0].x).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res[0].y).toBeCloseTo(1 / 2)
    expect(res[1].x).toBeCloseTo(Math.sqrt(3) - 1)
    expect(res[1].y).toBeCloseTo(0)
    expect(res[2].x).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res[2].y).toBeCloseTo(-1 / 2)
  })
  it('サイズ2の近似が正しいこと(時計回り、大きい円弧)', () => {
    const res = geo.approximateArcWithPoint(
      1,
      1,
      { x: Math.sqrt(3) / 2, y: 1 / 2 },
      { x: Math.sqrt(3) / 2, y: -1 / 2 },
      true,
      true,
      Math.PI / 2,
      2
    )
    expect(res).toHaveLength(3)
    expect(res[0].x).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res[0].y).toBeCloseTo(1 / 2)
    expect(res[1].x).toBeCloseTo(-1)
    expect(res[1].y).toBeCloseTo(0)
    expect(res[2].x).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res[2].y).toBeCloseTo(-1 / 2)
  })
  it('サイズ2の近似が正しいこと(反時計回り、小さい円弧)', () => {
    const res = geo.approximateArcWithPoint(
      1,
      1,
      { x: Math.sqrt(3) / 2, y: 1 / 2 },
      { x: Math.sqrt(3) / 2, y: -1 / 2 },
      false,
      false,
      Math.PI / 2,
      2
    )
    expect(res).toHaveLength(3)
    expect(res[0].x).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res[0].y).toBeCloseTo(1 / 2)
    expect(res[1].x).toBeCloseTo(1)
    expect(res[1].y).toBeCloseTo(0)
    expect(res[2].x).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res[2].y).toBeCloseTo(-1 / 2)
  })
  it('サイズ2の近似が正しいこと(反時計回り、大きい円弧)', () => {
    const res = geo.approximateArcWithPoint(
      1,
      1,
      { x: Math.sqrt(3) / 2, y: 1 / 2 },
      { x: Math.sqrt(3) / 2, y: -1 / 2 },
      true,
      false,
      Math.PI / 2,
      2
    )
    expect(res).toHaveLength(3)
    expect(res[0].x).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res[0].y).toBeCloseTo(1 / 2)
    expect(res[1].x).toBeCloseTo(Math.sqrt(3) + 1)
    expect(res[1].y).toBeCloseTo(0)
    expect(res[2].x).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res[2].y).toBeCloseTo(-1 / 2)
  })
  it('2点に届くよう径長が拡大されること', () => {
    const res = geo.approximateArcWithPoint(
      1,
      1,
      { x: -2, y: 0 },
      { x: 2, y: 0 },
      false,
      false,
      0,
      2
    )
    expect(res).toHaveLength(3)
    expect(res[0].x).toBeCloseTo(-2)
    expect(res[0].y).toBeCloseTo(0)
    expect(res[1].x).toBeCloseTo(0)
    expect(res[1].y).toBeCloseTo(2)
    expect(res[2].x).toBeCloseTo(2)
    expect(res[2].y).toBeCloseTo(0)
  })
  it('x径長0の場合は直線になること', () => {
    const res = geo.approximateArcWithPoint(
      0,
      1,
      { x: -2, y: 0 },
      { x: 2, y: 0 },
      false,
      false,
      0,
      2
    )
    expect(res).toHaveLength(2)
    expect(res[0].x).toBeCloseTo(-2)
    expect(res[0].y).toBeCloseTo(0)
    expect(res[1].x).toBeCloseTo(2)
    expect(res[1].y).toBeCloseTo(0)
  })
  it('y径長0の場合は直線になること', () => {
    const res = geo.approximateArcWithPoint(
      1,
      0,
      { x: -2, y: 0 },
      { x: 2, y: 0 },
      false,
      false,
      0,
      2
    )
    expect(res).toHaveLength(2)
    expect(res[0].x).toBeCloseTo(-2)
    expect(res[0].y).toBeCloseTo(0)
    expect(res[1].x).toBeCloseTo(2)
    expect(res[1].y).toBeCloseTo(0)
  })
  it('負の径長の場合は正に補正されること', () => {
    const res = geo.approximateArcWithPoint(
      -1,
      -1,
      { x: -2, y: 0 },
      { x: 2, y: 0 },
      false,
      false,
      0,
      2
    )
    expect(res).toHaveLength(3)
    expect(res[0].y).toBeCloseTo(0)
    expect(res[1].x).toBeCloseTo(0)
    expect(res[1].y).toBeCloseTo(2)
    expect(res[2].x).toBeCloseTo(2)
    expect(res[2].y).toBeCloseTo(0)
  })
})

describe('getArcLerpFn', () => {
  it('should return lerp function for arc path', () => {
    const res = geo.getArcLerpFn(
      1,
      1,
      { x: Math.sqrt(3) / 2, y: 1 / 2 },
      { x: Math.sqrt(3) / 2, y: -1 / 2 },
      false,
      true,
      Math.PI / 2
    )
    expect(res(0).x).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res(0).y).toBeCloseTo(1 / 2)
    expect(res(0.5).x).toBeCloseTo(Math.sqrt(3) - 1)
    expect(res(0.5).y).toBeCloseTo(0)
    expect(res(1).x).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res(1).y).toBeCloseTo(-1 / 2)
  })

  it('should use abstract radius', () => {
    const res = geo.getArcLerpFn(
      -1,
      -1,
      { x: Math.sqrt(3) / 2, y: 1 / 2 },
      { x: Math.sqrt(3) / 2, y: -1 / 2 },
      false,
      true,
      Math.PI / 2
    )
    expect(res(0).x).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res(0).y).toBeCloseTo(1 / 2)
    expect(res(0.5).x).toBeCloseTo(Math.sqrt(3) - 1)
    expect(res(0.5).y).toBeCloseTo(0)
    expect(res(1).x).toBeCloseTo(Math.sqrt(3) / 2)
    expect(res(1).y).toBeCloseTo(-1 / 2)
  })

  it('should return lerp function for the segment if radius is close to 0', () => {
    const res = geo.getArcLerpFn(
      0,
      1,
      { x: 10, y: 20 },
      { x: 110, y: 120 },
      false,
      true,
      Math.PI / 2
    )
    expect(res(0).x).toBeCloseTo(10)
    expect(res(0).y).toBeCloseTo(20)
    expect(res(0.5).x).toBeCloseTo(60)
    expect(res(0.5).y).toBeCloseTo(70)
    expect(res(1).x).toBeCloseTo(110)
    expect(res(1).y).toBeCloseTo(120)
  })
})

describe('lerpPoint', () => {
  it('should lerp between points', () => {
    const res = geo.lerpPoint({ x: 10, y: 20 }, { x: 110, y: 220 }, 0.2)
    expect(res.x).toBeCloseTo(30)
    expect(res.y).toBeCloseTo(60)
  })
})

describe('getApproPoints', () => {
  it('should return splited points', () => {
    expect(geo.getApproPoints((t) => ({ x: t, y: 0 }), 0)).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ])
    expect(geo.getApproPoints((t) => ({ x: t, y: 0 }), 1)).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ])
    expect(geo.getApproPoints((t) => ({ x: t, y: 0 }), 2)).toEqual([
      { x: 0, y: 0 },
      { x: 0.5, y: 0 },
      { x: 1, y: 0 },
    ])
    expect(geo.getApproPoints((t) => ({ x: t, y: 0 }), 4)).toEqual([
      { x: 0, y: 0 },
      { x: 0.25, y: 0 },
      { x: 0.5, y: 0 },
      { x: 0.75, y: 0 },
      { x: 1, y: 0 },
    ])
  })
})

describe('getEllipseCenter 2点を通る楕円の中心', () => {
  it('正しく取得できること', () => {
    const res = geo.getEllipseCenter({ x: 1, y: 0 }, { x: 0, y: 2 }, 1, 2, 0)
    const centers = res.centers
    expect(res.radiusRate).toBe(1)
    expect(centers).toHaveLength(2)
    expect(centers[0].x).toBeCloseTo(0)
    expect(centers[0].y).toBeCloseTo(0)
    expect(centers[1].x).toBeCloseTo(1)
    expect(centers[1].y).toBeCloseTo(2)
  })
  it('角度ありの場合、正しく取得できること', () => {
    const res = geo.getEllipseCenter(
      { x: 1, y: 0 },
      { x: 0, y: 2 },
      2,
      1,
      Math.PI / 2
    )
    const centers = res.centers
    expect(res.radiusRate).toBe(1)
    expect(centers).toHaveLength(2)
    expect(centers[0].x).toBeCloseTo(0)
    expect(centers[0].y).toBeCloseTo(0)
    expect(centers[1].x).toBeCloseTo(1)
    expect(centers[1].y).toBeCloseTo(2)
  })
  it('2点が直径よりも離れている場合、中点と補正係数が取得できること', () => {
    const res = geo.getEllipseCenter({ x: 0, y: 0 }, { x: 4, y: 0 }, 1, 1, 0)
    const centers = res.centers
    expect(res.radiusRate).toBe(2)
    expect(centers).toHaveLength(2)
    expect(centers[0].x).toBeCloseTo(2)
    expect(centers[0].y).toBeCloseTo(0)
    expect(centers[1].x).toBeCloseTo(2)
    expect(centers[1].y).toBeCloseTo(0)
  })
})

describe('getCircleCenter 2点を通る円の中心', () => {
  it('正しく取得できること', () => {
    const res = geo.getCircleCenter(
      { x: 1 / 2, y: Math.sqrt(3) / 2 },
      { x: 1 / 2, y: -Math.sqrt(3) / 2 },
      1
    )
    const centers = res.centers
    expect(res.radiusRate).toBe(1)
    expect(centers).toHaveLength(2)
    expect(centers[0].x).toBeCloseTo(1)
    expect(centers[0].y).toBeCloseTo(0)
    expect(centers[1].x).toBeCloseTo(0)
    expect(centers[1].y).toBeCloseTo(0)
  })
  it('2点が直径よりも離れている場合、中点と補正係数が取得できること', () => {
    const res = geo.getCircleCenter({ x: 0, y: 0 }, { x: 4, y: 0 }, 1)
    const centers = res.centers
    expect(res.radiusRate).toBe(2)
    expect(centers).toHaveLength(2)
    expect(centers[0].x).toBeCloseTo(2)
    expect(centers[0].y).toBeCloseTo(0)
    expect(centers[1].x).toBeCloseTo(2)
    expect(centers[1].y).toBeCloseTo(0)
  })
})

describe('transform 2次元アフィン変換', () => {
  it('正しく取得できること', () => {
    const res = geo.transform([{ x: 1, y: 2 }], [1, 2, 3, 4, 5, 6])
    expect(res).toHaveLength(1)
    expect(res[0].x).toBeCloseTo(1 + 2 * 3 + 5)
    expect(res[0].y).toBeCloseTo(2 + 2 * 4 + 6)
  })
})

describe('invertTransform', () => {
  it('invert Affine transform matrix', () => {
    const src: AffineMatrix = [1, 2, 3, 4, 5, 6]
    const transformed = geo.transform([{ x: 10, y: 20 }], src)
    const inverted = geo.transform(transformed, geo.invertTransform(src))
    expect(inverted[0].x).toBeCloseTo(10)
    expect(inverted[0].y).toBeCloseTo(20)
  })
})

describe('multiAffine', () => {
  it('multi affine matrixes', () => {
    const src: AffineMatrix = [1, 2, 3, 4, 5, 6]
    const inverted = geo.invertTransform(src)
    const res = geo.multiAffine(src, inverted)
    expect(res[0]).toBeCloseTo(1)
    expect(res[1]).toBeCloseTo(0)
    expect(res[2]).toBeCloseTo(0)
    expect(res[3]).toBeCloseTo(1)
    expect(res[4]).toBeCloseTo(0)
    expect(res[5]).toBeCloseTo(0)
  })
})

describe('multiAffines', () => {
  it('multi affine matrixes', () => {
    const src: AffineMatrix = [1, 2, 3, 4, 5, 6]
    const inverted = geo.invertTransform(src)
    const res = geo.multiAffines([src, inverted])
    expect(res[0]).toBeCloseTo(1)
    expect(res[1]).toBeCloseTo(0)
    expect(res[2]).toBeCloseTo(0)
    expect(res[3]).toBeCloseTo(1)
    expect(res[4]).toBeCloseTo(0)
    expect(res[5]).toBeCloseTo(0)
  })
})

describe('applyAffine', () => {
  it('apply affine to a vec', () => {
    const src: AffineMatrix = [1, 2, 3, 4, 5, 6]
    const res = geo.applyAffine(src, { x: 1, y: 2 })
    expect(res.x).toBeCloseTo(12)
    expect(res.y).toBeCloseTo(16)
  })
})

describe('omitSamePoint 隣接同一点オミット', () => {
  it('正しく取得できること', () => {
    const res = geo.omitSamePoint([
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 2, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 2 },
    ])
    expect(res).toHaveLength(4)
    expect(res[0]).toEqual({ x: 1, y: 2 })
    expect(res[1]).toEqual({ x: 1, y: 3 })
    expect(res[2]).toEqual({ x: 2, y: 2 })
    expect(res[3]).toEqual({ x: 2, y: 1 })
  })
})

describe('getRegularPolygonArea', () => {
  it('正三角形の面積が正しいこと', () => {
    const area = geo.getRegularPolygonArea(2, 3)
    expect(area).toBeCloseTo(((2 * Math.sqrt(3)) / 2) * 3)
  })
  it('正四角形の面積が正しいこと', () => {
    const area = geo.getRegularPolygonArea(2, 4)
    expect(area).toBeCloseTo(((2 * 2 * 2) / 2) * 2)
  })
  it('正六角形の面積が正しいこと', () => {
    const area = geo.getRegularPolygonArea(2, 6)
    expect(area).toBeCloseTo(((2 * Math.sqrt(3)) / 2) * 6)
  })
})

describe('getRegularPolygonRadius', () => {
  it('正三角形の半径が正しいこと', () => {
    const area = geo.getRegularPolygonRadius(((2 * Math.sqrt(3)) / 2) * 3, 3)
    expect(area).toBeCloseTo(2)
  })
  it('正四角形の半径が正しいこと', () => {
    const area = geo.getRegularPolygonRadius(((2 * 2 * 2) / 2) * 2, 4)
    expect(area).toBeCloseTo(2)
  })
  it('正六角形の半径が正しいこと', () => {
    const area = geo.getRegularPolygonRadius(((2 * Math.sqrt(3)) / 2) * 6, 6)
    expect(area).toBeCloseTo(2)
  })
})

describe('getIncludedPolygonGroups', () => {
  it('包含関係でグループ化されること', () => {
    const p1 = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ]
    const p2 = [
      { x: -1, y: -1 },
      { x: 2, y: -1 },
      { x: -1, y: 4 },
    ]
    const p3 = [
      { x: -2, y: -2 },
      { x: 3, y: -2 },
      { x: -2, y: 6 },
    ]
    const p4 = [
      { x: 0, y: 10 },
      { x: 1, y: 10 },
      { x: 0, y: 11 },
    ]
    const polygons = [p1, p2, p3, p4]
    const res = geo.getIncludedPolygonGroups(polygons)
    expect(res).toEqual([[p3, p2, p1], [p4]])
  })
})

describe('getPolygonNotPolygon', () => {
  it('シンプルなケース', () => {
    const p1 = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 3 },
      { x: 0, y: 3 },
    ]
    const p2 = [
      { x: 3, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 3, y: 2 },
    ]
    const res = geo.getPolygonNotPolygon(p1, p2)
    expect(res).toEqual([
      { x: 2, y: 3 },
      { x: 0, y: 3 },
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ])
  })
  it('ロジックの隙間を狙ったケース', () => {
    const p1 = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 3 },
      { x: 0, y: 3 },
    ]
    const p2 = [
      { x: 1, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 1 },
      { x: 1, y: 1 },
    ]
    const res = geo.getPolygonNotPolygon(p1, p2)
    expect(res).toEqual([
      { x: 2, y: 3 },
      { x: 0, y: 3 },
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ])
  })
  it('2箇所で差をとる必要があるケース', () => {
    const p1 = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 5 },
      { x: 0, y: 5 },
    ]
    const p2 = [
      { x: 3, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 3, y: 4 },
    ]
    const res = geo.getPolygonNotPolygon(p1, p2)
    expect(res).toEqual([
      { x: 2, y: 5 },
      { x: 0, y: 5 },
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 2, y: 4 },
    ])
  })
  it('サンプルケース1', () => {
    const p1 = [
      { x: 1, y: 0 },
      { x: 1, y: 10 },
      { x: 50, y: 10 },
      { x: 50, y: 0 },
    ]
    const p2 = [
      { x: 10, y: 30 },
      { x: 10, y: 5 },
      { x: 40, y: 5 },
      { x: 40, y: 30 },
    ]
    const res = geo.getPolygonNotPolygon(p1, p2)
    expect(res).toEqual([
      { x: 50, y: 10 },
      { x: 50, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 10 },
      { x: 10, y: 10 },
      { x: 10, y: 5 },
      { x: 40, y: 5 },
      { x: 40, y: 10 },
    ])
  })
})

describe('getOuterRectangle', () => {
  it('外接矩形取得', () => {
    expect(
      geo.getOuterRectangle([
        [
          { x: -2, y: 0 },
          { x: 0, y: 1 },
        ],
        [
          { x: 0, y: -1 },
          { x: 2, y: 0 },
        ],
      ])
    ).toEqual({
      x: -2,
      y: -1,
      width: 4,
      height: 2,
    })
  })
  it('ポリゴンなしならサイズ0の矩形取得', () => {
    expect(geo.getOuterRectangle([])).toEqual({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    })
  })
})

describe('getGrid', () => {
  it('グリッド取得', () => {
    expect(
      geo.getGrid(
        {
          x: 0,
          y: 1,
          width: 2,
          height: 3,
        },
        1
      )
    ).toEqual([
      [
        { x: 1, y: 1 },
        { x: 1, y: 4 },
      ],
      [
        { x: 0, y: 2 },
        { x: 2, y: 2 },
      ],
      [
        { x: 0, y: 3 },
        { x: 2, y: 3 },
      ],
    ])
  })
  it('グリッドずらし可能', () => {
    expect(
      geo.getGrid(
        {
          x: 0,
          y: 1,
          width: 2,
          height: 3,
        },
        1,
        0.1,
        -0.2
      )
    ).toEqual([
      [
        { x: 0.1, y: 1 },
        { x: 0.1, y: 4 },
      ],
      [
        { x: 1.1, y: 1 },
        { x: 1.1, y: 4 },
      ],
      [
        { x: 0, y: 1.8 },
        { x: 2, y: 1.8 },
      ],
      [
        { x: 0, y: 2.8 },
        { x: 2, y: 2.8 },
      ],
      [
        { x: 0, y: 3.8 },
        { x: 2, y: 3.8 },
      ],
    ])
  })
})

describe('expandRecntagle', () => {
  it('矩形をサイズ変更する', () => {
    expect(
      geo.expandRecntagle(
        {
          x: 0,
          y: 1,
          width: 2,
          height: 3,
        },
        2,
        4
      )
    ).toEqual({
      x: -1,
      y: -1,
      width: 4,
      height: 7,
    })
  })
})

describe('expandRecntagleScale', () => {
  it('矩形をサイズ変更する', () => {
    expect(
      geo.expandRecntagleScale(
        {
          x: 0,
          y: 1,
          width: 2,
          height: 3,
        },
        4,
        3
      )
    ).toEqual({
      x: -3,
      y: -2,
      width: 8,
      height: 9,
    })
  })
})

describe('interpolateScaler', () => {
  it('interpolate scaler', () => {
    expect(geo.interpolateScaler(1, 11, 0.2)).toEqual(3)
  })
})

describe('interpolateVector', () => {
  it('interpolate vector', () => {
    expect(
      geo.interpolateVector({ x: 1, y: 2 }, { x: 11, y: 22 }, 0.2)
    ).toEqual({
      x: 3,
      y: 6,
    })
  })
})

describe('solveQubicFomula', () => {
  it('1 real solution', () => {
    const ret = geo.solveQubicFomula(1, -14, 69, -108)
    expect(ret).toHaveLength(1)
    expect(ret[0]).toBeCloseTo(3)
  })
  it('2 real solutions', () => {
    const ret = geo.solveQubicFomula(1, 4, 5, 2)
    expect(ret).toHaveLength(2)
    expect(ret[0]).toBeCloseTo(-2)
    expect(ret[1]).toBeCloseTo(-1)
  })
  it('3 real solutions', () => {
    const ret = geo.solveQubicFomula(1, -12, 47, -60)
    expect(ret).toHaveLength(3)
    expect(ret[0]).toBeCloseTo(5)
    expect(ret[1]).toBeCloseTo(3)
    expect(ret[2]).toBeCloseTo(4)
  })
  it('quadratic: 2 real solutions', () => {
    const ret = geo.solveQubicFomula(0, 1, -5, 6)
    expect(ret).toHaveLength(2)
    expect(ret[0]).toBeCloseTo(3)
    expect(ret[1]).toBeCloseTo(2)
  })
  it('quadratic: 1 real solution', () => {
    const ret = geo.solveQubicFomula(0, 1, -4, 4)
    expect(ret).toHaveLength(1)
    expect(ret[0]).toBeCloseTo(2)
  })
  it('linear: 1 real solution', () => {
    const ret = geo.solveQubicFomula(0, 0, 1, 1)
    expect(ret).toHaveLength(1)
    expect(ret[0]).toBeCloseTo(-1)
  })
  it('Inappropriate: empty', () => {
    const ret = geo.solveQubicFomula(0, 0, 0, 1)
    expect(ret).toHaveLength(0)
  })
  it.each([
    [10, -30, 30, 0, [0]],
    [10, -30, 30, -10, [1]],
  ])('a: %s, b: %s, c: %s, d: %s => %s', (a, b, c, d, expected) => {
    const ret = geo.solveQubicFomula(a, b, c, d)
    ret.forEach((t, i) => {
      expect(t).toBeCloseTo(expected[i])
    })
  })
})

describe('clamp', () => {
  it.each([
    [0, 1, 2, 1],
    [0, 1, -1, 0],
    [0, 1, 0.2, 0.2],
  ])('clamp(%s, %s, %s) => %s', (min, max, val, expected) => {
    expect(geo.clamp(min, max, val)).toBe(expected)
  })
  it('only min', () => {
    expect(geo.clamp(1, undefined, -1)).toBe(1)
    expect(geo.clamp(1, undefined, 2)).toBe(2)
  })
  it('only max', () => {
    expect(geo.clamp(undefined, 1, -1)).toBe(-1)
    expect(geo.clamp(undefined, 1, 2)).toBe(1)
  })
})

describe('circleClamp', () => {
  it.each([
    [0, 0, 1.2, 0],
    [0, 1, 1.2, 0.2],
    [0, 1, -0.2, 0.8],
    [-1, 3, -2, 2],
    [-1, 3, 3.5, -0.5],
  ])('circleClamp(%s, %s, %s) => %s', (min, max, val, expected) => {
    expect(geo.circleClamp(min, max, val)).toBeCloseTo(expected)
  })
})

describe('roundTrip', () => {
  it.each([
    [0, 0, 1.2, 0],
    [1, 11, 0, 2],
    [1, 11, 1, 1],
    [1, 11, 2, 2],
    [1, 11, 11, 11],
    [1, 11, 12, 10],
  ])('roundTrip(%s, %s, %s) => %s', (min, max, val, expected) => {
    expect(geo.roundTrip(min, max, val)).toBeCloseTo(expected)
  })
})

describe('getBezierInterpolation', () => {
  it('should return empty array when the number of points is less than 3', () => {
    expect(geo.getBezierInterpolation([{ x: 0, y: 0 }])).toEqual([])
    expect(
      geo.getBezierInterpolation([
        { x: 0, y: 0 },
        { x: 10, y: 0 },
      ])
    ).toEqual([])
  })

  it('should deal with point duplication', () => {
    expect(
      geo.getBezierInterpolation([
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ])
    ).toEqual([
      [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
    ])
  })

  it('should return bezier control points', () => {
    const ret0 = geo.getBezierInterpolation([
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
    ])
    expect(ret0[0][0].x).toBeCloseTo(4.167, 3)
    expect(ret0[0][0].y).toBeCloseTo(-0.833, 3)
    expect(ret0[0][1].x).toBeCloseTo(8.333, 3)
    expect(ret0[0][1].y).toBeCloseTo(-1.667, 3)
    expect(ret0[1][0].x).toBeCloseTo(11.667, 3)
    expect(ret0[1][0].y).toBeCloseTo(1.667, 3)
    expect(ret0[1][1].x).toBeCloseTo(10.833, 3)
    expect(ret0[1][1].y).toBeCloseTo(5.833, 3)
  })

  it('should return bezier control points: non-zero origin', () => {
    const points = [
      { x: 1, y: 1 },
      { x: 11, y: 1 },
      { x: 11, y: 11 },
    ]
    const ret0 = geo.getBezierInterpolation(points)
    expect(ret0).toHaveLength(2)
    expect(ret0[0][0].x).toBeCloseTo(5.167, 3)
    expect(ret0[0][0].y).toBeCloseTo(0.167, 3)
    expect(ret0[1][1].x).toBeCloseTo(11.833, 3)
    expect(ret0[1][1].y).toBeCloseTo(6.833, 3)
  })
})

describe('getPeriodicBezierInterpolation', () => {
  it('should return empty array when the number of points is less than 3', () => {
    expect(geo.getPeriodicBezierInterpolation([{ x: 0, y: 0 }])).toEqual([])
    expect(
      geo.getPeriodicBezierInterpolation([
        { x: 0, y: 0 },
        { x: 10, y: 0 },
      ])
    ).toEqual([])
  })

  it('should deal with point duplication', () => {
    expect(
      geo.getPeriodicBezierInterpolation([
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ])
    ).toEqual([
      [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
    ])
  })

  it('should return bezier control points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
      { x: 0, y: 10 },
      { x: 0, y: 0 },
    ]
    const ret0 = geo.getPeriodicBezierInterpolation(points)
    expect(ret0).toHaveLength(4)
    expect(ret0[0][0].x).toBeCloseTo(2.5)
    expect(ret0[0][0].y).toBeCloseTo(-2.5)
    expect(ret0[0][1].x).toBeCloseTo(7.5)
    expect(ret0[0][1].y).toBeCloseTo(-2.5)
    expect(ret0[1][0].x).toBeCloseTo(12.5)
    expect(ret0[1][0].y).toBeCloseTo(2.5)
    expect(ret0[1][1].x).toBeCloseTo(12.5)
    expect(ret0[1][1].y).toBeCloseTo(7.5)
    expect(ret0[3][1].x).toBeCloseTo(-2.5)
    expect(ret0[3][1].y).toBeCloseTo(2.5)
  })

  it('should return bezier control points: non-zero origin', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
      { x: 0, y: 10 },
      { x: 0, y: 0 },
    ]
    const ret0 = geo.getPeriodicBezierInterpolation(points)
    const origin = { x: 100, y: 200 }
    const shift = geo.getPeriodicBezierInterpolation(
      points.map((p) => geo.add(p, origin))
    )
    ret0.forEach(([c1, c2], i) => {
      expect(c1.x).toBeCloseTo(shift[i][0].x - origin.x)
      expect(c1.y).toBeCloseTo(shift[i][0].y - origin.y)
      expect(c2.x).toBeCloseTo(shift[i][1].x - origin.x)
      expect(c2.y).toBeCloseTo(shift[i][1].y - origin.y)
    })
  })
})

describe('getCrossSegAndBezier3', () => {
  it('should retun intersections between a segment and a cubic bezier', () => {
    const bezier = [
      { x: 0, y: 0 },
      { x: 5, y: -10 },
      { x: 5, y: 10 },
      { x: 10, y: 0 },
    ] as const

    expect(
      geo.getCrossSegAndBezier3(
        [
          { x: -10, y: -2 },
          { x: -2, y: -2 },
        ],
        bezier
      )
    ).toHaveLength(0)

    const res0 = geo.getCrossSegAndBezier3(
      [
        { x: 0, y: 2 },
        { x: 10, y: 2 },
      ],
      bezier
    )
    res0.sort((a, b) => a.x - b.x)
    expect(res0).toHaveLength(2)
    expect(res0[0].x).toBeCloseTo(6.124)
    expect(res0[0].y).toBeCloseTo(2)
    expect(res0[1].x).toBeCloseTo(8.776)
    expect(res0[1].y).toBeCloseTo(2)

    const res1 = geo.getCrossSegAndBezier3(
      [
        { x: 0, y: 12 },
        { x: 10, y: 12 },
      ],
      bezier
    )
    expect(res1).toHaveLength(0)

    const res2 = geo.getCrossSegAndBezier3(
      [
        { x: 0, y: 5 },
        { x: 10, y: -5 },
      ],
      bezier
    )
    expect(res2).toHaveLength(1)
    expect(res2[0].x).toBeCloseTo(5)
    expect(res2[0].y).toBeCloseTo(0)

    const res3 = geo.getCrossSegAndBezier3(
      [
        { x: 0, y: 5 },
        { x: 0, y: -5 },
      ],
      bezier
    )
    expect(res3).toHaveLength(1)
    expect(res3[0].x).toBeCloseTo(0)
    expect(res3[0].y).toBeCloseTo(0)

    const res4 = geo.getCrossSegAndBezier3(
      [
        { x: 10, y: 5 },
        { x: 10, y: -5 },
      ],
      bezier
    )
    expect(res4).toHaveLength(1)
    expect(res4[0].x).toBeCloseTo(10)
    expect(res4[0].y).toBeCloseTo(0)

    const res5 = geo.getCrossSegAndBezier3(
      [
        { x: 10, y: 0 },
        { x: 10, y: -5 },
      ],
      bezier
    )
    expect(res5).toHaveLength(1)
    expect(res5[0].x).toBeCloseTo(10)
    expect(res5[0].y).toBeCloseTo(0)
  })
})

describe('getCrossLineAndBezier3', () => {
  it('should retun intersections between a line and a cubic bezier', () => {
    const bezier = [
      { x: 0, y: 0 },
      { x: 5, y: -10 },
      { x: 5, y: 10 },
      { x: 10, y: 0 },
    ] as const

    expect(
      geo.getCrossLineAndBezier3(
        [
          { x: -10, y: -2 },
          { x: -2, y: -2 },
        ],
        bezier
      )
    ).toHaveLength(2)

    const res0 = geo.getCrossLineAndBezier3(
      [
        { x: 0, y: 2 },
        { x: 10, y: 2 },
      ],
      bezier
    )
    res0.sort((a, b) => a.x - b.x)
    expect(res0).toHaveLength(2)
    expect(res0[0].x).toBeCloseTo(6.124)
    expect(res0[0].y).toBeCloseTo(2)
    expect(res0[1].x).toBeCloseTo(8.776)
    expect(res0[1].y).toBeCloseTo(2)
  })
})

describe('divideBezier3', () => {
  it('should return divided beziers', () => {
    const bezier = [
      { x: 0, y: 0 },
      { x: 5, y: -10 },
      { x: 5, y: 10 },
      { x: 10, y: 0 },
    ] as const
    const lerp = geo.getBezier3LerpFn(bezier)

    const res0 = geo.divideBezier3(bezier, 0.5)
    const lerp00 = geo.getBezier3LerpFn(res0[0])
    const lerp01 = geo.getBezier3LerpFn(res0[1])
    expect(lerp00(0.2).x).toBeCloseTo(lerp(0.1).x)
    expect(lerp00(0.2).y).toBeCloseTo(lerp(0.1).y)
    expect(lerp01(0.2).x).toBeCloseTo(lerp(0.6).x)
    expect(lerp01(0.2).y).toBeCloseTo(lerp(0.6).y)
  })
})

describe('getClosestPointOnBezier3', () => {
  it('should return closest point on a bezier', () => {
    const bezier = [
      { x: 0, y: 0 },
      { x: 5, y: -10 },
      { x: 5, y: 10 },
      { x: 10, y: 0 },
    ] as const

    const res0 = geo.getClosestPointOnBezier3(bezier, { x: 0, y: -10 }, 0.1)
    expect(res0.x).toBeCloseTo(2.272)
    expect(res0.y).toBeCloseTo(-2.834)

    const res1 = geo.getClosestPointOnBezier3(bezier, { x: 2, y: -2 }, 0.01)
    expect(res1.x).toBeCloseTo(1.615)
    expect(res1.y).toBeCloseTo(-2.42)

    const res2 = geo.getClosestPointOnBezier3(bezier, { x: -5, y: -5 }, 0.01)
    expect(res2.x).toBeCloseTo(0.714)
    expect(res2.y).toBeCloseTo(-1.282)

    const res3 = geo.getClosestPointOnBezier3(bezier, { x: 5, y: 10 }, 0.01)
    expect(res3.x).toBeCloseTo(7.126)
    expect(res3.y).toBeCloseTo(2.845)
  })
})

describe('getCrossBezier3AndBezier3', () => {
  it('should return intersections between two cubic Bezier curves', () => {
    const bezier1 = [
      { x: 0, y: 0 },
      { x: 5, y: -10 },
      { x: 5, y: 10 },
      { x: 10, y: 0 },
    ] as const

    const bezier2 = [
      { x: 10, y: -5 },
      { x: 5, y: -5 },
      { x: 5, y: 5 },
      { x: 10, y: 5 },
    ] as const

    const intersections = geo.getCrossBezier3AndBezier3(bezier1, bezier2)
    expect(intersections).toHaveLength(1)
    expect(intersections[0].x).toBeCloseTo(6.77416777)
    expect(intersections[0].y).toBeCloseTo(2.67337137)
  })

  it('should return multiple intersections between two cubic Bezier curves', () => {
    const bezier1 = [
      { x: 0, y: 0 },
      { x: 5, y: -10 },
      { x: 5, y: 10 },
      { x: 10, y: 0 },
    ] as const

    const bezier2 = [
      { x: 10, y: 1 },
      { x: 5, y: 1 },
      { x: 5, y: 5 },
      { x: 10, y: 5 },
    ] as const

    const intersections = geo.getCrossBezier3AndBezier3(bezier1, bezier2)
    expect(intersections).toHaveLength(2)
    expect(intersections[0].x).toBeCloseTo(6.42289369)
    expect(intersections[0].y).toBeCloseTo(2.36573766)
    expect(intersections[1].x).toBeCloseTo(9.44889476)
    expect(intersections[1].y).toBeCloseTo(1.01706455)
  })

  it('should return empty array when two cubic Bezier curves have no intersection', () => {
    const bezier1 = [
      { x: 0, y: 0 },
      { x: 5, y: -10 },
      { x: 5, y: 10 },
      { x: 10, y: 0 },
    ] as const

    const bezier2 = [
      { x: 10, y: 4 },
      { x: 5, y: 4 },
      { x: 5, y: 10 },
      { x: 10, y: 10 },
    ] as const

    const intersections = geo.getCrossBezier3AndBezier3(bezier1, bezier2)
    expect(intersections).toHaveLength(0)
  })

  it('should regard vertices', () => {
    const bezier1 = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 0 },
    ] as const

    const bezier2 = [
      { x: 10, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
      { x: 10, y: 10 },
    ] as const

    const intersections1 = geo.getCrossBezier3AndBezier3(bezier1, bezier2)
    expect(intersections1).toHaveLength(1)
    expect(intersections1[0].x).toBeCloseTo(10)
    expect(intersections1[0].y).toBeCloseTo(0)

    const bezier3 = [
      { x: 5, y: 0 },
      { x: 5, y: 0 },
      { x: 5, y: 10 },
      { x: 5, y: 10 },
    ] as const
    const intersections2 = geo.getCrossBezier3AndBezier3(bezier1, bezier3)
    expect(intersections2).toHaveLength(1)
    expect(intersections2[0].x).toBeCloseTo(5)
    expect(intersections2[0].y).toBeCloseTo(0)
  })
})
