import { IVec2, IRectangle } from './types';
/**
 * 矩形を左辺からリサイズ
 * @param org 元の矩形
 * @param diffX 変更値
 * @return サイズ変更後の矩形プロパティ
 */
export declare function resizeRectByLeft(org: IRectangle, diffX: number): Partial<IRectangle>;
/**
 * 矩形を右辺からリサイズ
 * @param org 元の矩形
 * @param diffX 変更値
 * @return サイズ変更後の矩形プロパティ
 */
export declare function resizeRectByRight(org: IRectangle, diffX: number): Partial<IRectangle>;
/**
 * 矩形を上辺からリサイズ
 * @param org 元の矩形
 * @param diffY 変更値
 * @return サイズ変更後の矩形プロパティ
 */
export declare function resizeRectByTop(org: IRectangle, diffY: number): Partial<IRectangle>;
/**
 * 矩形を下辺からリサイズ
 * @param org 元の矩形
 * @param diffY 変更値
 * @return サイズ変更後の矩形プロパティ
 */
export declare function resizeRectByBottom(org: IRectangle, diffY: number): Partial<IRectangle>;
/**
 * 矩形を左上頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形プロパティ
 */
export declare function resizeRectByLeftTop(org: IRectangle, diff: IVec2): Partial<IRectangle>;
/**
 * 矩形を右上頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形プロパティ
 */
export declare function resizeRectByRightTop(org: IRectangle, diff: IVec2): Partial<IRectangle>;
/**
 * 矩形を右下頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形プロパティ
 */
export declare function resizeRectByRightBottom(org: IRectangle, diff: IVec2): Partial<IRectangle>;
/**
 * 矩形を左下頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @return サイズ変更後の矩形プロパティ
 */
export declare function resizeRectByLeftBottom(org: IRectangle, diff: IVec2): Partial<IRectangle>;
