import { IVec2, IRectangle, AffineMatrix } from './types'

export const MINVALUE: number = 0.000001

export const IDENTITY_AFFINE: AffineMatrix = [1, 0, 0, 1, 0, 0]

export function vec(x: number, y: number): IVec2 {
  return { x, y }
}

export function add(a: IVec2, b: IVec2): IVec2 {
  return vec(a.x + b.x, a.y + b.y)
}

export function sub(a: IVec2, b: IVec2): IVec2 {
  return vec(a.x - b.x, a.y - b.y)
}

export function multi(a: IVec2, b: number): IVec2 {
  return vec(a.x * b, a.y * b)
}

export function isSame(a: IVec2, b: IVec2): boolean {
  const dif: IVec2 = sub(a, b)
  return Math.abs(dif.x) < MINVALUE && Math.abs(dif.y) < MINVALUE
}

export function getDistance(a: IVec2, b: IVec2): number {
  return getNorm(sub(a, b))
}

export function getNorm(a: IVec2): number {
  return Math.sqrt(a.x * a.x + a.y * a.y)
}

export function isZero(a: IVec2): boolean {
  return getNorm(a) < MINVALUE
}

export function getUnit(a: IVec2): IVec2 {
  const d = getNorm(a)
  if (d < MINVALUE) throw new Error('cannot get unit vector of zero vector')
  return multi(a, 1 / d)
}

export function getCross(a: IVec2, b: IVec2): number {
  return a.x * b.y - a.y * b.x
}

export function getInner(a: IVec2, b: IVec2): number {
  return a.x * b.x + a.y * b.y
}

export function cloneVectors(vectors: IVec2[]): IVec2[] {
  return vectors.map((v) => ({ ...v }))
}

export function getCenter(a: IVec2, b: IVec2): IVec2 {
  return multi(add(a, b), 1 / 2)
}

export function getRectCenter(rec: IRectangle): IVec2 {
  return vec(rec.x + rec.width / 2, rec.y + rec.height / 2)
}

export function getPolygonCenter(polygon: IVec2[]): IVec2 {
  if (polygon.length === 0) return vec(0, 0)

  return multi(
    polygon.reduce((p, c) => add(p, c), vec(0, 0)),
    1 / polygon.length
  )
}

export function getRadian(a: IVec2, from: IVec2 = vec(0, 0)): number {
  const dif = sub(a, from)
  return Math.atan2(dif.y, dif.x)
}

/**
 * fromに対して、aと点対称なベクトル取得
 * @param a 対象ベクトル
 * @param from 基点
 * @param 点対称ベクトル
 */
export function getSymmetry(a: IVec2, from: IVec2 = vec(0, 0)): IVec2 {
  return add(multi(sub(from, a), 2), a)
}

/**
 * fromに対して、aからradian回転したベクトル取得
 * @param a 対象ベクトル
 * @param radian 回転ラジアン
 * @param from 基点
 * @param 回転後のベクトル
 */
export function rotate(
  a: IVec2,
  radian: number,
  from: IVec2 = vec(0, 0)
): IVec2 {
  const fromBase: IVec2 = sub(a, from)
  return add(
    vec(
      Math.cos(radian) * fromBase.x - Math.sin(radian) * fromBase.y,
      Math.sin(radian) * fromBase.x + Math.cos(radian) * fromBase.y
    ),
    from
  )
}

/**
 * 2次方程式の解の公式
 * a * x^2 + b * x + c = 0
 * 解に虚数が含まれる場合は解なし扱い
 * @param a x^2の係数
 * @param b xの係数
 * @param c 定数
 * @return 解の配列
 */
export function solveEquationOrder2(a: number, b: number, c: number): number[] {
  if (isCloseToZero(a)) {
    return isCloseToZero(b) ? [] : [-c / b]
  }

  const d = b * b - 4 * a * c
  if (d < 0) {
    return []
  }

  const ia = 0.5 / a

  if (isCloseToZero(d)) {
    return [-b * ia]
  }

  const sd = Math.sqrt(d)
  return [(-b + sd) * ia, (-b - sd) * ia]
}

/**
 * 点から直線への垂線の足
 * @param p 対象の点
 * @param line 直線
 * @return 垂線の足
 */
export function getPedal(p: IVec2, line: IVec2[]): IVec2 {
  if (line.length !== 2) throw new Error('line must be length = 2')
  const s = line[0]
  const t = line[1]
  const vecST = sub(t, s)
  const vecSP = sub(p, s)
  const inner = getInner(vecST, vecSP)
  const rate = inner / getInner(vecST, vecST)
  return add(s, multi(vecST, rate))
}

/**
 * 2次ベジェ曲線と直線の当たり判定用パラメータを取得する
 * @param p0 ベジェ曲線始点
 * @param p1 ベジェ曲線制御点
 * @param p2 ベジェ曲線終点
 * @param p 直線始点
 * @param q 直線終点
 * @return ベジェ曲線パラメータ配列
 */
function rayToBezier(
  p0: IVec2,
  p1: IVec2,
  p2: IVec2,
  p: IVec2,
  q: IVec2
): number[] {
  const vx: number = q.x - p.x
  const vy: number = q.y - p.y
  const a: number = p0.x - 2 * p1.x + p2.x
  const b: number = 2 * (p1.x - p0.x)
  const c: number = p0.x
  const d: number = p0.y - 2 * p1.y + p2.y
  const e: number = 2 * (p1.y - p0.y)
  const f: number = p0.y

  return solveEquationOrder2(
    a * vy - vx * d,
    b * vy - vx * e,
    vy * c - vy * p.x - vx * f + vx * p.y
  )
}

/**
 * 2次ベジェ曲「線分」と「直線」の交点を取得する
 * @method crossLineAndBezier
 * @param p0 ベジェ曲線始点
 * @param p1 ベジェ曲線制御点
 * @param p2 ベジェ曲線終点
 * @param p 直線始点
 * @param q 直線終点
 * @return 交点リスト
 */
export function getCrossLineAndBezier(
  p0: IVec2,
  p1: IVec2,
  p2: IVec2,
  p: IVec2,
  q: IVec2
) {
  return rayToBezier(p0, p1, p2, p, q)
    .filter((t) => 0 <= t && t <= 1)
    .map((t) =>
      vec(
        (p2.x - 2 * p1.x + p0.x) * t * t + 2 * (p1.x - p0.x) * t + p0.x,
        (p2.y - 2 * p1.y + p0.y) * t * t + 2 * (p1.y - p0.y) * t + p0.y
      )
    )
}

/**
 * 線分と線分の交差判定（端点での接触は含まない）
 * @param seg1 線分1
 * @param seg2 線分2
 * @return 交差しているフラグ
 */
export function isCrossSegAndSeg(seg1: IVec2[], seg2: IVec2[]): boolean {
  const { ta, tb, tc, td } = getCrossSegAndSegParams(seg1, seg2)
  return tc * td < 0 && ta * tb < 0
}

/**
 * 線分と線分の接触判定（端点での接触含む）
 * @param seg1 線分1
 * @param seg2 線分2
 * @return 接触しているフラグ
 */
export function isTouchSegAndSeg(seg1: IVec2[], seg2: IVec2[]): boolean {
  const { ta, tb, tc, td } = getCrossSegAndSegParams(seg1, seg2)
  return tc * td <= 0 && ta * tb <= 0
}

function getCrossSegAndSegParams(
  seg1: IVec2[],
  seg2: IVec2[]
): {
  ta: number
  tb: number
  tc: number
  td: number
} {
  const ax = seg1[0].x
  const ay = seg1[0].y
  const bx = seg1[1].x
  const by = seg1[1].y
  const cx = seg2[0].x
  const cy = seg2[0].y
  const dx = seg2[1].x
  const dy = seg2[1].y
  const ta = (cx - dx) * (ay - cy) + (cy - dy) * (cx - ax)
  const tb = (cx - dx) * (by - cy) + (cy - dy) * (cx - bx)
  const tc = (ax - bx) * (cy - ay) + (ay - by) * (ax - cx)
  const td = (ax - bx) * (dy - ay) + (ay - by) * (ax - dx)
  return { ta, tb, tc, td }
}

/**
 * 平行判定
 * @param a ベクトル or 2点の配列
 * @param b 同上
 * @return 平行であるフラグ
 */
export function isParallel(a: IVec2, b: IVec2): boolean {
  const cross = getCross(a, b)
  return Math.abs(cross) < MINVALUE
}

/**
 * 点が直線上にあるか判定
 * @param p 点
 * @param line 直線
 * @return 直線上にあるフラグ
 */
export function isOnLine(p: IVec2, line: IVec2[]): boolean {
  return isZero(sub(p, getPedal(p, line)))
}

/**
 * 点が線分上にあるか判定
 * @param p 点
 * @param seg 線分
 * @return 線分上にあるフラグ
 */
export function isOnSeg(p: IVec2, seg: IVec2[]): boolean {
  if (!isZero(sub(p, getPedal(p, seg)))) return false
  const v1 = sub(seg[1], seg[0])
  const v2 = sub(p, seg[0])
  if (getInner(v1, v2) < 0) return false
  if (getNorm(v1) < getNorm(v2)) return false
  return true
}

/**
 * 点から正の方向へ伸ばした水平線が線分と交差するか判定
 * 点が面上にあるか判定に利用する
 * 点が線分上の場合はfalse
 * @param p 点
 * @param seg 線分
 * @return 交差するフラグ
 */
function isCrossSegAndRightHorizon(p: IVec2, seg: IVec2[]): boolean {
  // 平行な場合はfalse
  if (Math.abs(seg[0].y - seg[1].y) < MINVALUE) {
    return false
  }

  // 線分の上側端点との接触はfalse、下側端点との接触はtrueで統一
  let top, bottom
  if (seg[0].y < seg[1].y) {
    ;[bottom, top] = seg
  } else {
    ;[top, bottom] = seg
  }
  if (p.y < bottom.y || top.y <= p.y) {
    return false
  }

  // 交点は厳密にpの右側でなければいけない
  const cross = getCrossSegAndLine(seg, [p, vec(p.x + 1, p.y)])
  if (!cross || cross.x <= p.x) {
    return false
  }

  return true
}

/**
 * 点が面上にあるか判定（境界線上を含む）
 * @param p 点
 * @param polygon 面
 * @return 面上にあるフラグ
 */
export function isOnPolygon(p: IVec2, polygon: IVec2[]): boolean {
  // 頂点上判定
  if (polygon.find((point) => p.x === point.x && p.y === point.y)) return true

  const segs: IVec2[][] = polygon
    .map((point, i) => {
      return [point, i < polygon.length - 1 ? polygon[i + 1] : polygon[0]]
    })
    // 長さ0の辺は扱わない
    .filter((seg) => !isSame(seg[0], seg[1]))

  // 辺上判定
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i]
    if (isOnSeg(p, seg)) {
      return true
    }
  }

  const hitSegs = segs.filter((seg) => isCrossSegAndRightHorizon(p, seg))
  return hitSegs.length % 2 === 1
}

/**
 * 線分と直線の交点取得
 * @param seg 線分
 * @param line 直線
 * @return 交点
 */
export function getCrossSegAndLine(seg: IVec2[], line: IVec2[]): IVec2 | null {
  if (isParallel(sub(seg[0], seg[1]), sub(line[0], line[1]))) return null
  if (isOnLine(seg[0], line)) return { ...seg[0] }
  if (isOnLine(seg[1], line)) return { ...seg[1] }

  const s1 =
    ((line[1].x - line[0].x) * (seg[0].y - line[0].y) -
      (line[1].y - line[0].y) * (seg[0].x - line[0].x)) /
    2
  const s2 =
    ((line[1].x - line[0].x) * (line[0].y - seg[1].y) -
      (line[1].y - line[0].y) * (line[0].x - seg[1].x)) /
    2
  const rate = s1 / (s1 + s2)
  const isExistCorss = 0 < rate && rate < 1

  return isExistCorss
    ? vec(
        seg[0].x + (seg[1].x - seg[0].x) * rate,
        seg[0].y + (seg[1].y - seg[0].y) * rate
      )
    : null
}

/**
 * 同一線分かを判定する
 * @param ab 線分ab
 * @param cd 線分cd
 * @return 同一であるフラグ
 */
export function isSameSeg(ab: IVec2[], cd: IVec2[]): boolean {
  if (isSame(ab[0], cd[0]) && isSame(ab[1], cd[1])) return true
  if (isSame(ab[0], cd[1]) && isSame(ab[1], cd[0])) return true
  return false
}

/**
 * ポリゴンを直線で分割する
 * @param pol 面
 * @param line 直線
 * @return 分割された点配列の配列
 */
export function splitPolyByLine(pol: IVec2[], line: IVec2[]): IVec2[][] {
  let points: IVec2[] = []
  let crossIndex: number[] = []
  let crossList: IVec2[] = []

  pol.forEach((p, i) => {
    const targetLine = [p, pol[(i + 1) % pol.length]]
    const cross = getCrossSegAndLine(targetLine, line)
    points.push(p)
    if (cross) {
      points.push(cross)
      crossIndex.push(i + 1 + crossIndex.length)
      crossList.push(cross)
    }
  })

  if (crossIndex.length % 2 !== 0) return []

  // 近い順に並べる -> 直線をx軸と重なるよう回転してx座標で比較
  const rad: number = getRadian(line[0], line[1])
  crossList.sort((a, b) => rotate(a, -rad).x - rotate(b, -rad).x)

  // 面の辺と同一ではないものを採用
  let targetSection: IVec2[] = []
  for (let k = 0; k < crossList.length - 1; k += 2) {
    const section = [crossList[k], crossList[k + 1]]
    let sameSeg = false
    for (let l = 0; l < pol.length; l++) {
      if (isSameSeg(section, [pol[l], pol[(l + 1) % pol.length]])) {
        sameSeg = true
        break
      }
    }

    if (!sameSeg) {
      targetSection = section
      break
    }
  }

  if (targetSection.length !== 2) return []

  // 除外対象回収
  const dropList = crossList.concat()
  let tmpIndex = dropList.indexOf(targetSection[0])
  if (tmpIndex !== -1) {
    dropList.splice(tmpIndex, 1)
  }
  tmpIndex = dropList.indexOf(targetSection[1])
  if (tmpIndex !== -1) {
    dropList.splice(tmpIndex, 1)
  }
  const tmpList = points.concat()
  dropList.forEach((p) => {
    const i = tmpList.indexOf(p)
    tmpList.splice(i, 1)
  })

  points = tmpList
  crossList = targetSection

  const i0 = points.indexOf(crossList[0])
  const i1 = points.indexOf(crossList[1])

  if (i0 === -1 || i1 === -1) return []

  crossIndex = []
  crossIndex[0] = Math.min(i0, i1)
  crossIndex[1] = Math.max(i0, i1)

  // 分割ポリゴンを拾い集める
  const splitedPolygons = []

  // 1つ目
  let splitPol = []
  // 交点まで追加
  for (let i = 0; i <= crossIndex[0]; i++) {
    splitPol.push(vec(points[i].x, points[i].y))
  }
  // 交点から追加
  for (let i = crossIndex[1]; i < points.length; i++) {
    splitPol.push(vec(points[i].x, points[i].y))
  }
  // 確定
  splitedPolygons.push(splitPol)

  // 2つ目
  splitPol = []
  // 交点から交点まで追加
  for (let i = crossIndex[0]; i <= crossIndex[1]; i++) {
    splitPol.push(vec(points[i].x, points[i].y))
  }
  // 確定
  splitedPolygons.push(splitPol)

  // 再帰的に分割
  const recursiveResult: IVec2[][] = []
  splitedPolygons.forEach((polygon) => {
    const splited = splitPolyByLine(polygon, line)
    if (splited.length === 0) {
      recursiveResult.push(polygon)
    } else {
      recursiveResult.push(...splited)
    }
  })

  return recursiveResult
}

/**
 * 三角分割
 * @param polygon 面
 * @return 分割面リスト
 */
export function triangleSplit(polygon: IVec2[]): IVec2[][] {
  // 時計周りに揃える
  polygon = convertLoopwise(polygon)

  // ポリゴン複製
  const targetPoly = omitSamePoint(polygon)

  // 最遠点のインデックス
  let farthestIndex = 0
  // 現在の最遠点と前後点で作った三角形の外積
  let currentCross = 0
  // 分割後の面リスト
  const triangleList = []

  // ループ
  while (targetPoly.length >= 3) {
    // 最遠点インデックス取得
    const sorted = targetPoly.concat()
    sorted.sort((a, b) => {
      return getNorm(b) - getNorm(a)
    })
    farthestIndex = targetPoly.indexOf(sorted[0])

    // 分割実行
    let tri = getTriangle(targetPoly, farthestIndex)
    if (!tri) {
      // 最遠点では失敗
      const size = targetPoly.length
      // 外積計算
      const pa = sub(
        targetPoly[(farthestIndex + 1) % size],
        targetPoly[farthestIndex]
      )
      const pb = sub(
        targetPoly[farthestIndex - 1 < 0 ? size - 1 : farthestIndex - 1],
        targetPoly[farthestIndex]
      )

      currentCross = getCross(pa, pb)

      let index = farthestIndex
      // 最遠点以外で探す
      while (!tri) {
        index = (index + 1) % size
        // 最遠点の外積と同じ符号かを判定
        const v1 = sub(targetPoly[(index + 1) % size], targetPoly[index])
        const v2 = sub(
          targetPoly[index - 1 < 0 ? size - 1 : index - 1],
          targetPoly[index]
        )
        const tmpCross = getCross(v1, v2)
        if (tmpCross * currentCross > 0) {
          // 判定続行
          tri = getTriangle(targetPoly, index)
        }
        if (index === farthestIndex) {
          throw new Error('failed to split triangles')
        }
      }

      // 採用された点を削除
      targetPoly.splice(index, 1)
    } else {
      // 最遠点削除
      targetPoly.splice(farthestIndex, 1)
    }
    triangleList.push(tri)
  }
  return triangleList
}

/**
 * 面から三角形を取得する
 * @param polygon 面
 * @param index このインデックスの点とその両側の点で三角形を作る
 * @return 三角形、内部に入り込む点がある場合はnull
 */
function getTriangle(polygon: IVec2[], index: number): IVec2[] | null {
  // indexとその前後点で三角形作成
  const size = polygon.length
  const p0 = polygon[index]
  const p1 = polygon[(index + 1) % size]
  const p2 = polygon[index - 1 < 0 ? size - 1 : index - 1]

  const tri: IVec2[] = [p0, p1, p2]

  // 内部に点が入り込まないか判定
  let invalid: boolean = false
  polygon.some((p) => {
    if (p !== p0 && p !== p1 && p !== p2) {
      if (isPointOnTriangle(tri, p)) {
        // 失敗
        invalid = true
      }
    }
    return invalid
  })

  return invalid ? null : tri
}

/**
 * 点が三角形内にあるかを判定する
 * 境界も含む
 * @param tri 三角形
 * @param p 点
 * @return 内部にあるフラグ
 */
export function isPointOnTriangle(tri: IVec2[], p: IVec2): boolean {
  // 三角形の3つのベクトル
  const ab = sub(tri[1], tri[0])
  const bc = sub(tri[2], tri[1])
  const ca = sub(tri[0], tri[2])

  // 三角形の各点からpへのベクトル
  const ap = sub(p, tri[0])
  const bp = sub(p, tri[1])
  const cp = sub(p, tri[2])

  // 外積を求める
  const crossABP = getCross(ab, bp)
  const crossBCP = getCross(bc, cp)
  const crossCAP = getCross(ca, ap)

  // 外積の符号が全て同じなら内部にある
  // 0も含む→境界も含む
  if (
    (crossABP >= 0 && crossBCP >= 0 && crossCAP >= 0) ||
    (crossABP <= 0 && crossBCP <= 0 && crossCAP <= 0)
  ) {
    return true
  }

  return false
}

/**
 * 面を時計回りに変換する
 * @param {vector[]} 面
 * @return 時計回りにした面(引数とは別配列にする)
 */
export function convertLoopwise(polygon: IVec2[]): IVec2[] {
  const ret = polygon.concat()
  if (getLoopwise(polygon) === -1) {
    ret.reverse()
  }
  return ret
}

/**
 * 面の座標が時計回りかを判定する
 * @param polygon 面
 * @return -1:反時計 0:不定 1:時計
 */
export function getLoopwise(polygon: IVec2[]): number {
  const area = getArea(polygon, true)
  if (area > 0) return 1
  if (area < 0) return -1
  return 0
}

/**
 * 面積取得
 * @param polygon 面
 * @param allowNegative 負値を許すフラグ
 * @return 面積
 */
export function getArea(
  polygon: IVec2[],
  allowNegative: boolean = false
): number {
  if (polygon.length < 3) return 0

  let area = 0
  const size = polygon.length
  for (let i = 0; i < size - 1; i++) {
    area +=
      (polygon[i].x - polygon[i + 1].x) * (polygon[i].y + polygon[i + 1].y)
  }
  // 最後分
  area +=
    (polygon[size - 1].x - polygon[0].x) * (polygon[size - 1].y + polygon[0].y)

  area /= 2

  // 負値を許さないなら絶対値
  if (!allowNegative) {
    area = Math.abs(area)
  }

  return area
}

/**
 * ベジェ曲線を直線で近似する(３次まで対応)
 * @param pointList 制御点リスト
 * @param size 分割数(1なら制御点両端のみ)
 * @return 座標リスト
 */
export function approximateBezier(pointList: IVec2[], size: number): IVec2[] {
  const ret: IVec2[] = []
  const unitT: number = 1 / size

  if (pointList.length === 3) {
    // ２次ベジェの場合
    for (let i = 0; i <= size; i++) {
      ret.push(getPointOnBezier2(pointList as [IVec2, IVec2, IVec2], unitT * i))
    }
  } else if (pointList.length === 4) {
    // 3次ベジェの場合
    for (let i = 0; i <= size; i++) {
      ret.push(
        getPointOnBezier3(pointList as [IVec2, IVec2, IVec2, IVec2], unitT * i)
      )
    }
  } else {
    throw new Error('connot approximate')
  }

  return ret
}

/**
 * get point with the rate on bezier2
 * @param pointList controller points
 * @param rate rate between start point and end point
 * @return calced point
 */
export function getPointOnBezier2(
  pointList: Readonly<[IVec2, IVec2, IVec2]>,
  rate: number
): IVec2 {
  const t = rate
  const c0 = multi(pointList[0], (1 - t) * (1 - t))
  const c1 = multi(pointList[1], 2 * t * (1 - t))
  const c2 = multi(pointList[2], t * t)
  return vec(c0.x + c1.x + c2.x, c0.y + c1.y + c2.y)
}

/**
 * get point with the rate on bezier3
 * @param pointList controller points
 * @param rate rate between start point and end point
 * @return calced point
 */
export function getPointOnBezier3(
  pointList: Readonly<[IVec2, IVec2, IVec2, IVec2]>,
  rate: number
): IVec2 {
  const t = rate
  const c0 = multi(pointList[0], (1 - t) * (1 - t) * (1 - t))
  const c1 = multi(pointList[1], 3 * t * (1 - t) * (1 - t))
  const c2 = multi(pointList[2], 3 * t * t * (1 - t))
  const c3 = multi(pointList[3], t * t * t)
  return vec(c0.x + c1.x + c2.x + c3.x, c0.y + c1.y + c2.y + c3.y)
}

/**
 * get point with the rate on bezier3
 * need these conditions to get unique value
 * p0.x <= p1.x <= p3.x
 * p0.x <= p2.x <= p3.x
 * or may cause unexpected NaN
 * @param pointList controller points [p0, p1, p2, p3]
 * @param rate rate between start point and end point
 * @return calced point
 */
export function getYOnBezier3AtX(
  pointList: Readonly<[IVec2, IVec2, IVec2, IVec2]>,
  x: number
): number {
  const [p0, p1, p2, p3] = pointList
  const a = -p0.x + 3 * p1.x - 3 * p2.x + p3.x
  const b = 3 * p0.x - 6 * p1.x + 3 * p2.x
  const c = -3 * p0.x + 3 * p1.x
  const d = p0.x - x

  const t = solveBezier3Fomula(a, b, c, d)
  const tt = t * t
  const ttt = tt * t
  const tm = 1 - t
  const tmtm = tm * tm
  const tmtmtm = tmtm * tm

  return tmtmtm * p0.y + 3 * t * tmtm * p1.y + 3 * tt * tm * p2.y + ttt * p3.y
}

/**
 * 円弧を直線で近似する
 * @param rx x軸半径
 * @param ry y軸半径
 * @param startRadian 開始ラジアン
 * @param endRadian 終了ラジアン
 * @param center 中心座標
 * @param radian 傾き
 * @param size 分割数
 * @return 座標リスト
 */
export function approximateArc(
  rx: number,
  ry: number,
  startRadian: number,
  endRadian: number,
  center: IVec2,
  radian: number,
  size: number
): IVec2[] {
  const ret = []
  const range = endRadian - startRadian
  const unitT = range / size

  for (let i = 0; i <= size; i++) {
    const t = unitT * i + startRadian - radian
    ret.push(
      add(rotate(vec(rx * Math.cos(t), ry * Math.sin(t)), radian), center)
    )
  }

  return ret
}

/**
 * ２点指定の円弧を直線で近似する
 * https://triple-underscore.github.io/SVG11/paths.html#PathDataEllipticalArcCommands
 * @method approximateArcWithPoint
 * @param rx x軸半径
 * @param ry y軸半径
 * @param startPoint 開始点
 * @param endPoint 終了点
 * @param largeArcFlag 円弧の大きい側を使うフラグ
 * @param sweepFlag 時計回り円弧を使うフラグ
 * @param radian 傾き
 * @param size 分割数
 * @return 座標リスト
 */
export function approximateArcWithPoint(
  rx: number,
  ry: number,
  startPoint: IVec2,
  endPoint: IVec2,
  largeArcFlag: boolean,
  sweepFlag: boolean,
  radian: number,
  size: number
): IVec2[] {
  // 範囲外の径の修正
  // https://triple-underscore.github.io/SVG11/implnote.html#ArcImplementationNotes
  // 径長ゼロを弾く
  if (rx * ry === 0) return [startPoint, endPoint]

  // 負の径長を訂正する
  rx = Math.abs(rx)
  ry = Math.abs(ry)

  // 楕円中心取得
  const centerInfo = getEllipseCenter(startPoint, endPoint, rx, ry, radian)
  const centers = centerInfo.centers

  // 径長を十分大きくする
  rx *= centerInfo.radiusRate
  ry *= centerInfo.radiusRate

  let center = null

  if ((largeArcFlag && sweepFlag) || (!largeArcFlag && !sweepFlag)) {
    // 時計回り＆大きい側
    // 反時計回り＆小さい側
    // →始点終点中心が反時計回りになる
    if (getLoopwise([startPoint, endPoint, centers[0]]) < 0) {
      center = centers[0]
    } else {
      center = centers[1]
    }
  } else {
    if (getLoopwise([startPoint, endPoint, centers[0]]) > 0) {
      center = centers[0]
    } else {
      center = centers[1]
    }
  }

  // 回り方に応じて始点と終点を設定
  let startRadian = 0
  let endRadian = 0
  const r1 = getRadianOnArc(startPoint, rx, center, radian)
  const r2 = getRadianOnArc(endPoint, rx, center, radian)
  if (sweepFlag) {
    if (r1 > r2) {
      startRadian = r1 - Math.PI * 2
      endRadian = r2
    } else {
      startRadian = r1
      endRadian = r2
    }
  } else {
    if (r1 > r2) {
      startRadian = r1
      endRadian = r2
    } else {
      startRadian = r1
      endRadian = r2 - Math.PI * 2
    }
  }

  return approximateArc(rx, ry, startRadian, endRadian, center, radian, size)
}

/**
 * 円弧上の点の角度を求める
 * @param a 円弧上の点
 * @param rx x径長
 * @param center 中心座標
 * @param radian 傾き
 * @return ラジアン(0 <= t <= 2 * Math.PI)
 */
function getRadianOnArc(
  a: IVec2,
  rx: number,
  center: IVec2,
  radian: number
): number {
  // 回転打ち消し
  a = rotate(a, -radian, center)
  let ret = Math.acos((a.x - center.x) / rx)

  // y座標の位置をみて絞り込み
  if (a.y - center.y < 0) {
    ret = -ret + Math.PI * 2
  }

  // 回転戻す
  ret += radian
  ret %= Math.PI * 2

  return ret
}

/**
 * ２点を通る楕円の中心を求める
 * @param a 点a
 * @param b 点b
 * @param rx x軸半径
 * @param ry y軸半径
 * @param radian 傾き
 * @return 解となる２点
 * @return { centers: 解となる２点, radiusRate: 半径補正係数 }
 */
export function getEllipseCenter(
  a: IVec2,
  b: IVec2,
  rx: number,
  ry: number,
  radian: number
): { centers: IVec2[]; radiusRate: number } {
  // 回転を打ち消す
  a = rotate(a, -radian)
  b = rotate(b, -radian)

  // 媒介変数を利用して円の中心問題にする
  const A = vec(a.x / rx, a.y / ry)
  const B = vec(b.x / rx, b.y / ry)

  // 円の中心取得
  const centerInfo = getCircleCenter(A, B, 1)
  const C = centerInfo.centers

  // 楕円に戻す
  let ans1 = vec(C[0].x * rx, C[0].y * ry)
  let ans2 = vec(C[1].x * rx, C[1].y * ry)

  // 回転を戻す
  ans1 = rotate(ans1, radian)
  ans2 = rotate(ans2, radian)

  return {
    centers: [ans1, ans2],
    radiusRate: centerInfo.radiusRate,
  }
}

/**
 * ２点を通る円の中心を求める
 * @param a 点a
 * @param b 点b
 * @param radius 半径
 * @return { centers: 解となる２点, radiusRate: 半径補正係数 }
 */
export function getCircleCenter(
  a: IVec2,
  b: IVec2,
  radius: number
): { centers: IVec2[]; radiusRate: number } {
  const u1 = (a.x + b.x) / 2
  const u2 = (a.x - b.x) / 2
  const v1 = (a.y + b.y) / 2
  const v2 = (a.y - b.y) / 2
  const L = Math.sqrt(u2 * u2 + v2 * v2)
  const t2 = Math.pow(radius / L, 2) - 1

  // 2点が直径以上に離れている => 2点を直径とみなす
  if (t2 < 0) {
    const center = getCenter(a, b)
    return {
      centers: [center, center],
      radiusRate: L / radius,
    }
  }

  const t = Math.sqrt(t2)
  const ans1 = vec(u1 + v2 * t, v1 - u2 * t)
  const ans2 = vec(u1 - v2 * t, v1 + u2 * t)

  return {
    centers: [ans1, ans2],
    radiusRate: 1,
  }
}

/**
 * 2次元アフィン変換を行う
 * paramsには以下の行列をa b c d e fの順で指定する
 * a c e
 * b d f
 * @param points 変換前の座標リスト
 * @param params 行列成分
 * @return 座標リスト
 */
export function transform(points: IVec2[], params: number[]): IVec2[] {
  const a = params[0]
  const b = params[1]
  const c = params[2]
  const d = params[3]
  const e = params[4]
  const f = params[5]

  return points.map((p) => vec(a * p.x + c * p.y + e, b * p.x + d * p.y + f))
}

/**
 * invert affine transfomation matrix
 * a c e
 * b d f
 * @param params [a, b, c, d, e, f]
 * @return inverted matrix params
 */
export function invertTransform(params: AffineMatrix): AffineMatrix {
  const [a, b, c, d, e, f] = params
  const t = a * d - b * c
  return [
    d / t,
    -b / t,
    -c / t,
    a / t,
    (c * f - d * e) / t,
    -(a * f - b * e) / t,
  ]
}

/**
 * multi affine transfomation matrixes
 * @param a affine matrix
 * @param b affine matrix
 * @return a * b
 */
export function multiAffine(a: AffineMatrix, b: AffineMatrix): AffineMatrix {
  return [
    a[0] * b[0] + a[2] * b[1],
    a[1] * b[0] + a[3] * b[1],
    a[0] * b[2] + a[2] * b[3],
    a[1] * b[2] + a[3] * b[3],
    a[0] * b[4] + a[2] * b[5] + a[4],
    a[1] * b[4] + a[3] * b[5] + a[5],
  ]
}

/**
 * multi affines
 * @param affines affine matrix list
 * @return affines[0] * affines[1] * ...
 */
export function multiAffines(affines: AffineMatrix[]): AffineMatrix {
  return affines.reduce((p, c) => {
    return multiAffine(p, c)
  }, IDENTITY_AFFINE)
}

/**
 * apply affine
 * @param affine affine matrix
 * @param v vector2
 * @return affine x v
 */
export function applyAffine(affine: AffineMatrix, v: IVec2): IVec2 {
  return vec(
    affine[0] * v.x + affine[2] * v.y + affine[4],
    affine[1] * v.x + affine[3] * v.y + affine[5]
  )
}

/**
 * 隣り合う同一点をオミットする
 * @method omitSamePoint
 * @param polygon ポリゴン
 * @return オミット後のポリゴン
 */
export function omitSamePoint(polygon: IVec2[]): IVec2[] {
  let ret = polygon.concat()

  // サイズ
  const size = polygon.length
  // 同一点探す
  for (let i = 0; i < size; i++) {
    const p1 = ret[i]
    const p2 = ret[(i + 1) % size]
    if (isSame(p1, p2)) {
      // 同一
      ret.splice(i, 1)
      // 再帰
      ret = omitSamePoint(ret)
      break
    }
  }

  return ret
}

/**
 * 正多角形の面積を内接円の半径から求める
 * @param radius 半径
 * @param n 角数
 * @return 面積
 */
export function getRegularPolygonArea(radius: number, n: number): number {
  const unitRad = Math.PI / n
  const unitArea = Math.pow(radius, 2) * Math.sin(unitRad) * Math.cos(unitRad)
  return unitArea * n
}

/**
 * 正多角形の面積から内接円の半径を求める
 * @param area 面積
 * @param n 角数
 * @return 半径
 */
export function getRegularPolygonRadius(area: number, n: number): number {
  const unitRad = Math.PI / n
  const unitArea = area / n
  return Math.sqrt(unitArea / Math.sin(unitRad) / Math.cos(unitRad))
}

/**
 * 包含関係にあるポリゴンをグループ化する
 * @param polygons ポリゴン一覧
 * @return グループ化したポリゴン一覧、グループ内は面積降順
 */
export function getIncludedPolygonGroups(polygons: IVec2[][]): IVec2[][][] {
  const sorted = polygons.concat()
  sorted.sort((a, b) => {
    return getArea(b) - getArea(a)
  })
  const hit: { [s: string]: boolean } = {}
  const ret: IVec2[][][] = []
  sorted.forEach((p, i) => {
    if (hit[i]) return
    hit[i] = true
    const group = [p].concat(
      sorted.filter((c, j) => {
        if (hit[j]) return false
        const pointsOnPolygon = c.filter((point) => isOnPolygon(point, p))
        if (pointsOnPolygon.length !== c.length) return false
        hit[j] = true
        return true
      })
    )
    ret.push(group)
  })
  return ret
}

/**
 * ポリゴンブーリアン演算差
 * 突き抜けは非対応
 * targetは1辺のみでpolyと交差する前提
 * targetとpolyは観点方向が逆である前提
 * @param target ポリゴン
 * @param poly 切り取り範囲ポリゴン
 * @return 切り取った後のポリゴン
 */
export function getPolygonNotPolygon(target: IVec2[], poly: IVec2[]): IVec2[] {
  const ret: IVec2[] = []

  // targetの辺と交差するpolyの辺インデックスを探索
  let targetCrossIndex: number = -1
  const polyCrossIndexList: number[] = []
  const cross: IVec2[] = []
  for (let i = 0; i < target.length; i++) {
    const currentSeg = [target[i], target[(i + 1) % target.length]]
    for (let j = 0; j < poly.length; j++) {
      const seg = [poly[j], poly[(j + 1) % poly.length]]
      if (isCrossSegAndSeg(currentSeg, seg)) {
        const p = getCrossSegAndLine(currentSeg, seg)
        if (p) {
          targetCrossIndex = i
          polyCrossIndexList.push(j)
          cross.push(p)
        }
      }
    }
    if (targetCrossIndex !== -1) break
  }

  if (targetCrossIndex === -1) return target
  if (polyCrossIndexList.length % 2 !== 0) return target

  // target辺の始点に最も近い交点を探す
  const distList = cross.map((p) => getDistance(p, target[targetCrossIndex]))
  const sortedDistList = distList.concat().sort((a, b) => a - b)
  const nearestCrossIndex = distList.indexOf(sortedDistList[0])
  const nearestIndex = polyCrossIndexList[nearestCrossIndex]

  // nearestIndexが始点となるようpolyを調整
  const adjustedPoly: IVec2[] = poly.concat()
  for (let j = 0; j < nearestIndex; j++) {
    adjustedPoly.push(adjustedPoly.shift() as IVec2)
  }
  // nearestIndexが先頭になるよう調整
  const adjustedPolyCrossIndexList: number[] = polyCrossIndexList.map((n) => {
    return (n - nearestIndex + poly.length) % poly.length
  })
  const adjustedCross: IVec2[] = cross.concat()
  for (let k = 0; k < nearestCrossIndex; k++) {
    adjustedPolyCrossIndexList.push(
      adjustedPolyCrossIndexList.shift() as number
    )
    adjustedCross.push(adjustedCross.shift() as IVec2)
  }

  // polyと交差する辺が始点と終点になるよう調整
  for (let i = 0; i < target.length; i++) {
    ret.push(target[(i + targetCrossIndex + 1) % target.length])
  }

  // 交点からpolyに突入
  for (let i = 0; i < adjustedPolyCrossIndexList.length / 2; i++) {
    const startIndex = adjustedPolyCrossIndexList[i * 2]
    const endIndex = adjustedPolyCrossIndexList[i * 2 + 1]
    ret.push(adjustedCross[i * 2])
    for (let j = startIndex + 1; j <= endIndex; j++) {
      ret.push(adjustedPoly[j])
    }
    ret.push(adjustedCross[i * 2 + 1])
  }

  return ret
}

/**
 * ポリゴン全てを包含する矩形を取得
 * @param polygons ポリゴン一覧
 * @return 外接矩形
 */
export function getOuterRectangle(polygons: IVec2[][]): IRectangle {
  if (polygons.length === 0)
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i]
    for (let j = 0; j < polygon.length; j++) {
      const v = polygon[j]
      minX = Math.min(minX, v.x)
      minY = Math.min(minY, v.y)
      maxX = Math.max(maxX, v.x)
      maxY = Math.max(maxY, v.y)
    }
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  }
}

/**
 * 矩形範囲のグリッド取得
 * @param range 矩形範囲
 * @param gridSize グリッド幅
 * @param dX x軸のずらし幅
 * @param dY y軸のずらし幅
 * @return グリッド線リスト
 */
export function getGrid(
  range: IRectangle,
  gridSize: number,
  dX: number = 0,
  dY: number = 0
): IVec2[][] {
  const gridList: IVec2[][] = []
  const minX = range.x
  const maxX = range.x + range.width
  const minY = range.y
  const maxY = range.y + range.height

  let x = minX + dX
  while (x < maxX) {
    if (minX < x && x < maxX) {
      gridList.push([vec(x, minY), vec(x, maxY)])
    }
    x += gridSize
  }

  let y = minY + dY
  while (y < maxY) {
    if (minY < y && y < maxY) {
      gridList.push([vec(minX, y), vec(maxX, y)])
    }
    y += gridSize
  }

  return gridList
}

/**
 * 矩形を中心基準でサイズ変更する
 * @param org 元の矩形
 * @param dW 幅変更差分
 * @param dH 高さ変更差分
 * @return サイズ変更後の矩形
 */
export function expandRecntagle(
  org: IRectangle,
  dW: number,
  dH: number
): IRectangle {
  return {
    x: org.x - dW / 2,
    y: org.y - dH / 2,
    width: org.width + dW,
    height: org.height + dH,
  }
}

/**
 * 矩形を中心基準の倍率でサイズ変更する
 * @param org 元の矩形
 * @param scaleW 幅変更倍率
 * @param scaleH 高さ軸変更倍率
 * @return サイズ変更後の矩形
 */
export function expandRecntagleScale(
  org: IRectangle,
  scaleW: number,
  scaleH: number
): IRectangle {
  return expandRecntagle(
    org,
    org.width * (scaleW - 1),
    org.height * (scaleH - 1)
  )
}

/**
 * interpolate scaler
 * @param from
 * @param to
 * @param rate 0 => from, 1 => to
 * @return interpolated value
 */
export function interpolateScaler(
  from: number,
  to: number,
  rate: number
): number {
  return from * (1 - rate) + to * rate
}

/**
 * interpolate scaler
 * @param from
 * @param to
 * @param rate 0 => from, 1 => to
 * @return interpolated value
 */
export function interpolateVector(from: IVec2, to: IVec2, rate: number): IVec2 {
  return vec(
    interpolateScaler(from.x, to.x, rate),
    interpolateScaler(from.y, to.y, rate)
  )
}

/**
 * solve cubic equation for bezier3
 * throw if the equation does not have real solution in 0 <= t <= 1
 * @param a t^3 param
 * @param b t^2 param
 * @param c t param
 * @param d constant param
 * @return unique solution
 */
function solveBezier3Fomula(
  a: number,
  b: number,
  c: number,
  d: number
): number {
  const list = solveQubicFomula(a, b, c, d)
  if (list.length === 0) return 0

  const ret = getCloseInRangeValue(list, 0, 1)
  if (ret === undefined)
    throw new Error('Error: Cannot resolve uniquely in 0 <= t <= 1.')

  return Math.max(Math.min(ret, 1), 0)
}

/**
 * solve cubic equation in real space
 * @param a t^3 param
 * @param b t^2 param
 * @param c t param
 * @param d constant param
 * @return solutions in no particular order
 */
export function solveQubicFomula(
  a: number,
  b: number,
  c: number,
  d: number
): number[] {
  if (isCloseToZero(a)) {
    return solveEquationOrder2(b, c, d)
  }

  const p = (3 * a * c - b * b) / (3 * a * a)
  const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a)

  const Z = -b / (3 * a)

  if (isCloseToZero(p) && isCloseToZero(q)) {
    // triple real root
    return [Z]
  }

  const D = (27 * q * q + 4 * p * p * p) / 108
  if (isCloseToZero(D)) {
    // one distinct root and double real root
    const Q = Math.sign(q) * Math.pow(Math.abs(q) / 2, 1 / 3)
    return [-2 * Q + Z, Q + Z]
  } else if (D > 0) {
    const sqrtD = Math.sqrt(D)
    const tmpA = -q / 2 + sqrtD
    const tmpB = -q / 2 - sqrtD
    const A = Math.sign(tmpA) * Math.pow(Math.abs(tmpA), 1 / 3)
    const B = Math.sign(tmpB) * Math.pow(Math.abs(tmpB), 1 / 3)

    return [A + B + Z]
  } else {
    // three distinct real roots
    const A = -q / 2
    const B = Math.sqrt(-D)
    const r = Math.atan2(B, A)
    const C = 2 * Math.pow(A * A + B * B, 1 / 6)
    const D0 = Math.cos(r / 3)
    const D1 = Math.cos((r + 2 * Math.PI) / 3)
    const D2 = Math.cos((r + 4 * Math.PI) / 3)

    const T0 = C * D0 + Z
    const T1 = C * D1 + Z
    const T2 = C * D2 + Z

    return [T0, T1, T2]
  }
}

function getCloseInRangeValue(
  values: number[],
  min: number,
  max: number
): number | undefined {
  return values.find((val) => {
    if (min <= val && val <= max) return true
    if (isCloseTo(val, min) || isCloseTo(val, max)) return true
    return false
  })
}

function isCloseTo(val: number, target: number): boolean {
  return Math.abs(val - target) < MINVALUE
}

function isCloseToZero(val: number): boolean {
  return Math.abs(val) < MINVALUE
}

/**
 * clamp number
 * @param min min value
 * @param max max value
 * @return clamped value
 */
export function clamp(min = -Infinity, max = Infinity, val: number) {
  return Math.max(Math.min(val, max), min)
}

/**
 * clamp number circularly
 * @param min min value
 * @param max max value
 * @return clamped value
 */
export function circleClamp(min: number, max: number, val: number) {
  if (min === max) return min

  if (max < val) {
    return ((val - max) % (max - min)) + min
  } else if (val < min) {
    return max - ((min - val) % (max - min))
  } else {
    return val
  }
}

/**
 * round trip value
 * @param min min value
 * @param max max value
 * @return round tripped value
 */
export function roundTrip(min: number, max: number, val: number) {
  const harf = max - min
  const length = 2 * harf
  if (length === 0) return min

  const d = Math.abs(val - min) % length
  if (d < harf) {
    return d + min
  } else {
    return length - d + min
  }
}
