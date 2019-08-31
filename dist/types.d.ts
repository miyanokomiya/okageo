/**
 * ベクトル
 */
export interface IVec2 {
    /**
     * x成分
     */
    readonly x: number;
    /**
     * y成分
     */
    readonly y: number;
}
/**
 * SVG設定
 */
export interface ISvgConfigs {
    /**
     * ベジェ曲線の近似精度
     */
    bezierSplitSize: number;
    /**
     * 楕円の近似精度
     */
    ellipseSplitSize: number;
}
/**
 * SVGスタイル情報
 */
export interface ISvgStyle {
    stroke: boolean;
    strokeStyle: string;
    lineWidth: number;
    strokeGlobalAlpha: number;
    lineCap: string;
    lineJoin: string;
    lineDash: number[];
    fill: boolean;
    fillStyle: string;
    fillGlobalAlpha: number;
}
/**
 * path情報
 */
export interface ISvgPath {
    d: IVec2[];
    included?: IVec2[][];
    style: ISvgStyle;
}
