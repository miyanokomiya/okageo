import { IVec2, IRectangle } from './types'

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
 * @return サイズ変更後の矩形
 */
export function resizeRectByLeftTop(org: IRectangle, diff: IVec2): IRectangle {
  return resizeRectByTop(resizeRectByLeft(org, diff.x), diff.y)
}

/**
 * 矩形を右上頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形
 */
export function resizeRectByRightTop(org: IRectangle, diff: IVec2): IRectangle {
  return resizeRectByTop(resizeRectByRight(org, diff.x), diff.y)
}

/**
 * 矩形を右下頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形
 */
export function resizeRectByRightBottom(
  org: IRectangle,
  diff: IVec2
): IRectangle {
  return resizeRectByBottom(resizeRectByRight(org, diff.x), diff.y)
}

/**
 * 矩形を左下頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形
 */
export function resizeRectByLeftBottom(
  org: IRectangle,
  diff: IVec2
): IRectangle {
  return resizeRectByBottom(resizeRectByLeft(org, diff.x), diff.y)
}
