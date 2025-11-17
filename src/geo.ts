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

export function getDistanceSq(a: IVec2, b: IVec2): number {
  const x = a.x - b.x
  const y = a.y - b.y
  return x * x + y * y
}

export function getPolylineLength(polyline: IVec2[], closed = false): number {
  if (polyline.length < 2) return 0

  let ret = 0
  for (let i = 0; i < polyline.length - 1; i++) {
    ret += getDistance(polyline[i], polyline[i + 1])
  }
  if (closed) {
    ret += getDistance(polyline[polyline.length - 1], polyline[0])
  }
  return ret
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
  const fromBase = sub(a, from)
  const s = Math.sin(radian)
  const c = Math.cos(radian)
  return add(
    vec(c * fromBase.x - s * fromBase.y, s * fromBase.x + c * fromBase.y),
    from
  )
}

function getRotateFn(
  radian: number,
  from: IVec2 = vec(0, 0)
): (a: IVec2, reverse?: boolean) => IVec2 {
  const s = Math.sin(radian)
  const c = Math.cos(radian)
  return (a, reverse) => {
    const fromBase = sub(a, from)
    return reverse
      ? add(
          vec(
            c * fromBase.x + s * fromBase.y,
            -s * fromBase.x + c * fromBase.y
          ),
          from
        )
      : add(
          vec(c * fromBase.x - s * fromBase.y, s * fromBase.x + c * fromBase.y),
          from
        )
  }
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
): IVec2[] {
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
 * @param a ベクトル
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
  const nt = 1 - t
  const c0 = multi(pointList[0], nt * nt)
  const c1 = multi(pointList[1], 2 * t * nt)
  const c2 = multi(pointList[2], t * t)
  return vec(c0.x + c1.x + c2.x, c0.y + c1.y + c2.y)
}

export function getBezier2LerpFn(
  pointList: Readonly<[IVec2, IVec2, IVec2]>
): (t: number) => IVec2 {
  return (t) => getPointOnBezier2(pointList, t)
}

/**
 * get point with the rate on bezier3
 * @param pointList controller points
 * @param rate rate between start point and end point
 * @return calced point
 */
export function getPointOnBezier3(
  pointList: Readonly<Bezier3>,
  rate: number
): IVec2 {
  const t = rate
  const nt = 1 - t
  const c0 = multi(pointList[0], nt * nt * nt)
  const c1 = multi(pointList[1], 3 * t * nt * nt)
  const c2 = multi(pointList[2], 3 * t * t * nt)
  const c3 = multi(pointList[3], t * t * t)
  return vec(c0.x + c1.x + c2.x + c3.x, c0.y + c1.y + c2.y + c3.y)
}

export function getBezier3LerpFn(
  pointList: Readonly<Bezier3>
): (t: number) => IVec2 {
  return (t) => getPointOnBezier3(pointList, t)
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
  pointList: Readonly<Bezier3>,
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
  const rotateFn = getRotateFn(radian)

  for (let i = 0; i <= size; i++) {
    const t = unitT * i + startRadian - radian
    ret.push(add(rotateFn(vec(rx * Math.cos(t), ry * Math.sin(t))), center))
  }

  return ret
}

/**
 * Approximate arc path as a polyline
 * https://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
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
  if (Math.abs(rx * ry) < MINVALUE) {
    return [startPoint, endPoint]
  }
  return getApproPoints(
    getArcLerpFn(rx, ry, startPoint, endPoint, largeArcFlag, sweepFlag, radian),
    size
  )
}

export function getArcLerpFn(
  rx: number,
  ry: number,
  startPoint: IVec2,
  endPoint: IVec2,
  largeArcFlag: boolean,
  sweepFlag: boolean,
  radian: number
): (t: number) => IVec2 {
  if (Math.abs(rx * ry) < MINVALUE) {
    return (t) => lerpPoint(startPoint, endPoint, t)
  }

  const r = radian
  const rotateFn = getRotateFn(r)
  const p0 = startPoint
  const p1 = endPoint
  const a = rotateFn(vec((p0.x - p1.x) / 2, (p0.y - p1.y) / 2), true)
  const ax2 = a.x * a.x
  const ay2 = a.y * a.y

  const l = ax2 / rx / rx + ay2 / ry / ry
  const lsqrt = l > 1 ? Math.sqrt(l) : 1
  const { x: rxa, y: rya } = vec(Math.abs(rx) * lsqrt, Math.abs(ry) * lsqrt)

  const rx2 = rxa * rxa
  const ry2 = rya * rya
  const b = multi(
    multi(
      vec((rxa * a.y) / rya, (-rya * a.x) / rxa),
      Math.sqrt(
        Math.max(0, rx2 * ry2 - rx2 * ay2 - ry2 * ax2) / (rx2 * ay2 + ry2 * ax2)
      )
    ),
    largeArcFlag === sweepFlag ? -1 : 1
  )

  const c = add(rotateFn(b), multi(add(p0, p1), 0.5))

  const u = vec((a.x - b.x) / rxa, (a.y - b.y) / rya)
  const v = vec((-a.x - b.x) / rxa, (-a.y - b.y) / rya)
  const theta = getRadian(u)
  const dtheta_tmp = (getRadian(v) - getRadian(u)) % (2 * Math.PI)
  const dtheta =
    !sweepFlag && 0 < dtheta_tmp
      ? dtheta_tmp - 2 * Math.PI
      : sweepFlag && dtheta_tmp < 0
      ? dtheta_tmp + 2 * Math.PI
      : dtheta_tmp

  return (t) => {
    if (t === 0) {
      return startPoint
    } else if (t === 1) {
      return endPoint
    } else {
      const dr = theta + dtheta * t
      return add(rotateFn(vec(rxa * Math.cos(dr), rya * Math.sin(dr))), c)
    }
  }
}

export function lerpPoint(a: IVec2, b: IVec2, t: number): IVec2 {
  return add(a, multi(sub(b, a), t))
}

export function getApproPoints(
  lerpFn: (t: number) => IVec2,
  split: number
): IVec2[] {
  if (split <= 1) {
    return [lerpFn(0), lerpFn(1)]
  }

  const points: IVec2[] = []
  let step = 1 / split
  for (let i = 0; i <= split; i++) {
    points.push(lerpFn(step * i))
  }
  return points
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
export function clamp(min = -Infinity, max = Infinity, val: number): number {
  return Math.max(Math.min(val, max), min)
}

/**
 * clamp number circularly
 * @param min min value
 * @param max max value
 * @return clamped value
 */
export function circleClamp(min: number, max: number, val: number): number {
  if (min === max) return min
  if (min <= val && val <= max) return val

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
export function roundTrip(min: number, max: number, val: number): number {
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

/**
 * Ref: https://omaraflak.medium.com/b%C3%A9zier-interpolation-8033e9a262c2
 * @param points target points to interpolate via a bezier curve
 * @return control point sets for cubic bezier curve
 */
export function getBezierInterpolation(
  points: IVec2[]
): [c0: IVec2, c1: IVec2][] {
  const len = points.length
  if (len < 3) return []

  const A = solveBezierInterpolationEquations(points)
  const B: IVec2[] = []
  for (let i = 0; i < points.length - 2; i++) {
    B[i] = sub(multi(points[i + 1], 2), A[i + 1])
  }
  B[points.length - 2] = multi(
    add(A[points.length - 2], points[points.length - 1]),
    1 / 2
  )

  return A.map((a, i) => [a, B[i]])
}

/**
 * Based on Tridiagonal matrix algorithm with bezier interpolation equation matrix.
 * Suppose "points" has at least 3 items.
 */
function solveBezierInterpolationEquations(points: IVec2[]): IVec2[] {
  const values: IVec2[] = [add(points[0], multi(points[1], 2))]
  for (let i = 1; i < points.length - 2; i++) {
    values.push(multi(add(multi(points[i], 2), points[i + 1]), 2))
  }
  values.push(
    add(multi(points[points.length - 2], 8), points[points.length - 1])
  )

  const C: number[] = [0.5]
  for (let i = 1; i < points.length - 2; i++) {
    C[i] = 1 / (4 - C[i - 1])
  }

  const D: IVec2[] = [multi(values[0], 0.5)]
  for (let i = 1; i < points.length - 2; i++) {
    D[i] = multi(sub(values[i], D[i - 1]), 1 / (4 - C[i - 1]))
  }
  D[points.length - 2] = multi(
    sub(values[points.length - 2], multi(D[points.length - 3], 2)),
    1 / (7 - 2 * C[points.length - 3])
  )

  const ret: IVec2[] = []
  ret[points.length - 2] = D[points.length - 2]
  for (let i = points.length - 3; 0 <= i; i--) {
    ret[i] = sub(D[i], multi(ret[i + 1], C[i]))
  }

  return ret
}

/**
 * "points" should be cloased manually.
 * @param points target points to interpolate via a periodic bezier curve
 * @return control point sets for cubic bezier curve
 */
export function getPeriodicBezierInterpolation(
  points: IVec2[]
): [c0: IVec2, c1: IVec2][] {
  const len = points.length
  if (len < 3) return []

  const A = getPeriodicBezierInterpolationA(points)
  const B: IVec2[] = []
  for (let i = 0; i < points.length - 2; i++) {
    B[i] = sub(multi(points[i + 1], 2), A[i + 1])
  }
  B[points.length - 2] = sub(multi(points[points.length - 1], 2), A[0])

  return A.map((a, i) => [a, B[i]])
}

export function getPeriodicBezierInterpolationA(points: IVec2[]): IVec2[] {
  const paramSize = points.length - 1
  const gamma = 1

  const values: IVec2[] = []
  for (let i = 0; i < points.length - 1; i++) {
    values.push({
      x: 4 * points[i].x + 2 * points[i + 1].x,
      y: 4 * points[i].y + 2 * points[i + 1].y,
    })
  }
  const y = solvePeriodicBezierInterpolationEquations(values, gamma)

  const u: IVec2[] = []
  u[0] = { x: gamma, y: gamma }
  for (let i = 1; i < points.length - 2; i++) {
    u.push({ x: 0, y: 0 })
  }
  u.push({ x: 1, y: 1 })
  const q = solvePeriodicBezierInterpolationEquations(u, gamma)

  const vy = {
    x: y[0].x + (1 / gamma) * y[paramSize - 1].x,
    y: y[0].y + (1 / gamma) * y[paramSize - 1].y,
  }
  const vq = {
    x: q[0].x + (1 / gamma) * q[paramSize - 1].x,
    y: q[0].y + (1 / gamma) * q[paramSize - 1].y,
  }

  const A: IVec2[] = []
  for (let i = 0; i < paramSize; i++) {
    A[i] = {
      x: y[i].x - (q[i].x * vy.x) / (1 + vq.x),
      y: y[i].y - (q[i].y * vy.y) / (1 + vq.y),
    }
  }

  return A
}

/**
 * https://en.wikipedia.org/wiki/Tridiagonal_matrix_algorithm
 */
function solvePeriodicBezierInterpolationEquations(
  values: IVec2[],
  gamma: number
): IVec2[] {
  const C: number[] = [1 / (4 - gamma)]
  for (let i = 1; i < values.length - 1; i++) {
    C[i] = 1 / (4 - C[i - 1])
  }

  const D: IVec2[] = [multi(values[0], 1 / (4 - gamma))]
  for (let i = 1; i < values.length - 1; i++) {
    D[i] = multi(sub(values[i], D[i - 1]), 1 / (4 - C[i - 1]))
  }
  D[values.length - 1] = multi(
    sub(values[values.length - 1], D[values.length - 2]),
    1 / (4 - 1 / gamma - C[values.length - 2])
  )

  const ret: IVec2[] = []
  ret[values.length - 1] = D[values.length - 1]
  for (let i = values.length - 2; 0 <= i; i--) {
    ret[i] = sub(D[i], multi(ret[i + 1], C[i]))
  }

  return ret
}

type Bezier3 = [c0: IVec2, c1: IVec2, c2: IVec2, c3: IVec2]

/**
 * The order of returned items is srbitrary.
 */
export function getCrossSegAndBezier3(
  seg: Readonly<[IVec2, IVec2]>,
  bezier: Readonly<Bezier3>
): IVec2[] {
  return getCrossSegAndBezier3WithT(seg, bezier).map(([p]) => p)
}

export function getCrossSegAndBezier3WithT(
  seg: Readonly<[IVec2, IVec2]>,
  bezier: Readonly<Bezier3>
): [IVec2, t: number][] {
  const candidates = getCrossLineAndBezier3WithT(seg, bezier)
  return candidates.filter(([p]) => isOnSeg(p, seg as unknown as IVec2[]))
}

export function getCrossLineAndBezier3(
  seg: Readonly<[IVec2, IVec2]>,
  bezier: Readonly<Bezier3>
): IVec2[] {
  return getCrossLineAndBezier3WithT(seg, bezier).map(([p]) => p)
}

export function getCrossLineAndBezier3WithT(
  line: Readonly<[IVec2, IVec2]>,
  bezier: Readonly<Bezier3>
): [IVec2, t: number][] {
  const ax = 3 * (bezier[1].x - bezier[2].x) + bezier[3].x - bezier[0].x
  const ay = 3 * (bezier[1].y - bezier[2].y) + bezier[3].y - bezier[0].y

  const bx = 3 * (bezier[0].x - 2 * bezier[1].x + bezier[2].x)
  const by = 3 * (bezier[0].y - 2 * bezier[1].y + bezier[2].y)

  const cx = 3 * (bezier[1].x - bezier[0].x)
  const cy = 3 * (bezier[1].y - bezier[0].y)

  const dx = bezier[0].x
  const dy = bezier[0].y

  const vx = line[1].y - line[0].y
  const vy = line[0].x - line[1].x

  const d = line[0].x * vx + line[0].y * vy

  const roots = solveQubicFomula(
    vx * ax + vy * ay,
    vx * bx + vy * by,
    vx * cx + vy * cy,
    vx * dx + vy * dy - d
  )

  return roots
    .filter((t) => 0 <= t && t <= 1)
    .map((t) => [
      {
        x: ((ax * t + bx) * t + cx) * t + dx,
        y: ((ay * t + by) * t + cy) * t + dy,
      },
      t,
    ])
}

export function divideBezier3(
  bezier: Readonly<Bezier3>,
  t: number
): [Bezier3, Bezier3] {
  const [a, b, c, d] = bezier
  const e = lerpPoint(a, b, t)
  const f = lerpPoint(b, c, t)
  const g = lerpPoint(c, d, t)
  const h = lerpPoint(e, f, t)
  const j = lerpPoint(f, g, t)
  const k = lerpPoint(h, j, t)
  return [
    [a, e, h, k],
    [k, j, g, d],
  ]
}

export function getClosestPointOnBezier3(
  bezier: Readonly<[c0: IVec2, c1: IVec2, c2: IVec2, c3: IVec2]>,
  p: Readonly<IVec2>,
  epsilon: number
): IVec2 {
  const lerpFn = getBezier3LerpFn(bezier)
  const epsilonSq = epsilon * epsilon

  const size = 10
  let range = [0, 1]
  let delta = 0
  let ret = bezier[0]
  let count = 0

  while (count < 100) {
    const ranges: number[] = []
    const rangeSize = range[1] - range[0]
    const step = rangeSize / size
    for (let i = 0; i <= size; i++) {
      ranges.push(range[0] + step * i)
    }

    let candidate:
      | [range: [number, number], pedal: IVec2, d: number]
      | undefined
    for (let i = 0; i < ranges.length - 1; i++) {
      const seg = [lerpFn(ranges[i]), lerpFn(ranges[i + 1])]
      const pedal = getPedal(p, seg)
      if (isOnSeg(pedal, seg)) {
        const d = getDistanceSq(p, pedal)
        if (!candidate || d < candidate[2]) {
          candidate = [[ranges[i], ranges[i + 1]], pedal, d]
        }
      } else {
        // When the pedal isn't on the segment, either vertex is the closest..
        const d0 = getDistanceSq(p, seg[0])
        const d1 = getDistanceSq(p, seg[1])
        const [d, vertex] = d0 <= d1 ? [d0, seg[0]] : [d1, seg[1]]
        if (!candidate || d < candidate[2]) {
          candidate = [[ranges[i], ranges[i + 1]], vertex, d]
        }
      }
    }

    if (!candidate) break
    if (Math.abs(delta - candidate[2]) < epsilonSq) {
      ret = candidate[1]
      break
    }

    range = candidate[0]
    delta = candidate[2]
    count++
  }

  return ret
}

/**
 * Compute the intersection points between two cubic bezier curves using bezier clipping algorithm.
 * @param curve1 First cubic bezier curve
 * @param curve2 Second cubic bezier curve
 * @param tolerance Error tolerance for intersection (smaller means more accurate)
 * @param maxIterations Maximum number of bezier clipping iterations
 * @returns Array of intersection points
 */
export function getCrossBezier3AndBezier3(
  curve1: Readonly<Bezier3>,
  curve2: Readonly<Bezier3>,
  tolerance = MINVALUE,
  maxIterations = 50
): IVec2[] {
  if (isBezier3Identical(curve1, curve2)) return []
  if (
    isBezier3Straight(curve1) &&
    isBezier3Straight(curve2) &&
    isParallel(sub(curve1[0], curve1[3]), sub(curve2[0], curve2[3]))
  ) {
    return []
  }

  const toleranceSq = tolerance * tolerance
  const toleranceHalf = tolerance / 2

  function boundingBox(curve: Readonly<Bezier3>): {
    minX: number
    maxX: number
    minY: number
    maxY: number
  } {
    const xs = curve.map((p) => p.x)
    const ys = curve.map((p) => p.y)
    return {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    }
  }

  function boundingBoxesOverlap(
    b1: { minX: number; maxX: number; minY: number; maxY: number },
    b2: { minX: number; maxX: number; minY: number; maxY: number }
  ): boolean {
    return !(
      b1.maxX < b2.minX ||
      b1.minX > b2.maxX ||
      b1.maxY < b2.minY ||
      b1.minY > b2.maxY
    )
  }

  // The maximum number of intersections between cubic bezier curves is 9.
  const candidates: IVec2[] = []

  // Recursive bezier clipping algorithm to find intersections
  function bezierClipRecursive(
    subcurve1: Readonly<Bezier3>,
    subcurve2: Readonly<Bezier3>,
    depth: number
  ): void {
    if (depth > maxIterations) return
    // Set the maximum number x2 in case same points are detected multiple times.
    if (candidates.length >= 18) return

    const bb1 = boundingBox(subcurve1)
    const bb2 = boundingBox(subcurve2)

    if (!boundingBoxesOverlap(bb1, bb2)) {
      return
    }

    // If the control points of both curves are tightly packed, consider them as potential intersections
    if (
      Math.abs(bb1.maxX - bb1.minX) < toleranceHalf &&
      Math.abs(bb1.maxY - bb1.minY) < toleranceHalf &&
      Math.abs(bb2.maxX - bb2.minX) < toleranceHalf &&
      Math.abs(bb2.maxY - bb2.minY) < toleranceHalf
    ) {
      const intersectionPoint = {
        x: (bb1.minX + bb1.maxX + bb2.minX + bb2.maxX) / 4,
        y: (bb1.minY + bb1.maxY + bb2.minY + bb2.maxY) / 4,
      }
      candidates.push(intersectionPoint)
      return
    }

    // Subdivide both curves and recurse
    const [curve1Left, curve1Right] = divideBezier3(subcurve1, 0.5)
    const [curve2Left, curve2Right] = divideBezier3(subcurve2, 0.5)

    bezierClipRecursive(curve1Left, curve2Left, depth + 1)
    bezierClipRecursive(curve1Left, curve2Right, depth + 1)
    bezierClipRecursive(curve1Right, curve2Left, depth + 1)
    bezierClipRecursive(curve1Right, curve2Right, depth + 1)
  }

  bezierClipRecursive(curve1, curve2, 0)
  const ret: IVec2[] = []
  candidates.forEach((p) => {
    // Omit points that are too close to other points
    if (ret.every((q) => getDistanceSq(p, q) >= toleranceSq)) {
      ret.push(p)
    }
  })
  return ret
}

export function isBezier3Straight([a, b, c, d]: Readonly<Bezier3>): boolean {
  const v1 = sub(b, a)
  const v2 = sub(c, a)
  const v3 = sub(d, a)
  return isParallel(v1, v2) && isParallel(v1, v3)
}

export function isBezier3Identical(
  curve1: Readonly<Bezier3>,
  curve2: Readonly<Bezier3>
): boolean {
  if (
    isSame(curve1[0], curve2[0]) &&
    isSame(curve1[1], curve2[1]) &&
    isSame(curve1[2], curve2[2]) &&
    isSame(curve1[3], curve2[3])
  )
    return true
  if (
    isSame(curve1[0], curve2[3]) &&
    isSame(curve1[1], curve2[2]) &&
    isSame(curve1[2], curve2[1]) &&
    isSame(curve1[3], curve2[0])
  )
    return true
  return false
}
