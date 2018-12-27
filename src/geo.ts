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
