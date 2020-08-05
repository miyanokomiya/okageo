import { ISvgConfigs, ISvgPath, ISvgStyle, IVec2 } from './types';
export declare const configs: ISvgConfigs;
/**
 * 描画
 * @param ctx 描画要素
 * @param pathInfo 図形情報
 */
export declare function draw(ctx: CanvasRenderingContext2D, pathInfo: ISvgPath): void;
/**
 * 矩形に収まるよう調整
 * @param pathInfoList パス情報リスト
 * @param x 矩形x座標
 * @param y 矩形y座標
 * @param width 矩形width
 * @param height 矩形height
 * @return 調整後パス情報リスト
 */
export declare function fitRect(pathInfoList: ISvgPath[], x: number, y: number, width: number, height: number): ISvgPath[];
/**
 * SVG文字列から図形のパス情報を取得する
 * 対応タグ: path,rect,ellipse,circle
 * @param svgString SVGリソース文字列
 * @return パス情報リスト
 */
export declare function parseSvgGraphicsStr(svgString: string): ISvgPath[];
/**
 * SVGタグから図形のパス情報を取得する
 * 対応タグ: path,rect,ellipse,circle
 * @param svgTag SVGタグ
 * @return パス情報リスト
 */
export declare function parseSvgGraphics(svgTag: SVGElement): ISvgPath[];
/**
 * opentype.jsのpath.commandをd文字列に変換する
 * @param fontPath opentype.jsのpath.command
 * @return d文字列
 */
export declare function openCommandToD(command: any): string;
/**
 * opentype.jsのpathを解析する
 * @param fontPath opentype.jsのpath
 * @return パス情報リスト
 */
export declare function parseOpenPath(fontPath: {
    commands: any[];
}): ISvgPath[];
/**
 * pathタグを解析する
 * @param dStr SVGのpathタグd文字列
 * @return 座標リスト
 */
export declare function parsePathD(dStr: string): IVec2[];
/**
 * pathタグを解析する
 * @param svgPath SVGのpathタグDOM
 * @return 座標リスト
 */
export declare function parsePath(svgPath: SVGPathElement): IVec2[];
/**
 * rectタグを解析する
 * @param SVGのrectタグDOM
 * @return 座標リスト
 */
export declare function parseRect(svgRect: SVGRectElement): IVec2[];
/**
 * ellipseタグを解析する
 * @param svgEllipse SVGのellipseタグDOM
 * @return 座標リスト
 */
export declare function parseEllipse(svgEllipse: SVGEllipseElement): IVec2[];
/**
 * circleタグを解析する
 * @param svgCircle  SVGのcircleタグDOM
 * @return 座標リスト
 */
export declare function parseCircle(svgCircle: SVGCircleElement): IVec2[];
/**
 * transformを行う
 * @param commandStr コマンド文字列
 * @param points 変換前座標リスト
 * @return 変形後座標リスト
 */
export declare function adoptTransform(commandStr: string | null, points: IVec2[]): IVec2[];
/**
 * pathタグd属性文字列を分割する
 * @param dString pathのd要素文字列
 * @return コマンド単位の情報配列の配列
 */
export declare function splitD(dString: string): string[][];
/**
 * svg文字列を生成する
 * @param pathList path情報リスト
 * @return xml文字列
 */
export declare function serializeSvgString(pathList: ISvgPath[]): string;
/**
 * svgタグを生成する
 * @param pathList path情報リスト
 * @return svgタグ
 */
export declare function serializeSvg(pathList: ISvgPath[]): SVGElement;
/**
 * pathタグを生成する
 * @param pointList 座標リスト
 * @param style スタイル情報
 * @return pathタグ
 */
export declare function serializePath(pointList: IVec2[], style: ISvgStyle): SVGPathElement;
/**
 * 座標リストをd属性文字列に変換する
 * @param pointList 座標リスト
 * @param open 閉じないフラグ
 * @return d属性文字列
 */
export declare function serializePointList(pointList: IVec2[], open?: boolean): string;
/**
 * デフォルトstyle作成
 * @return スタイルオブジェクト
 */
export declare function createStyle(): {
    fill: boolean;
    fillGlobalAlpha: number;
    fillStyle: string;
    lineCap: string;
    lineDash: never[];
    lineJoin: string;
    lineWidth: number;
    stroke: boolean;
    strokeGlobalAlpha: number;
    strokeStyle: string;
};
/**
 * pathタグのスタイルを取得する
 * @param svgPath SVGのpathタグDOM
 * @return スタイルオブジェクト
 */
export declare function parseTagStyle(svgPath: SVGElement): ISvgStyle;
/**
 * スタイル情報をstyle属性文字列に変換する
 * @method serializeStyle
 * @param style スタイル情報
 * @return style属性文字列
 */
export declare function serializeStyle(style: ISvgStyle): string;
/**
 * パス分割
 * @param path 対象パス
 * @param line 分割線
 * @return 分割後のパスリスト
 */
export declare function splitPath(path: ISvgPath, line: IVec2[]): ISvgPath[];
/**
 * ポリゴンリストをグルーピングしたパスリストに変換する
 * @param polygons ポリゴンリスト
 * @param style パススタイル
 * @return パスリスト
 */
export declare function getGroupedPathList(polygons: IVec2[][], style?: ISvgStyle): ISvgPath[];
