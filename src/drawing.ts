import { IVec2, IRectangle } from './types'

/**
 * 矩形を左辺からリサイズ
 * @param org 元の矩形
 * @param diffX 変更値
 * @return サイズ変更後の矩形プロパティ
 */
export function resizeRectByLeft(
  org: IRectangle,
  diffX: number
): Partial<IRectangle> {
  const x = org.x + diffX
  const width = org.width - diffX
  return {
    x: Math.min(x, x + width),
    width: Math.abs(width),
  }
}

/**
 * 矩形を右辺からリサイズ
 * @param org 元の矩形
 * @param diffX 変更値
 * @return サイズ変更後の矩形プロパティ
 */
export function resizeRectByRight(
  org: IRectangle,
  diffX: number
): Partial<IRectangle> {
  const width = org.width + diffX
  return width >= 0
    ? {
        width,
      }
    : {
        x: org.x + width,
        width: -width,
      }
}

/**
 * 矩形を上辺からリサイズ
 * @param org 元の矩形
 * @param diffY 変更値
 * @return サイズ変更後の矩形プロパティ
 */
export function resizeRectByTop(
  org: IRectangle,
  diffY: number
): Partial<IRectangle> {
  const y = org.y + diffY
  const height = org.height - diffY
  return {
    y: Math.min(y, y + height),
    height: Math.abs(height),
  }
}

/**
 * 矩形を下辺からリサイズ
 * @param org 元の矩形
 * @param diffY 変更値
 * @return サイズ変更後の矩形プロパティ
 */
export function resizeRectByBottom(
  org: IRectangle,
  diffY: number
): Partial<IRectangle> {
  const height = org.height + diffY
  return height >= 0
    ? {
        height,
      }
    : {
        y: org.y + height,
        height: -height,
      }
}

/**
 * 矩形を左上頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形プロパティ
 */
export function resizeRectByLeftTop(
  org: IRectangle,
  diff: IVec2
): Partial<IRectangle> {
  return {
    ...resizeRectByLeft(org, diff.x),
    ...resizeRectByTop(org, diff.y),
  }
}

/**
 * 矩形を右上頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形プロパティ
 */
export function resizeRectByRightTop(
  org: IRectangle,
  diff: IVec2
): Partial<IRectangle> {
  return {
    ...resizeRectByRight(org, diff.x),
    ...resizeRectByTop(org, diff.y),
  }
}

/**
 * 矩形を右下頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形プロパティ
 */
export function resizeRectByRightBottom(
  org: IRectangle,
  diff: IVec2
): Partial<IRectangle> {
  return {
    ...resizeRectByRight(org, diff.x),
    ...resizeRectByBottom(org, diff.y),
  }
}

/**
 * 矩形を左下頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形プロパティ
 */
export function resizeRectByLeftBottom(
  org: IRectangle,
  diff: IVec2
): Partial<IRectangle> {
  return {
    ...resizeRectByLeft(org, diff.x),
    ...resizeRectByBottom(org, diff.y),
  }
}
