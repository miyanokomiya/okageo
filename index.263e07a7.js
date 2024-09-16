// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"38PNf":[function(require,module,exports) {
var _geo = require("../src/geo");
var _svg = require("../src/svg");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fileInput = document.getElementById("input");
fileInput.onchange = (e)=>{
    const file = e.target.files;
    if (!file || file.length === 0) return;
    const reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = ()=>{
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const pathInfoList = _svg.parseSvgGraphicsStr(reader.result);
        const inRectList = _svg.fitRect(pathInfoList, 0, 0, canvas.width, canvas.height);
        inRectList.forEach((info)=>{
            _geo.triangleSplit(info.d).forEach((points)=>{
                _svg.draw(ctx, {
                    d: points,
                    style: info.style
                });
            });
        });
    };
};
function runReverse() {
    const text = document.getElementById("input-path").value;
    document.getElementById("reverse-result").value = _svg.pathSegmentRawsToString(_svg.reversePath(_svg.parsePathSegmentRaws(text)));
    document.getElementById("path-src").setAttribute("d", text);
    document.getElementById("path-dist").setAttribute("d", _svg.pathSegmentRawsToString(_svg.reversePath(_svg.parsePathSegmentRaws(text))));
}
runReverse();
document.getElementById("run-reverse").addEventListener("click", runReverse);
function runModify() {
    const text = document.getElementById("input-path2").value;
    document.getElementById("path-src2").setAttribute("d", text);
    const segs = _svg.parsePathSegmentRaws(text);
    document.getElementById("path-dist2").setAttribute("d", _svg.pathSegmentRawsToString(_svg.slidePath(segs, {
        x: 30,
        y: 30
    })));
    document.getElementById("path-dist3").setAttribute("d", _svg.pathSegmentRawsToString(_svg.scalePath(segs, {
        x: -1,
        y: 1
    })));
    document.getElementById("path-dist4").setAttribute("d", _svg.pathSegmentRawsToString(_svg.scalePath(segs, {
        x: 1,
        y: -1
    })));
    document.getElementById("path-dist5").setAttribute("d", _svg.pathSegmentRawsToString(_svg.scalePath(segs, {
        x: -1,
        y: -1
    })));
}
runModify();
document.getElementById("run-modify").addEventListener("click", runModify);
function runRotate() {
    const text = document.getElementById("input-rotate").value;
    document.getElementById("rotate-src2").setAttribute("d", text);
    const segs = _svg.parsePathSegmentRaws(text);
    document.getElementById("rotate-dist2").setAttribute("d", _svg.pathSegmentRawsToString(_svg.rotatePath(segs, 2 * Math.PI / 5)));
    document.getElementById("rotate-dist3").setAttribute("d", _svg.pathSegmentRawsToString(_svg.rotatePath(segs, 2 * (Math.PI * 2) / 5)));
    document.getElementById("rotate-dist4").setAttribute("d", _svg.pathSegmentRawsToString(_svg.rotatePath(segs, 2 * (Math.PI * 3) / 5)));
    document.getElementById("rotate-dist5").setAttribute("d", _svg.pathSegmentRawsToString(_svg.rotatePath(segs, 2 * (Math.PI * 4) / 5)));
}
runRotate();
document.getElementById("run-rotate").addEventListener("click", runRotate);

},{"../src/geo":"8ubUB","../src/svg":"hNdpk"}],"8ubUB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MINVALUE", ()=>MINVALUE);
parcelHelpers.export(exports, "IDENTITY_AFFINE", ()=>IDENTITY_AFFINE);
parcelHelpers.export(exports, "vec", ()=>vec);
parcelHelpers.export(exports, "add", ()=>add);
parcelHelpers.export(exports, "sub", ()=>sub);
parcelHelpers.export(exports, "multi", ()=>multi);
parcelHelpers.export(exports, "isSame", ()=>isSame);
parcelHelpers.export(exports, "getDistance", ()=>getDistance);
parcelHelpers.export(exports, "getDistanceSq", ()=>getDistanceSq);
parcelHelpers.export(exports, "getPolylineLength", ()=>getPolylineLength);
parcelHelpers.export(exports, "getNorm", ()=>getNorm);
parcelHelpers.export(exports, "isZero", ()=>isZero);
parcelHelpers.export(exports, "getUnit", ()=>getUnit);
parcelHelpers.export(exports, "getCross", ()=>getCross);
parcelHelpers.export(exports, "getInner", ()=>getInner);
parcelHelpers.export(exports, "cloneVectors", ()=>cloneVectors);
parcelHelpers.export(exports, "getCenter", ()=>getCenter);
parcelHelpers.export(exports, "getRectCenter", ()=>getRectCenter);
parcelHelpers.export(exports, "getPolygonCenter", ()=>getPolygonCenter);
parcelHelpers.export(exports, "getRadian", ()=>getRadian);
/**
 * fromに対して、aと点対称なベクトル取得
 * @param a 対象ベクトル
 * @param from 基点
 * @param 点対称ベクトル
 */ parcelHelpers.export(exports, "getSymmetry", ()=>getSymmetry);
/**
 * fromに対して、aからradian回転したベクトル取得
 * @param a 対象ベクトル
 * @param radian 回転ラジアン
 * @param from 基点
 * @param 回転後のベクトル
 */ parcelHelpers.export(exports, "rotate", ()=>rotate);
/**
 * 2次方程式の解の公式
 * a * x^2 + b * x + c = 0
 * 解に虚数が含まれる場合は解なし扱い
 * @param a x^2の係数
 * @param b xの係数
 * @param c 定数
 * @return 解の配列
 */ parcelHelpers.export(exports, "solveEquationOrder2", ()=>solveEquationOrder2);
/**
 * 点から直線への垂線の足
 * @param p 対象の点
 * @param line 直線
 * @return 垂線の足
 */ parcelHelpers.export(exports, "getPedal", ()=>getPedal);
/**
 * 2次ベジェ曲「線分」と「直線」の交点を取得する
 * @method crossLineAndBezier
 * @param p0 ベジェ曲線始点
 * @param p1 ベジェ曲線制御点
 * @param p2 ベジェ曲線終点
 * @param p 直線始点
 * @param q 直線終点
 * @return 交点リスト
 */ parcelHelpers.export(exports, "getCrossLineAndBezier", ()=>getCrossLineAndBezier);
/**
 * 線分と線分の交差判定（端点での接触は含まない）
 * @param seg1 線分1
 * @param seg2 線分2
 * @return 交差しているフラグ
 */ parcelHelpers.export(exports, "isCrossSegAndSeg", ()=>isCrossSegAndSeg);
/**
 * 線分と線分の接触判定（端点での接触含む）
 * @param seg1 線分1
 * @param seg2 線分2
 * @return 接触しているフラグ
 */ parcelHelpers.export(exports, "isTouchSegAndSeg", ()=>isTouchSegAndSeg);
/**
 * 平行判定
 * @param a ベクトル or 2点の配列
 * @param b 同上
 * @return 平行であるフラグ
 */ parcelHelpers.export(exports, "isParallel", ()=>isParallel);
/**
 * 点が直線上にあるか判定
 * @param p 点
 * @param line 直線
 * @return 直線上にあるフラグ
 */ parcelHelpers.export(exports, "isOnLine", ()=>isOnLine);
/**
 * 点が線分上にあるか判定
 * @param p 点
 * @param seg 線分
 * @return 線分上にあるフラグ
 */ parcelHelpers.export(exports, "isOnSeg", ()=>isOnSeg);
/**
 * 点が面上にあるか判定（境界線上を含む）
 * @param p 点
 * @param polygon 面
 * @return 面上にあるフラグ
 */ parcelHelpers.export(exports, "isOnPolygon", ()=>isOnPolygon);
/**
 * 線分と直線の交点取得
 * @param seg 線分
 * @param line 直線
 * @return 交点
 */ parcelHelpers.export(exports, "getCrossSegAndLine", ()=>getCrossSegAndLine);
/**
 * 同一線分かを判定する
 * @param ab 線分ab
 * @param cd 線分cd
 * @return 同一であるフラグ
 */ parcelHelpers.export(exports, "isSameSeg", ()=>isSameSeg);
/**
 * ポリゴンを直線で分割する
 * @param pol 面
 * @param line 直線
 * @return 分割された点配列の配列
 */ parcelHelpers.export(exports, "splitPolyByLine", ()=>splitPolyByLine);
/**
 * 三角分割
 * @param polygon 面
 * @return 分割面リスト
 */ parcelHelpers.export(exports, "triangleSplit", ()=>triangleSplit);
/**
 * 点が三角形内にあるかを判定する
 * 境界も含む
 * @param tri 三角形
 * @param p 点
 * @return 内部にあるフラグ
 */ parcelHelpers.export(exports, "isPointOnTriangle", ()=>isPointOnTriangle);
/**
 * 面を時計回りに変換する
 * @param {vector[]} 面
 * @return 時計回りにした面(引数とは別配列にする)
 */ parcelHelpers.export(exports, "convertLoopwise", ()=>convertLoopwise);
/**
 * 面の座標が時計回りかを判定する
 * @param polygon 面
 * @return -1:反時計 0:不定 1:時計
 */ parcelHelpers.export(exports, "getLoopwise", ()=>getLoopwise);
/**
 * 面積取得
 * @param polygon 面
 * @param allowNegative 負値を許すフラグ
 * @return 面積
 */ parcelHelpers.export(exports, "getArea", ()=>getArea);
/**
 * ベジェ曲線を直線で近似する(３次まで対応)
 * @param pointList 制御点リスト
 * @param size 分割数(1なら制御点両端のみ)
 * @return 座標リスト
 */ parcelHelpers.export(exports, "approximateBezier", ()=>approximateBezier);
/**
 * get point with the rate on bezier2
 * @param pointList controller points
 * @param rate rate between start point and end point
 * @return calced point
 */ parcelHelpers.export(exports, "getPointOnBezier2", ()=>getPointOnBezier2);
parcelHelpers.export(exports, "getBezier2LerpFn", ()=>getBezier2LerpFn);
/**
 * get point with the rate on bezier3
 * @param pointList controller points
 * @param rate rate between start point and end point
 * @return calced point
 */ parcelHelpers.export(exports, "getPointOnBezier3", ()=>getPointOnBezier3);
parcelHelpers.export(exports, "getBezier3LerpFn", ()=>getBezier3LerpFn);
/**
 * get point with the rate on bezier3
 * need these conditions to get unique value
 * p0.x <= p1.x <= p3.x
 * p0.x <= p2.x <= p3.x
 * or may cause unexpected NaN
 * @param pointList controller points [p0, p1, p2, p3]
 * @param rate rate between start point and end point
 * @return calced point
 */ parcelHelpers.export(exports, "getYOnBezier3AtX", ()=>getYOnBezier3AtX);
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
 */ parcelHelpers.export(exports, "approximateArc", ()=>approximateArc);
/**
 * Approximate arc path as a polyline
 * https://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
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
 */ parcelHelpers.export(exports, "approximateArcWithPoint", ()=>approximateArcWithPoint);
parcelHelpers.export(exports, "getArcLerpFn", ()=>getArcLerpFn);
parcelHelpers.export(exports, "lerpPoint", ()=>lerpPoint);
parcelHelpers.export(exports, "getApproPoints", ()=>getApproPoints);
/**
 * ２点を通る楕円の中心を求める
 * @param a 点a
 * @param b 点b
 * @param rx x軸半径
 * @param ry y軸半径
 * @param radian 傾き
 * @return 解となる２点
 * @return { centers: 解となる２点, radiusRate: 半径補正係数 }
 */ parcelHelpers.export(exports, "getEllipseCenter", ()=>getEllipseCenter);
/**
 * ２点を通る円の中心を求める
 * @param a 点a
 * @param b 点b
 * @param radius 半径
 * @return { centers: 解となる２点, radiusRate: 半径補正係数 }
 */ parcelHelpers.export(exports, "getCircleCenter", ()=>getCircleCenter);
/**
 * 2次元アフィン変換を行う
 * paramsには以下の行列をa b c d e fの順で指定する
 * a c e
 * b d f
 * @param points 変換前の座標リスト
 * @param params 行列成分
 * @return 座標リスト
 */ parcelHelpers.export(exports, "transform", ()=>transform);
/**
 * invert affine transfomation matrix
 * a c e
 * b d f
 * @param params [a, b, c, d, e, f]
 * @return inverted matrix params
 */ parcelHelpers.export(exports, "invertTransform", ()=>invertTransform);
/**
 * multi affine transfomation matrixes
 * @param a affine matrix
 * @param b affine matrix
 * @return a * b
 */ parcelHelpers.export(exports, "multiAffine", ()=>multiAffine);
/**
 * multi affines
 * @param affines affine matrix list
 * @return affines[0] * affines[1] * ...
 */ parcelHelpers.export(exports, "multiAffines", ()=>multiAffines);
/**
 * apply affine
 * @param affine affine matrix
 * @param v vector2
 * @return affine x v
 */ parcelHelpers.export(exports, "applyAffine", ()=>applyAffine);
/**
 * 隣り合う同一点をオミットする
 * @method omitSamePoint
 * @param polygon ポリゴン
 * @return オミット後のポリゴン
 */ parcelHelpers.export(exports, "omitSamePoint", ()=>omitSamePoint);
/**
 * 正多角形の面積を内接円の半径から求める
 * @param radius 半径
 * @param n 角数
 * @return 面積
 */ parcelHelpers.export(exports, "getRegularPolygonArea", ()=>getRegularPolygonArea);
/**
 * 正多角形の面積から内接円の半径を求める
 * @param area 面積
 * @param n 角数
 * @return 半径
 */ parcelHelpers.export(exports, "getRegularPolygonRadius", ()=>getRegularPolygonRadius);
/**
 * 包含関係にあるポリゴンをグループ化する
 * @param polygons ポリゴン一覧
 * @return グループ化したポリゴン一覧、グループ内は面積降順
 */ parcelHelpers.export(exports, "getIncludedPolygonGroups", ()=>getIncludedPolygonGroups);
/**
 * ポリゴンブーリアン演算差
 * 突き抜けは非対応
 * targetは1辺のみでpolyと交差する前提
 * targetとpolyは観点方向が逆である前提
 * @param target ポリゴン
 * @param poly 切り取り範囲ポリゴン
 * @return 切り取った後のポリゴン
 */ parcelHelpers.export(exports, "getPolygonNotPolygon", ()=>getPolygonNotPolygon);
/**
 * ポリゴン全てを包含する矩形を取得
 * @param polygons ポリゴン一覧
 * @return 外接矩形
 */ parcelHelpers.export(exports, "getOuterRectangle", ()=>getOuterRectangle);
/**
 * 矩形範囲のグリッド取得
 * @param range 矩形範囲
 * @param gridSize グリッド幅
 * @param dX x軸のずらし幅
 * @param dY y軸のずらし幅
 * @return グリッド線リスト
 */ parcelHelpers.export(exports, "getGrid", ()=>getGrid);
/**
 * 矩形を中心基準でサイズ変更する
 * @param org 元の矩形
 * @param dW 幅変更差分
 * @param dH 高さ変更差分
 * @return サイズ変更後の矩形
 */ parcelHelpers.export(exports, "expandRecntagle", ()=>expandRecntagle);
/**
 * 矩形を中心基準の倍率でサイズ変更する
 * @param org 元の矩形
 * @param scaleW 幅変更倍率
 * @param scaleH 高さ軸変更倍率
 * @return サイズ変更後の矩形
 */ parcelHelpers.export(exports, "expandRecntagleScale", ()=>expandRecntagleScale);
/**
 * interpolate scaler
 * @param from
 * @param to
 * @param rate 0 => from, 1 => to
 * @return interpolated value
 */ parcelHelpers.export(exports, "interpolateScaler", ()=>interpolateScaler);
/**
 * interpolate scaler
 * @param from
 * @param to
 * @param rate 0 => from, 1 => to
 * @return interpolated value
 */ parcelHelpers.export(exports, "interpolateVector", ()=>interpolateVector);
/**
 * solve cubic equation in real space
 * @param a t^3 param
 * @param b t^2 param
 * @param c t param
 * @param d constant param
 * @return solutions in no particular order
 */ parcelHelpers.export(exports, "solveQubicFomula", ()=>solveQubicFomula);
/**
 * clamp number
 * @param min min value
 * @param max max value
 * @return clamped value
 */ parcelHelpers.export(exports, "clamp", ()=>clamp);
/**
 * clamp number circularly
 * @param min min value
 * @param max max value
 * @return clamped value
 */ parcelHelpers.export(exports, "circleClamp", ()=>circleClamp);
/**
 * round trip value
 * @param min min value
 * @param max max value
 * @return round tripped value
 */ parcelHelpers.export(exports, "roundTrip", ()=>roundTrip);
/**
 * Ref: https://omaraflak.medium.com/b%C3%A9zier-interpolation-8033e9a262c2
 * @param points target points to interpolate via a bezier curve
 * @return control point sets for cubic bezier curve
 */ parcelHelpers.export(exports, "getBezierInterpolation", ()=>getBezierInterpolation);
/**
 * "points" should be cloased manually.
 * @param points target points to interpolate via a periodic bezier curve
 * @return control point sets for cubic bezier curve
 */ parcelHelpers.export(exports, "getPeriodicBezierInterpolation", ()=>getPeriodicBezierInterpolation);
parcelHelpers.export(exports, "getPeriodicBezierInterpolationA", ()=>getPeriodicBezierInterpolationA);
/**
 * The order of returned items is srbitrary.
 */ parcelHelpers.export(exports, "getCrossSegAndBezier3", ()=>getCrossSegAndBezier3);
parcelHelpers.export(exports, "getCrossSegAndBezier3WithT", ()=>getCrossSegAndBezier3WithT);
parcelHelpers.export(exports, "getCrossLineAndBezier3", ()=>getCrossLineAndBezier3);
parcelHelpers.export(exports, "getCrossLineAndBezier3WithT", ()=>getCrossLineAndBezier3WithT);
parcelHelpers.export(exports, "divideBezier3", ()=>divideBezier3);
parcelHelpers.export(exports, "getClosestPointOnBezier3", ()=>getClosestPointOnBezier3);
const MINVALUE = 0.000001;
const IDENTITY_AFFINE = [
    1,
    0,
    0,
    1,
    0,
    0
];
function vec(x, y) {
    return {
        x,
        y
    };
}
function add(a, b) {
    return vec(a.x + b.x, a.y + b.y);
}
function sub(a, b) {
    return vec(a.x - b.x, a.y - b.y);
}
function multi(a, b) {
    return vec(a.x * b, a.y * b);
}
function isSame(a, b) {
    const dif = sub(a, b);
    return Math.abs(dif.x) < MINVALUE && Math.abs(dif.y) < MINVALUE;
}
function getDistance(a, b) {
    return getNorm(sub(a, b));
}
function getDistanceSq(a, b) {
    const x = a.x - b.x;
    const y = a.y - b.y;
    return x * x + y * y;
}
function getPolylineLength(polyline, closed = false) {
    if (polyline.length < 2) return 0;
    let ret = 0;
    for(let i = 0; i < polyline.length - 1; i++)ret += getDistance(polyline[i], polyline[i + 1]);
    if (closed) ret += getDistance(polyline[polyline.length - 1], polyline[0]);
    return ret;
}
function getNorm(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y);
}
function isZero(a) {
    return getNorm(a) < MINVALUE;
}
function getUnit(a) {
    const d = getNorm(a);
    if (d < MINVALUE) throw new Error("cannot get unit vector of zero vector");
    return multi(a, 1 / d);
}
function getCross(a, b) {
    return a.x * b.y - a.y * b.x;
}
function getInner(a, b) {
    return a.x * b.x + a.y * b.y;
}
function cloneVectors(vectors) {
    return vectors.map((v)=>Object.assign({}, v));
}
function getCenter(a, b) {
    return multi(add(a, b), 0.5);
}
function getRectCenter(rec) {
    return vec(rec.x + rec.width / 2, rec.y + rec.height / 2);
}
function getPolygonCenter(polygon) {
    if (polygon.length === 0) return vec(0, 0);
    return multi(polygon.reduce((p, c)=>add(p, c), vec(0, 0)), 1 / polygon.length);
}
function getRadian(a, from = vec(0, 0)) {
    const dif = sub(a, from);
    return Math.atan2(dif.y, dif.x);
}
function getSymmetry(a, from = vec(0, 0)) {
    return add(multi(sub(from, a), 2), a);
}
function rotate(a, radian, from = vec(0, 0)) {
    const fromBase = sub(a, from);
    const s = Math.sin(radian);
    const c = Math.cos(radian);
    return add(vec(c * fromBase.x - s * fromBase.y, s * fromBase.x + c * fromBase.y), from);
}
function getRotateFn(radian, from = vec(0, 0)) {
    const s = Math.sin(radian);
    const c = Math.cos(radian);
    return (a, reverse)=>{
        const fromBase = sub(a, from);
        return reverse ? add(vec(c * fromBase.x + s * fromBase.y, -s * fromBase.x + c * fromBase.y), from) : add(vec(c * fromBase.x - s * fromBase.y, s * fromBase.x + c * fromBase.y), from);
    };
}
function solveEquationOrder2(a, b, c) {
    if (isCloseToZero(a)) return isCloseToZero(b) ? [] : [
        -c / b
    ];
    const d = b * b - 4 * a * c;
    if (d < 0) return [];
    const ia = 0.5 / a;
    if (isCloseToZero(d)) return [
        -b * ia
    ];
    const sd = Math.sqrt(d);
    return [
        (-b + sd) * ia,
        (-b - sd) * ia
    ];
}
function getPedal(p, line) {
    if (line.length !== 2) throw new Error("line must be length = 2");
    const s = line[0];
    const t = line[1];
    const vecST = sub(t, s);
    const vecSP = sub(p, s);
    const inner = getInner(vecST, vecSP);
    const rate = inner / getInner(vecST, vecST);
    return add(s, multi(vecST, rate));
}
/**
 * 2次ベジェ曲線と直線の当たり判定用パラメータを取得する
 * @param p0 ベジェ曲線始点
 * @param p1 ベジェ曲線制御点
 * @param p2 ベジェ曲線終点
 * @param p 直線始点
 * @param q 直線終点
 * @return ベジェ曲線パラメータ配列
 */ function rayToBezier(p0, p1, p2, p, q) {
    const vx = q.x - p.x;
    const vy = q.y - p.y;
    const a = p0.x - 2 * p1.x + p2.x;
    const b = 2 * (p1.x - p0.x);
    const c = p0.x;
    const d = p0.y - 2 * p1.y + p2.y;
    const e = 2 * (p1.y - p0.y);
    const f = p0.y;
    return solveEquationOrder2(a * vy - vx * d, b * vy - vx * e, vy * c - vy * p.x - vx * f + vx * p.y);
}
function getCrossLineAndBezier(p0, p1, p2, p, q) {
    return rayToBezier(p0, p1, p2, p, q).filter((t)=>0 <= t && t <= 1).map((t)=>vec((p2.x - 2 * p1.x + p0.x) * t * t + 2 * (p1.x - p0.x) * t + p0.x, (p2.y - 2 * p1.y + p0.y) * t * t + 2 * (p1.y - p0.y) * t + p0.y));
}
function isCrossSegAndSeg(seg1, seg2) {
    const { ta, tb, tc, td } = getCrossSegAndSegParams(seg1, seg2);
    return tc * td < 0 && ta * tb < 0;
}
function isTouchSegAndSeg(seg1, seg2) {
    const { ta, tb, tc, td } = getCrossSegAndSegParams(seg1, seg2);
    return tc * td <= 0 && ta * tb <= 0;
}
function getCrossSegAndSegParams(seg1, seg2) {
    const ax = seg1[0].x;
    const ay = seg1[0].y;
    const bx = seg1[1].x;
    const by = seg1[1].y;
    const cx = seg2[0].x;
    const cy = seg2[0].y;
    const dx = seg2[1].x;
    const dy = seg2[1].y;
    const ta = (cx - dx) * (ay - cy) + (cy - dy) * (cx - ax);
    const tb = (cx - dx) * (by - cy) + (cy - dy) * (cx - bx);
    const tc = (ax - bx) * (cy - ay) + (ay - by) * (ax - cx);
    const td = (ax - bx) * (dy - ay) + (ay - by) * (ax - dx);
    return {
        ta,
        tb,
        tc,
        td
    };
}
function isParallel(a, b) {
    const cross = getCross(a, b);
    return Math.abs(cross) < MINVALUE;
}
function isOnLine(p, line) {
    return isZero(sub(p, getPedal(p, line)));
}
function isOnSeg(p, seg) {
    if (!isZero(sub(p, getPedal(p, seg)))) return false;
    const v1 = sub(seg[1], seg[0]);
    const v2 = sub(p, seg[0]);
    if (getInner(v1, v2) < 0) return false;
    if (getNorm(v1) < getNorm(v2)) return false;
    return true;
}
/**
 * 点から正の方向へ伸ばした水平線が線分と交差するか判定
 * 点が面上にあるか判定に利用する
 * 点が線分上の場合はfalse
 * @param p 点
 * @param seg 線分
 * @return 交差するフラグ
 */ function isCrossSegAndRightHorizon(p, seg) {
    // 平行な場合はfalse
    if (Math.abs(seg[0].y - seg[1].y) < MINVALUE) return false;
    // 線分の上側端点との接触はfalse、下側端点との接触はtrueで統一
    let top, bottom;
    if (seg[0].y < seg[1].y) [bottom, top] = seg;
    else [top, bottom] = seg;
    if (p.y < bottom.y || top.y <= p.y) return false;
    // 交点は厳密にpの右側でなければいけない
    const cross = getCrossSegAndLine(seg, [
        p,
        vec(p.x + 1, p.y)
    ]);
    if (!cross || cross.x <= p.x) return false;
    return true;
}
function isOnPolygon(p, polygon) {
    // 頂点上判定
    if (polygon.find((point)=>p.x === point.x && p.y === point.y)) return true;
    const segs = polygon.map((point, i)=>{
        return [
            point,
            i < polygon.length - 1 ? polygon[i + 1] : polygon[0]
        ];
    })// 長さ0の辺は扱わない
    .filter((seg)=>!isSame(seg[0], seg[1]));
    // 辺上判定
    for(let i = 0; i < segs.length; i++){
        const seg = segs[i];
        if (isOnSeg(p, seg)) return true;
    }
    const hitSegs = segs.filter((seg)=>isCrossSegAndRightHorizon(p, seg));
    return hitSegs.length % 2 === 1;
}
function getCrossSegAndLine(seg, line) {
    if (isParallel(sub(seg[0], seg[1]), sub(line[0], line[1]))) return null;
    if (isOnLine(seg[0], line)) return Object.assign({}, seg[0]);
    if (isOnLine(seg[1], line)) return Object.assign({}, seg[1]);
    const s1 = ((line[1].x - line[0].x) * (seg[0].y - line[0].y) - (line[1].y - line[0].y) * (seg[0].x - line[0].x)) / 2;
    const s2 = ((line[1].x - line[0].x) * (line[0].y - seg[1].y) - (line[1].y - line[0].y) * (line[0].x - seg[1].x)) / 2;
    const rate = s1 / (s1 + s2);
    const isExistCorss = 0 < rate && rate < 1;
    return isExistCorss ? vec(seg[0].x + (seg[1].x - seg[0].x) * rate, seg[0].y + (seg[1].y - seg[0].y) * rate) : null;
}
function isSameSeg(ab, cd) {
    if (isSame(ab[0], cd[0]) && isSame(ab[1], cd[1])) return true;
    if (isSame(ab[0], cd[1]) && isSame(ab[1], cd[0])) return true;
    return false;
}
function splitPolyByLine(pol, line) {
    let points = [];
    let crossIndex = [];
    let crossList = [];
    pol.forEach((p, i)=>{
        const targetLine = [
            p,
            pol[(i + 1) % pol.length]
        ];
        const cross = getCrossSegAndLine(targetLine, line);
        points.push(p);
        if (cross) {
            points.push(cross);
            crossIndex.push(i + 1 + crossIndex.length);
            crossList.push(cross);
        }
    });
    if (crossIndex.length % 2 !== 0) return [];
    // 近い順に並べる -> 直線をx軸と重なるよう回転してx座標で比較
    const rad = getRadian(line[0], line[1]);
    crossList.sort((a, b)=>rotate(a, -rad).x - rotate(b, -rad).x);
    // 面の辺と同一ではないものを採用
    let targetSection = [];
    for(let k = 0; k < crossList.length - 1; k += 2){
        const section = [
            crossList[k],
            crossList[k + 1]
        ];
        let sameSeg = false;
        for(let l = 0; l < pol.length; l++)if (isSameSeg(section, [
            pol[l],
            pol[(l + 1) % pol.length]
        ])) {
            sameSeg = true;
            break;
        }
        if (!sameSeg) {
            targetSection = section;
            break;
        }
    }
    if (targetSection.length !== 2) return [];
    // 除外対象回収
    const dropList = crossList.concat();
    let tmpIndex = dropList.indexOf(targetSection[0]);
    if (tmpIndex !== -1) dropList.splice(tmpIndex, 1);
    tmpIndex = dropList.indexOf(targetSection[1]);
    if (tmpIndex !== -1) dropList.splice(tmpIndex, 1);
    const tmpList = points.concat();
    dropList.forEach((p)=>{
        const i = tmpList.indexOf(p);
        tmpList.splice(i, 1);
    });
    points = tmpList;
    crossList = targetSection;
    const i0 = points.indexOf(crossList[0]);
    const i1 = points.indexOf(crossList[1]);
    if (i0 === -1 || i1 === -1) return [];
    crossIndex = [];
    crossIndex[0] = Math.min(i0, i1);
    crossIndex[1] = Math.max(i0, i1);
    // 分割ポリゴンを拾い集める
    const splitedPolygons = [];
    // 1つ目
    let splitPol = [];
    // 交点まで追加
    for(let i = 0; i <= crossIndex[0]; i++)splitPol.push(vec(points[i].x, points[i].y));
    // 交点から追加
    for(let i = crossIndex[1]; i < points.length; i++)splitPol.push(vec(points[i].x, points[i].y));
    // 確定
    splitedPolygons.push(splitPol);
    // 2つ目
    splitPol = [];
    // 交点から交点まで追加
    for(let i = crossIndex[0]; i <= crossIndex[1]; i++)splitPol.push(vec(points[i].x, points[i].y));
    // 確定
    splitedPolygons.push(splitPol);
    // 再帰的に分割
    const recursiveResult = [];
    splitedPolygons.forEach((polygon)=>{
        const splited = splitPolyByLine(polygon, line);
        if (splited.length === 0) recursiveResult.push(polygon);
        else recursiveResult.push(...splited);
    });
    return recursiveResult;
}
function triangleSplit(polygon) {
    // 時計周りに揃える
    polygon = convertLoopwise(polygon);
    // ポリゴン複製
    const targetPoly = omitSamePoint(polygon);
    // 最遠点のインデックス
    let farthestIndex = 0;
    // 現在の最遠点と前後点で作った三角形の外積
    let currentCross = 0;
    // 分割後の面リスト
    const triangleList = [];
    // ループ
    while(targetPoly.length >= 3){
        // 最遠点インデックス取得
        const sorted = targetPoly.concat();
        sorted.sort((a, b)=>{
            return getNorm(b) - getNorm(a);
        });
        farthestIndex = targetPoly.indexOf(sorted[0]);
        // 分割実行
        let tri = getTriangle(targetPoly, farthestIndex);
        if (!tri) {
            // 最遠点では失敗
            const size = targetPoly.length;
            // 外積計算
            const pa = sub(targetPoly[(farthestIndex + 1) % size], targetPoly[farthestIndex]);
            const pb = sub(targetPoly[farthestIndex - 1 < 0 ? size - 1 : farthestIndex - 1], targetPoly[farthestIndex]);
            currentCross = getCross(pa, pb);
            let index = farthestIndex;
            // 最遠点以外で探す
            while(!tri){
                index = (index + 1) % size;
                // 最遠点の外積と同じ符号かを判定
                const v1 = sub(targetPoly[(index + 1) % size], targetPoly[index]);
                const v2 = sub(targetPoly[index - 1 < 0 ? size - 1 : index - 1], targetPoly[index]);
                const tmpCross = getCross(v1, v2);
                if (tmpCross * currentCross > 0) // 判定続行
                tri = getTriangle(targetPoly, index);
                if (index === farthestIndex) throw new Error("failed to split triangles");
            }
            // 採用された点を削除
            targetPoly.splice(index, 1);
        } else // 最遠点削除
        targetPoly.splice(farthestIndex, 1);
        triangleList.push(tri);
    }
    return triangleList;
}
/**
 * 面から三角形を取得する
 * @param polygon 面
 * @param index このインデックスの点とその両側の点で三角形を作る
 * @return 三角形、内部に入り込む点がある場合はnull
 */ function getTriangle(polygon, index) {
    // indexとその前後点で三角形作成
    const size = polygon.length;
    const p0 = polygon[index];
    const p1 = polygon[(index + 1) % size];
    const p2 = polygon[index - 1 < 0 ? size - 1 : index - 1];
    const tri = [
        p0,
        p1,
        p2
    ];
    // 内部に点が入り込まないか判定
    let invalid = false;
    polygon.some((p)=>{
        if (p !== p0 && p !== p1 && p !== p2) {
            if (isPointOnTriangle(tri, p)) // 失敗
            invalid = true;
        }
        return invalid;
    });
    return invalid ? null : tri;
}
function isPointOnTriangle(tri, p) {
    // 三角形の3つのベクトル
    const ab = sub(tri[1], tri[0]);
    const bc = sub(tri[2], tri[1]);
    const ca = sub(tri[0], tri[2]);
    // 三角形の各点からpへのベクトル
    const ap = sub(p, tri[0]);
    const bp = sub(p, tri[1]);
    const cp = sub(p, tri[2]);
    // 外積を求める
    const crossABP = getCross(ab, bp);
    const crossBCP = getCross(bc, cp);
    const crossCAP = getCross(ca, ap);
    // 外積の符号が全て同じなら内部にある
    // 0も含む→境界も含む
    if (crossABP >= 0 && crossBCP >= 0 && crossCAP >= 0 || crossABP <= 0 && crossBCP <= 0 && crossCAP <= 0) return true;
    return false;
}
function convertLoopwise(polygon) {
    const ret = polygon.concat();
    if (getLoopwise(polygon) === -1) ret.reverse();
    return ret;
}
function getLoopwise(polygon) {
    const area = getArea(polygon, true);
    if (area > 0) return 1;
    if (area < 0) return -1;
    return 0;
}
function getArea(polygon, allowNegative = false) {
    if (polygon.length < 3) return 0;
    let area = 0;
    const size = polygon.length;
    for(let i = 0; i < size - 1; i++)area += (polygon[i].x - polygon[i + 1].x) * (polygon[i].y + polygon[i + 1].y);
    // 最後分
    area += (polygon[size - 1].x - polygon[0].x) * (polygon[size - 1].y + polygon[0].y);
    area /= 2;
    // 負値を許さないなら絶対値
    if (!allowNegative) area = Math.abs(area);
    return area;
}
function approximateBezier(pointList, size) {
    const ret = [];
    const unitT = 1 / size;
    if (pointList.length === 3) // ２次ベジェの場合
    for(let i = 0; i <= size; i++)ret.push(getPointOnBezier2(pointList, unitT * i));
    else if (pointList.length === 4) // 3次ベジェの場合
    for(let i = 0; i <= size; i++)ret.push(getPointOnBezier3(pointList, unitT * i));
    else throw new Error("connot approximate");
    return ret;
}
function getPointOnBezier2(pointList, rate) {
    const t = rate;
    const nt = 1 - t;
    const c0 = multi(pointList[0], nt * nt);
    const c1 = multi(pointList[1], 2 * t * nt);
    const c2 = multi(pointList[2], t * t);
    return vec(c0.x + c1.x + c2.x, c0.y + c1.y + c2.y);
}
function getBezier2LerpFn(pointList) {
    return (t)=>getPointOnBezier2(pointList, t);
}
function getPointOnBezier3(pointList, rate) {
    const t = rate;
    const nt = 1 - t;
    const c0 = multi(pointList[0], nt * nt * nt);
    const c1 = multi(pointList[1], 3 * t * nt * nt);
    const c2 = multi(pointList[2], 3 * t * t * nt);
    const c3 = multi(pointList[3], t * t * t);
    return vec(c0.x + c1.x + c2.x + c3.x, c0.y + c1.y + c2.y + c3.y);
}
function getBezier3LerpFn(pointList) {
    return (t)=>getPointOnBezier3(pointList, t);
}
function getYOnBezier3AtX(pointList, x) {
    const [p0, p1, p2, p3] = pointList;
    const a = -p0.x + 3 * p1.x - 3 * p2.x + p3.x;
    const b = 3 * p0.x - 6 * p1.x + 3 * p2.x;
    const c = -3 * p0.x + 3 * p1.x;
    const d = p0.x - x;
    const t = solveBezier3Fomula(a, b, c, d);
    const tt = t * t;
    const ttt = tt * t;
    const tm = 1 - t;
    const tmtm = tm * tm;
    const tmtmtm = tmtm * tm;
    return tmtmtm * p0.y + 3 * t * tmtm * p1.y + 3 * tt * tm * p2.y + ttt * p3.y;
}
function approximateArc(rx, ry, startRadian, endRadian, center, radian, size) {
    const ret = [];
    const range = endRadian - startRadian;
    const unitT = range / size;
    const rotateFn = getRotateFn(radian);
    for(let i = 0; i <= size; i++){
        const t = unitT * i + startRadian - radian;
        ret.push(add(rotateFn(vec(rx * Math.cos(t), ry * Math.sin(t))), center));
    }
    return ret;
}
function approximateArcWithPoint(rx, ry, startPoint, endPoint, largeArcFlag, sweepFlag, radian, size) {
    if (Math.abs(rx * ry) < MINVALUE) return [
        startPoint,
        endPoint
    ];
    return getApproPoints(getArcLerpFn(rx, ry, startPoint, endPoint, largeArcFlag, sweepFlag, radian), size);
}
function getArcLerpFn(rx, ry, startPoint, endPoint, largeArcFlag, sweepFlag, radian) {
    if (Math.abs(rx * ry) < MINVALUE) return (t)=>lerpPoint(startPoint, endPoint, t);
    const r = radian;
    const rotateFn = getRotateFn(r);
    const p0 = startPoint;
    const p1 = endPoint;
    const a = rotateFn(vec((p0.x - p1.x) / 2, (p0.y - p1.y) / 2), true);
    const ax2 = a.x * a.x;
    const ay2 = a.y * a.y;
    const l = ax2 / rx / rx + ay2 / ry / ry;
    const lsqrt = l > 1 ? Math.sqrt(l) : 1;
    const { x: rxa, y: rya } = vec(Math.abs(rx) * lsqrt, Math.abs(ry) * lsqrt);
    const rx2 = rxa * rxa;
    const ry2 = rya * rya;
    const b = multi(multi(vec(rxa * a.y / rya, -rya * a.x / rxa), Math.sqrt(Math.max(0, rx2 * ry2 - rx2 * ay2 - ry2 * ax2) / (rx2 * ay2 + ry2 * ax2))), largeArcFlag === sweepFlag ? -1 : 1);
    const c = add(rotateFn(b), multi(add(p0, p1), 0.5));
    const u = vec((a.x - b.x) / rxa, (a.y - b.y) / rya);
    const v = vec((-a.x - b.x) / rxa, (-a.y - b.y) / rya);
    const theta = getRadian(u);
    const dtheta_tmp = (getRadian(v) - getRadian(u)) % (2 * Math.PI);
    const dtheta = !sweepFlag && 0 < dtheta_tmp ? dtheta_tmp - 2 * Math.PI : sweepFlag && dtheta_tmp < 0 ? dtheta_tmp + 2 * Math.PI : dtheta_tmp;
    return (t)=>{
        if (t === 0) return startPoint;
        else if (t === 1) return endPoint;
        else {
            const dr = theta + dtheta * t;
            return add(rotateFn(vec(rxa * Math.cos(dr), rya * Math.sin(dr))), c);
        }
    };
}
function lerpPoint(a, b, t) {
    return add(a, multi(sub(b, a), t));
}
function getApproPoints(lerpFn, split) {
    if (split <= 1) return [
        lerpFn(0),
        lerpFn(1)
    ];
    const points = [];
    let step = 1 / split;
    for(let i = 0; i <= split; i++)points.push(lerpFn(step * i));
    return points;
}
function getEllipseCenter(a, b, rx, ry, radian) {
    // 回転を打ち消す
    a = rotate(a, -radian);
    b = rotate(b, -radian);
    // 媒介変数を利用して円の中心問題にする
    const A = vec(a.x / rx, a.y / ry);
    const B = vec(b.x / rx, b.y / ry);
    // 円の中心取得
    const centerInfo = getCircleCenter(A, B, 1);
    const C = centerInfo.centers;
    // 楕円に戻す
    let ans1 = vec(C[0].x * rx, C[0].y * ry);
    let ans2 = vec(C[1].x * rx, C[1].y * ry);
    // 回転を戻す
    ans1 = rotate(ans1, radian);
    ans2 = rotate(ans2, radian);
    return {
        centers: [
            ans1,
            ans2
        ],
        radiusRate: centerInfo.radiusRate
    };
}
function getCircleCenter(a, b, radius) {
    const u1 = (a.x + b.x) / 2;
    const u2 = (a.x - b.x) / 2;
    const v1 = (a.y + b.y) / 2;
    const v2 = (a.y - b.y) / 2;
    const L = Math.sqrt(u2 * u2 + v2 * v2);
    const t2 = Math.pow(radius / L, 2) - 1;
    // 2点が直径以上に離れている => 2点を直径とみなす
    if (t2 < 0) {
        const center = getCenter(a, b);
        return {
            centers: [
                center,
                center
            ],
            radiusRate: L / radius
        };
    }
    const t = Math.sqrt(t2);
    const ans1 = vec(u1 + v2 * t, v1 - u2 * t);
    const ans2 = vec(u1 - v2 * t, v1 + u2 * t);
    return {
        centers: [
            ans1,
            ans2
        ],
        radiusRate: 1
    };
}
function transform(points, params) {
    const a = params[0];
    const b = params[1];
    const c = params[2];
    const d = params[3];
    const e = params[4];
    const f = params[5];
    return points.map((p)=>vec(a * p.x + c * p.y + e, b * p.x + d * p.y + f));
}
function invertTransform(params) {
    const [a, b, c, d, e, f] = params;
    const t = a * d - b * c;
    return [
        d / t,
        -b / t,
        -c / t,
        a / t,
        (c * f - d * e) / t,
        -(a * f - b * e) / t
    ];
}
function multiAffine(a, b) {
    return [
        a[0] * b[0] + a[2] * b[1],
        a[1] * b[0] + a[3] * b[1],
        a[0] * b[2] + a[2] * b[3],
        a[1] * b[2] + a[3] * b[3],
        a[0] * b[4] + a[2] * b[5] + a[4],
        a[1] * b[4] + a[3] * b[5] + a[5]
    ];
}
function multiAffines(affines) {
    return affines.reduce((p, c)=>{
        return multiAffine(p, c);
    }, IDENTITY_AFFINE);
}
function applyAffine(affine, v) {
    return vec(affine[0] * v.x + affine[2] * v.y + affine[4], affine[1] * v.x + affine[3] * v.y + affine[5]);
}
function omitSamePoint(polygon) {
    let ret = polygon.concat();
    // サイズ
    const size = polygon.length;
    // 同一点探す
    for(let i = 0; i < size; i++){
        const p1 = ret[i];
        const p2 = ret[(i + 1) % size];
        if (isSame(p1, p2)) {
            // 同一
            ret.splice(i, 1);
            // 再帰
            ret = omitSamePoint(ret);
            break;
        }
    }
    return ret;
}
function getRegularPolygonArea(radius, n) {
    const unitRad = Math.PI / n;
    const unitArea = Math.pow(radius, 2) * Math.sin(unitRad) * Math.cos(unitRad);
    return unitArea * n;
}
function getRegularPolygonRadius(area, n) {
    const unitRad = Math.PI / n;
    const unitArea = area / n;
    return Math.sqrt(unitArea / Math.sin(unitRad) / Math.cos(unitRad));
}
function getIncludedPolygonGroups(polygons) {
    const sorted = polygons.concat();
    sorted.sort((a, b)=>{
        return getArea(b) - getArea(a);
    });
    const hit = {};
    const ret = [];
    sorted.forEach((p, i)=>{
        if (hit[i]) return;
        hit[i] = true;
        const group = [
            p
        ].concat(sorted.filter((c, j)=>{
            if (hit[j]) return false;
            const pointsOnPolygon = c.filter((point)=>isOnPolygon(point, p));
            if (pointsOnPolygon.length !== c.length) return false;
            hit[j] = true;
            return true;
        }));
        ret.push(group);
    });
    return ret;
}
function getPolygonNotPolygon(target, poly) {
    const ret = [];
    // targetの辺と交差するpolyの辺インデックスを探索
    let targetCrossIndex = -1;
    const polyCrossIndexList = [];
    const cross = [];
    for(let i = 0; i < target.length; i++){
        const currentSeg = [
            target[i],
            target[(i + 1) % target.length]
        ];
        for(let j = 0; j < poly.length; j++){
            const seg = [
                poly[j],
                poly[(j + 1) % poly.length]
            ];
            if (isCrossSegAndSeg(currentSeg, seg)) {
                const p = getCrossSegAndLine(currentSeg, seg);
                if (p) {
                    targetCrossIndex = i;
                    polyCrossIndexList.push(j);
                    cross.push(p);
                }
            }
        }
        if (targetCrossIndex !== -1) break;
    }
    if (targetCrossIndex === -1) return target;
    if (polyCrossIndexList.length % 2 !== 0) return target;
    // target辺の始点に最も近い交点を探す
    const distList = cross.map((p)=>getDistance(p, target[targetCrossIndex]));
    const sortedDistList = distList.concat().sort((a, b)=>a - b);
    const nearestCrossIndex = distList.indexOf(sortedDistList[0]);
    const nearestIndex = polyCrossIndexList[nearestCrossIndex];
    // nearestIndexが始点となるようpolyを調整
    const adjustedPoly = poly.concat();
    for(let j = 0; j < nearestIndex; j++)adjustedPoly.push(adjustedPoly.shift());
    // nearestIndexが先頭になるよう調整
    const adjustedPolyCrossIndexList = polyCrossIndexList.map((n)=>{
        return (n - nearestIndex + poly.length) % poly.length;
    });
    const adjustedCross = cross.concat();
    for(let k = 0; k < nearestCrossIndex; k++){
        adjustedPolyCrossIndexList.push(adjustedPolyCrossIndexList.shift());
        adjustedCross.push(adjustedCross.shift());
    }
    // polyと交差する辺が始点と終点になるよう調整
    for(let i = 0; i < target.length; i++)ret.push(target[(i + targetCrossIndex + 1) % target.length]);
    // 交点からpolyに突入
    for(let i = 0; i < adjustedPolyCrossIndexList.length / 2; i++){
        const startIndex = adjustedPolyCrossIndexList[i * 2];
        const endIndex = adjustedPolyCrossIndexList[i * 2 + 1];
        ret.push(adjustedCross[i * 2]);
        for(let j = startIndex + 1; j <= endIndex; j++)ret.push(adjustedPoly[j]);
        ret.push(adjustedCross[i * 2 + 1]);
    }
    return ret;
}
function getOuterRectangle(polygons) {
    if (polygons.length === 0) return {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for(let i = 0; i < polygons.length; i++){
        const polygon = polygons[i];
        for(let j = 0; j < polygon.length; j++){
            const v = polygon[j];
            minX = Math.min(minX, v.x);
            minY = Math.min(minY, v.y);
            maxX = Math.max(maxX, v.x);
            maxY = Math.max(maxY, v.y);
        }
    }
    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
    };
}
function getGrid(range, gridSize, dX = 0, dY = 0) {
    const gridList = [];
    const minX = range.x;
    const maxX = range.x + range.width;
    const minY = range.y;
    const maxY = range.y + range.height;
    let x = minX + dX;
    while(x < maxX){
        if (minX < x && x < maxX) gridList.push([
            vec(x, minY),
            vec(x, maxY)
        ]);
        x += gridSize;
    }
    let y = minY + dY;
    while(y < maxY){
        if (minY < y && y < maxY) gridList.push([
            vec(minX, y),
            vec(maxX, y)
        ]);
        y += gridSize;
    }
    return gridList;
}
function expandRecntagle(org, dW, dH) {
    return {
        x: org.x - dW / 2,
        y: org.y - dH / 2,
        width: org.width + dW,
        height: org.height + dH
    };
}
function expandRecntagleScale(org, scaleW, scaleH) {
    return expandRecntagle(org, org.width * (scaleW - 1), org.height * (scaleH - 1));
}
function interpolateScaler(from, to, rate) {
    return from * (1 - rate) + to * rate;
}
function interpolateVector(from, to, rate) {
    return vec(interpolateScaler(from.x, to.x, rate), interpolateScaler(from.y, to.y, rate));
}
/**
 * solve cubic equation for bezier3
 * throw if the equation does not have real solution in 0 <= t <= 1
 * @param a t^3 param
 * @param b t^2 param
 * @param c t param
 * @param d constant param
 * @return unique solution
 */ function solveBezier3Fomula(a, b, c, d) {
    const list = solveQubicFomula(a, b, c, d);
    if (list.length === 0) return 0;
    const ret = getCloseInRangeValue(list, 0, 1);
    if (ret === undefined) throw new Error("Error: Cannot resolve uniquely in 0 <= t <= 1.");
    return Math.max(Math.min(ret, 1), 0);
}
function solveQubicFomula(a, b, c, d) {
    if (isCloseToZero(a)) return solveEquationOrder2(b, c, d);
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    const Z = -b / (3 * a);
    if (isCloseToZero(p) && isCloseToZero(q)) // triple real root
    return [
        Z
    ];
    const D = (27 * q * q + 4 * p * p * p) / 108;
    if (isCloseToZero(D)) {
        // one distinct root and double real root
        const Q = Math.sign(q) * Math.pow(Math.abs(q) / 2, 1 / 3);
        return [
            -2 * Q + Z,
            Q + Z
        ];
    } else if (D > 0) {
        const sqrtD = Math.sqrt(D);
        const tmpA = -q / 2 + sqrtD;
        const tmpB = -q / 2 - sqrtD;
        const A = Math.sign(tmpA) * Math.pow(Math.abs(tmpA), 1 / 3);
        const B = Math.sign(tmpB) * Math.pow(Math.abs(tmpB), 1 / 3);
        return [
            A + B + Z
        ];
    } else {
        // three distinct real roots
        const A = -q / 2;
        const B = Math.sqrt(-D);
        const r = Math.atan2(B, A);
        const C = 2 * Math.pow(A * A + B * B, 1 / 6);
        const D0 = Math.cos(r / 3);
        const D1 = Math.cos((r + 2 * Math.PI) / 3);
        const D2 = Math.cos((r + 4 * Math.PI) / 3);
        const T0 = C * D0 + Z;
        const T1 = C * D1 + Z;
        const T2 = C * D2 + Z;
        return [
            T0,
            T1,
            T2
        ];
    }
}
function getCloseInRangeValue(values, min, max) {
    return values.find((val)=>{
        if (min <= val && val <= max) return true;
        if (isCloseTo(val, min) || isCloseTo(val, max)) return true;
        return false;
    });
}
function isCloseTo(val, target) {
    return Math.abs(val - target) < MINVALUE;
}
function isCloseToZero(val) {
    return Math.abs(val) < MINVALUE;
}
function clamp(min = -Infinity, max = Infinity, val) {
    return Math.max(Math.min(val, max), min);
}
function circleClamp(min, max, val) {
    if (min === max) return min;
    if (min <= val && val <= max) return val;
    if (max < val) return (val - max) % (max - min) + min;
    else if (val < min) return max - (min - val) % (max - min);
    else return val;
}
function roundTrip(min, max, val) {
    const harf = max - min;
    const length = 2 * harf;
    if (length === 0) return min;
    const d = Math.abs(val - min) % length;
    if (d < harf) return d + min;
    else return length - d + min;
}
function getBezierInterpolation(points) {
    const len = points.length;
    if (len < 3) return [];
    const A = solveBezierInterpolationEquations(points);
    const B = [];
    for(let i = 0; i < points.length - 2; i++)B[i] = sub(multi(points[i + 1], 2), A[i + 1]);
    B[points.length - 2] = multi(add(A[points.length - 2], points[points.length - 1]), 0.5);
    return A.map((a, i)=>[
            a,
            B[i]
        ]);
}
/**
 * Based on Tridiagonal matrix algorithm with bezier interpolation equation matrix.
 * Suppose "points" has at least 3 items.
 */ function solveBezierInterpolationEquations(points) {
    const values = [
        add(points[0], multi(points[1], 2))
    ];
    for(let i = 1; i < points.length - 2; i++)values.push(multi(add(multi(points[i], 2), points[i + 1]), 2));
    values.push(add(multi(points[points.length - 2], 8), points[points.length - 1]));
    const C = [
        0.5
    ];
    for(let i = 1; i < points.length - 2; i++)C[i] = 1 / (4 - C[i - 1]);
    const D = [
        multi(values[0], 0.5)
    ];
    for(let i = 1; i < points.length - 2; i++)D[i] = multi(sub(values[i], D[i - 1]), 1 / (4 - C[i - 1]));
    D[points.length - 2] = multi(sub(values[points.length - 2], multi(D[points.length - 3], 2)), 1 / (7 - 2 * C[points.length - 3]));
    const ret = [];
    ret[points.length - 2] = D[points.length - 2];
    for(let i = points.length - 3; 0 <= i; i--)ret[i] = sub(D[i], multi(ret[i + 1], C[i]));
    return ret;
}
function getPeriodicBezierInterpolation(points) {
    const len = points.length;
    if (len < 3) return [];
    const A = getPeriodicBezierInterpolationA(points);
    const B = [];
    for(let i = 0; i < points.length - 2; i++)B[i] = sub(multi(points[i + 1], 2), A[i + 1]);
    B[points.length - 2] = sub(multi(points[points.length - 1], 2), A[0]);
    return A.map((a, i)=>[
            a,
            B[i]
        ]);
}
function getPeriodicBezierInterpolationA(points) {
    const paramSize = points.length - 1;
    const gamma = 1;
    const values = [];
    for(let i = 0; i < points.length - 1; i++)values.push({
        x: 4 * points[i].x + 2 * points[i + 1].x,
        y: 4 * points[i].y + 2 * points[i + 1].y
    });
    const y = solvePeriodicBezierInterpolationEquations(values, gamma);
    const u = [];
    u[0] = {
        x: gamma,
        y: gamma
    };
    for(let i = 1; i < points.length - 2; i++)u.push({
        x: 0,
        y: 0
    });
    u.push({
        x: 1,
        y: 1
    });
    const q = solvePeriodicBezierInterpolationEquations(u, gamma);
    const vy = {
        x: y[0].x + 1 / gamma * y[paramSize - 1].x,
        y: y[0].y + 1 / gamma * y[paramSize - 1].y
    };
    const vq = {
        x: q[0].x + 1 / gamma * q[paramSize - 1].x,
        y: q[0].y + 1 / gamma * q[paramSize - 1].y
    };
    const A = [];
    for(let i = 0; i < paramSize; i++)A[i] = {
        x: y[i].x - q[i].x * vy.x / (1 + vq.x),
        y: y[i].y - q[i].y * vy.y / (1 + vq.y)
    };
    return A;
}
/**
 * https://en.wikipedia.org/wiki/Tridiagonal_matrix_algorithm
 */ function solvePeriodicBezierInterpolationEquations(values, gamma) {
    const C = [
        1 / (4 - gamma)
    ];
    for(let i = 1; i < values.length - 1; i++)C[i] = 1 / (4 - C[i - 1]);
    const D = [
        multi(values[0], 1 / (4 - gamma))
    ];
    for(let i = 1; i < values.length - 1; i++)D[i] = multi(sub(values[i], D[i - 1]), 1 / (4 - C[i - 1]));
    D[values.length - 1] = multi(sub(values[values.length - 1], D[values.length - 2]), 1 / (4 - 1 / gamma - C[values.length - 2]));
    const ret = [];
    ret[values.length - 1] = D[values.length - 1];
    for(let i = values.length - 2; 0 <= i; i--)ret[i] = sub(D[i], multi(ret[i + 1], C[i]));
    return ret;
}
function getCrossSegAndBezier3(seg, bezier) {
    return getCrossSegAndBezier3WithT(seg, bezier).map(([p])=>p);
}
function getCrossSegAndBezier3WithT(seg, bezier) {
    const candidates = getCrossLineAndBezier3WithT(seg, bezier);
    return candidates.filter(([p])=>isOnSeg(p, seg));
}
function getCrossLineAndBezier3(seg, bezier) {
    return getCrossLineAndBezier3WithT(seg, bezier).map(([p])=>p);
}
function getCrossLineAndBezier3WithT(line, bezier) {
    const ax = 3 * (bezier[1].x - bezier[2].x) + bezier[3].x - bezier[0].x;
    const ay = 3 * (bezier[1].y - bezier[2].y) + bezier[3].y - bezier[0].y;
    const bx = 3 * (bezier[0].x - 2 * bezier[1].x + bezier[2].x);
    const by = 3 * (bezier[0].y - 2 * bezier[1].y + bezier[2].y);
    const cx = 3 * (bezier[1].x - bezier[0].x);
    const cy = 3 * (bezier[1].y - bezier[0].y);
    const dx = bezier[0].x;
    const dy = bezier[0].y;
    const vx = line[1].y - line[0].y;
    const vy = line[0].x - line[1].x;
    const d = line[0].x * vx + line[0].y * vy;
    const roots = solveQubicFomula(vx * ax + vy * ay, vx * bx + vy * by, vx * cx + vy * cy, vx * dx + vy * dy - d);
    return roots.filter((t)=>0 <= t && t <= 1).map((t)=>[
            {
                x: ((ax * t + bx) * t + cx) * t + dx,
                y: ((ay * t + by) * t + cy) * t + dy
            },
            t
        ]);
}
function divideBezier3(bezier, t) {
    const [a, b, c, d] = bezier;
    const e = lerpPoint(a, b, t);
    const f = lerpPoint(b, c, t);
    const g = lerpPoint(c, d, t);
    const h = lerpPoint(e, f, t);
    const j = lerpPoint(f, g, t);
    const k = lerpPoint(h, j, t);
    return [
        [
            a,
            e,
            h,
            k
        ],
        [
            k,
            j,
            g,
            d
        ]
    ];
}
function getClosestPointOnBezier3(bezier, p, epsilon) {
    const lerpFn = getBezier3LerpFn(bezier);
    const epsilonSq = epsilon * epsilon;
    const size = 10;
    let range = [
        0,
        1
    ];
    let delta = 0;
    let ret = bezier[0];
    let count = 0;
    while(count < 100){
        const ranges = [];
        const rangeSize = range[1] - range[0];
        const step = rangeSize / size;
        for(let i = 0; i <= size; i++)ranges.push(range[0] + step * i);
        let candidate;
        for(let i = 0; i < ranges.length - 1; i++){
            const seg = [
                lerpFn(ranges[i]),
                lerpFn(ranges[i + 1])
            ];
            const pedal = getPedal(p, seg);
            if (isOnSeg(pedal, seg)) {
                const d = getDistanceSq(p, pedal);
                if (!candidate || d < candidate[2]) candidate = [
                    [
                        ranges[i],
                        ranges[i + 1]
                    ],
                    pedal,
                    d
                ];
            } else {
                // When the pedal isn't on the segment, either vertex is the closest..
                const d0 = getDistanceSq(p, seg[0]);
                const d1 = getDistanceSq(p, seg[1]);
                const [d, vertex] = d0 <= d1 ? [
                    d0,
                    seg[0]
                ] : [
                    d1,
                    seg[1]
                ];
                if (!candidate || d < candidate[2]) candidate = [
                    [
                        ranges[i],
                        ranges[i + 1]
                    ],
                    vertex,
                    d
                ];
            }
        }
        if (!candidate) break;
        if (Math.abs(delta - candidate[2]) < epsilonSq) {
            ret = candidate[1];
            break;
        }
        range = candidate[0];
        delta = candidate[2];
        count++;
    }
    return ret;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"hNdpk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "configs", ()=>configs);
/**
 * 描画
 * @param ctx 描画要素
 * @param pathInfo 図形情報
 */ parcelHelpers.export(exports, "draw", ()=>draw);
/**
 * 矩形に収まるよう調整
 * @param pathInfoList パス情報リスト
 * @param x 矩形x座標
 * @param y 矩形y座標
 * @param width 矩形width
 * @param height 矩形height
 * @return 調整後パス情報リスト
 */ parcelHelpers.export(exports, "fitRect", ()=>fitRect);
/**
 * SVG文字列から図形のパス情報を取得する
 * 対応タグ: path,rect,ellipse,circle
 * @param svgString SVGリソース文字列
 * @return パス情報リスト
 */ parcelHelpers.export(exports, "parseSvgGraphicsStr", ()=>parseSvgGraphicsStr);
/**
 * SVGタグから図形のパス情報を取得する
 * 対応タグ: path,rect,ellipse,circle
 * @param svgTag SVGタグ
 * @return パス情報リスト
 */ parcelHelpers.export(exports, "parseSvgGraphics", ()=>parseSvgGraphics);
/**
 * opentype.jsのpath.commandをd文字列に変換する
 * @param fontPath opentype.jsのpath.command
 * @return d文字列
 */ parcelHelpers.export(exports, "openCommandToD", ()=>openCommandToD);
/**
 * opentype.jsのpathを解析する
 * @param fontPath opentype.jsのpath
 * @return パス情報リスト
 */ parcelHelpers.export(exports, "parseOpenPath", ()=>parseOpenPath);
parcelHelpers.export(exports, "parsePathSegmentRaws", ()=>parsePathSegmentRaws);
parcelHelpers.export(exports, "pathSegmentRawsToString", ()=>pathSegmentRawsToString);
parcelHelpers.export(exports, "pathSegmentRawToString", ()=>pathSegmentRawToString);
parcelHelpers.export(exports, "parsePathSegments", ()=>parsePathSegments);
parcelHelpers.export(exports, "getPathLengthStructs", ()=>getPathLengthStructs);
/**
 * Execute "getPathTotalLength" with cacheable structs generated by "getPathLengthStructs"
 */ parcelHelpers.export(exports, "getPathTotalLengthFromStructs", ()=>getPathTotalLengthFromStructs);
/**
 * Alternative function of "SVGGeometryElement.getTotalLength"
 * @param dStr d string of path element
 * @param split the number of segments to approximate a curve
 * @return total length of the path
 */ parcelHelpers.export(exports, "getPathTotalLength", ()=>getPathTotalLength);
/**
 * Execute "getPathPointAtLength" with cacheable structs generated by "getPathLengthStructs"
 */ parcelHelpers.export(exports, "getPathPointAtLengthFromStructs", ()=>getPathPointAtLengthFromStructs);
/**
 * Alternative function of "SVGGeometryElement.getPointAtLength"
 * @param dStr d string of path element
 * @param distance target length
 * @param split the number of segments to approximate a curve
 * @return the point at the target length
 */ parcelHelpers.export(exports, "getPathPointAtLength", ()=>getPathPointAtLength);
/**
 * The first segment has to be either "M", "m", "L" or "l".
 *
 * The last segment will be converted to normalized value.
 * e.g. [m, l, v, z] => [M, v, l, z]
 *
 * "T", "t", "S" or "s" will be converted to "Q", "q", "C" or "c"
 */ parcelHelpers.export(exports, "reversePath", ()=>reversePath);
/**
 * Slide segments.
 * Relative segments will not be slided by this function.
 */ parcelHelpers.export(exports, "slidePath", ()=>slidePath);
/**
 * Scale segments.
 * Both abstract and relative segments will be scaled by this function.
 */ parcelHelpers.export(exports, "scalePath", ()=>scalePath);
/**
 * Rotate segments.
 * Both abstract and relative segments will be rotated by this function.
 * "H", "h", "V" and "v" will be converted to "L" or "l"
 */ parcelHelpers.export(exports, "rotatePath", ()=>rotatePath);
/**
 * Parse path d string and approximate it as a polyline
 * Note:
 * - Jump information by M/m commands doesn't remain in a polyline
 * - Z/z commands are ignored => The tail point doesn't become the same as the head one by these commands
 * @param dStr d string of path element
 * @return approximated polyline
 */ parcelHelpers.export(exports, "parsePathD", ()=>parsePathD);
/**
 * pathタグを解析する
 * @param svgPath SVGのpathタグDOM
 * @return 座標リスト
 */ parcelHelpers.export(exports, "parsePath", ()=>parsePath);
/**
 * rectタグを解析する
 * @param SVGのrectタグDOM
 * @return 座標リスト
 */ parcelHelpers.export(exports, "parseRect", ()=>parseRect);
/**
 * ellipseタグを解析する
 * @param svgEllipse SVGのellipseタグDOM
 * @return 座標リスト
 */ parcelHelpers.export(exports, "parseEllipse", ()=>parseEllipse);
/**
 * circleタグを解析する
 * @param svgCircle  SVGのcircleタグDOM
 * @return 座標リスト
 */ parcelHelpers.export(exports, "parseCircle", ()=>parseCircle);
/**
 * transformを行う
 * @param commandStr コマンド文字列
 * @param points 変換前座標リスト
 * @return 変形後座標リスト
 */ parcelHelpers.export(exports, "adoptTransform", ()=>adoptTransform);
/**
 * pathタグd属性文字列を分割する
 * @param dString pathのd要素文字列
 * @return コマンド単位の情報配列の配列
 */ parcelHelpers.export(exports, "splitD", ()=>splitD);
/**
 * svg文字列を生成する
 * @param pathList path情報リスト
 * @return xml文字列
 */ parcelHelpers.export(exports, "serializeSvgString", ()=>serializeSvgString);
/**
 * svgタグを生成する
 * @param pathList path情報リスト
 * @return svgタグ
 */ parcelHelpers.export(exports, "serializeSvg", ()=>serializeSvg);
/**
 * pathタグを生成する
 * @param pointList 座標リスト
 * @param style スタイル情報
 * @return pathタグ
 */ parcelHelpers.export(exports, "serializePath", ()=>serializePath);
/**
 * 座標リストをd属性文字列に変換する
 * @param pointList 座標リスト
 * @param open 閉じないフラグ
 * @return d属性文字列
 */ parcelHelpers.export(exports, "serializePointList", ()=>serializePointList);
/**
 * デフォルトstyle作成
 * @return スタイルオブジェクト
 */ parcelHelpers.export(exports, "createStyle", ()=>createStyle);
/**
 * pathタグのスタイルを取得する
 * @param svgPath SVGのpathタグDOM
 * @return スタイルオブジェクト
 */ parcelHelpers.export(exports, "parseTagStyle", ()=>parseTagStyle);
/**
 * スタイル情報をstyle属性文字列に変換する
 * @method serializeStyle
 * @param style スタイル情報
 * @return style属性文字列
 */ parcelHelpers.export(exports, "serializeStyle", ()=>serializeStyle);
/**
 * パス分割
 * @param path 対象パス
 * @param line 分割線
 * @return 分割後のパスリスト
 */ parcelHelpers.export(exports, "splitPath", ()=>splitPath);
/**
 * ポリゴンリストをグルーピングしたパスリストに変換する
 * @param polygons ポリゴンリスト
 * @param style パススタイル
 * @return パスリスト
 */ parcelHelpers.export(exports, "getGroupedPathList", ()=>getGroupedPathList);
/**
 * convert affine matrix to transform attribute value
 * @param matrix affine matrix
 * @return transform attribute value
 */ parcelHelpers.export(exports, "affineToTransform", ()=>affineToTransform);
/**
 * parse transform attribute value as affine matrix
 * @param transform attribute value
 * @return transform value
 */ parcelHelpers.export(exports, "parseTransform", ()=>parseTransform);
/**
 * parse transform attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */ parcelHelpers.export(exports, "parseTranslate", ()=>parseTranslate);
/**
 * parse translateX attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */ parcelHelpers.export(exports, "parseTranslateX", ()=>parseTranslateX);
/**
 * parse translateY attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */ parcelHelpers.export(exports, "parseTranslateY", ()=>parseTranslateY);
/**
 * parse skewX attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */ parcelHelpers.export(exports, "parseSkewX", ()=>parseSkewX);
/**
 * parse skewY attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */ parcelHelpers.export(exports, "parseSkewY", ()=>parseSkewY);
/**
 * parse transform attribute value of scale as affine matrix
 * @param transform attribute value
 * @return transform value
 */ parcelHelpers.export(exports, "parseScale", ()=>parseScale);
/**
 * parse ScaleX attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */ parcelHelpers.export(exports, "parseScaleX", ()=>parseScaleX);
/**
 * parse ScaleY attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */ parcelHelpers.export(exports, "parseScaleY", ()=>parseScaleY);
/**
 * parse transform attribute value of rotate as affine matrix
 * @param transform attribute value
 * @return transform value
 */ parcelHelpers.export(exports, "parseRotate", ()=>parseRotate);
/**
 * parse transform attribute value of matrix as affine matrix
 * @param transform attribute value
 * @return transform value
 */ parcelHelpers.export(exports, "parseMatrix", ()=>parseMatrix);
var _geo = require("./geo");
const HTTP_SVG = "http://www.w3.org/2000/svg";
// Unary plus operator seems faster than native parseFloat
const _parseFloat = (v)=>+v;
const configs = {
    bezierSplitSize: 10,
    ellipseSplitSize: 20
};
function draw(ctx, pathInfo) {
    ctx.lineCap = pathInfo.style.lineCap;
    ctx.lineJoin = pathInfo.style.lineJoin;
    ctx.beginPath();
    pathInfo.d.forEach((p, i)=>{
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    if (pathInfo.included) pathInfo.included.forEach((poly)=>{
        poly.forEach((p, i)=>{
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
    });
    if (pathInfo.style.fill) {
        ctx.fillStyle = pathInfo.style.fillStyle;
        ctx.globalAlpha = pathInfo.style.fillGlobalAlpha;
        ctx.fill();
    }
    // 枠
    if (pathInfo.style.stroke) {
        ctx.strokeStyle = pathInfo.style.strokeStyle;
        ctx.globalAlpha = pathInfo.style.strokeGlobalAlpha;
        ctx.lineWidth = pathInfo.style.lineWidth;
        ctx.setLineDash(pathInfo.style.lineDash);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}
function fitRect(pathInfoList, x, y, width, height) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    pathInfoList.forEach((info)=>{
        info.d.forEach((p)=>{
            minX = Math.min(minX, p.x);
            maxX = Math.max(maxX, p.x);
            minY = Math.min(minY, p.y);
            maxY = Math.max(maxY, p.y);
        });
    });
    // 原点基準に移動
    const fromBaseList = pathInfoList.map((info)=>Object.assign(Object.assign({}, info), {
            d: info.d.map((p)=>_geo.vec(p.x - minX, p.y - minY))
        }));
    // 伸縮
    const orgWidth = maxX - minX;
    const orgHeight = maxY - minY;
    const rateX = width / orgWidth;
    const rateY = height / orgHeight;
    const rate = Math.min(rateX, rateY);
    const scaledList = fromBaseList.map((info)=>Object.assign(Object.assign({}, info), {
            d: info.d.map((p)=>_geo.vec(p.x * rate, p.y * rate))
        }));
    // 矩形位置に移動
    const difX = x + (width - orgWidth * rate) / 2;
    const difY = y + (height - orgHeight * rate) / 2;
    const convertedList = scaledList.map((info)=>Object.assign(Object.assign({}, info), {
            d: info.d.map((p)=>_geo.vec(p.x + difX, p.y + difY)),
            included: (info.included || []).map((poly)=>{
                return poly.map((p)=>_geo.vec((p.x - minX) * rate + difX, (p.y - minY) * rate + difY));
            })
        }));
    return convertedList;
}
function parseSvgGraphicsStr(svgString) {
    const domParser = new DOMParser();
    const svgDom = domParser.parseFromString(svgString, "image/svg+xml");
    const svgTags = svgDom.getElementsByTagName("svg");
    if (!svgTags || svgTags.length === 0) return [];
    return parseSvgGraphics(svgTags[0]);
}
/**
 * parse SVG tree
 * @param elm SVGElement
 * @return path informations
 */ function parseSvgTree(elm, parentInfo) {
    var _a, _b;
    const style = Object.assign(Object.assign({}, (_a = parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.style) !== null && _a !== void 0 ? _a : {}), parseTagStyle(elm));
    const transformStr = elm.getAttribute("transform");
    const parentTransform = (_b = parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.transform) !== null && _b !== void 0 ? _b : _geo.IDENTITY_AFFINE;
    let ret = [];
    const svgPath = parseSVGShape(elm);
    if (svgPath) ret.push(Object.assign(Object.assign({}, svgPath), {
        d: svgPath.d.map((v)=>_geo.applyAffine(parentTransform, v))
    }));
    if (elm.children.length > 0) {
        const transform = transformStr ? _geo.multiAffine(parentTransform, parseTransform(transformStr)) : parentTransform;
        Array.from(elm.children).forEach((child)=>{
            ret = ret.concat(parseSvgTree(child, {
                style,
                transform
            }));
        });
    }
    return ret;
}
function parseSVGShape(elm) {
    switch(elm.tagName.toLowerCase()){
        case "path":
            return {
                d: parsePath(elm),
                style: parseTagStyle(elm)
            };
        case "rect":
            return {
                d: parseRect(elm),
                style: parseTagStyle(elm)
            };
        case "ellipse":
            return {
                d: parseEllipse(elm),
                style: parseTagStyle(elm)
            };
        case "circle":
            return {
                d: parseCircle(elm),
                style: parseTagStyle(elm)
            };
        default:
            return undefined;
    }
}
function parseSvgGraphics(svgTag) {
    return parseSvgTree(svgTag);
}
function openCommandToD(command) {
    let d = command.type;
    if ("x1" in command) d += ` ${command.x1}`;
    if ("y1" in command) d += ` ${command.y1}`;
    if ("x2" in command) d += ` ${command.x2}`;
    if ("y2" in command) d += ` ${command.y2}`;
    if ("x3" in command) d += ` ${command.x3}`;
    if ("y3" in command) d += ` ${command.y3}`;
    if ("x" in command) d += ` ${command.x}`;
    if ("y" in command) d += ` ${command.y}`;
    return d;
}
function parseOpenPath(fontPath) {
    const pathInfoList = [];
    let current = "";
    fontPath.commands.forEach((c)=>{
        current += openCommandToD(c) + " ";
        if (current && c.type.toUpperCase() === "Z") {
            const pathList = parsePathD(current);
            pathInfoList.push({
                d: pathList,
                style: Object.assign(Object.assign({}, createStyle()), {
                    fill: true,
                    fillStyle: "black",
                    stroke: false
                })
            });
            current = "";
        }
    });
    return pathInfoList;
}
function parsePathSegmentRaw(segment) {
    if (segment.length === 8) return [
        segment[0],
        _parseFloat(segment[1]),
        _parseFloat(segment[2]),
        _parseFloat(segment[3]),
        segment[4] !== "0",
        segment[5] !== "0",
        _parseFloat(segment[6]),
        _parseFloat(segment[7])
    ];
    else {
        const [c, ...values] = segment;
        return [
            c,
            ...values.map(_parseFloat)
        ];
    }
}
function parsePathSegmentRaws(dStr) {
    return splitD(dStr).map((c)=>parsePathSegmentRaw(c));
}
function pathSegmentRawsToString(segs) {
    return segs.map(pathSegmentRawToString).join(" ");
}
function pathSegmentRawToString(seg) {
    return seg.map((v)=>{
        if (v === true) return "1";
        else if (v === false) return "0";
        else return v.toString();
    }).join(" ");
}
function parsePathSegments(dStr) {
    return _parsePathSegments(parsePathSegmentRaws(dStr));
}
function _parsePathSegments(segments) {
    const ret = [];
    let startP = _geo.vec(0, 0);
    let currentP = startP;
    let currentControlP = startP;
    let currentBezier = 1;
    segments.forEach((current)=>{
        switch(current[0]){
            case "M":
                {
                    const p1 = _geo.vec(current[1], current[2]);
                    ret.push({
                        command: "M",
                        segment: [
                            p1,
                            p1
                        ]
                    });
                    startP = p1;
                    currentControlP = p1;
                    currentBezier = 1;
                    currentP = p1;
                    break;
                }
            case "m":
                {
                    const p1 = _geo.vec(current[1], current[2]);
                    ret.push({
                        command: "m",
                        segment: [
                            p1,
                            p1
                        ]
                    });
                    startP = p1;
                    currentP = p1;
                    currentControlP = p1;
                    currentBezier = 1;
                    break;
                }
            case "L":
                {
                    const p0 = currentP;
                    const p1 = _geo.vec(current[1], current[2]);
                    ret.push({
                        command: "L",
                        segment: [
                            p0,
                            p1
                        ]
                    });
                    startP !== null && startP !== void 0 ? startP : startP = p1;
                    currentControlP = p1;
                    currentBezier = 1;
                    currentP = p1;
                    break;
                }
            case "l":
                {
                    const p0 = currentP;
                    const p1 = _geo.add(currentP, _geo.vec(current[1], current[2]));
                    ret.push({
                        command: "l",
                        segment: [
                            p0,
                            p1
                        ]
                    });
                    startP !== null && startP !== void 0 ? startP : startP = p1;
                    currentControlP = p1;
                    currentBezier = 1;
                    currentP = p1;
                    break;
                }
            case "H":
                {
                    const p0 = currentP;
                    const p1 = _geo.vec(current[1], p0.y);
                    ret.push({
                        command: "H",
                        segment: [
                            p0,
                            p1
                        ]
                    });
                    currentControlP = p1;
                    currentBezier = 1;
                    currentP = p1;
                    break;
                }
            case "h":
                {
                    const p0 = currentP;
                    const p1 = _geo.vec(current[1] + p0.x, p0.y);
                    ret.push({
                        command: "h",
                        segment: [
                            p0,
                            p1
                        ]
                    });
                    currentControlP = p1;
                    currentBezier = 1;
                    currentP = p1;
                    break;
                }
            case "V":
                {
                    const p0 = currentP;
                    const p1 = _geo.vec(p0.x, current[1]);
                    ret.push({
                        command: "V",
                        segment: [
                            p0,
                            p1
                        ]
                    });
                    currentControlP = p1;
                    currentBezier = 1;
                    currentP = p1;
                    break;
                }
            case "v":
                {
                    const p0 = currentP;
                    const p1 = _geo.vec(p0.x, current[1] + p0.y);
                    ret.push({
                        command: "v",
                        segment: [
                            p0,
                            p1
                        ]
                    });
                    currentControlP = p1;
                    currentBezier = 1;
                    currentP = p1;
                    break;
                }
            case "Q":
                {
                    const p0 = currentP;
                    const p1 = _geo.vec(current[1], current[2]);
                    const p2 = _geo.vec(current[3], current[4]);
                    ret.push({
                        command: "Q",
                        lerpFn: _geo.getBezier2LerpFn([
                            p0,
                            p1,
                            p2
                        ]),
                        curve: true
                    });
                    currentControlP = p1;
                    currentBezier = 2;
                    currentP = p2;
                    break;
                }
            case "q":
                {
                    const p0 = currentP;
                    const p1 = _geo.add(p0, _geo.vec(current[1], current[2]));
                    const p2 = _geo.add(p0, _geo.vec(current[3], current[4]));
                    ret.push({
                        command: "q",
                        lerpFn: _geo.getBezier2LerpFn([
                            p0,
                            p1,
                            p2
                        ]),
                        curve: true
                    });
                    currentControlP = p1;
                    currentBezier = 2;
                    currentP = p2;
                    break;
                }
            case "T":
                {
                    const p0 = currentP;
                    const p1 = currentBezier === 2 ? _geo.getSymmetry(currentControlP, p0) : p0;
                    const p2 = _geo.vec(current[1], current[2]);
                    ret.push({
                        command: "T",
                        lerpFn: _geo.getBezier2LerpFn([
                            p0,
                            p1,
                            p2
                        ]),
                        curve: true
                    });
                    currentControlP = p1;
                    currentBezier = 2;
                    currentP = p2;
                    break;
                }
            case "t":
                {
                    const p0 = currentP;
                    const p1 = currentBezier === 2 ? _geo.getSymmetry(currentControlP, p0) : p0;
                    const p2 = _geo.add(p0, _geo.vec(current[1], current[2]));
                    ret.push({
                        command: "t",
                        lerpFn: _geo.getBezier2LerpFn([
                            p0,
                            p1,
                            p2
                        ]),
                        curve: true
                    });
                    currentControlP = p1;
                    currentBezier = 2;
                    currentP = p2;
                    break;
                }
            case "C":
                {
                    const p0 = currentP;
                    const p1 = _geo.vec(current[1], current[2]);
                    const p2 = _geo.vec(current[3], current[4]);
                    const p3 = _geo.vec(current[5], current[6]);
                    ret.push({
                        command: "C",
                        lerpFn: _geo.getBezier3LerpFn([
                            p0,
                            p1,
                            p2,
                            p3
                        ]),
                        curve: true
                    });
                    currentControlP = p2;
                    currentBezier = 3;
                    currentP = p3;
                    break;
                }
            case "c":
                {
                    const p0 = currentP;
                    const p1 = _geo.add(p0, _geo.vec(current[1], current[2]));
                    const p2 = _geo.add(p0, _geo.vec(current[3], current[4]));
                    const p3 = _geo.add(p0, _geo.vec(current[5], current[6]));
                    ret.push({
                        command: "c",
                        lerpFn: _geo.getBezier3LerpFn([
                            p0,
                            p1,
                            p2,
                            p3
                        ]),
                        curve: true
                    });
                    currentControlP = p2;
                    currentBezier = 3;
                    currentP = p3;
                    break;
                }
            case "S":
                {
                    const p0 = currentP;
                    const p1 = currentBezier === 3 ? _geo.getSymmetry(currentControlP, p0) : p0;
                    const p2 = _geo.vec(current[1], current[2]);
                    const p3 = _geo.vec(current[3], current[4]);
                    ret.push({
                        command: "S",
                        lerpFn: _geo.getBezier3LerpFn([
                            p0,
                            p1,
                            p2,
                            p3
                        ]),
                        curve: true
                    });
                    currentControlP = p2;
                    currentBezier = 3;
                    currentP = p3;
                    break;
                }
            case "s":
                {
                    const p0 = currentP;
                    const p1 = currentBezier === 3 ? _geo.getSymmetry(currentControlP, p0) : p0;
                    const p2 = _geo.add(p0, _geo.vec(current[1], current[2]));
                    const p3 = _geo.add(p0, _geo.vec(current[3], current[4]));
                    ret.push({
                        command: "s",
                        lerpFn: _geo.getBezier3LerpFn([
                            p0,
                            p1,
                            p2,
                            p3
                        ]),
                        curve: true
                    });
                    currentControlP = p2;
                    currentBezier = 3;
                    currentP = p3;
                    break;
                }
            case "A":
                {
                    const p0 = currentP;
                    const rx = current[1];
                    const ry = current[2];
                    const large = current[4];
                    const sweep = current[5];
                    const radian = current[3] / 180 * Math.PI;
                    const p1 = _geo.vec(current[6], current[7]);
                    ret.push({
                        command: "A",
                        lerpFn: _geo.getArcLerpFn(rx, ry, p0, p1, large, sweep, radian),
                        curve: true
                    });
                    currentControlP = p1;
                    currentBezier = 1;
                    currentP = p1;
                    break;
                }
            case "a":
                {
                    const p0 = currentP;
                    const rx = current[1];
                    const ry = current[2];
                    const large = current[4];
                    const sweep = current[5];
                    const radian = current[3] / 180 * Math.PI;
                    const p1 = _geo.add(p0, _geo.vec(current[6], current[7]));
                    ret.push({
                        command: "a",
                        lerpFn: _geo.getArcLerpFn(rx, ry, p0, p1, large, sweep, radian),
                        curve: true
                    });
                    currentControlP = p1;
                    currentBezier = 1;
                    currentP = p1;
                    break;
                }
            case "Z":
            case "z":
                {
                    const p0 = currentP;
                    const p1 = startP;
                    ret.push({
                        command: current[0],
                        segment: [
                            p0,
                            p1
                        ]
                    });
                    currentControlP = p1;
                    currentBezier = 1;
                    currentP = p1;
                    break;
                }
        }
    });
    return ret;
}
function getPathLengthStructs(dStr, split = configs.bezierSplitSize) {
    return parsePathSegments(dStr).map((seg)=>({
            lerpFn: seg.curve ? seg.lerpFn : (t)=>_geo.lerpPoint(seg.segment[0], seg.segment[1], t),
            length: _geo.getPolylineLength(seg.curve ? _geo.getApproPoints(seg.lerpFn, split) : seg.segment)
        }));
}
function getPathTotalLengthFromStructs(structs) {
    return structs.reduce((p, s)=>p + s.length, 0);
}
function getPathTotalLength(dStr, split = configs.bezierSplitSize) {
    return getPathTotalLengthFromStructs(getPathLengthStructs(dStr, split));
}
function getPathPointAtLengthFromStructs(structs, distance, split = configs.bezierSplitSize) {
    if (structs.length === 0) return _geo.vec(0, 0);
    if (distance === 0) return structs[0].lerpFn(0);
    let l = Math.max(distance, 0);
    for(let i = 0; i < structs.length; i++){
        const s = structs[i];
        if (l < s.length) return seekDistantPointOfLerpFn(s, l, split);
        else if (l === s.length) return s.lerpFn(1);
        else l -= s.length;
    }
    return structs[structs.length - 1].lerpFn(1);
}
function seekDistantPointOfLerpFn(pathStruct, distant, split = configs.bezierSplitSize) {
    const step = 1 / split;
    let prev = pathStruct.lerpFn(0);
    let sum = 0;
    for(let i = 1; i < split; i++){
        const t = step * i;
        const p = pathStruct.lerpFn(t);
        const d = _geo.getDistance(prev, p);
        const nextSum = sum + d;
        if (distant < nextSum) return pathStruct.lerpFn(t - (nextSum - distant) / pathStruct.length);
        prev = p;
        sum = nextSum;
    }
    return pathStruct.lerpFn(1);
}
function getPathPointAtLength(dStr, distance, split = configs.bezierSplitSize) {
    return getPathPointAtLengthFromStructs(getPathLengthStructs(dStr, split), distance, split);
}
function getPathAbsPoints(segments) {
    const points = [];
    const controls = [];
    let seg;
    let startP = _geo.vec(0, 0);
    let absP = startP;
    let preC = startP;
    let preCType = 1;
    for(let i = 0; i < segments.length; i++){
        seg = segments[i];
        switch(seg[0]){
            case "M":
                {
                    const p = _geo.vec(seg[1], seg[2]);
                    startP = absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "m":
                {
                    const p = _geo.add(_geo.vec(seg[1], seg[2]), absP);
                    startP = absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "L":
                {
                    const p = _geo.vec(seg[1], seg[2]);
                    startP !== null && startP !== void 0 ? startP : startP = p;
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "l":
                {
                    const p = _geo.add(_geo.vec(seg[1], seg[2]), absP);
                    startP !== null && startP !== void 0 ? startP : startP = p;
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "H":
                {
                    const p = _geo.vec(seg[1], absP.y);
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "h":
                {
                    const p = _geo.vec(seg[1] + absP.x, absP.y);
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "V":
                {
                    const p = _geo.vec(absP.x, seg[1]);
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "v":
                {
                    const p = _geo.vec(absP.x, seg[1] + absP.y);
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "Q":
                {
                    const p = _geo.vec(seg[1], seg[2]);
                    preC = p;
                    absP = _geo.vec(seg[3], seg[4]);
                    preCType = 2;
                    break;
                }
            case "q":
                {
                    const p = _geo.vec(seg[1] + absP.x, seg[2] + absP.y);
                    preC = p;
                    absP = _geo.vec(seg[3] + absP.x, seg[4] + absP.y);
                    preCType = 2;
                    break;
                }
            case "T":
                {
                    const p = preCType === 2 ? _geo.lerpPoint(preC, absP, 2) : absP;
                    preC = p;
                    absP = _geo.vec(seg[1], seg[2]);
                    preCType = 2;
                    break;
                }
            case "t":
                {
                    const p = preCType === 2 ? _geo.lerpPoint(preC, absP, 2) : absP;
                    preC = p;
                    absP = _geo.vec(seg[1] + absP.x, seg[2] + absP.y);
                    preCType = 2;
                    break;
                }
            case "C":
                {
                    const p = _geo.vec(seg[3], seg[4]);
                    preC = p;
                    absP = _geo.vec(seg[5], seg[6]);
                    preCType = 3;
                    break;
                }
            case "c":
                {
                    const p = _geo.vec(seg[3] + absP.x, seg[4] + absP.y);
                    preC = p;
                    absP = _geo.vec(seg[5] + absP.x, seg[6] + absP.y);
                    preCType = 3;
                    break;
                }
            case "S":
                {
                    const p = preCType === 3 ? _geo.lerpPoint(preC, absP, 2) : absP;
                    preC = p;
                    absP = _geo.vec(seg[3], seg[4]);
                    preCType = 3;
                    break;
                }
            case "s":
                {
                    const p = preCType === 3 ? _geo.lerpPoint(preC, absP, 2) : absP;
                    preC = p;
                    absP = _geo.vec(seg[3] + absP.x, seg[4] + absP.y);
                    preCType = 3;
                    break;
                }
            case "A":
                {
                    const p = _geo.vec(seg[6], seg[7]);
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "a":
                {
                    const p = _geo.vec(seg[6] + absP.x, seg[7] + absP.y);
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "Z":
            case "z":
                absP = preC = startP;
                preCType = 1;
                break;
            default:
                throw getUnknownError();
        }
        controls.push(preC);
        points.push(absP);
    }
    return {
        points,
        controls
    };
}
function isCurveCommand(c) {
    return /Q|q|T|t|C|c|S|s|A|a/.test(c);
}
function reversePath(segments) {
    if (segments.length < 2) return segments;
    const ret = [];
    const { points: absPoints, controls: absContolPoints } = getPathAbsPoints(segments);
    const length = segments.length;
    let current;
    let absP;
    let closeCount = false;
    for(let i = length - 1; 0 <= i; i--){
        current = segments[i];
        absP = absPoints[i === 0 ? length - 1 : i - 1];
        switch(current[0]){
            case "M":
                if (closeCount) {
                    if (isCurveCommand(ret[ret.length - 1][0])) ret.push([
                        "Z"
                    ]);
                    else ret[ret.length - 1] = [
                        "Z"
                    ];
                    closeCount = false;
                }
                ret.push([
                    current[0],
                    absP.x,
                    absP.y
                ]);
                break;
            case "m":
                if (closeCount) {
                    if (isCurveCommand(ret[ret.length - 1][0])) ret.push([
                        "z"
                    ]);
                    else ret[ret.length - 1] = [
                        "z"
                    ];
                    closeCount = false;
                }
                if (i === 0) ret.push([
                    "M",
                    absP.x,
                    absP.y
                ]);
                else ret.push([
                    current[0],
                    -current[1],
                    -current[2]
                ]);
                break;
            case "L":
                if (closeCount && i === 0) {
                    if (isCurveCommand(ret[ret.length - 1][0])) ret.push([
                        "Z"
                    ]);
                    else ret[ret.length - 1] = [
                        "Z"
                    ];
                    closeCount = false;
                }
                ret.push([
                    current[0],
                    absP.x,
                    absP.y
                ]);
                break;
            case "l":
                if (closeCount && i === 0) {
                    if (isCurveCommand(ret[ret.length - 1][0])) ret.push([
                        "z"
                    ]);
                    else ret[ret.length - 1] = [
                        "z"
                    ];
                    closeCount = false;
                }
                if (i === 0) ret.push([
                    "L",
                    absP.x,
                    absP.y
                ]);
                else ret.push([
                    current[0],
                    -current[1],
                    -current[2]
                ]);
                break;
            case "H":
                ret.push([
                    current[0],
                    absP.x
                ]);
                break;
            case "h":
                ret.push([
                    current[0],
                    -current[1]
                ]);
                break;
            case "V":
                ret.push([
                    current[0],
                    absP.y
                ]);
                break;
            case "v":
                ret.push([
                    current[0],
                    -current[1]
                ]);
                break;
            case "Q":
                ret.push([
                    current[0],
                    current[1],
                    current[2],
                    absP.x,
                    absP.y
                ]);
                break;
            case "q":
                ret.push([
                    current[0],
                    current[1] - current[3],
                    current[2] - current[4],
                    -current[3],
                    -current[4]
                ]);
                break;
            case "T":
                {
                    const c = absContolPoints[i];
                    ret.push([
                        "Q",
                        c.x,
                        c.y,
                        absP.x,
                        absP.y
                    ]);
                    break;
                }
            case "t":
                {
                    const b = absPoints[i];
                    const c = absContolPoints[i];
                    ret.push([
                        "q",
                        c.x - b.x,
                        c.y - b.y,
                        -current[1],
                        -current[2]
                    ]);
                    break;
                }
            case "C":
                ret.push([
                    current[0],
                    current[3],
                    current[4],
                    current[1],
                    current[2],
                    absP.x,
                    absP.y
                ]);
                break;
            case "c":
                ret.push([
                    current[0],
                    current[3] - current[5],
                    current[4] - current[6],
                    current[1] - current[5],
                    current[2] - current[6],
                    -current[5],
                    -current[6]
                ]);
                break;
            case "S":
                {
                    const c = absContolPoints[i];
                    ret.push([
                        "C",
                        current[1],
                        current[2],
                        c.x,
                        c.y,
                        absP.x,
                        absP.y
                    ]);
                    break;
                }
            case "s":
                {
                    const b = absPoints[i];
                    const c = absContolPoints[i];
                    ret.push([
                        "c",
                        current[1] - current[3],
                        current[2] - current[4],
                        c.x - b.x,
                        c.y - b.y,
                        -current[3],
                        -current[4]
                    ]);
                    break;
                }
            case "A":
                ret.push([
                    current[0],
                    current[1],
                    current[2],
                    current[3],
                    current[4],
                    !current[5],
                    absP.x,
                    absP.y
                ]);
                break;
            case "a":
                ret.push([
                    current[0],
                    current[1],
                    current[2],
                    current[3],
                    current[4],
                    !current[5],
                    -current[6],
                    -current[7]
                ]);
                break;
            case "Z":
                closeCount = true;
                ret.push([
                    "L",
                    absP.x,
                    absP.y
                ]);
                break;
            case "z":
                {
                    closeCount = true;
                    const absPP = absPoints[i];
                    ret.push([
                        "l",
                        absP.x - absPP.x,
                        absP.y - absPP.y
                    ]);
                    break;
                }
        }
    }
    ret.unshift(ret.pop());
    return ret;
}
function slidePath(segments, diff) {
    return segments.map((current)=>{
        const slided = [
            ...current
        ];
        switch(slided[0]){
            case "H":
                slided[1] += diff.x;
                break;
            case "V":
                slided[1] += diff.y;
                break;
            case "A":
                slided[6] += diff.x;
                slided[7] += diff.y;
                break;
            default:
                if (slided[0] === slided[0].toUpperCase()) for(let i = 1; i < slided.length - 1; i += 2){
                    slided[i] += diff.x;
                    slided[i + 1] += diff.y;
                }
                break;
        }
        return slided;
    });
}
function scalePath(segments, scale) {
    return segments.map((current)=>{
        const slided = [
            ...current
        ];
        switch(slided[0]){
            case "H":
            case "h":
                slided[1] *= scale.x;
                break;
            case "V":
            case "v":
                slided[1] *= scale.y;
                break;
            case "A":
            case "a":
                slided[1] *= Math.abs(scale.x);
                slided[2] *= Math.abs(scale.y);
                if (scale.x * scale.y < 0) slided[5] = !slided[5];
                slided[6] *= scale.x;
                slided[7] *= scale.y;
                break;
            default:
                for(let i = 1; i < slided.length - 1; i += 2){
                    slided[i] *= scale.x;
                    slided[i + 1] *= scale.y;
                }
                break;
        }
        return slided;
    });
}
function convertHVToL(segments) {
    // If neither "H" nor "V" exists, abstract points doesn't have to be computed.
    const absVHExisted = segments.some((s)=>/H|V/.test(s[0]));
    const { points } = getPathAbsPoints(absVHExisted ? segments : []);
    return segments.map((s, i)=>{
        switch(s[0]){
            case "H":
                return [
                    "L",
                    s[1],
                    points[i].y
                ];
            case "h":
                return [
                    "l",
                    s[1],
                    0
                ];
            case "V":
                return [
                    "L",
                    points[i].x,
                    s[1]
                ];
            case "v":
                return [
                    "l",
                    0,
                    s[1]
                ];
            default:
                return s;
        }
    });
}
function rotatePath(segments, radian) {
    const sin = Math.sin(radian);
    const cos = Math.cos(radian);
    return convertHVToL(segments).map((current)=>{
        const slided = [
            ...current
        ];
        switch(slided[0]){
            case "A":
            case "a":
                {
                    slided[3] += radian * 180 / Math.PI;
                    const x = slided[6];
                    const y = slided[7];
                    slided[6] = cos * x - sin * y;
                    slided[7] = sin * x + cos * y;
                    break;
                }
            default:
                for(let i = 1; i < slided.length - 1; i += 2){
                    const x = slided[i];
                    const y = slided[i + 1];
                    slided[i] = cos * x - sin * y;
                    slided[i + 1] = sin * x + cos * y;
                }
                break;
        }
        return slided;
    });
}
function parsePathD(dStr, split = configs.bezierSplitSize) {
    const _split = Math.max(1, split);
    let ret = [];
    let step = 1 / _split;
    parsePathSegments(dStr).forEach((seg)=>{
        if (seg.command === "Z" || seg.command === "z") return;
        if (seg.curve) for(let i = 1; i <= _split; i++)ret.push(seg.lerpFn(step * i));
        else ret.push(seg.segment[1]);
    });
    return ret;
}
function parsePath(svgPath) {
    const dStr = svgPath.getAttribute("d");
    return dStr ? adoptTransform(svgPath.getAttribute("transform"), parsePathD(dStr)) : [];
}
function parseRect(svgRect) {
    const x = _parseFloat(svgRect.getAttribute("x") || "0");
    const y = _parseFloat(svgRect.getAttribute("y") || "0");
    const width = _parseFloat(svgRect.getAttribute("width") || "0");
    const height = _parseFloat(svgRect.getAttribute("height") || "0");
    // トランスフォーム
    return adoptTransform(svgRect.getAttribute("transform"), [
        _geo.vec(x, y),
        _geo.vec(x + width, y),
        _geo.vec(x + width, y + height),
        _geo.vec(x, y + height)
    ]);
}
function parseEllipse(svgEllipse) {
    const cx = _parseFloat(svgEllipse.getAttribute("cx") || "0");
    const cy = _parseFloat(svgEllipse.getAttribute("cy") || "0");
    const rx = _parseFloat(svgEllipse.getAttribute("rx") || "1");
    const ry = _parseFloat(svgEllipse.getAttribute("ry") || "1");
    // トランスフォーム
    return adoptTransform(svgEllipse.getAttribute("transform"), _geo.approximateArc(rx, ry, 0, Math.PI * 2, _geo.vec(cx, cy), 0, configs.ellipseSplitSize));
}
function parseCircle(svgCircle) {
    const cx = _parseFloat(svgCircle.getAttribute("cx") || "0");
    const cy = _parseFloat(svgCircle.getAttribute("cy") || "0");
    const r = _parseFloat(svgCircle.getAttribute("r") || "1");
    // トランスフォーム
    return adoptTransform(svgCircle.getAttribute("transform"), _geo.approximateArc(r, r, 0, Math.PI * 2, _geo.vec(cx, cy), 0, configs.ellipseSplitSize));
}
function adoptTransform(commandStr, points) {
    if (!commandStr) return points;
    let ret = _geo.cloneVectors(points);
    // 複数コマンドの場合もあるのでループ
    const commandList = commandStr.split(/\)/);
    commandList.forEach((current)=>{
        const tmp = current.split(/\(/);
        if (tmp.length === 2) {
            const command = tmp[0].trim().toLowerCase();
            const params = parseNumbers(tmp[1]);
            switch(command){
                case "matrix":
                    ret = _geo.transform(ret, params);
                    break;
                case "translate":
                    ret = ret.map((p)=>_geo.vec(p.x + params[0], p.y + params[1]));
                    break;
                case "scale":
                    {
                        const scaleX = params[0];
                        // XY等倍の場合を考慮
                        let scaleY = params[0];
                        if (params.length > 1) scaleY = params[1];
                        ret = ret.map((p)=>_geo.vec(p.x * scaleX, p.y * scaleY));
                        break;
                    }
                case "rotate":
                    {
                        // 回転基準点
                        let base = _geo.vec(0, 0);
                        if (params.length > 2) base = _geo.vec(params[1], params[2]);
                        ret = ret.map((p)=>_geo.rotate(p, params[0] * Math.PI / 180, base));
                        break;
                    }
                case "skewx":
                    ret = ret.map((p)=>_geo.vec(p.x + Math.tan(params[0] * Math.PI / 180) * p.y, p.y));
                    break;
                case "skewy":
                    ret = ret.map((p)=>_geo.vec(p.x, p.y + Math.tan(params[0] * Math.PI / 180) * p.x));
                    break;
            }
        }
    });
    return ret;
}
// All commands (BbRr isn't supported)
const allCommand = /M|m|L|l|H|h|V|v|C|c|S|s|Q|q|T|t|A|a|Z|z/g;
function splitD(dString) {
    // 要素分割
    const strList = dString.replace(allCommand, " $& ")// Insert space before each signature, but don't destruct exponent exporession such as 2.2e-10.
    .replace(/([^e])(-|\+)/g, "$1 $2").split(/,| /).filter((str)=>str).flatMap(complementDecimalShorthand);
    // 直前のコマンド
    let pastCommand = "M";
    const ret = [];
    for(let i = 0; i < strList.length;){
        const info = [];
        // Check if a command exists
        if (strList[i].match(allCommand)) {
            info.push(strList[i]);
            pastCommand = info[0];
            i++;
        } else if (pastCommand.toUpperCase() !== "Z") // Reuse previous command
        // Avoid reusing 'Z' that can cause infinite loop
        info.push(pastCommand);
        switch(info[0].toUpperCase()){
            case "Z":
                break;
            case "V":
            case "H":
                info.push(strList[i]);
                i += 1;
                break;
            case "M":
            case "L":
            case "T":
                info.push(strList[i], strList[i + 1]);
                i += 2;
                break;
            case "Q":
            case "S":
                info.push(strList[i], strList[i + 1], strList[i + 2], strList[i + 3]);
                i += 4;
                break;
            case "C":
                info.push(strList[i], strList[i + 1], strList[i + 2], strList[i + 3], strList[i + 4], strList[i + 5]);
                i += 6;
                break;
            case "A":
                info.push(strList[i], strList[i + 1], strList[i + 2], strList[i + 3], strList[i + 4], strList[i + 5], strList[i + 6]);
                i += 7;
                break;
            default:
                throw getUnknownError();
        }
        ret.push(info);
    }
    return ret;
}
/**
 * '1.2.3' => ['1.2', '0.3']
 */ function complementDecimalShorthand(str) {
    const list = str.split(/\./);
    return list.length <= 2 ? [
        str
    ] : [
        `${list[0]}.${list[1]}`,
        ...list.slice(2).map((v)=>`0.${v}`)
    ];
}
function serializeSvgString(pathList) {
    const svg = serializeSvg(pathList);
    const xmlSerializer = new XMLSerializer();
    const textXml = xmlSerializer.serializeToString(svg);
    return textXml;
}
function serializeSvg(pathList) {
    const dom = document.createElementNS(HTTP_SVG, "svg");
    // キャンバスサイズ
    let width = 1;
    let height = 1;
    pathList.forEach((path)=>{
        dom.appendChild(serializePath(path.d, path.style));
        path.d.forEach((p)=>{
            width = Math.max(width, p.x);
            height = Math.max(height, p.y);
        });
    });
    width *= 1.1;
    height *= 1.1;
    dom.setAttribute("width", `${width}`);
    dom.setAttribute("height", `${height}`);
    return dom;
}
function serializePath(pointList, style) {
    const dom = document.createElementNS(HTTP_SVG, "path");
    dom.setAttribute("d", serializePointList(pointList));
    dom.setAttribute("style", serializeStyle(style));
    return dom;
}
function serializePointList(pointList, open) {
    if (pointList.length === 0) return "";
    const [head, ...body] = pointList;
    return `M ${head.x},${head.y}` + body.map((p)=>` L ${p.x},${p.y}`).join("") + (open ? "" : " Z");
}
function createStyle() {
    return {
        fill: false,
        fillGlobalAlpha: 1,
        fillStyle: "",
        lineCap: "butt",
        lineDash: [],
        lineJoin: "bevel",
        lineWidth: 1,
        stroke: false,
        strokeGlobalAlpha: 1,
        strokeStyle: ""
    };
}
function parseTagStyle(svgPath) {
    // スタイル候補要素リスト
    const styleObject = {};
    svgPath.getAttributeNames().forEach((name)=>{
        const attr = svgPath.getAttributeNode(name);
        if (!attr) return;
        styleObject[attr.name] = attr.value;
    });
    const styleAttr = svgPath.getAttributeNode("style");
    if (styleAttr) {
        // style要素から取得
        const styleStr = styleAttr.value;
        styleStr.split(";").forEach((elem)=>{
            const splited = elem.split(":");
            if (splited.length !== 2) return;
            styleObject[splited[0].trim()] = splited[1].trim();
        });
    }
    return Object.entries(styleObject).reduce((ret, [key, val])=>{
        switch(key.toLowerCase()){
            case "fill":
                if (val === "none") {
                    ret.fillStyle = "";
                    ret.fill = false;
                } else {
                    ret.fillStyle = val;
                    ret.fill = true;
                }
                break;
            case "stroke":
                if (val === "none") {
                    ret.strokeStyle = "";
                    ret.stroke = false;
                } else {
                    ret.strokeStyle = val;
                    ret.stroke = true;
                }
                break;
            case "stroke-width":
                ret.lineWidth = _parseFloat(val);
                break;
            case "stroke-opacity":
                ret.strokeGlobalAlpha = _parseFloat(val);
                break;
            case "fill-opacity":
                ret.fillGlobalAlpha = _parseFloat(val);
                break;
            case "stroke-linecap":
                ret.lineCap = val;
                break;
            case "stroke-linejoin":
                ret.lineJoin = val;
                break;
            case "stroke-dasharray":
                if (val.toLowerCase() === "none") ret.lineDash = [];
                else ret.lineDash = parseNumbers(val);
                break;
            default:
                break;
        }
        return ret;
    }, createStyle());
}
function serializeStyle(style) {
    let ret = "";
    // fill情報
    if (!style.fill) ret += "fill:none;";
    else ret += "fill:" + style.fillStyle + ";";
    if (style.fillGlobalAlpha) ret += "fill-opacity:" + style.fillGlobalAlpha + ";";
    // stroke情報
    if (!style.stroke) ret += "stroke:none;";
    else ret += "stroke:" + style.strokeStyle + ";";
    if (style.lineWidth) ret += "stroke-width:" + style.lineWidth + ";";
    if (style.strokeGlobalAlpha) ret += "stroke-opacity:" + style.strokeGlobalAlpha + ";";
    if (style.lineCap) ret += "stroke-linecap:" + style.lineCap + ";";
    if (style.lineJoin) ret += "stroke-linejoin:" + style.lineJoin + ";";
    if (style.lineDash) {
        if (style.lineDash.length > 0) ret += "stroke-dasharray:" + style.lineDash.join(",") + ";";
        else ret += "stroke-dasharray:none;";
    }
    return ret;
}
function splitPath(path, line) {
    let splited = _geo.splitPolyByLine(path.d, line);
    if (splited.length < 2) return [
        path
    ];
    // 本体と回転方向が一致しているかで分類
    const rootLoopwise = _geo.getLoopwise(path.d);
    const sameLoopwiseList = [];
    const oppositeLoopwiseList = [];
    if (path.included) path.included.forEach((s)=>{
        if (_geo.getLoopwise(s) === rootLoopwise) sameLoopwiseList.push(s);
        else oppositeLoopwiseList.push(s);
    });
    // 本体と同回転のものはそのまま分割
    sameLoopwiseList.forEach((poly)=>{
        const sp = _geo.splitPolyByLine(poly, line);
        splited = [
            ...splited,
            ...sp.length > 0 ? sp : [
                poly
            ]
        ];
    });
    // 本体と逆回転のものは特殊処理
    const notPolyList = [];
    oppositeLoopwiseList.forEach((poly)=>{
        const sp = _geo.splitPolyByLine(poly, line);
        if (sp.length > 0) // 分割されたらブーリアン差をとるために集める
        notPolyList.push(poly);
        else // 分割なしならそのまま
        splited.push(poly);
    });
    // 切断されたくり抜き領域を差し引いたポリゴンを生成
    const splitedAfterNot = splited.map((s)=>notPolyList.reduce((p, c)=>_geo.getPolygonNotPolygon(p, c), s));
    return _geo.getIncludedPolygonGroups(splitedAfterNot).map((group)=>{
        const [d, ...included] = group;
        return {
            d: d,
            included,
            style: path.style
        };
    });
}
function getGroupedPathList(polygons, style = createStyle()) {
    return _geo.getIncludedPolygonGroups(polygons).map((group)=>{
        const [d, ...included] = group;
        return {
            d,
            included,
            style
        };
    });
}
function affineToTransform(matrix) {
    return `matrix(${matrix.join(",")})`;
}
function parseTransform(transformStr) {
    const transformStrList = transformStr.split(")").map((s)=>`${s})`);
    const affines = transformStrList.map((str)=>parseUnitTransform(str));
    return _geo.multiAffines(affines);
}
function parseUnitTransform(str) {
    if (/translateX/.test(str)) return parseTranslateX(str);
    if (/translateY/.test(str)) return parseTranslateY(str);
    if (/translate/.test(str)) return parseTranslate(str);
    if (/skewX/.test(str)) return parseSkewX(str);
    if (/skewY/.test(str)) return parseSkewY(str);
    if (/scaleX/.test(str)) return parseScaleX(str);
    if (/scaleY/.test(str)) return parseScaleY(str);
    if (/scale/.test(str)) return parseScale(str);
    if (/rotate/.test(str)) return parseRotate(str);
    if (/matrix/.test(str)) return parseMatrix(str);
    return [
        ..._geo.IDENTITY_AFFINE
    ];
}
function parseNumbers(str) {
    const list = str.trim().replace(/,/g, " ").split(/ +/);
    return list.map((s)=>_parseFloat(s));
}
function parseTranslate(str) {
    const splited = str.match(/translate\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    const numbers = parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    else if (numbers.length === 1) return [
        1,
        0,
        0,
        1,
        numbers[0],
        0
    ];
    else return [
        1,
        0,
        0,
        1,
        numbers[0],
        numbers[1]
    ];
}
function parseTranslateX(str) {
    const splited = str.match(/translateX\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    const numbers = parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    else return [
        1,
        0,
        0,
        1,
        numbers[0],
        0
    ];
}
function parseTranslateY(str) {
    const splited = str.match(/translateY\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    const numbers = parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    else return [
        1,
        0,
        0,
        1,
        0,
        numbers[0]
    ];
}
function parseSkewX(str) {
    const splited = str.match(/skewX\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    const numbers = parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    else return [
        1,
        0,
        Math.tan(numbers[0] * Math.PI / 180),
        1,
        0,
        0
    ];
}
function parseSkewY(str) {
    const splited = str.match(/skewY\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    const numbers = parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    else return [
        1,
        Math.tan(numbers[0] * Math.PI / 180),
        0,
        1,
        0,
        0
    ];
}
function parseScale(str) {
    const splited = str.match(/scale\((.+)\)/);
    if (!splited || splited.length < 2) return [
        ..._geo.IDENTITY_AFFINE
    ];
    const numbers = parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    else if (numbers.length === 1) return [
        numbers[0],
        0,
        0,
        numbers[0],
        0,
        0
    ];
    else return [
        numbers[0],
        0,
        0,
        numbers[1],
        0,
        0
    ];
}
function parseScaleX(str) {
    const splited = str.match(/scaleX\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    const numbers = parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    else return [
        numbers[0],
        0,
        0,
        1,
        0,
        0
    ];
}
function parseScaleY(str) {
    const splited = str.match(/scaleY\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    const numbers = parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    else return [
        1,
        0,
        0,
        numbers[0],
        0,
        0
    ];
}
function parseRotate(str) {
    const splited = str.match(/rotate\((.+)\)/);
    if (!splited || splited.length < 2) return [
        ..._geo.IDENTITY_AFFINE
    ];
    const numbers = parseNumbers(splited[1]);
    if (parseNumbers.length < 1) return [
        ..._geo.IDENTITY_AFFINE
    ];
    const rad = numbers[0] / 180 * Math.PI;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const rot = [
        cos,
        sin,
        -sin,
        cos,
        0,
        0
    ];
    if (numbers.length > 2) return _geo.multiAffine(_geo.multiAffine([
        1,
        0,
        0,
        1,
        numbers[1],
        numbers[2]
    ], rot), [
        1,
        0,
        0,
        1,
        -numbers[1],
        -numbers[2]
    ]);
    else return rot;
}
function parseMatrix(str) {
    const splited = str.match(/matrix\((.+)\)/);
    if (!splited || splited.length < 2) return [
        ..._geo.IDENTITY_AFFINE
    ];
    const numbers = parseNumbers(splited[1]);
    if (numbers.length < 5) return [
        ..._geo.IDENTITY_AFFINE
    ];
    return numbers.slice(0, 6);
}
function getUnknownError() {
    return new Error(`Unexpected error`);
}

},{"./geo":"8ubUB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["38PNf"], "38PNf", "parcelRequire1f64")

//# sourceMappingURL=index.263e07a7.js.map
