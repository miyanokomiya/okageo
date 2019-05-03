import { IVec2 } from '../types/index'

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
 * 点が面上にあるか判定
 * @param p 点
 * @param polygon 面
 * @return 面上にあるフラグ
 */
export function isOnPolygon (p: IVec2, polygon: IVec2[]): boolean {
  const segs: IVec2[][] = polygon.map((point, i) => {
    return [point, i < polygon.length - 1 ? polygon[i + 1] : polygon[0]]
  })
  // pからx方向への直線と面の各辺との交差回数から判定する
  const hitSegs = segs.filter((seg) => {
    const maxX: number = Math.max(seg[0].x, seg[1].x)
    if (maxX < p.x) return false
    if (seg[0].y < p.y && seg[1].y < p.y) return false
    if (p.y < seg[0].y && p.y < seg[1].y) return false
    return isCrossSegAndSeg(
      seg,
      [p, { x: maxX + 1, y: p.y }]
    )
  })
  return hitSegs.length % 2 === 1
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
export function triangleSplit (polygon: IVec2[]): IVec2[][] {
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

/**
 * ベジェ曲線を直線で近似する(３次まで対応)
 * @param pointList 制御点リスト
 * @param size 分割数(1なら制御点両端のみ)
 * @return 座標リスト
 */
export function approximateBezier (pointList: IVec2[], size: number): IVec2[] {
  const ret: IVec2[] = []
  const unitT: number = 1 / size

  if (pointList.length === 3) {
    // ２次ベジェの場合
    for (let i = 0; i <= size; i++) {
      const t = unitT * i
      const c0 = multi(pointList[0], (1 - t) * (1 - t))
      const c1 = multi(pointList[1], 2 * t * (1 - t))
      const c2 = multi(pointList[2], t * t)
      ret.push({
        x : c0.x + c1.x + c2.x,
        y : c0.y + c1.y + c2.y
      })
    }
  } else if (pointList.length === 4) {
    // 3次ベジェの場合
    for (let i = 0; i <= size; i++) {
      const t = unitT * i
      const c0 = multi(pointList[0], (1 - t) * (1 - t) * (1 - t))
      const c1 = multi(pointList[1], 3 * t * (1 - t) * (1 - t))
      const c2 = multi(pointList[2], 3 * t * t * (1 - t))
      const c3 = multi(pointList[3], t * t * t)
      ret.push({
        x : c0.x + c1.x + c2.x + c3.x,
        y : c0.y + c1.y + c2.y + c3.y
      })
    }
  } else {
    throw new Error('connot approximate')
  }

  return ret
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
export function approximateArc (
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
    ret.push(add(rotate({
      x : rx * Math.cos(t),
      y : ry * Math.sin(t)
    }, radian), center))
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
export function approximateArcWithPoint (
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

  return approximateArc(
    rx,
    ry,
    startRadian,
    endRadian,
    center,
    radian,
    size
  )
}

/**
 * 円弧上の点の角度を求める
 * @param a 円弧上の点
 * @param rx x径長
 * @param center 中心座標
 * @param radian 傾き
 * @return ラジアン(0 <= t <= 2 * Math.PI)
 */
function getRadianOnArc (
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
export function getEllipseCenter (
  a: IVec2,
  b: IVec2,
  rx: number,
  ry: number,
  radian: number
): { centers: IVec2[], radiusRate: number } {
  // 回転を打ち消す
  a = rotate(a, -radian)
  b = rotate(b, -radian)

  // 媒介変数を利用して円の中心問題にする
  const A = {
    x : a.x / rx,
    y : a.y / ry
  }
  const B = {
    x : b.x / rx,
    y : b.y / ry
  }

  // 円の中心取得
  const centerInfo = getCircleCenter(A, B, 1)
  const C = centerInfo.centers

  // 楕円に戻す
  let ans1 = {
    x : C[0].x * rx,
    y : C[0].y * ry
  }
  let ans2 = {
    x : C[1].x * rx,
    y : C[1].y * ry
  }

  // 回転を戻す
  ans1 = rotate(ans1, radian)
  ans2 = rotate(ans2, radian)

  return {
    centers: [ans1, ans2],
    radiusRate: centerInfo.radiusRate
  }
}

/**
 * ２点を通る円の中心を求める
 * @param a 点a
 * @param b 点b
 * @param radius 半径
 * @return { centers: 解となる２点, radiusRate: 半径補正係数 }
 */
export function getCircleCenter (
  a: IVec2,
  b: IVec2,
  radius: number
): { centers: IVec2[], radiusRate: number } {
  const u1 = (a.x + b.x) / 2
  const u2 = (a.x - b.x) / 2
  const v1 = (a.y + b.y) / 2
  const v2 = (a.y - b.y) / 2
  const L = Math.sqrt(u2 * u2 + v2 * v2)
  const t2 = Math.pow((radius / L), 2) - 1

  // 2点が直径以上に離れている => 2点を直径とみなす
  if (t2 < 0) {
    const center = getCenter(a, b)
    return {
      centers: [center, center],
      radiusRate: L / radius
    }
  }

  const t = Math.sqrt(t2)
  const ans1 = {
    x : u1 + v2 * t,
    y : v1 - u2 * t
  }
  const ans2 = {
    x : u1 - v2 * t,
    y : v1 + u2 * t
  }

  return {
    centers: [ans1, ans2],
    radiusRate: 1
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
export function transform (points: IVec2[], params: number[]): IVec2[] {
  const a = params[0]
  const b = params[1]
  const c = params[2]
  const d = params[3]
  const e = params[4]
  const f = params[5]

  return points.map((p) => ({
    x : a * p.x + c * p.y + e,
    y : b * p.x + d * p.y + f
  }))
}

/**
 * 隣り合う同一点をオミットする
 * @method omitSamePoint
 * @param polygon ポリゴン
 * @return オミット後のポリゴン
 */
export function omitSamePoint (polygon: IVec2[]): IVec2[] {
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
export function getRegularPolygonArea (radius: number, n: number): number {
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
export function getRegularPolygonRadius (area: number, n: number): number {
  const unitRad = Math.PI / n
  const unitArea = area / n
  return Math.sqrt(unitArea / Math.sin(unitRad) / Math.cos(unitRad))
}

/**
 * 包含関係にあるポリゴンをグループ化する
 * @param polygons ポリゴン一覧
 * @return グループ化したポリゴン一覧、グループ内は面積降順
 */
export function getIncludedPolygonGroups (polygons: IVec2[][]): IVec2[][][] {
  const sorted = polygons.concat()
  sorted.sort((a, b) => {
    return getArea(b) - getArea(a)
  })
  const hit: { [s: string]: boolean } = {}
  const ret: IVec2[][][] = []
  sorted.forEach((p, i) => {
    if (hit[i]) return
    hit[i] = true
    const group = [p].concat(sorted.filter((c, j) => {
      if (hit[j]) return false
      const pointsOnPolygon = c.filter((point) => isOnPolygon(point, p))
      if (pointsOnPolygon.length !== c.length) return false
      hit[j] = true
      return true
    }))
    ret.push(group)
  })
  return ret
}
