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

// fromに対して、aと点対称なベクトル取得
export function getSymmetry (a: IVec2, from: IVec2 = { x: 0, y: 0 }): IVec2 {
  return add(multi(sub(from, a), 2), a)
}
