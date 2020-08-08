import { IVec2, IRectangle } from './types';
export declare function moveRect(org: IRectangle, v: IVec2): IRectangle;
export declare function getRectLT(rect: IRectangle): IVec2;
export declare function getRectRT(rect: IRectangle): IVec2;
export declare function getRectRB(rect: IRectangle): IVec2;
export declare function getRectLB(rect: IRectangle): IVec2;
/**
 * 矩形を左辺からリサイズ
 * @param org 元の矩形
 * @param diffX 変更値
 * @return サイズ変更後の矩形
 */
export declare function resizeRectByLeft(org: IRectangle, diffX: number): IRectangle;
/**
 * 矩形を右辺からリサイズ
 * @param org 元の矩形
 * @param diffX 変更値
 * @return サイズ変更後の矩形
 */
export declare function resizeRectByRight(org: IRectangle, diffX: number): IRectangle;
/**
 * 矩形を上辺からリサイズ
 * @param org 元の矩形
 * @param diffY 変更値
 * @return サイズ変更後の矩形
 */
export declare function resizeRectByTop(org: IRectangle, diffY: number): IRectangle;
/**
 * 矩形を下辺からリサイズ
 * @param org 元の矩形
 * @param diffY 変更値
 * @return サイズ変更後の矩形
 */
export declare function resizeRectByBottom(org: IRectangle, diffY: number): IRectangle;
/**
 * 矩形を左上頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export declare function resizeRectByLeftTop(org: IRectangle, diff: IVec2, keepAspectRate?: boolean): IRectangle;
/**
 * 矩形を右上頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export declare function resizeRectByRightTop(org: IRectangle, diff: IVec2, keepAspectRate?: boolean): IRectangle;
/**
 * 矩形を右下頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export declare function resizeRectByRightBottom(org: IRectangle, diff: IVec2, keepAspectRate?: boolean): IRectangle;
/**
 * 矩形を左下頂点からリサイズ
 * @param org 元の矩形
 * @param diff 変更ベクトル
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export declare function resizeRectByLeftBottom(org: IRectangle, diff: IVec2, keepAspectRate?: boolean): IRectangle;
/**
 * 回転を考慮して矩形を左上頂点からリサイズ
 * @param org 元の矩形
 * @param from 移動基準座標
 * @param to 移動先座標
 * @param radian 回転ラジアン
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export declare function resizeRectByLeftTopWithRotation(org: IRectangle, from: IVec2, to: IVec2, radian?: number, keepAspectRate?: boolean): IRectangle;
/**
 * 回転を考慮して矩形を右上頂点からリサイズ
 * @param org 元の矩形
 * @param from 移動基準座標
 * @param to 移動先座標
 * @param radian 回転ラジアン
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export declare function resizeRectByRightTopWithRotation(org: IRectangle, from: IVec2, to: IVec2, radian?: number, keepAspectRate?: boolean): IRectangle;
/**
 * 回転を考慮して矩形を右下頂点からリサイズ
 * @param org 元の矩形
 * @param from 移動基準座標
 * @param to 移動先座標
 * @param radian 回転ラジアン
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export declare function resizeRectByRightBottomWithRotation(org: IRectangle, from: IVec2, to: IVec2, radian?: number, keepAspectRate?: boolean): IRectangle;
/**
 * 回転を考慮して矩形を左下頂点からリサイズ
 * @param org 元の矩形
 * @param from 移動基準座標
 * @param to 移動先座標
 * @param radian 回転ラジアン
 * @param keepAspectRate アスペクト比維持
 * @return サイズ変更後の矩形
 */
export declare function resizeRectByLeftBottomWithRotation(org: IRectangle, from: IVec2, to: IVec2, radian?: number, keepAspectRate?: boolean): IRectangle;
