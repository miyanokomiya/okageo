export const MINVALUE: number = 0.000001

export function add (a: IVec2, b: IVec2): IVec2 {
  return { x: a.x + b.x, y: a.y + b.y }
}

export function sub (a: IVec2, b: IVec2): IVec2 {
  return { x: a.x - b.x, y: a.y - b.y }
}

export function multi (a: IVec2, b: number): IVec2 {
  return { x: a.x * b, y: a.y * b }
}

export function isSame (a: IVec2, b: IVec2): boolean {
  const dif: IVec2 = sub(a, b)
  return (Math.abs(dif.x) < MINVALUE) && (Math.abs(dif.y) < MINVALUE)
}

export function getDistance (a: IVec2, b: IVec2): number {
  const dif: IVec2 = sub(a, b)
  return Math.sqrt(dif.x * dif.x + dif.y * dif.y)
}

export function getNorm (a: IVec2): number {
  return getDistance(a, { x: 0, y: 0 })
}

export function isZero (a: IVec2): boolean {
  return getNorm(a) < MINVALUE
}

export function getUnit (a: IVec2): IVec2 {
  const d = getNorm(a)
  if (d < MINVALUE) throw new Error('cannot get unit vector of zero vector')
  return multi(a, 1 / d)
}

export function getCross (a: IVec2, b: IVec2): number {
  return a.x * b.y - a.y * b.x
}

export function getInner (a: IVec2, b: IVec2): number {
  return a.x * b.x + a.y * b.y
}

export function cloneVectors (vectors: IVec2[]): IVec2[] {
  return vectors.map((v) => ({ ...v }))
}

export function getCenter (a: IVec2, b: IVec2): IVec2 {
  return multi(add(a, b), 1 / 2)
}

export function getRadian (a: IVec2, from: IVec2 = { x: 0, y: 0 }): number {
  const dif = sub(a, from)
  return Math.atan2(dif.y, dif.x)
}

/**
 * fromに対して、aと点対称なベクトル取得
 * @param a 対象ベクトル
 * @param from 基点
 * @param 点対称ベクトル
 */
export function getSymmetry (a: IVec2, from: IVec2 = { x: 0, y: 0 }): IVec2 {
  return add(multi(sub(from, a), 2), a)
}

/**
 * fromに対して、aからradian回転したベクトル取得
 * @param a 対象ベクトル
 * @param radian 回転ラジアン
 * @param from 基点
 * @param 回転後のベクトル
 */
export function rotate (a: IVec2, radian: number, from: IVec2 = { x: 0, y: 0 }): IVec2 {
  const fromBase: IVec2 = sub(a, from)
  return add({
    x: Math.cos(radian) * fromBase.x - Math.sin(radian) * fromBase.y,
    y: Math.sin(radian) * fromBase.x + Math.cos(radian) * fromBase.y
  }, from)
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
export function solveEquationOrder2 (a: number, b: number, c: number): number[] {
  if (a === 0) {
    return b === 0 ? [] : [-c / b]
  }

  const d = b * b - 4 * a * c
  if (d < 0) {
    return []
  }

  const ia = 0.5 / a

  if (d === 0) {
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
export function getPedal (p: IVec2, line: IVec2[]): IVec2 {
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
function rayToBezier (p0: IVec2, p1: IVec2, p2: IVec2, p: IVec2, q: IVec2): number[] {
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
export function getCrossLineAndBezier (p0: IVec2, p1: IVec2, p2: IVec2, p: IVec2, q: IVec2) {
  return rayToBezier(p0, p1, p2, p, q)
    .filter((t) => 0 <= t && t <= 1)
    .map((t) => ({
      x: (p2.x - 2 * p1.x + p0.x) * t * t + 2 * (p1.x - p0.x) * t + p0.x,
      y: (p2.y - 2 * p1.y + p0.y) * t * t + 2 * (p1.y - p0.y) * t + p0.y
    }))
}

/**
 * 線分と線分の交差判定
 * @param seg1 線分1
 * @param seg2 線分2
 * @return 交差しているフラグ
 */
export function isCrossSegAndSeg (seg1: IVec2[], seg2: IVec2[]): boolean {
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
  return tc * td < 0 && ta * tb < 0
}

/**
 * 平行判定
 * @param a ベクトル or 2点の配列
 * @param b 同上
 * @return 平行であるフラグ
 */
export function isParallel (a: IVec2, b: IVec2): boolean {
  const cross = getCross(a, b)
  return Math.abs(cross) < MINVALUE
}

/**
 * 点が直線上にあるか判定
 * @param p 点
 * @param line 直線
 * @return 直線上にあるフラグ
 */
export function isOnLine (p: IVec2, line: IVec2[]): boolean {
  return isZero(sub(p, getPedal(p, line)))
}

/**
 * 線分と直線の交点取得
 * @param seg 線分
 * @param line 直線
 * @return 交点
 */
export function getCrossSegAndLine (seg: IVec2[], line: IVec2[]): IVec2 | null {
  if (isParallel(sub(seg[0], seg[1]), sub(line[0], line[1]))) return null
  if (isOnLine(seg[0], line)) return { ...seg[0] }
  if (isOnLine(seg[1], line)) return { ...seg[1] }

  const s1 = ((line[1].x - line[0].x) * (seg[0].y - line[0].y) - (line[1].y - line[0].y) * (seg[0].x - line[0].x)) / 2
  const s2 = ((line[1].x - line[0].x) * (line[0].y - seg[1].y) - (line[1].y - line[0].y) * (line[0].x - seg[1].x)) / 2
  const rate = s1 / (s1 + s2)
  const isExistCorss = 0 < rate && rate < 1

  return isExistCorss ? {
    x: seg[0].x + (seg[1].x - seg[0].x) * rate,
    y: seg[0].y + (seg[1].y - seg[0].y) * rate
  } : null
}

/**
 * 同一線分かを判定する
 * @param ab 線分ab
 * @param cd 線分cd
 * @return 同一であるフラグ
 */
export function isSameSeg (ab: IVec2[], cd: IVec2[]): boolean {
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
export function splitPolyByLine (pol: IVec2[], line: IVec2[]): IVec2[][] {
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
    splitPol.push({
      x: points[i].x,
      y: points[i].y
    })
  }
  // 交点から追加
  for (let i = crossIndex[1]; i < points.length; i++) {
    splitPol.push({
      x: points[i].x,
      y: points[i].y
    })
  }
  // 確定
  splitedPolygons.push(splitPol)

  // 2つ目
  splitPol = []
  // 交点から交点まで追加
  for (let i = crossIndex[0]; i <= crossIndex[1]; i++) {
    splitPol.push({
      x: points[i].x,
      y: points[i].y
    })
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
      recursiveResult.push(splited[0])
      recursiveResult.push(splited[1])
    }
  })

  return recursiveResult
}

/**
 * 三角分割
 * @param polygon 面
 * @return 分割面リスト
 */
export function triangleSplit (polygon: IVec2[]): IVec2[][] {
  // 時計周りに揃える
  polygon = convertLoopwise(polygon)

  // ポリゴン複製
  const targetPoly = polygon.concat()

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
      const pa = sub(targetPoly[(farthestIndex + 1) % size], targetPoly[farthestIndex])
      const pb = sub(targetPoly[(farthestIndex - 1 < 0) ? size - 1 : farthestIndex - 1], targetPoly[farthestIndex])

      currentCross = getCross(pa, pb)

      let index = farthestIndex
      // 最遠点以外で探す
      while (!tri) {
        index = (index + 1) % size
        // 最遠点の外積と同じ符号かを判定
        const v1 = sub(targetPoly[(index + 1) % size], targetPoly[index])
        const v2 = sub(targetPoly[(index - 1 < 0) ? size - 1 : index - 1], targetPoly[index])
        const tmpCross = getCross(v1, v2)
        if (tmpCross * currentCross > 0) {
              // 判定続行
          tri = getTriangle(targetPoly, index)
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
function getTriangle (polygon: IVec2[], index: number): IVec2[] | null {
  // indexとその前後点で三角形作成
  const size = polygon.length
  const p0 = polygon[index]
  const p1 = polygon[(index + 1) % size]
  const p2 = polygon[(index - 1 < 0) ? size - 1 : index - 1]

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
export function isPointOnTriangle (tri: IVec2[], p: IVec2): boolean {
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
  if ((crossABP >= 0 && crossBCP >= 0 && crossCAP >= 0) ||
        (crossABP <= 0 && crossBCP <= 0 && crossCAP <= 0)) {
    return true
  }

  return false
}

/**
 * 面を時計回りに変換する
 * @param {vector[]} 面
 * @return 時計回りにした面(引数とは別配列にする)
 */
export function convertLoopwise (polygon: IVec2[]): IVec2[] {
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
export function getLoopwise (polygon: IVec2[]): number {
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
export function getArea (polygon: IVec2[], allowNegative: boolean = false): number {
  if (polygon.length < 3) return 0

  let area = 0
  const size = polygon.length
  for (let i = 0; i < size - 1; i++) {
    area += (polygon[i].x - polygon[i + 1].x) * (polygon[i].y + polygon[i + 1].y)
  }
  // 最後分
  area += (polygon[size - 1].x - polygon[0].x) * (polygon[size - 1].y + polygon[0].y)

  area /= 2

  // 負値を許さないなら絶対値
  if (!allowNegative) {
    area = Math.abs(area)
  }

  return area
}
