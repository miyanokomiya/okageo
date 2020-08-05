import { IVec2, IRectangle } from './types'

/**
 * 矩形を左辺からリサイズ
 * @param org 元の矩形
 * @param diffX 変更値
 * @return サイズ変更後の矩形プロパティ
 */
export function resizeByLeft(
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
export function resizeByRight(
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
export function resizeByTop(
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
export function resizeByBottom(
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
export function resizeByLeftTop(
  org: IRectangle,
  diff: IVec2
): Partial<IRectangle> {
  return {
    ...resizeByLeft(org, diff.x),
    ...resizeByTop(org, diff.y),
  }
}

/**
 * 矩形を右上頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形プロパティ
 */
export function resizeByRightTop(
  org: IRectangle,
  diff: IVec2
): Partial<IRectangle> {
  return {
    ...resizeByRight(org, diff.x),
    ...resizeByTop(org, diff.y),
  }
}

/**
 * 矩形を右下頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形プロパティ
 */
export function resizeByRightBottom(
  org: IRectangle,
  diff: IVec2
): Partial<IRectangle> {
  return {
    ...resizeByRight(org, diff.x),
    ...resizeByBottom(org, diff.y),
  }
}

/**
 * 矩形を左下頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形プロパティ
 */
export function resizeByLeftBottom(
  org: IRectangle,
  diff: IVec2
): Partial<IRectangle> {
  return {
    ...resizeByLeft(org, diff.x),
    ...resizeByBottom(org, diff.y),
  }
}
