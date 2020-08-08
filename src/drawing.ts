import { IVec2, IRectangle } from './types'
import * as geo from './geo'

export function moveRect(org: IRectangle, v: IVec2): IRectangle {
  return {
    ...org,
    ...geo.add(org, v),
  }
}
export function getRectLT(rect: IRectangle): IVec2 {
  return {
    x: rect.x,
    y: rect.y,
  }
}
export function getRectRT(rect: IRectangle): IVec2 {
  return {
    x: rect.x + rect.width,
    y: rect.y,
  }
}
export function getRectRB(rect: IRectangle): IVec2 {
  return {
    x: rect.x + rect.width,
    y: rect.y + rect.height,
  }
}
export function getRectLB(rect: IRectangle): IVec2 {
  return {
    x: rect.x,
    y: rect.y + rect.height,
  }
}

/**
 * 矩形を左辺からリサイズ
 * @param org 元の矩形
 * @param diffX 変更値
 * @return サイズ変更後の矩形
 */
export function resizeRectByLeft(org: IRectangle, diffX: number): IRectangle {
  const x = org.x + diffX
  const width = org.width - diffX
  return {
    ...org,
    x: Math.min(x, x + width),
    width: Math.abs(width),
  }
}

/**
 * 矩形を右辺からリサイズ
 * @param org 元の矩形
 * @param diffX 変更値
 * @return サイズ変更後の矩形
 */
export function resizeRectByRight(org: IRectangle, diffX: number): IRectangle {
  const width = org.width + diffX
  return width >= 0
    ? {
        ...org,
        width,
      }
    : {
        ...org,
        x: org.x + width,
        width: -width,
      }
}

/**
 * 矩形を上辺からリサイズ
 * @param org 元の矩形
 * @param diffY 変更値
 * @return サイズ変更後の矩形
 */
export function resizeRectByTop(org: IRectangle, diffY: number): IRectangle {
  const y = org.y + diffY
  const height = org.height - diffY
  return {
    ...org,
    y: Math.min(y, y + height),
    height: Math.abs(height),
  }
}

/**
 * 矩形を下辺からリサイズ
 * @param org 元の矩形
 * @param diffY 変更値
 * @return サイズ変更後の矩形
 */
export function resizeRectByBottom(org: IRectangle, diffY: number): IRectangle {
  const height = org.height + diffY
  return height >= 0
    ? {
        ...org,
        height,
      }
    : {
        ...org,
        y: org.y + height,
        height: -height,
      }
}

/**
 * 矩形を左上頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export function resizeRectByLeftTop(
  org: IRectangle,
  diff: IVec2,
  keepAspectRate?: boolean
): IRectangle {
  if (!keepAspectRate)
    return resizeRectByTop(resizeRectByLeft(org, diff.x), diff.y)

  const base = {
    x: org.x,
    y: org.y,
  }
  const diag = [base, { x: org.x + org.width, y: org.y + org.height }]
  const adjusted = geo.sub(geo.getPedal(geo.add(base, diff), diag), base)
  return resizeRectByTop(resizeRectByLeft(org, adjusted.x), adjusted.y)
}

/**
 * 矩形を右上頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export function resizeRectByRightTop(
  org: IRectangle,
  diff: IVec2,
  keepAspectRate?: boolean
): IRectangle {
  if (!keepAspectRate)
    return resizeRectByTop(resizeRectByRight(org, diff.x), diff.y)

  const base = {
    x: org.x + org.width,
    y: org.y,
  }
  const diag = [base, { x: org.x, y: org.y + org.height }]
  const adjusted = geo.sub(geo.getPedal(geo.add(base, diff), diag), base)
  return resizeRectByTop(resizeRectByRight(org, adjusted.x), adjusted.y)
}

/**
 * 矩形を右下頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export function resizeRectByRightBottom(
  org: IRectangle,
  diff: IVec2,
  keepAspectRate?: boolean
): IRectangle {
  if (!keepAspectRate)
    return resizeRectByBottom(resizeRectByRight(org, diff.x), diff.y)

  const base = {
    x: org.x + org.width,
    y: org.y + org.height,
  }
  const diag = [base, org]
  const adjusted = geo.sub(geo.getPedal(geo.add(base, diff), diag), base)
  return resizeRectByBottom(resizeRectByRight(org, adjusted.x), adjusted.y)
}

/**
 * 矩形を左下頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export function resizeRectByLeftBottom(
  org: IRectangle,
  diff: IVec2,
  keepAspectRate?: boolean
): IRectangle {
  if (!keepAspectRate)
    return resizeRectByBottom(resizeRectByLeft(org, diff.x), diff.y)

  const base = {
    x: org.x,
    y: org.y + org.height,
  }
  const diag = [base, { x: org.x + org.width, y: org.y }]
  const adjusted = geo.sub(geo.getPedal(geo.add(base, diff), diag), base)
  return resizeRectByBottom(resizeRectByLeft(org, adjusted.x), adjusted.y)
}

/**
 * 回転を考慮して矩形を左上頂点からリサイズ
 * @param org 元の矩形
 * @param from 移動基準座標
 * @param to 移動先座標
 * @param radian 回転ラジアン
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export function resizeRectByLeftTopWithRotation(
  org: IRectangle,
  from: IVec2,
  to: IVec2,
  radian: number = 0,
  keepAspectRate?: boolean
): IRectangle {
  const center = geo.getRectCenter(org)
  const next = resizeRectByLeftTop(
    org,
    geo.sub(geo.rotate(to, -radian, center), geo.rotate(from, -radian, center)),
    keepAspectRate
  )
  return slideRectToSamePoint(org, next, radian, getRectRB)
}

/**
 * 回転を考慮して矩形を右上頂点からリサイズ
 * @param org 元の矩形
 * @param from 移動基準座標
 * @param to 移動先座標
 * @param radian 回転ラジアン
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export function resizeRectByRightTopWithRotation(
  org: IRectangle,
  from: IVec2,
  to: IVec2,
  radian: number = 0,
  keepAspectRate?: boolean
): IRectangle {
  const center = geo.getRectCenter(org)
  const next = resizeRectByRightTop(
    org,
    geo.sub(geo.rotate(to, -radian, center), geo.rotate(from, -radian, center)),
    keepAspectRate
  )
  return slideRectToSamePoint(org, next, radian, getRectLB)
}

/**
 * 回転を考慮して矩形を右下頂点からリサイズ
 * @param org 元の矩形
 * @param from 移動基準座標
 * @param to 移動先座標
 * @param radian 回転ラジアン
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export function resizeRectByRightBottomWithRotation(
  org: IRectangle,
  from: IVec2,
  to: IVec2,
  radian: number = 0,
  keepAspectRate?: boolean
): IRectangle {
  const center = geo.getRectCenter(org)
  const next = resizeRectByRightBottom(
    org,
    geo.sub(geo.rotate(to, -radian, center), geo.rotate(from, -radian, center)),
    keepAspectRate
  )
  return slideRectToSamePoint(org, next, radian, getRectLT)
}

/**
 * 回転を考慮して矩形を左下頂点からリサイズ
 * @param org 元の矩形
 * @param from 移動基準座標
 * @param to 移動先座標
 * @param radian 回転ラジアン
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export function resizeRectByLeftBottomWithRotation(
  org: IRectangle,
  from: IVec2,
  to: IVec2,
  radian: number = 0,
  keepAspectRate?: boolean
): IRectangle {
  const center = geo.getRectCenter(org)
  const next = resizeRectByLeftBottom(
    org,
    geo.sub(geo.rotate(to, -radian, center), geo.rotate(from, -radian, center)),
    keepAspectRate
  )
  return slideRectToSamePoint(org, next, radian, getRectRT)
}

/**
 * 同一点を基準に矩形をずらす
 * @param org 元の矩形
 * @param next ずらす対象の矩形
 * @param radian 回転ラジアン
 * @param getSamePoint 基準点取得関数
 * @return サイズ変更後の矩形
 */
function slideRectToSamePoint(
  org: IRectangle,
  next: IRectangle,
  radian: number = 0,
  getSamePoint: (rect: IRectangle) => IVec2
): IRectangle {
  return moveRect(
    next,
    geo.sub(
      geo.rotate(getSamePoint(org), radian, geo.getRectCenter(org)),
      geo.rotate(getSamePoint(next), radian, geo.getRectCenter(next))
    )
  )
}
