import { IVec2, IRectangle } from './types';
export declare const MINVALUE: number;
export declare function add(a: IVec2, b: IVec2): IVec2;
export declare function sub(a: IVec2, b: IVec2): IVec2;
export declare function multi(a: IVec2, b: number): IVec2;
export declare function isSame(a: IVec2, b: IVec2): boolean;
export declare function getDistance(a: IVec2, b: IVec2): number;
export declare function getNorm(a: IVec2): number;
export declare function isZero(a: IVec2): boolean;
export declare function getUnit(a: IVec2): IVec2;
export declare function getCross(a: IVec2, b: IVec2): number;
export declare function getInner(a: IVec2, b: IVec2): number;
export declare function cloneVectors(vectors: IVec2[]): IVec2[];
export declare function getCenter(a: IVec2, b: IVec2): IVec2;
export declare function getRectCenter(rec: IRectangle): IVec2;
export declare function getRadian(a: IVec2, from?: IVec2): number;
/**
 * fromに対して、aと点対称なベクトル取得
 * @param a 対象ベクトル
 * @param from 基点
 * @param 点対称ベクトル
 */
export declare function getSymmetry(a: IVec2, from?: IVec2): IVec2;
/**
 * fromに対して、aからradian回転したベクトル取得
 * @param a 対象ベクトル
 * @param radian 回転ラジアン
 * @param from 基点
 * @param 回転後のベクトル
 */
export declare function rotate(a: IVec2, radian: number, from?: IVec2): IVec2;
/**
 * 2次方程式の解の公式
 * a * x^2 + b * x + c = 0
 * 解に虚数が含まれる場合は解なし扱い
 * @param a x^2の係数
 * @param b xの係数
 * @param c 定数
 * @return 解の配列
 */
export declare function solveEquationOrder2(a: number, b: number, c: number): number[];
/**
 * 点から直線への垂線の足
 * @param p 対象の点
 * @param line 直線
 * @return 垂線の足
 */
export declare function getPedal(p: IVec2, line: IVec2[]): IVec2;
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
export declare function getCrossLineAndBezier(p0: IVec2, p1: IVec2, p2: IVec2, p: IVec2, q: IVec2): {
    x: number;
    y: number;
}[];
/**
 * 線分と線分の交差判定（端点での接触は含まない）
 * @param seg1 線分1
 * @param seg2 線分2
 * @return 交差しているフラグ
 */
export declare function isCrossSegAndSeg(seg1: IVec2[], seg2: IVec2[]): boolean;
/**
 * 線分と線分の接触判定（端点での接触含む）
 * @param seg1 線分1
 * @param seg2 線分2
 * @return 接触しているフラグ
 */
export declare function isTouchSegAndSeg(seg1: IVec2[], seg2: IVec2[]): boolean;
/**
 * 平行判定
 * @param a ベクトル or 2点の配列
 * @param b 同上
 * @return 平行であるフラグ
 */
export declare function isParallel(a: IVec2, b: IVec2): boolean;
/**
 * 点が直線上にあるか判定
 * @param p 点
 * @param line 直線
 * @return 直線上にあるフラグ
 */
export declare function isOnLine(p: IVec2, line: IVec2[]): boolean;
/**
 * 点が線分上にあるか判定
 * @param p 点
 * @param seg 線分
 * @return 線分上にあるフラグ
 */
export declare function isOnSeg(p: IVec2, seg: IVec2[]): boolean;
/**
 * 点が面上にあるか判定（境界線上を含む）
 * @param p 点
 * @param polygon 面
 * @return 面上にあるフラグ
 */
export declare function isOnPolygon(p: IVec2, polygon: IVec2[]): boolean;
/**
 * 線分と直線の交点取得
 * @param seg 線分
 * @param line 直線
 * @return 交点
 */
export declare function getCrossSegAndLine(seg: IVec2[], line: IVec2[]): IVec2 | null;
/**
 * 同一線分かを判定する
 * @param ab 線分ab
 * @param cd 線分cd
 * @return 同一であるフラグ
 */
export declare function isSameSeg(ab: IVec2[], cd: IVec2[]): boolean;
/**
 * ポリゴンを直線で分割する
 * @param pol 面
 * @param line 直線
 * @return 分割された点配列の配列
 */
export declare function splitPolyByLine(pol: IVec2[], line: IVec2[]): IVec2[][];
/**
 * 三角分割
 * @param polygon 面
 * @return 分割面リスト
 */
export declare function triangleSplit(polygon: IVec2[]): IVec2[][];
/**
 * 点が三角形内にあるかを判定する
 * 境界も含む
 * @param tri 三角形
 * @param p 点
 * @return 内部にあるフラグ
 */
export declare function isPointOnTriangle(tri: IVec2[], p: IVec2): boolean;
/**
 * 面を時計回りに変換する
 * @param {vector[]} 面
 * @return 時計回りにした面(引数とは別配列にする)
 */
export declare function convertLoopwise(polygon: IVec2[]): IVec2[];
/**
 * 面の座標が時計回りかを判定する
 * @param polygon 面
 * @return -1:反時計 0:不定 1:時計
 */
export declare function getLoopwise(polygon: IVec2[]): number;
/**
 * 面積取得
 * @param polygon 面
 * @param allowNegative 負値を許すフラグ
 * @return 面積
 */
export declare function getArea(polygon: IVec2[], allowNegative?: boolean): number;
/**
 * ベジェ曲線を直線で近似する(３次まで対応)
 * @param pointList 制御点リスト
 * @param size 分割数(1なら制御点両端のみ)
 * @return 座標リスト
 */
export declare function approximateBezier(pointList: IVec2[], size: number): IVec2[];
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
export declare function approximateArc(rx: number, ry: number, startRadian: number, endRadian: number, center: IVec2, radian: number, size: number): IVec2[];
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
export declare function approximateArcWithPoint(rx: number, ry: number, startPoint: IVec2, endPoint: IVec2, largeArcFlag: boolean, sweepFlag: boolean, radian: number, size: number): IVec2[];
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
export declare function getEllipseCenter(a: IVec2, b: IVec2, rx: number, ry: number, radian: number): {
    centers: IVec2[];
    radiusRate: number;
};
/**
 * ２点を通る円の中心を求める
 * @param a 点a
 * @param b 点b
 * @param radius 半径
 * @return { centers: 解となる２点, radiusRate: 半径補正係数 }
 */
export declare function getCircleCenter(a: IVec2, b: IVec2, radius: number): {
    centers: IVec2[];
    radiusRate: number;
};
/**
 * 2次元アフィン変換を行う
 * paramsには以下の行列をa b c d e fの順で指定する
 * a c e
 * b d f
 * @param points 変換前の座標リスト
 * @param params 行列成分
 * @return 座標リスト
 */
export declare function transform(points: IVec2[], params: number[]): IVec2[];
/**
 * 隣り合う同一点をオミットする
 * @method omitSamePoint
 * @param polygon ポリゴン
 * @return オミット後のポリゴン
 */
export declare function omitSamePoint(polygon: IVec2[]): IVec2[];
/**
 * 正多角形の面積を内接円の半径から求める
 * @param radius 半径
 * @param n 角数
 * @return 面積
 */
export declare function getRegularPolygonArea(radius: number, n: number): number;
/**
 * 正多角形の面積から内接円の半径を求める
 * @param area 面積
 * @param n 角数
 * @return 半径
 */
export declare function getRegularPolygonRadius(area: number, n: number): number;
/**
 * 包含関係にあるポリゴンをグループ化する
 * @param polygons ポリゴン一覧
 * @return グループ化したポリゴン一覧、グループ内は面積降順
 */
export declare function getIncludedPolygonGroups(polygons: IVec2[][]): IVec2[][][];
/**
 * ポリゴンブーリアン演算差
 * 突き抜けは非対応
 * targetは1辺のみでpolyと交差する前提
 * targetとpolyは観点方向が逆である前提
 * @param target ポリゴン
 * @param poly 切り取り範囲ポリゴン
 * @return 切り取った後のポリゴン
 */
export declare function getPolygonNotPolygon(target: IVec2[], poly: IVec2[]): IVec2[];
/**
 * ポリゴン全てを包含する矩形を取得
 * @param polygons ポリゴン一覧
 * @return 外接矩形
 */
export declare function getOuterRectangle(polygons: IVec2[][]): IRectangle;
/**
 * 矩形範囲のグリッド取得
 * @param range 矩形範囲
 * @param gridSize グリッド幅
 * @param dX x軸のずらし幅
 * @param dY y軸のずらし幅
 * @return グリッド線リスト
 */
export declare function getGrid(range: IRectangle, gridSize: number, dX?: number, dY?: number): IVec2[][];
/**
 * 矩形を中心基準でサイズ変更する
 * @param org 元の矩形
 * @param dW 幅変更差分
 * @param dH 高さ変更差分
 * @return サイズ変更後の矩形
 */
export declare function expandRecntagle(org: IRectangle, dW: number, dH: number): IRectangle;
/**
 * 矩形を中心基準の倍率でサイズ変更する
 * @param org 元の矩形
 * @param scaleW 幅変更倍率
 * @param scaleH 高さ軸変更倍率
 * @return サイズ変更後の矩形
 */
export declare function expandRecntagleScale(org: IRectangle, scaleW: number, scaleH: number): IRectangle;
