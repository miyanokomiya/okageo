// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"WBaa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vec = vec;
exports.add = add;
exports.sub = sub;
exports.multi = multi;
exports.isSame = isSame;
exports.getDistance = getDistance;
exports.getPolylineLength = getPolylineLength;
exports.getNorm = getNorm;
exports.isZero = isZero;
exports.getUnit = getUnit;
exports.getCross = getCross;
exports.getInner = getInner;
exports.cloneVectors = cloneVectors;
exports.getCenter = getCenter;
exports.getRectCenter = getRectCenter;
exports.getPolygonCenter = getPolygonCenter;
exports.getRadian = getRadian;
exports.getSymmetry = getSymmetry;
exports.rotate = rotate;
exports.solveEquationOrder2 = solveEquationOrder2;
exports.getPedal = getPedal;
exports.getCrossLineAndBezier = getCrossLineAndBezier;
exports.isCrossSegAndSeg = isCrossSegAndSeg;
exports.isTouchSegAndSeg = isTouchSegAndSeg;
exports.isParallel = isParallel;
exports.isOnLine = isOnLine;
exports.isOnSeg = isOnSeg;
exports.isOnPolygon = isOnPolygon;
exports.getCrossSegAndLine = getCrossSegAndLine;
exports.isSameSeg = isSameSeg;
exports.splitPolyByLine = splitPolyByLine;
exports.triangleSplit = triangleSplit;
exports.isPointOnTriangle = isPointOnTriangle;
exports.convertLoopwise = convertLoopwise;
exports.getLoopwise = getLoopwise;
exports.getArea = getArea;
exports.approximateBezier = approximateBezier;
exports.getPointOnBezier2 = getPointOnBezier2;
exports.getBezier2LerpFn = getBezier2LerpFn;
exports.getPointOnBezier3 = getPointOnBezier3;
exports.getBezier3LerpFn = getBezier3LerpFn;
exports.getYOnBezier3AtX = getYOnBezier3AtX;
exports.approximateArc = approximateArc;
exports.approximateArcWithPoint = approximateArcWithPoint;
exports.getArcLerpFn = getArcLerpFn;
exports.lerpPoint = lerpPoint;
exports.getApproPoints = getApproPoints;
exports.getEllipseCenter = getEllipseCenter;
exports.getCircleCenter = getCircleCenter;
exports.transform = transform;
exports.invertTransform = invertTransform;
exports.multiAffine = multiAffine;
exports.multiAffines = multiAffines;
exports.applyAffine = applyAffine;
exports.omitSamePoint = omitSamePoint;
exports.getRegularPolygonArea = getRegularPolygonArea;
exports.getRegularPolygonRadius = getRegularPolygonRadius;
exports.getIncludedPolygonGroups = getIncludedPolygonGroups;
exports.getPolygonNotPolygon = getPolygonNotPolygon;
exports.getOuterRectangle = getOuterRectangle;
exports.getGrid = getGrid;
exports.expandRecntagle = expandRecntagle;
exports.expandRecntagleScale = expandRecntagleScale;
exports.interpolateScaler = interpolateScaler;
exports.interpolateVector = interpolateVector;
exports.solveQubicFomula = solveQubicFomula;
exports.clamp = clamp;
exports.circleClamp = circleClamp;
exports.roundTrip = roundTrip;
exports.IDENTITY_AFFINE = exports.MINVALUE = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MINVALUE = 0.000001;
exports.MINVALUE = MINVALUE;
var IDENTITY_AFFINE = [1, 0, 0, 1, 0, 0];
exports.IDENTITY_AFFINE = IDENTITY_AFFINE;

function vec(x, y) {
  return {
    x: x,
    y: y
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
  var dif = sub(a, b);
  return Math.abs(dif.x) < MINVALUE && Math.abs(dif.y) < MINVALUE;
}

function getDistance(a, b) {
  return getNorm(sub(a, b));
}

function getPolylineLength(polyline) {
  var closed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (polyline.length < 2) return 0;
  var ret = 0;

  for (var i = 0; i < polyline.length - 1; i++) {
    ret += getDistance(polyline[i], polyline[i + 1]);
  }

  if (closed) {
    ret += getDistance(polyline[polyline.length - 1], polyline[0]);
  }

  return ret;
}

function getNorm(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
}

function isZero(a) {
  return getNorm(a) < MINVALUE;
}

function getUnit(a) {
  var d = getNorm(a);
  if (d < MINVALUE) throw new Error('cannot get unit vector of zero vector');
  return multi(a, 1 / d);
}

function getCross(a, b) {
  return a.x * b.y - a.y * b.x;
}

function getInner(a, b) {
  return a.x * b.x + a.y * b.y;
}

function cloneVectors(vectors) {
  return vectors.map(function (v) {
    return Object.assign({}, v);
  });
}

function getCenter(a, b) {
  return multi(add(a, b), 1 / 2);
}

function getRectCenter(rec) {
  return vec(rec.x + rec.width / 2, rec.y + rec.height / 2);
}

function getPolygonCenter(polygon) {
  if (polygon.length === 0) return vec(0, 0);
  return multi(polygon.reduce(function (p, c) {
    return add(p, c);
  }, vec(0, 0)), 1 / polygon.length);
}

function getRadian(a) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : vec(0, 0);
  var dif = sub(a, from);
  return Math.atan2(dif.y, dif.x);
}
/**
 * fromに対して、aと点対称なベクトル取得
 * @param a 対象ベクトル
 * @param from 基点
 * @param 点対称ベクトル
 */


function getSymmetry(a) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : vec(0, 0);
  return add(multi(sub(from, a), 2), a);
}
/**
 * fromに対して、aからradian回転したベクトル取得
 * @param a 対象ベクトル
 * @param radian 回転ラジアン
 * @param from 基点
 * @param 回転後のベクトル
 */


function rotate(a, radian) {
  var from = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : vec(0, 0);
  var fromBase = sub(a, from);
  var s = Math.sin(radian);
  var c = Math.cos(radian);
  return add(vec(c * fromBase.x - s * fromBase.y, s * fromBase.x + c * fromBase.y), from);
}

function getRotateFn(radian) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : vec(0, 0);
  var s = Math.sin(radian);
  var c = Math.cos(radian);
  return function (a, reverse) {
    var fromBase = sub(a, from);
    return reverse ? add(vec(c * fromBase.x + s * fromBase.y, -s * fromBase.x + c * fromBase.y), from) : add(vec(c * fromBase.x - s * fromBase.y, s * fromBase.x + c * fromBase.y), from);
  };
}
/**
 * 2次方程式の解の公式
 * a * x^2 + b * x + c = 0
 * 解に虚数が含まれる場合は解なし扱い
 * @param a x^2の係数
 * @param b xの係数
 * @param c 定数
 * @return 解の配列
 */


function solveEquationOrder2(a, b, c) {
  if (isCloseToZero(a)) {
    return isCloseToZero(b) ? [] : [-c / b];
  }

  var d = b * b - 4 * a * c;

  if (d < 0) {
    return [];
  }

  var ia = 0.5 / a;

  if (isCloseToZero(d)) {
    return [-b * ia];
  }

  var sd = Math.sqrt(d);
  return [(-b + sd) * ia, (-b - sd) * ia];
}
/**
 * 点から直線への垂線の足
 * @param p 対象の点
 * @param line 直線
 * @return 垂線の足
 */


function getPedal(p, line) {
  if (line.length !== 2) throw new Error('line must be length = 2');
  var s = line[0];
  var t = line[1];
  var vecST = sub(t, s);
  var vecSP = sub(p, s);
  var inner = getInner(vecST, vecSP);
  var rate = inner / getInner(vecST, vecST);
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
 */


function rayToBezier(p0, p1, p2, p, q) {
  var vx = q.x - p.x;
  var vy = q.y - p.y;
  var a = p0.x - 2 * p1.x + p2.x;
  var b = 2 * (p1.x - p0.x);
  var c = p0.x;
  var d = p0.y - 2 * p1.y + p2.y;
  var e = 2 * (p1.y - p0.y);
  var f = p0.y;
  return solveEquationOrder2(a * vy - vx * d, b * vy - vx * e, vy * c - vy * p.x - vx * f + vx * p.y);
}
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


function getCrossLineAndBezier(p0, p1, p2, p, q) {
  return rayToBezier(p0, p1, p2, p, q).filter(function (t) {
    return 0 <= t && t <= 1;
  }).map(function (t) {
    return vec((p2.x - 2 * p1.x + p0.x) * t * t + 2 * (p1.x - p0.x) * t + p0.x, (p2.y - 2 * p1.y + p0.y) * t * t + 2 * (p1.y - p0.y) * t + p0.y);
  });
}
/**
 * 線分と線分の交差判定（端点での接触は含まない）
 * @param seg1 線分1
 * @param seg2 線分2
 * @return 交差しているフラグ
 */


function isCrossSegAndSeg(seg1, seg2) {
  var _getCrossSegAndSegPar = getCrossSegAndSegParams(seg1, seg2),
      ta = _getCrossSegAndSegPar.ta,
      tb = _getCrossSegAndSegPar.tb,
      tc = _getCrossSegAndSegPar.tc,
      td = _getCrossSegAndSegPar.td;

  return tc * td < 0 && ta * tb < 0;
}
/**
 * 線分と線分の接触判定（端点での接触含む）
 * @param seg1 線分1
 * @param seg2 線分2
 * @return 接触しているフラグ
 */


function isTouchSegAndSeg(seg1, seg2) {
  var _getCrossSegAndSegPar2 = getCrossSegAndSegParams(seg1, seg2),
      ta = _getCrossSegAndSegPar2.ta,
      tb = _getCrossSegAndSegPar2.tb,
      tc = _getCrossSegAndSegPar2.tc,
      td = _getCrossSegAndSegPar2.td;

  return tc * td <= 0 && ta * tb <= 0;
}

function getCrossSegAndSegParams(seg1, seg2) {
  var ax = seg1[0].x;
  var ay = seg1[0].y;
  var bx = seg1[1].x;
  var by = seg1[1].y;
  var cx = seg2[0].x;
  var cy = seg2[0].y;
  var dx = seg2[1].x;
  var dy = seg2[1].y;
  var ta = (cx - dx) * (ay - cy) + (cy - dy) * (cx - ax);
  var tb = (cx - dx) * (by - cy) + (cy - dy) * (cx - bx);
  var tc = (ax - bx) * (cy - ay) + (ay - by) * (ax - cx);
  var td = (ax - bx) * (dy - ay) + (ay - by) * (ax - dx);
  return {
    ta: ta,
    tb: tb,
    tc: tc,
    td: td
  };
}
/**
 * 平行判定
 * @param a ベクトル or 2点の配列
 * @param b 同上
 * @return 平行であるフラグ
 */


function isParallel(a, b) {
  var cross = getCross(a, b);
  return Math.abs(cross) < MINVALUE;
}
/**
 * 点が直線上にあるか判定
 * @param p 点
 * @param line 直線
 * @return 直線上にあるフラグ
 */


function isOnLine(p, line) {
  return isZero(sub(p, getPedal(p, line)));
}
/**
 * 点が線分上にあるか判定
 * @param p 点
 * @param seg 線分
 * @return 線分上にあるフラグ
 */


function isOnSeg(p, seg) {
  if (!isZero(sub(p, getPedal(p, seg)))) return false;
  var v1 = sub(seg[1], seg[0]);
  var v2 = sub(p, seg[0]);
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
 */


function isCrossSegAndRightHorizon(p, seg) {
  // 平行な場合はfalse
  if (Math.abs(seg[0].y - seg[1].y) < MINVALUE) {
    return false;
  } // 線分の上側端点との接触はfalse、下側端点との接触はtrueで統一


  var top, bottom;

  if (seg[0].y < seg[1].y) {
    ;

    var _seg = _slicedToArray(seg, 2);

    bottom = _seg[0];
    top = _seg[1];
  } else {
    ;

    var _seg2 = _slicedToArray(seg, 2);

    top = _seg2[0];
    bottom = _seg2[1];
  }

  if (p.y < bottom.y || top.y <= p.y) {
    return false;
  } // 交点は厳密にpの右側でなければいけない


  var cross = getCrossSegAndLine(seg, [p, vec(p.x + 1, p.y)]);

  if (!cross || cross.x <= p.x) {
    return false;
  }

  return true;
}
/**
 * 点が面上にあるか判定（境界線上を含む）
 * @param p 点
 * @param polygon 面
 * @return 面上にあるフラグ
 */


function isOnPolygon(p, polygon) {
  // 頂点上判定
  if (polygon.find(function (point) {
    return p.x === point.x && p.y === point.y;
  })) return true;
  var segs = polygon.map(function (point, i) {
    return [point, i < polygon.length - 1 ? polygon[i + 1] : polygon[0]];
  }) // 長さ0の辺は扱わない
  .filter(function (seg) {
    return !isSame(seg[0], seg[1]);
  }); // 辺上判定

  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];

    if (isOnSeg(p, seg)) {
      return true;
    }
  }

  var hitSegs = segs.filter(function (seg) {
    return isCrossSegAndRightHorizon(p, seg);
  });
  return hitSegs.length % 2 === 1;
}
/**
 * 線分と直線の交点取得
 * @param seg 線分
 * @param line 直線
 * @return 交点
 */


function getCrossSegAndLine(seg, line) {
  if (isParallel(sub(seg[0], seg[1]), sub(line[0], line[1]))) return null;
  if (isOnLine(seg[0], line)) return Object.assign({}, seg[0]);
  if (isOnLine(seg[1], line)) return Object.assign({}, seg[1]);
  var s1 = ((line[1].x - line[0].x) * (seg[0].y - line[0].y) - (line[1].y - line[0].y) * (seg[0].x - line[0].x)) / 2;
  var s2 = ((line[1].x - line[0].x) * (line[0].y - seg[1].y) - (line[1].y - line[0].y) * (line[0].x - seg[1].x)) / 2;
  var rate = s1 / (s1 + s2);
  var isExistCorss = 0 < rate && rate < 1;
  return isExistCorss ? vec(seg[0].x + (seg[1].x - seg[0].x) * rate, seg[0].y + (seg[1].y - seg[0].y) * rate) : null;
}
/**
 * 同一線分かを判定する
 * @param ab 線分ab
 * @param cd 線分cd
 * @return 同一であるフラグ
 */


function isSameSeg(ab, cd) {
  if (isSame(ab[0], cd[0]) && isSame(ab[1], cd[1])) return true;
  if (isSame(ab[0], cd[1]) && isSame(ab[1], cd[0])) return true;
  return false;
}
/**
 * ポリゴンを直線で分割する
 * @param pol 面
 * @param line 直線
 * @return 分割された点配列の配列
 */


function splitPolyByLine(pol, line) {
  var points = [];
  var crossIndex = [];
  var crossList = [];
  pol.forEach(function (p, i) {
    var targetLine = [p, pol[(i + 1) % pol.length]];
    var cross = getCrossSegAndLine(targetLine, line);
    points.push(p);

    if (cross) {
      points.push(cross);
      crossIndex.push(i + 1 + crossIndex.length);
      crossList.push(cross);
    }
  });
  if (crossIndex.length % 2 !== 0) return []; // 近い順に並べる -> 直線をx軸と重なるよう回転してx座標で比較

  var rad = getRadian(line[0], line[1]);
  crossList.sort(function (a, b) {
    return rotate(a, -rad).x - rotate(b, -rad).x;
  }); // 面の辺と同一ではないものを採用

  var targetSection = [];

  for (var k = 0; k < crossList.length - 1; k += 2) {
    var section = [crossList[k], crossList[k + 1]];
    var sameSeg = false;

    for (var l = 0; l < pol.length; l++) {
      if (isSameSeg(section, [pol[l], pol[(l + 1) % pol.length]])) {
        sameSeg = true;
        break;
      }
    }

    if (!sameSeg) {
      targetSection = section;
      break;
    }
  }

  if (targetSection.length !== 2) return []; // 除外対象回収

  var dropList = crossList.concat();
  var tmpIndex = dropList.indexOf(targetSection[0]);

  if (tmpIndex !== -1) {
    dropList.splice(tmpIndex, 1);
  }

  tmpIndex = dropList.indexOf(targetSection[1]);

  if (tmpIndex !== -1) {
    dropList.splice(tmpIndex, 1);
  }

  var tmpList = points.concat();
  dropList.forEach(function (p) {
    var i = tmpList.indexOf(p);
    tmpList.splice(i, 1);
  });
  points = tmpList;
  crossList = targetSection;
  var i0 = points.indexOf(crossList[0]);
  var i1 = points.indexOf(crossList[1]);
  if (i0 === -1 || i1 === -1) return [];
  crossIndex = [];
  crossIndex[0] = Math.min(i0, i1);
  crossIndex[1] = Math.max(i0, i1); // 分割ポリゴンを拾い集める

  var splitedPolygons = []; // 1つ目

  var splitPol = []; // 交点まで追加

  for (var i = 0; i <= crossIndex[0]; i++) {
    splitPol.push(vec(points[i].x, points[i].y));
  } // 交点から追加


  for (var _i2 = crossIndex[1]; _i2 < points.length; _i2++) {
    splitPol.push(vec(points[_i2].x, points[_i2].y));
  } // 確定


  splitedPolygons.push(splitPol); // 2つ目

  splitPol = []; // 交点から交点まで追加

  for (var _i3 = crossIndex[0]; _i3 <= crossIndex[1]; _i3++) {
    splitPol.push(vec(points[_i3].x, points[_i3].y));
  } // 確定


  splitedPolygons.push(splitPol); // 再帰的に分割

  var recursiveResult = [];
  splitedPolygons.forEach(function (polygon) {
    var splited = splitPolyByLine(polygon, line);

    if (splited.length === 0) {
      recursiveResult.push(polygon);
    } else {
      recursiveResult.push.apply(recursiveResult, _toConsumableArray(splited));
    }
  });
  return recursiveResult;
}
/**
 * 三角分割
 * @param polygon 面
 * @return 分割面リスト
 */


function triangleSplit(polygon) {
  // 時計周りに揃える
  polygon = convertLoopwise(polygon); // ポリゴン複製

  var targetPoly = omitSamePoint(polygon); // 最遠点のインデックス

  var farthestIndex = 0; // 現在の最遠点と前後点で作った三角形の外積

  var currentCross = 0; // 分割後の面リスト

  var triangleList = []; // ループ

  while (targetPoly.length >= 3) {
    // 最遠点インデックス取得
    var sorted = targetPoly.concat();
    sorted.sort(function (a, b) {
      return getNorm(b) - getNorm(a);
    });
    farthestIndex = targetPoly.indexOf(sorted[0]); // 分割実行

    var tri = getTriangle(targetPoly, farthestIndex);

    if (!tri) {
      // 最遠点では失敗
      var size = targetPoly.length; // 外積計算

      var pa = sub(targetPoly[(farthestIndex + 1) % size], targetPoly[farthestIndex]);
      var pb = sub(targetPoly[farthestIndex - 1 < 0 ? size - 1 : farthestIndex - 1], targetPoly[farthestIndex]);
      currentCross = getCross(pa, pb);
      var index = farthestIndex; // 最遠点以外で探す

      while (!tri) {
        index = (index + 1) % size; // 最遠点の外積と同じ符号かを判定

        var v1 = sub(targetPoly[(index + 1) % size], targetPoly[index]);
        var v2 = sub(targetPoly[index - 1 < 0 ? size - 1 : index - 1], targetPoly[index]);
        var tmpCross = getCross(v1, v2);

        if (tmpCross * currentCross > 0) {
          // 判定続行
          tri = getTriangle(targetPoly, index);
        }

        if (index === farthestIndex) {
          throw new Error('failed to split triangles');
        }
      } // 採用された点を削除


      targetPoly.splice(index, 1);
    } else {
      // 最遠点削除
      targetPoly.splice(farthestIndex, 1);
    }

    triangleList.push(tri);
  }

  return triangleList;
}
/**
 * 面から三角形を取得する
 * @param polygon 面
 * @param index このインデックスの点とその両側の点で三角形を作る
 * @return 三角形、内部に入り込む点がある場合はnull
 */


function getTriangle(polygon, index) {
  // indexとその前後点で三角形作成
  var size = polygon.length;
  var p0 = polygon[index];
  var p1 = polygon[(index + 1) % size];
  var p2 = polygon[index - 1 < 0 ? size - 1 : index - 1];
  var tri = [p0, p1, p2]; // 内部に点が入り込まないか判定

  var invalid = false;
  polygon.some(function (p) {
    if (p !== p0 && p !== p1 && p !== p2) {
      if (isPointOnTriangle(tri, p)) {
        // 失敗
        invalid = true;
      }
    }

    return invalid;
  });
  return invalid ? null : tri;
}
/**
 * 点が三角形内にあるかを判定する
 * 境界も含む
 * @param tri 三角形
 * @param p 点
 * @return 内部にあるフラグ
 */


function isPointOnTriangle(tri, p) {
  // 三角形の3つのベクトル
  var ab = sub(tri[1], tri[0]);
  var bc = sub(tri[2], tri[1]);
  var ca = sub(tri[0], tri[2]); // 三角形の各点からpへのベクトル

  var ap = sub(p, tri[0]);
  var bp = sub(p, tri[1]);
  var cp = sub(p, tri[2]); // 外積を求める

  var crossABP = getCross(ab, bp);
  var crossBCP = getCross(bc, cp);
  var crossCAP = getCross(ca, ap); // 外積の符号が全て同じなら内部にある
  // 0も含む→境界も含む

  if (crossABP >= 0 && crossBCP >= 0 && crossCAP >= 0 || crossABP <= 0 && crossBCP <= 0 && crossCAP <= 0) {
    return true;
  }

  return false;
}
/**
 * 面を時計回りに変換する
 * @param {vector[]} 面
 * @return 時計回りにした面(引数とは別配列にする)
 */


function convertLoopwise(polygon) {
  var ret = polygon.concat();

  if (getLoopwise(polygon) === -1) {
    ret.reverse();
  }

  return ret;
}
/**
 * 面の座標が時計回りかを判定する
 * @param polygon 面
 * @return -1:反時計 0:不定 1:時計
 */


function getLoopwise(polygon) {
  var area = getArea(polygon, true);
  if (area > 0) return 1;
  if (area < 0) return -1;
  return 0;
}
/**
 * 面積取得
 * @param polygon 面
 * @param allowNegative 負値を許すフラグ
 * @return 面積
 */


function getArea(polygon) {
  var allowNegative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (polygon.length < 3) return 0;
  var area = 0;
  var size = polygon.length;

  for (var i = 0; i < size - 1; i++) {
    area += (polygon[i].x - polygon[i + 1].x) * (polygon[i].y + polygon[i + 1].y);
  } // 最後分


  area += (polygon[size - 1].x - polygon[0].x) * (polygon[size - 1].y + polygon[0].y);
  area /= 2; // 負値を許さないなら絶対値

  if (!allowNegative) {
    area = Math.abs(area);
  }

  return area;
}
/**
 * ベジェ曲線を直線で近似する(３次まで対応)
 * @param pointList 制御点リスト
 * @param size 分割数(1なら制御点両端のみ)
 * @return 座標リスト
 */


function approximateBezier(pointList, size) {
  var ret = [];
  var unitT = 1 / size;

  if (pointList.length === 3) {
    // ２次ベジェの場合
    for (var i = 0; i <= size; i++) {
      ret.push(getPointOnBezier2(pointList, unitT * i));
    }
  } else if (pointList.length === 4) {
    // 3次ベジェの場合
    for (var _i4 = 0; _i4 <= size; _i4++) {
      ret.push(getPointOnBezier3(pointList, unitT * _i4));
    }
  } else {
    throw new Error('connot approximate');
  }

  return ret;
}
/**
 * get point with the rate on bezier2
 * @param pointList controller points
 * @param rate rate between start point and end point
 * @return calced point
 */


function getPointOnBezier2(pointList, rate) {
  var t = rate;
  var nt = 1 - t;
  var c0 = multi(pointList[0], nt * nt);
  var c1 = multi(pointList[1], 2 * t * nt);
  var c2 = multi(pointList[2], t * t);
  return vec(c0.x + c1.x + c2.x, c0.y + c1.y + c2.y);
}

function getBezier2LerpFn(pointList) {
  return function (t) {
    return getPointOnBezier2(pointList, t);
  };
}
/**
 * get point with the rate on bezier3
 * @param pointList controller points
 * @param rate rate between start point and end point
 * @return calced point
 */


function getPointOnBezier3(pointList, rate) {
  var t = rate;
  var nt = 1 - t;
  var c0 = multi(pointList[0], nt * nt * nt);
  var c1 = multi(pointList[1], 3 * t * nt * nt);
  var c2 = multi(pointList[2], 3 * t * t * nt);
  var c3 = multi(pointList[3], t * t * t);
  return vec(c0.x + c1.x + c2.x + c3.x, c0.y + c1.y + c2.y + c3.y);
}

function getBezier3LerpFn(pointList) {
  return function (t) {
    return getPointOnBezier3(pointList, t);
  };
}
/**
 * get point with the rate on bezier3
 * need these conditions to get unique value
 * p0.x <= p1.x <= p3.x
 * p0.x <= p2.x <= p3.x
 * or may cause unexpected NaN
 * @param pointList controller points [p0, p1, p2, p3]
 * @param rate rate between start point and end point
 * @return calced point
 */


function getYOnBezier3AtX(pointList, x) {
  var _pointList = _slicedToArray(pointList, 4),
      p0 = _pointList[0],
      p1 = _pointList[1],
      p2 = _pointList[2],
      p3 = _pointList[3];

  var a = -p0.x + 3 * p1.x - 3 * p2.x + p3.x;
  var b = 3 * p0.x - 6 * p1.x + 3 * p2.x;
  var c = -3 * p0.x + 3 * p1.x;
  var d = p0.x - x;
  var t = solveBezier3Fomula(a, b, c, d);
  var tt = t * t;
  var ttt = tt * t;
  var tm = 1 - t;
  var tmtm = tm * tm;
  var tmtmtm = tmtm * tm;
  return tmtmtm * p0.y + 3 * t * tmtm * p1.y + 3 * tt * tm * p2.y + ttt * p3.y;
}
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


function approximateArc(rx, ry, startRadian, endRadian, center, radian, size) {
  var ret = [];
  var range = endRadian - startRadian;
  var unitT = range / size;
  var rotateFn = getRotateFn(radian);

  for (var i = 0; i <= size; i++) {
    var t = unitT * i + startRadian - radian;
    ret.push(add(rotateFn(vec(rx * Math.cos(t), ry * Math.sin(t))), center));
  }

  return ret;
}
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
 */


function approximateArcWithPoint(rx, ry, startPoint, endPoint, largeArcFlag, sweepFlag, radian, size) {
  if (Math.abs(rx * ry) < MINVALUE) {
    return [startPoint, endPoint];
  }

  return getApproPoints(getArcLerpFn(rx, ry, startPoint, endPoint, largeArcFlag, sweepFlag, radian), size);
}

function getArcLerpFn(rx, ry, startPoint, endPoint, largeArcFlag, sweepFlag, radian) {
  if (Math.abs(rx * ry) < MINVALUE) {
    return function (t) {
      return lerpPoint(startPoint, endPoint, t);
    };
  }

  var r = radian;
  var rotateFn = getRotateFn(r);
  var p0 = startPoint;
  var p1 = endPoint;
  var a = rotateFn(vec((p0.x - p1.x) / 2, (p0.y - p1.y) / 2), true);
  var ax2 = a.x * a.x;
  var ay2 = a.y * a.y;
  var l = ax2 / rx / rx + ay2 / ry / ry;
  var lsqrt = l > 1 ? Math.sqrt(l) : 1;

  var _vec = vec(Math.abs(rx) * lsqrt, Math.abs(ry) * lsqrt),
      rxa = _vec.x,
      rya = _vec.y;

  var rx2 = rxa * rxa;
  var ry2 = rya * rya;
  var b = multi(multi(vec(rxa * a.y / rya, -rya * a.x / rxa), Math.sqrt(Math.max(0, rx2 * ry2 - rx2 * ay2 - ry2 * ax2) / (rx2 * ay2 + ry2 * ax2))), largeArcFlag === sweepFlag ? -1 : 1);
  var c = add(rotateFn(b), multi(add(p0, p1), 0.5));
  var u = vec((a.x - b.x) / rxa, (a.y - b.y) / rya);
  var v = vec((-a.x - b.x) / rxa, (-a.y - b.y) / rya);
  var theta = getRadian(u);
  var dtheta_tmp = (getRadian(v) - getRadian(u)) % (2 * Math.PI);
  var dtheta = !sweepFlag && 0 < dtheta_tmp ? dtheta_tmp - 2 * Math.PI : sweepFlag && dtheta_tmp < 0 ? dtheta_tmp + 2 * Math.PI : dtheta_tmp;
  return function (t) {
    if (t === 0) {
      return startPoint;
    } else if (t === 1) {
      return endPoint;
    } else {
      var dr = theta + dtheta * t;
      return add(rotateFn(vec(rxa * Math.cos(dr), rya * Math.sin(dr))), c);
    }
  };
}

function lerpPoint(a, b, t) {
  return add(a, multi(sub(b, a), t));
}

function getApproPoints(lerpFn, split) {
  if (split <= 1) {
    return [lerpFn(0), lerpFn(1)];
  }

  var points = [];
  var step = 1 / split;

  for (var i = 0; i <= split; i++) {
    points.push(lerpFn(step * i));
  }

  return points;
}
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


function getEllipseCenter(a, b, rx, ry, radian) {
  // 回転を打ち消す
  a = rotate(a, -radian);
  b = rotate(b, -radian); // 媒介変数を利用して円の中心問題にする

  var A = vec(a.x / rx, a.y / ry);
  var B = vec(b.x / rx, b.y / ry); // 円の中心取得

  var centerInfo = getCircleCenter(A, B, 1);
  var C = centerInfo.centers; // 楕円に戻す

  var ans1 = vec(C[0].x * rx, C[0].y * ry);
  var ans2 = vec(C[1].x * rx, C[1].y * ry); // 回転を戻す

  ans1 = rotate(ans1, radian);
  ans2 = rotate(ans2, radian);
  return {
    centers: [ans1, ans2],
    radiusRate: centerInfo.radiusRate
  };
}
/**
 * ２点を通る円の中心を求める
 * @param a 点a
 * @param b 点b
 * @param radius 半径
 * @return { centers: 解となる２点, radiusRate: 半径補正係数 }
 */


function getCircleCenter(a, b, radius) {
  var u1 = (a.x + b.x) / 2;
  var u2 = (a.x - b.x) / 2;
  var v1 = (a.y + b.y) / 2;
  var v2 = (a.y - b.y) / 2;
  var L = Math.sqrt(u2 * u2 + v2 * v2);
  var t2 = Math.pow(radius / L, 2) - 1; // 2点が直径以上に離れている => 2点を直径とみなす

  if (t2 < 0) {
    var center = getCenter(a, b);
    return {
      centers: [center, center],
      radiusRate: L / radius
    };
  }

  var t = Math.sqrt(t2);
  var ans1 = vec(u1 + v2 * t, v1 - u2 * t);
  var ans2 = vec(u1 - v2 * t, v1 + u2 * t);
  return {
    centers: [ans1, ans2],
    radiusRate: 1
  };
}
/**
 * 2次元アフィン変換を行う
 * paramsには以下の行列をa b c d e fの順で指定する
 * a c e
 * b d f
 * @param points 変換前の座標リスト
 * @param params 行列成分
 * @return 座標リスト
 */


function transform(points, params) {
  var a = params[0];
  var b = params[1];
  var c = params[2];
  var d = params[3];
  var e = params[4];
  var f = params[5];
  return points.map(function (p) {
    return vec(a * p.x + c * p.y + e, b * p.x + d * p.y + f);
  });
}
/**
 * invert affine transfomation matrix
 * a c e
 * b d f
 * @param params [a, b, c, d, e, f]
 * @return inverted matrix params
 */


function invertTransform(params) {
  var _params = _slicedToArray(params, 6),
      a = _params[0],
      b = _params[1],
      c = _params[2],
      d = _params[3],
      e = _params[4],
      f = _params[5];

  var t = a * d - b * c;
  return [d / t, -b / t, -c / t, a / t, (c * f - d * e) / t, -(a * f - b * e) / t];
}
/**
 * multi affine transfomation matrixes
 * @param a affine matrix
 * @param b affine matrix
 * @return a * b
 */


function multiAffine(a, b) {
  return [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]];
}
/**
 * multi affines
 * @param affines affine matrix list
 * @return affines[0] * affines[1] * ...
 */


function multiAffines(affines) {
  return affines.reduce(function (p, c) {
    return multiAffine(p, c);
  }, IDENTITY_AFFINE);
}
/**
 * apply affine
 * @param affine affine matrix
 * @param v vector2
 * @return affine x v
 */


function applyAffine(affine, v) {
  return vec(affine[0] * v.x + affine[2] * v.y + affine[4], affine[1] * v.x + affine[3] * v.y + affine[5]);
}
/**
 * 隣り合う同一点をオミットする
 * @method omitSamePoint
 * @param polygon ポリゴン
 * @return オミット後のポリゴン
 */


function omitSamePoint(polygon) {
  var ret = polygon.concat(); // サイズ

  var size = polygon.length; // 同一点探す

  for (var i = 0; i < size; i++) {
    var p1 = ret[i];
    var p2 = ret[(i + 1) % size];

    if (isSame(p1, p2)) {
      // 同一
      ret.splice(i, 1); // 再帰

      ret = omitSamePoint(ret);
      break;
    }
  }

  return ret;
}
/**
 * 正多角形の面積を内接円の半径から求める
 * @param radius 半径
 * @param n 角数
 * @return 面積
 */


function getRegularPolygonArea(radius, n) {
  var unitRad = Math.PI / n;
  var unitArea = Math.pow(radius, 2) * Math.sin(unitRad) * Math.cos(unitRad);
  return unitArea * n;
}
/**
 * 正多角形の面積から内接円の半径を求める
 * @param area 面積
 * @param n 角数
 * @return 半径
 */


function getRegularPolygonRadius(area, n) {
  var unitRad = Math.PI / n;
  var unitArea = area / n;
  return Math.sqrt(unitArea / Math.sin(unitRad) / Math.cos(unitRad));
}
/**
 * 包含関係にあるポリゴンをグループ化する
 * @param polygons ポリゴン一覧
 * @return グループ化したポリゴン一覧、グループ内は面積降順
 */


function getIncludedPolygonGroups(polygons) {
  var sorted = polygons.concat();
  sorted.sort(function (a, b) {
    return getArea(b) - getArea(a);
  });
  var hit = {};
  var ret = [];
  sorted.forEach(function (p, i) {
    if (hit[i]) return;
    hit[i] = true;
    var group = [p].concat(sorted.filter(function (c, j) {
      if (hit[j]) return false;
      var pointsOnPolygon = c.filter(function (point) {
        return isOnPolygon(point, p);
      });
      if (pointsOnPolygon.length !== c.length) return false;
      hit[j] = true;
      return true;
    }));
    ret.push(group);
  });
  return ret;
}
/**
 * ポリゴンブーリアン演算差
 * 突き抜けは非対応
 * targetは1辺のみでpolyと交差する前提
 * targetとpolyは観点方向が逆である前提
 * @param target ポリゴン
 * @param poly 切り取り範囲ポリゴン
 * @return 切り取った後のポリゴン
 */


function getPolygonNotPolygon(target, poly) {
  var ret = []; // targetの辺と交差するpolyの辺インデックスを探索

  var targetCrossIndex = -1;
  var polyCrossIndexList = [];
  var cross = [];

  for (var i = 0; i < target.length; i++) {
    var currentSeg = [target[i], target[(i + 1) % target.length]];

    for (var j = 0; j < poly.length; j++) {
      var seg = [poly[j], poly[(j + 1) % poly.length]];

      if (isCrossSegAndSeg(currentSeg, seg)) {
        var p = getCrossSegAndLine(currentSeg, seg);

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
  if (polyCrossIndexList.length % 2 !== 0) return target; // target辺の始点に最も近い交点を探す

  var distList = cross.map(function (p) {
    return getDistance(p, target[targetCrossIndex]);
  });
  var sortedDistList = distList.concat().sort(function (a, b) {
    return a - b;
  });
  var nearestCrossIndex = distList.indexOf(sortedDistList[0]);
  var nearestIndex = polyCrossIndexList[nearestCrossIndex]; // nearestIndexが始点となるようpolyを調整

  var adjustedPoly = poly.concat();

  for (var _j = 0; _j < nearestIndex; _j++) {
    adjustedPoly.push(adjustedPoly.shift());
  } // nearestIndexが先頭になるよう調整


  var adjustedPolyCrossIndexList = polyCrossIndexList.map(function (n) {
    return (n - nearestIndex + poly.length) % poly.length;
  });
  var adjustedCross = cross.concat();

  for (var k = 0; k < nearestCrossIndex; k++) {
    adjustedPolyCrossIndexList.push(adjustedPolyCrossIndexList.shift());
    adjustedCross.push(adjustedCross.shift());
  } // polyと交差する辺が始点と終点になるよう調整


  for (var _i5 = 0; _i5 < target.length; _i5++) {
    ret.push(target[(_i5 + targetCrossIndex + 1) % target.length]);
  } // 交点からpolyに突入


  for (var _i6 = 0; _i6 < adjustedPolyCrossIndexList.length / 2; _i6++) {
    var startIndex = adjustedPolyCrossIndexList[_i6 * 2];
    var endIndex = adjustedPolyCrossIndexList[_i6 * 2 + 1];
    ret.push(adjustedCross[_i6 * 2]);

    for (var _j2 = startIndex + 1; _j2 <= endIndex; _j2++) {
      ret.push(adjustedPoly[_j2]);
    }

    ret.push(adjustedCross[_i6 * 2 + 1]);
  }

  return ret;
}
/**
 * ポリゴン全てを包含する矩形を取得
 * @param polygons ポリゴン一覧
 * @return 外接矩形
 */


function getOuterRectangle(polygons) {
  if (polygons.length === 0) return {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
  var minX = Infinity;
  var minY = Infinity;
  var maxX = -Infinity;
  var maxY = -Infinity;

  for (var i = 0; i < polygons.length; i++) {
    var polygon = polygons[i];

    for (var j = 0; j < polygon.length; j++) {
      var v = polygon[j];
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
/**
 * 矩形範囲のグリッド取得
 * @param range 矩形範囲
 * @param gridSize グリッド幅
 * @param dX x軸のずらし幅
 * @param dY y軸のずらし幅
 * @return グリッド線リスト
 */


function getGrid(range, gridSize) {
  var dX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var dY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var gridList = [];
  var minX = range.x;
  var maxX = range.x + range.width;
  var minY = range.y;
  var maxY = range.y + range.height;
  var x = minX + dX;

  while (x < maxX) {
    if (minX < x && x < maxX) {
      gridList.push([vec(x, minY), vec(x, maxY)]);
    }

    x += gridSize;
  }

  var y = minY + dY;

  while (y < maxY) {
    if (minY < y && y < maxY) {
      gridList.push([vec(minX, y), vec(maxX, y)]);
    }

    y += gridSize;
  }

  return gridList;
}
/**
 * 矩形を中心基準でサイズ変更する
 * @param org 元の矩形
 * @param dW 幅変更差分
 * @param dH 高さ変更差分
 * @return サイズ変更後の矩形
 */


function expandRecntagle(org, dW, dH) {
  return {
    x: org.x - dW / 2,
    y: org.y - dH / 2,
    width: org.width + dW,
    height: org.height + dH
  };
}
/**
 * 矩形を中心基準の倍率でサイズ変更する
 * @param org 元の矩形
 * @param scaleW 幅変更倍率
 * @param scaleH 高さ軸変更倍率
 * @return サイズ変更後の矩形
 */


function expandRecntagleScale(org, scaleW, scaleH) {
  return expandRecntagle(org, org.width * (scaleW - 1), org.height * (scaleH - 1));
}
/**
 * interpolate scaler
 * @param from
 * @param to
 * @param rate 0 => from, 1 => to
 * @return interpolated value
 */


function interpolateScaler(from, to, rate) {
  return from * (1 - rate) + to * rate;
}
/**
 * interpolate scaler
 * @param from
 * @param to
 * @param rate 0 => from, 1 => to
 * @return interpolated value
 */


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
 */


function solveBezier3Fomula(a, b, c, d) {
  var list = solveQubicFomula(a, b, c, d);
  if (list.length === 0) return 0;
  var ret = getCloseInRangeValue(list, 0, 1);
  if (ret === undefined) throw new Error('Error: Cannot resolve uniquely in 0 <= t <= 1.');
  return Math.max(Math.min(ret, 1), 0);
}
/**
 * solve cubic equation in real space
 * @param a t^3 param
 * @param b t^2 param
 * @param c t param
 * @param d constant param
 * @return solutions in no particular order
 */


function solveQubicFomula(a, b, c, d) {
  if (isCloseToZero(a)) {
    return solveEquationOrder2(b, c, d);
  }

  var p = (3 * a * c - b * b) / (3 * a * a);
  var q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
  var Z = -b / (3 * a);

  if (isCloseToZero(p) && isCloseToZero(q)) {
    // triple real root
    return [Z];
  }

  var D = (27 * q * q + 4 * p * p * p) / 108;

  if (isCloseToZero(D)) {
    // one distinct root and double real root
    var Q = Math.sign(q) * Math.pow(Math.abs(q) / 2, 1 / 3);
    return [-2 * Q + Z, Q + Z];
  } else if (D > 0) {
    var sqrtD = Math.sqrt(D);
    var tmpA = -q / 2 + sqrtD;
    var tmpB = -q / 2 - sqrtD;
    var A = Math.sign(tmpA) * Math.pow(Math.abs(tmpA), 1 / 3);
    var B = Math.sign(tmpB) * Math.pow(Math.abs(tmpB), 1 / 3);
    return [A + B + Z];
  } else {
    // three distinct real roots
    var _A = -q / 2;

    var _B = Math.sqrt(-D);

    var r = Math.atan2(_B, _A);
    var C = 2 * Math.pow(_A * _A + _B * _B, 1 / 6);
    var D0 = Math.cos(r / 3);
    var D1 = Math.cos((r + 2 * Math.PI) / 3);
    var D2 = Math.cos((r + 4 * Math.PI) / 3);
    var T0 = C * D0 + Z;
    var T1 = C * D1 + Z;
    var T2 = C * D2 + Z;
    return [T0, T1, T2];
  }
}

function getCloseInRangeValue(values, min, max) {
  return values.find(function (val) {
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
/**
 * clamp number
 * @param min min value
 * @param max max value
 * @return clamped value
 */


function clamp() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -Infinity;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
  var val = arguments.length > 2 ? arguments[2] : undefined;
  return Math.max(Math.min(val, max), min);
}
/**
 * clamp number circularly
 * @param min min value
 * @param max max value
 * @return clamped value
 */


function circleClamp(min, max, val) {
  if (min === max) return min;

  if (max < val) {
    return (val - max) % (max - min) + min;
  } else if (val < min) {
    return max - (min - val) % (max - min);
  } else {
    return val;
  }
}
/**
 * round trip value
 * @param min min value
 * @param max max value
 * @return round tripped value
 */


function roundTrip(min, max, val) {
  var harf = max - min;
  var length = 2 * harf;
  if (length === 0) return min;
  var d = Math.abs(val - min) % length;

  if (d < harf) {
    return d + min;
  } else {
    return length - d + min;
  }
}
},{}],"tzhc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw = draw;
exports.fitRect = fitRect;
exports.parseSvgGraphicsStr = parseSvgGraphicsStr;
exports.parseSvgGraphics = parseSvgGraphics;
exports.openCommandToD = openCommandToD;
exports.parseOpenPath = parseOpenPath;
exports.parsePathSegmentRaws = parsePathSegmentRaws;
exports.pathSegmentRawsToString = pathSegmentRawsToString;
exports.pathSegmentRawToString = pathSegmentRawToString;
exports.parsePathSegments = parsePathSegments;
exports.getPathLengthStructs = getPathLengthStructs;
exports.getPathTotalLengthFromStructs = getPathTotalLengthFromStructs;
exports.getPathTotalLength = getPathTotalLength;
exports.getPathPointAtLengthFromStructs = getPathPointAtLengthFromStructs;
exports.getPathPointAtLength = getPathPointAtLength;
exports.reversePath = reversePath;
exports.slidePath = slidePath;
exports.scalePath = scalePath;
exports.rotatePath = rotatePath;
exports.parsePathD = parsePathD;
exports.parsePath = parsePath;
exports.parseRect = parseRect;
exports.parseEllipse = parseEllipse;
exports.parseCircle = parseCircle;
exports.adoptTransform = adoptTransform;
exports.splitD = splitD;
exports.serializeSvgString = serializeSvgString;
exports.serializeSvg = serializeSvg;
exports.serializePath = serializePath;
exports.serializePointList = serializePointList;
exports.createStyle = createStyle;
exports.parseTagStyle = parseTagStyle;
exports.serializeStyle = serializeStyle;
exports.splitPath = splitPath;
exports.getGroupedPathList = getGroupedPathList;
exports.affineToTransform = affineToTransform;
exports.parseTransform = parseTransform;
exports.parseTranslate = parseTranslate;
exports.parseTranslateX = parseTranslateX;
exports.parseTranslateY = parseTranslateY;
exports.parseSkewX = parseSkewX;
exports.parseSkewY = parseSkewY;
exports.parseScale = parseScale;
exports.parseScaleX = parseScaleX;
exports.parseScaleY = parseScaleY;
exports.parseRotate = parseRotate;
exports.parseMatrix = parseMatrix;
exports.configs = void 0;

var geo = _interopRequireWildcard(require("./geo"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var HTTP_SVG = 'http://www.w3.org/2000/svg'; // Unary plus operator seems faster than native parseFloat

var _parseFloat = function _parseFloat(v) {
  return +v;
};

var configs = {
  bezierSplitSize: 10,
  ellipseSplitSize: 20
};
/**
 * 描画
 * @param ctx 描画要素
 * @param pathInfo 図形情報
 */

exports.configs = configs;

function draw(ctx, pathInfo) {
  ctx.lineCap = pathInfo.style.lineCap;
  ctx.lineJoin = pathInfo.style.lineJoin;
  ctx.beginPath();
  pathInfo.d.forEach(function (p, i) {
    if (i === 0) {
      ctx.moveTo(p.x, p.y);
    } else {
      ctx.lineTo(p.x, p.y);
    }
  });
  ctx.closePath();

  if (pathInfo.included) {
    pathInfo.included.forEach(function (poly) {
      poly.forEach(function (p, i) {
        if (i === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
      });
      ctx.closePath();
    });
  }

  if (pathInfo.style.fill) {
    ctx.fillStyle = pathInfo.style.fillStyle;
    ctx.globalAlpha = pathInfo.style.fillGlobalAlpha;
    ctx.fill();
  } // 枠


  if (pathInfo.style.stroke) {
    ctx.strokeStyle = pathInfo.style.strokeStyle;
    ctx.globalAlpha = pathInfo.style.strokeGlobalAlpha;
    ctx.lineWidth = pathInfo.style.lineWidth;
    ctx.setLineDash(pathInfo.style.lineDash);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}
/**
 * 矩形に収まるよう調整
 * @param pathInfoList パス情報リスト
 * @param x 矩形x座標
 * @param y 矩形y座標
 * @param width 矩形width
 * @param height 矩形height
 * @return 調整後パス情報リスト
 */


function fitRect(pathInfoList, x, y, width, height) {
  var minX = Infinity;
  var maxX = -Infinity;
  var minY = Infinity;
  var maxY = -Infinity;
  pathInfoList.forEach(function (info) {
    info.d.forEach(function (p) {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    });
  }); // 原点基準に移動

  var fromBaseList = pathInfoList.map(function (info) {
    return Object.assign(Object.assign({}, info), {
      d: info.d.map(function (p) {
        return geo.vec(p.x - minX, p.y - minY);
      })
    });
  }); // 伸縮

  var orgWidth = maxX - minX;
  var orgHeight = maxY - minY;
  var rateX = width / orgWidth;
  var rateY = height / orgHeight;
  var rate = Math.min(rateX, rateY);
  var scaledList = fromBaseList.map(function (info) {
    return Object.assign(Object.assign({}, info), {
      d: info.d.map(function (p) {
        return geo.vec(p.x * rate, p.y * rate);
      })
    });
  }); // 矩形位置に移動

  var difX = x + (width - orgWidth * rate) / 2;
  var difY = y + (height - orgHeight * rate) / 2;
  var convertedList = scaledList.map(function (info) {
    return Object.assign(Object.assign({}, info), {
      d: info.d.map(function (p) {
        return geo.vec(p.x + difX, p.y + difY);
      }),
      included: (info.included || []).map(function (poly) {
        return poly.map(function (p) {
          return geo.vec((p.x - minX) * rate + difX, (p.y - minY) * rate + difY);
        });
      })
    });
  });
  return convertedList;
}
/**
 * SVG文字列から図形のパス情報を取得する
 * 対応タグ: path,rect,ellipse,circle
 * @param svgString SVGリソース文字列
 * @return パス情報リスト
 */


function parseSvgGraphicsStr(svgString) {
  var domParser = new DOMParser();
  var svgDom = domParser.parseFromString(svgString, 'image/svg+xml');
  var svgTags = svgDom.getElementsByTagName('svg');
  if (!svgTags || svgTags.length === 0) return [];
  return parseSvgGraphics(svgTags[0]);
}
/**
 * parse SVG tree
 * @param elm SVGElement
 * @return path informations
 */


function parseSvgTree(elm, parentInfo) {
  var _a, _b;

  var style = Object.assign(Object.assign({}, (_a = parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.style) !== null && _a !== void 0 ? _a : {}), parseTagStyle(elm));
  var transformStr = elm.getAttribute('transform');
  var parentTransform = (_b = parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.transform) !== null && _b !== void 0 ? _b : geo.IDENTITY_AFFINE;
  var ret = [];
  var svgPath = parseSVGShape(elm);

  if (svgPath) {
    ret.push(Object.assign(Object.assign({}, svgPath), {
      d: svgPath.d.map(function (v) {
        return geo.applyAffine(parentTransform, v);
      })
    }));
  }

  if (elm.children.length > 0) {
    var transform = transformStr ? geo.multiAffine(parentTransform, parseTransform(transformStr)) : parentTransform;
    Array.from(elm.children).forEach(function (child) {
      ret = ret.concat(parseSvgTree(child, {
        style: style,
        transform: transform
      }));
    });
  }

  return ret;
}

function parseSVGShape(elm) {
  switch (elm.tagName.toLowerCase()) {
    case 'path':
      return {
        d: parsePath(elm),
        style: parseTagStyle(elm)
      };

    case 'rect':
      return {
        d: parseRect(elm),
        style: parseTagStyle(elm)
      };

    case 'ellipse':
      return {
        d: parseEllipse(elm),
        style: parseTagStyle(elm)
      };

    case 'circle':
      return {
        d: parseCircle(elm),
        style: parseTagStyle(elm)
      };

    default:
      return undefined;
  }
}
/**
 * SVGタグから図形のパス情報を取得する
 * 対応タグ: path,rect,ellipse,circle
 * @param svgTag SVGタグ
 * @return パス情報リスト
 */


function parseSvgGraphics(svgTag) {
  return parseSvgTree(svgTag);
}
/**
 * opentype.jsのpath.commandをd文字列に変換する
 * @param fontPath opentype.jsのpath.command
 * @return d文字列
 */


function openCommandToD(command) {
  var d = command.type;
  if ('x1' in command) d += " ".concat(command.x1);
  if ('y1' in command) d += " ".concat(command.y1);
  if ('x2' in command) d += " ".concat(command.x2);
  if ('y2' in command) d += " ".concat(command.y2);
  if ('x3' in command) d += " ".concat(command.x3);
  if ('y3' in command) d += " ".concat(command.y3);
  if ('x' in command) d += " ".concat(command.x);
  if ('y' in command) d += " ".concat(command.y);
  return d;
}
/**
 * opentype.jsのpathを解析する
 * @param fontPath opentype.jsのpath
 * @return パス情報リスト
 */


function parseOpenPath(fontPath) {
  var pathInfoList = [];
  var current = '';
  fontPath.commands.forEach(function (c) {
    current += openCommandToD(c) + ' ';

    if (current && c.type.toUpperCase() === 'Z') {
      var pathList = parsePathD(current);
      pathInfoList.push({
        d: pathList,
        style: Object.assign(Object.assign({}, createStyle()), {
          fill: true,
          fillStyle: 'black',
          stroke: false
        })
      });
      current = '';
    }
  });
  return pathInfoList;
}

function parsePathSegmentRaw(segment) {
  if (segment.length === 8) {
    return [segment[0], _parseFloat(segment[1]), _parseFloat(segment[2]), _parseFloat(segment[3]), segment[4] !== '0', segment[5] !== '0', _parseFloat(segment[6]), _parseFloat(segment[7])];
  } else {
    var _segment = _toArray(segment),
        c = _segment[0],
        values = _segment.slice(1);

    return [c].concat(_toConsumableArray(values.map(_parseFloat)));
  }
}

function parsePathSegmentRaws(dStr) {
  return splitD(dStr).map(function (c) {
    return parsePathSegmentRaw(c);
  });
}

function pathSegmentRawsToString(segs) {
  return segs.map(pathSegmentRawToString).join(' ');
}

function pathSegmentRawToString(seg) {
  return seg.map(function (v) {
    if (v === true) {
      return '1';
    } else if (v === false) {
      return '0';
    } else {
      return v.toString();
    }
  }).join(' ');
}

function parsePathSegments(dStr) {
  return _parsePathSegments(parsePathSegmentRaws(dStr));
}

function _parsePathSegments(segments) {
  var ret = [];
  var startP = geo.vec(0, 0);
  var currentP = startP;
  var currentControlP = startP;
  var currentBezier = 1;
  segments.forEach(function (current) {
    switch (current[0]) {
      case 'M':
        {
          var p1 = geo.vec(current[1], current[2]);
          ret.push({
            command: 'M',
            segment: [p1, p1]
          });
          startP = p1;
          currentControlP = p1;
          currentBezier = 1;
          currentP = p1;
          break;
        }

      case 'm':
        {
          var _p = geo.vec(current[1], current[2]);

          ret.push({
            command: 'm',
            segment: [_p, _p]
          });
          startP = _p;
          currentP = _p;
          currentControlP = _p;
          currentBezier = 1;
          break;
        }

      case 'L':
        {
          var p0 = currentP;

          var _p2 = geo.vec(current[1], current[2]);

          ret.push({
            command: 'L',
            segment: [p0, _p2]
          });
          startP !== null && startP !== void 0 ? startP : startP = _p2;
          currentControlP = _p2;
          currentBezier = 1;
          currentP = _p2;
          break;
        }

      case 'l':
        {
          var _p3 = currentP;

          var _p4 = geo.add(currentP, geo.vec(current[1], current[2]));

          ret.push({
            command: 'l',
            segment: [_p3, _p4]
          });
          startP !== null && startP !== void 0 ? startP : startP = _p4;
          currentControlP = _p4;
          currentBezier = 1;
          currentP = _p4;
          break;
        }

      case 'H':
        {
          var _p5 = currentP;

          var _p6 = geo.vec(current[1], _p5.y);

          ret.push({
            command: 'H',
            segment: [_p5, _p6]
          });
          currentControlP = _p6;
          currentBezier = 1;
          currentP = _p6;
          break;
        }

      case 'h':
        {
          var _p7 = currentP;

          var _p8 = geo.vec(current[1] + _p7.x, _p7.y);

          ret.push({
            command: 'h',
            segment: [_p7, _p8]
          });
          currentControlP = _p8;
          currentBezier = 1;
          currentP = _p8;
          break;
        }

      case 'V':
        {
          var _p9 = currentP;

          var _p10 = geo.vec(_p9.x, current[1]);

          ret.push({
            command: 'V',
            segment: [_p9, _p10]
          });
          currentControlP = _p10;
          currentBezier = 1;
          currentP = _p10;
          break;
        }

      case 'v':
        {
          var _p11 = currentP;

          var _p12 = geo.vec(_p11.x, current[1] + _p11.y);

          ret.push({
            command: 'v',
            segment: [_p11, _p12]
          });
          currentControlP = _p12;
          currentBezier = 1;
          currentP = _p12;
          break;
        }

      case 'Q':
        {
          var _p13 = currentP;

          var _p14 = geo.vec(current[1], current[2]);

          var p2 = geo.vec(current[3], current[4]);
          ret.push({
            command: 'Q',
            lerpFn: geo.getBezier2LerpFn([_p13, _p14, p2]),
            curve: true
          });
          currentControlP = _p14;
          currentBezier = 2;
          currentP = p2;
          break;
        }

      case 'q':
        {
          var _p15 = currentP;

          var _p16 = geo.add(_p15, geo.vec(current[1], current[2]));

          var _p17 = geo.add(_p15, geo.vec(current[3], current[4]));

          ret.push({
            command: 'q',
            lerpFn: geo.getBezier2LerpFn([_p15, _p16, _p17]),
            curve: true
          });
          currentControlP = _p16;
          currentBezier = 2;
          currentP = _p17;
          break;
        }

      case 'T':
        {
          var _p18 = currentP;

          var _p19 = currentBezier === 2 ? geo.getSymmetry(currentControlP, _p18) : _p18;

          var _p20 = geo.vec(current[1], current[2]);

          ret.push({
            command: 'T',
            lerpFn: geo.getBezier2LerpFn([_p18, _p19, _p20]),
            curve: true
          });
          currentControlP = _p19;
          currentBezier = 2;
          currentP = _p20;
          break;
        }

      case 't':
        {
          var _p21 = currentP;

          var _p22 = currentBezier === 2 ? geo.getSymmetry(currentControlP, _p21) : _p21;

          var _p23 = geo.add(_p21, geo.vec(current[1], current[2]));

          ret.push({
            command: 't',
            lerpFn: geo.getBezier2LerpFn([_p21, _p22, _p23]),
            curve: true
          });
          currentControlP = _p22;
          currentBezier = 2;
          currentP = _p23;
          break;
        }

      case 'C':
        {
          var _p24 = currentP;

          var _p25 = geo.vec(current[1], current[2]);

          var _p26 = geo.vec(current[3], current[4]);

          var p3 = geo.vec(current[5], current[6]);
          ret.push({
            command: 'C',
            lerpFn: geo.getBezier3LerpFn([_p24, _p25, _p26, p3]),
            curve: true
          });
          currentControlP = _p26;
          currentBezier = 3;
          currentP = p3;
          break;
        }

      case 'c':
        {
          var _p27 = currentP;

          var _p28 = geo.add(_p27, geo.vec(current[1], current[2]));

          var _p29 = geo.add(_p27, geo.vec(current[3], current[4]));

          var _p30 = geo.add(_p27, geo.vec(current[5], current[6]));

          ret.push({
            command: 'c',
            lerpFn: geo.getBezier3LerpFn([_p27, _p28, _p29, _p30]),
            curve: true
          });
          currentControlP = _p29;
          currentBezier = 3;
          currentP = _p30;
          break;
        }

      case 'S':
        {
          var _p31 = currentP;

          var _p32 = currentBezier === 3 ? geo.getSymmetry(currentControlP, _p31) : _p31;

          var _p33 = geo.vec(current[1], current[2]);

          var _p34 = geo.vec(current[3], current[4]);

          ret.push({
            command: 'S',
            lerpFn: geo.getBezier3LerpFn([_p31, _p32, _p33, _p34]),
            curve: true
          });
          currentControlP = _p33;
          currentBezier = 3;
          currentP = _p34;
          break;
        }

      case 's':
        {
          var _p35 = currentP;

          var _p36 = currentBezier === 3 ? geo.getSymmetry(currentControlP, _p35) : _p35;

          var _p37 = geo.add(_p35, geo.vec(current[1], current[2]));

          var _p38 = geo.add(_p35, geo.vec(current[3], current[4]));

          ret.push({
            command: 's',
            lerpFn: geo.getBezier3LerpFn([_p35, _p36, _p37, _p38]),
            curve: true
          });
          currentControlP = _p37;
          currentBezier = 3;
          currentP = _p38;
          break;
        }

      case 'A':
        {
          var _p39 = currentP;
          var rx = current[1];
          var ry = current[2];
          var large = current[4];
          var sweep = current[5];
          var radian = current[3] / 180 * Math.PI;

          var _p40 = geo.vec(current[6], current[7]);

          ret.push({
            command: 'A',
            lerpFn: geo.getArcLerpFn(rx, ry, _p39, _p40, large, sweep, radian),
            curve: true
          });
          currentControlP = _p40;
          currentBezier = 1;
          currentP = _p40;
          break;
        }

      case 'a':
        {
          var _p41 = currentP;
          var _rx = current[1];
          var _ry = current[2];
          var _large = current[4];
          var _sweep = current[5];

          var _radian = current[3] / 180 * Math.PI;

          var _p42 = geo.add(_p41, geo.vec(current[6], current[7]));

          ret.push({
            command: 'a',
            lerpFn: geo.getArcLerpFn(_rx, _ry, _p41, _p42, _large, _sweep, _radian),
            curve: true
          });
          currentControlP = _p42;
          currentBezier = 1;
          currentP = _p42;
          break;
        }

      case 'Z':
      case 'z':
        {
          var _p43 = currentP;
          var _p44 = startP;
          ret.push({
            command: current[0],
            segment: [_p43, _p44]
          });
          currentControlP = _p44;
          currentBezier = 1;
          currentP = _p44;
          break;
        }
    }
  });
  return ret;
}

function getPathLengthStructs(dStr) {
  var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : configs.bezierSplitSize;
  return parsePathSegments(dStr).map(function (seg) {
    return {
      lerpFn: seg.curve ? seg.lerpFn : function (t) {
        return geo.lerpPoint(seg.segment[0], seg.segment[1], t);
      },
      length: geo.getPolylineLength(seg.curve ? geo.getApproPoints(seg.lerpFn, split) : seg.segment)
    };
  });
}
/**
 * Execute "getPathTotalLength" with cacheable structs generated by "getPathLengthStructs"
 */


function getPathTotalLengthFromStructs(structs) {
  return structs.reduce(function (p, s) {
    return p + s.length;
  }, 0);
}
/**
 * Alternative function of "SVGGeometryElement.getTotalLength"
 * @param dStr d string of path element
 * @param split the number of segments to approximate a curve
 * @return total length of the path
 */


function getPathTotalLength(dStr) {
  var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : configs.bezierSplitSize;
  return getPathTotalLengthFromStructs(getPathLengthStructs(dStr, split));
}
/**
 * Execute "getPathPointAtLength" with cacheable structs generated by "getPathLengthStructs"
 */


function getPathPointAtLengthFromStructs(structs, distance) {
  var l = Math.max(distance, 0);

  for (var i = 0; i < structs.length; i++) {
    var s = structs[i];

    if (l < s.length) {
      return s.lerpFn(l / s.length);
    } else {
      l -= s.length;
    }
  }

  return structs.length > 0 ? structs[structs.length - 1].lerpFn(1) : geo.vec(0, 0);
}
/**
 * Alternative function of "SVGGeometryElement.getPointAtLength"
 * @param dStr d string of path element
 * @param distance target length
 * @param split the number of segments to approximate a curve
 * @return the point at the target length
 */


function getPathPointAtLength(dStr, distance) {
  var split = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : configs.bezierSplitSize;
  return getPathPointAtLengthFromStructs(getPathLengthStructs(dStr, split), distance);
}

function getPathAbsPoints(segments) {
  var points = [];
  var controls = [];
  var seg;
  var startP = geo.vec(0, 0);
  var absP = startP;
  var preC = startP;
  var preCType = 1;

  for (var i = 0; i < segments.length; i++) {
    seg = segments[i];

    switch (seg[0]) {
      case 'M':
        {
          var p = geo.vec(seg[1], seg[2]);
          startP = absP = preC = p;
          preCType = 1;
          break;
        }

      case 'm':
        {
          var _p45 = geo.add(geo.vec(seg[1], seg[2]), absP);

          startP = absP = preC = _p45;
          preCType = 1;
          break;
        }

      case 'L':
        {
          var _p46 = geo.vec(seg[1], seg[2]);

          startP !== null && startP !== void 0 ? startP : startP = _p46;
          absP = preC = _p46;
          preCType = 1;
          break;
        }

      case 'l':
        {
          var _p47 = geo.add(geo.vec(seg[1], seg[2]), absP);

          startP !== null && startP !== void 0 ? startP : startP = _p47;
          absP = preC = _p47;
          preCType = 1;
          break;
        }

      case 'H':
        {
          var _p48 = geo.vec(seg[1], absP.y);

          absP = preC = _p48;
          preCType = 1;
          break;
        }

      case 'h':
        {
          var _p49 = geo.vec(seg[1] + absP.x, absP.y);

          absP = preC = _p49;
          preCType = 1;
          break;
        }

      case 'V':
        {
          var _p50 = geo.vec(absP.x, seg[1]);

          absP = preC = _p50;
          preCType = 1;
          break;
        }

      case 'v':
        {
          var _p51 = geo.vec(absP.x, seg[1] + absP.y);

          absP = preC = _p51;
          preCType = 1;
          break;
        }

      case 'Q':
        {
          var _p52 = geo.vec(seg[1], seg[2]);

          preC = _p52;
          absP = geo.vec(seg[3], seg[4]);
          preCType = 2;
          break;
        }

      case 'q':
        {
          var _p53 = geo.vec(seg[1] + absP.x, seg[2] + absP.y);

          preC = _p53;
          absP = geo.vec(seg[3] + absP.x, seg[4] + absP.y);
          preCType = 2;
          break;
        }

      case 'T':
        {
          var _p54 = preCType === 2 ? geo.lerpPoint(preC, absP, 2) : absP;

          preC = _p54;
          absP = geo.vec(seg[1], seg[2]);
          preCType = 2;
          break;
        }

      case 't':
        {
          var _p55 = preCType === 2 ? geo.lerpPoint(preC, absP, 2) : absP;

          preC = _p55;
          absP = geo.vec(seg[1] + absP.x, seg[2] + absP.y);
          preCType = 2;
          break;
        }

      case 'C':
        {
          var _p56 = geo.vec(seg[3], seg[4]);

          preC = _p56;
          absP = geo.vec(seg[5], seg[6]);
          preCType = 3;
          break;
        }

      case 'c':
        {
          var _p57 = geo.vec(seg[3] + absP.x, seg[4] + absP.y);

          preC = _p57;
          absP = geo.vec(seg[5] + absP.x, seg[6] + absP.y);
          preCType = 3;
          break;
        }

      case 'S':
        {
          var _p58 = preCType === 3 ? geo.lerpPoint(preC, absP, 2) : absP;

          preC = _p58;
          absP = geo.vec(seg[3], seg[4]);
          preCType = 3;
          break;
        }

      case 's':
        {
          var _p59 = preCType === 3 ? geo.lerpPoint(preC, absP, 2) : absP;

          preC = _p59;
          absP = geo.vec(seg[3] + absP.x, seg[4] + absP.y);
          preCType = 3;
          break;
        }

      case 'A':
        {
          var _p60 = geo.vec(seg[6], seg[7]);

          absP = preC = _p60;
          preCType = 1;
          break;
        }

      case 'a':
        {
          var _p61 = geo.vec(seg[6] + absP.x, seg[7] + absP.y);

          absP = preC = _p61;
          preCType = 1;
          break;
        }

      case 'Z':
      case 'z':
        {
          absP = preC = startP;
          preCType = 1;
          break;
        }

      default:
        throw getUnknownError();
    }

    controls.push(preC);
    points.push(absP);
  }

  return {
    points: points,
    controls: controls
  };
}

function isCurveCommand(c) {
  return /Q|q|T|t|C|c|S|s|A|a/.test(c);
}
/**
 * The first segment has to be either "M", "m", "L" or "l".
 *
 * The last segment will be converted to normalized value.
 * e.g. [m, l, v, z] => [M, v, l, z]
 *
 * "T", "t", "S" or "s" will be converted to "Q", "q", "C" or "c"
 */


function reversePath(segments) {
  if (segments.length < 2) return segments;
  var ret = [];

  var _getPathAbsPoints = getPathAbsPoints(segments),
      absPoints = _getPathAbsPoints.points,
      absContolPoints = _getPathAbsPoints.controls;

  var length = segments.length;
  var current;
  var absP;
  var closeCount = false;

  for (var i = length - 1; 0 <= i; i--) {
    current = segments[i];
    absP = absPoints[i === 0 ? length - 1 : i - 1];

    switch (current[0]) {
      case 'M':
        if (closeCount) {
          if (isCurveCommand(ret[ret.length - 1][0])) {
            ret.push(['Z']);
          } else {
            ret[ret.length - 1] = ['Z'];
          }

          closeCount = false;
        }

        ret.push([current[0], absP.x, absP.y]);
        break;

      case 'm':
        if (closeCount) {
          if (isCurveCommand(ret[ret.length - 1][0])) {
            ret.push(['z']);
          } else {
            ret[ret.length - 1] = ['z'];
          }

          closeCount = false;
        }

        if (i === 0) {
          ret.push(['M', absP.x, absP.y]);
        } else {
          ret.push([current[0], -current[1], -current[2]]);
        }

        break;

      case 'L':
        if (closeCount && i === 0) {
          if (isCurveCommand(ret[ret.length - 1][0])) {
            ret.push(['Z']);
          } else {
            ret[ret.length - 1] = ['Z'];
          }

          closeCount = false;
        }

        ret.push([current[0], absP.x, absP.y]);
        break;

      case 'l':
        if (closeCount && i === 0) {
          if (isCurveCommand(ret[ret.length - 1][0])) {
            ret.push(['z']);
          } else {
            ret[ret.length - 1] = ['z'];
          }

          closeCount = false;
        }

        if (i === 0) {
          ret.push(['L', absP.x, absP.y]);
        } else {
          ret.push([current[0], -current[1], -current[2]]);
        }

        break;

      case 'H':
        ret.push([current[0], absP.x]);
        break;

      case 'h':
        ret.push([current[0], -current[1]]);
        break;

      case 'V':
        ret.push([current[0], absP.y]);
        break;

      case 'v':
        ret.push([current[0], -current[1]]);
        break;

      case 'Q':
        {
          ret.push([current[0], current[1], current[2], absP.x, absP.y]);
          break;
        }

      case 'q':
        {
          ret.push([current[0], current[1] - current[3], current[2] - current[4], -current[3], -current[4]]);
          break;
        }

      case 'T':
        {
          var c = absContolPoints[i];
          ret.push(['Q', c.x, c.y, absP.x, absP.y]);
          break;
        }

      case 't':
        {
          var b = absPoints[i];
          var _c = absContolPoints[i];
          ret.push(['q', _c.x - b.x, _c.y - b.y, -current[1], -current[2]]);
          break;
        }

      case 'C':
        {
          ret.push([current[0], current[3], current[4], current[1], current[2], absP.x, absP.y]);
          break;
        }

      case 'c':
        {
          ret.push([current[0], current[3] - current[5], current[4] - current[6], current[1] - current[5], current[2] - current[6], -current[5], -current[6]]);
          break;
        }

      case 'S':
        {
          var _c2 = absContolPoints[i];
          ret.push(['C', current[1], current[2], _c2.x, _c2.y, absP.x, absP.y]);
          break;
        }

      case 's':
        {
          var _b2 = absPoints[i];
          var _c3 = absContolPoints[i];
          ret.push(['c', current[1] - current[3], current[2] - current[4], _c3.x - _b2.x, _c3.y - _b2.y, -current[3], -current[4]]);
          break;
        }

      case 'A':
        {
          ret.push([current[0], current[1], current[2], current[3], current[4], !current[5], absP.x, absP.y]);
          break;
        }

      case 'a':
        {
          ret.push([current[0], current[1], current[2], current[3], current[4], !current[5], -current[6], -current[7]]);
          break;
        }

      case 'Z':
        closeCount = true;
        ret.push(['L', absP.x, absP.y]);
        break;

      case 'z':
        {
          closeCount = true;
          var absPP = absPoints[i];
          ret.push(['l', absP.x - absPP.x, absP.y - absPP.y]);
          break;
        }
    }
  }

  ret.unshift(ret.pop());
  return ret;
}
/**
 * Slide segments.
 * Relative segments will not be slided by this function.
 */


function slidePath(segments, diff) {
  return segments.map(function (current) {
    var slided = _toConsumableArray(current);

    switch (slided[0]) {
      case 'H':
        slided[1] += diff.x;
        break;

      case 'V':
        slided[1] += diff.y;
        break;

      case 'A':
        slided[6] += diff.x;
        slided[7] += diff.y;
        break;

      default:
        if (slided[0] === slided[0].toUpperCase()) {
          for (var i = 1; i < slided.length - 1; i += 2) {
            ;
            slided[i] += diff.x;
            slided[i + 1] += diff.y;
          }
        }

        break;
    }

    return slided;
  });
}
/**
 * Scale segments.
 * Both abstract and relative segments will be scaled by this function.
 */


function scalePath(segments, scale) {
  return segments.map(function (current) {
    var slided = _toConsumableArray(current);

    switch (slided[0]) {
      case 'H':
      case 'h':
        slided[1] *= scale.x;
        break;

      case 'V':
      case 'v':
        slided[1] *= scale.y;
        break;

      case 'A':
      case 'a':
        slided[1] *= Math.abs(scale.x);
        slided[2] *= Math.abs(scale.y);

        if (scale.x * scale.y < 0) {
          slided[5] = !slided[5];
        }

        slided[6] *= scale.x;
        slided[7] *= scale.y;
        break;

      default:
        for (var i = 1; i < slided.length - 1; i += 2) {
          ;
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
  var absVHExisted = segments.some(function (s) {
    return /H|V/.test(s[0]);
  });

  var _getPathAbsPoints2 = getPathAbsPoints(absVHExisted ? segments : []),
      points = _getPathAbsPoints2.points;

  return segments.map(function (s, i) {
    switch (s[0]) {
      case 'H':
        return ['L', s[1], points[i].y];

      case 'h':
        return ['l', s[1], 0];

      case 'V':
        return ['L', points[i].x, s[1]];

      case 'v':
        return ['l', 0, s[1]];

      default:
        return s;
    }
  });
}
/**
 * Rotate segments.
 * Both abstract and relative segments will be rotated by this function.
 * "H", "h", "V" and "v" will be converted to "L" or "l"
 */


function rotatePath(segments, radian) {
  var sin = Math.sin(radian);
  var cos = Math.cos(radian);
  return convertHVToL(segments).map(function (current) {
    var slided = _toConsumableArray(current);

    switch (slided[0]) {
      case 'A':
      case 'a':
        {
          slided[3] += radian * 180 / Math.PI;
          var x = slided[6];
          var y = slided[7];
          slided[6] = cos * x - sin * y;
          slided[7] = sin * x + cos * y;
          break;
        }

      default:
        for (var i = 1; i < slided.length - 1; i += 2) {
          var _x = slided[i];
          var _y = slided[i + 1];
          slided[i] = cos * _x - sin * _y;
          slided[i + 1] = sin * _x + cos * _y;
        }

        break;
    }

    return slided;
  });
}
/**
 * Parse path d string and approximate it as a polyline
 * Note:
 * - Jump information by M/m commands doesn't remain in a polyline
 * - Z/z commands are ignored => The tail point doesn't become the same as the head one by these commands
 * @param dStr d string of path element
 * @return approximated polyline
 */


function parsePathD(dStr) {
  var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : configs.bezierSplitSize;

  var _split = Math.max(1, split);

  var ret = [];
  var step = 1 / _split;
  parsePathSegments(dStr).forEach(function (seg) {
    if (seg.command === 'Z' || seg.command === 'z') return;

    if (seg.curve) {
      for (var i = 1; i <= _split; i++) {
        ret.push(seg.lerpFn(step * i));
      }
    } else {
      ret.push(seg.segment[1]);
    }
  });
  return ret;
}
/**
 * pathタグを解析する
 * @param svgPath SVGのpathタグDOM
 * @return 座標リスト
 */


function parsePath(svgPath) {
  var dStr = svgPath.getAttribute('d');
  return dStr ? adoptTransform(svgPath.getAttribute('transform'), parsePathD(dStr)) : [];
}
/**
 * rectタグを解析する
 * @param SVGのrectタグDOM
 * @return 座標リスト
 */


function parseRect(svgRect) {
  var x = _parseFloat(svgRect.getAttribute('x') || '0');

  var y = _parseFloat(svgRect.getAttribute('y') || '0');

  var width = _parseFloat(svgRect.getAttribute('width') || '0');

  var height = _parseFloat(svgRect.getAttribute('height') || '0'); // トランスフォーム


  return adoptTransform(svgRect.getAttribute('transform'), [geo.vec(x, y), geo.vec(x + width, y), geo.vec(x + width, y + height), geo.vec(x, y + height)]);
}
/**
 * ellipseタグを解析する
 * @param svgEllipse SVGのellipseタグDOM
 * @return 座標リスト
 */


function parseEllipse(svgEllipse) {
  var cx = _parseFloat(svgEllipse.getAttribute('cx') || '0');

  var cy = _parseFloat(svgEllipse.getAttribute('cy') || '0');

  var rx = _parseFloat(svgEllipse.getAttribute('rx') || '1');

  var ry = _parseFloat(svgEllipse.getAttribute('ry') || '1'); // トランスフォーム


  return adoptTransform(svgEllipse.getAttribute('transform'), geo.approximateArc(rx, ry, 0, Math.PI * 2, geo.vec(cx, cy), 0, configs.ellipseSplitSize));
}
/**
 * circleタグを解析する
 * @param svgCircle  SVGのcircleタグDOM
 * @return 座標リスト
 */


function parseCircle(svgCircle) {
  var cx = _parseFloat(svgCircle.getAttribute('cx') || '0');

  var cy = _parseFloat(svgCircle.getAttribute('cy') || '0');

  var r = _parseFloat(svgCircle.getAttribute('r') || '1'); // トランスフォーム


  return adoptTransform(svgCircle.getAttribute('transform'), geo.approximateArc(r, r, 0, Math.PI * 2, geo.vec(cx, cy), 0, configs.ellipseSplitSize));
}
/**
 * transformを行う
 * @param commandStr コマンド文字列
 * @param points 変換前座標リスト
 * @return 変形後座標リスト
 */


function adoptTransform(commandStr, points) {
  if (!commandStr) return points;
  var ret = geo.cloneVectors(points); // 複数コマンドの場合もあるのでループ

  var commandList = commandStr.split(/\)/);
  commandList.forEach(function (current) {
    var tmp = current.split(/\(/);

    if (tmp.length === 2) {
      var command = tmp[0].trim().toLowerCase();
      var params = parseNumbers(tmp[1]);

      switch (command) {
        case 'matrix':
          {
            ret = geo.transform(ret, params);
            break;
          }

        case 'translate':
          {
            ret = ret.map(function (p) {
              return geo.vec(p.x + params[0], p.y + params[1]);
            });
            break;
          }

        case 'scale':
          {
            var scaleX = params[0]; // XY等倍の場合を考慮

            var scaleY = params[0];

            if (params.length > 1) {
              scaleY = params[1];
            }

            ret = ret.map(function (p) {
              return geo.vec(p.x * scaleX, p.y * scaleY);
            });
            break;
          }

        case 'rotate':
          {
            // 回転基準点
            var base = geo.vec(0, 0);

            if (params.length > 2) {
              base = geo.vec(params[1], params[2]);
            }

            ret = ret.map(function (p) {
              return geo.rotate(p, params[0] * Math.PI / 180, base);
            });
            break;
          }

        case 'skewx':
          {
            ret = ret.map(function (p) {
              return geo.vec(p.x + Math.tan(params[0] * Math.PI / 180) * p.y, p.y);
            });
            break;
          }

        case 'skewy':
          {
            ret = ret.map(function (p) {
              return geo.vec(p.x, p.y + Math.tan(params[0] * Math.PI / 180) * p.x);
            });
            break;
          }
      }
    }
  });
  return ret;
} // All commands (BbRr isn't supported)


var allCommand = /M|m|L|l|H|h|V|v|C|c|S|s|Q|q|T|t|A|a|Z|z/g;
/**
 * pathタグd属性文字列を分割する
 * @param dString pathのd要素文字列
 * @return コマンド単位の情報配列の配列
 */

function splitD(dString) {
  // 要素分割
  var strList = dString.replace(allCommand, ' $& ') // Insert space before each signature, but don't destruct exponent exporession such as 2.2e-10.
  .replace(/([^e])(-|\+)/g, '$1 $2').split(/,| /).filter(function (str) {
    return str;
  }); // 直前のコマンド

  var pastCommand = 'M';
  var ret = [];

  for (var i = 0; i < strList.length;) {
    var info = []; // Check if a command exists

    if (strList[i].match(allCommand)) {
      info.push(strList[i]);
      pastCommand = info[0];
      i++;
    } else if (pastCommand.toUpperCase() !== 'Z') {
      // Reuse previous command
      // Avoid reusing 'Z' that can cause infinite loop
      info.push(pastCommand);
    }

    switch (info[0].toUpperCase()) {
      case 'Z':
        break;

      case 'V':
      case 'H':
        info.push(strList[i]);
        i += 1;
        break;

      case 'M':
      case 'L':
      case 'T':
        info.push(strList[i], strList[i + 1]);
        i += 2;
        break;

      case 'Q':
      case 'S':
        info.push(strList[i], strList[i + 1], strList[i + 2], strList[i + 3]);
        i += 4;
        break;

      case 'C':
        info.push(strList[i], strList[i + 1], strList[i + 2], strList[i + 3], strList[i + 4], strList[i + 5]);
        i += 6;
        break;

      case 'A':
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
 * svg文字列を生成する
 * @param pathList path情報リスト
 * @return xml文字列
 */


function serializeSvgString(pathList) {
  var svg = serializeSvg(pathList);
  var xmlSerializer = new XMLSerializer();
  var textXml = xmlSerializer.serializeToString(svg);
  return textXml;
}
/**
 * svgタグを生成する
 * @param pathList path情報リスト
 * @return svgタグ
 */


function serializeSvg(pathList) {
  var dom = document.createElementNS(HTTP_SVG, 'svg'); // キャンバスサイズ

  var width = 1;
  var height = 1;
  pathList.forEach(function (path) {
    dom.appendChild(serializePath(path.d, path.style));
    path.d.forEach(function (p) {
      width = Math.max(width, p.x);
      height = Math.max(height, p.y);
    });
  });
  width *= 1.1;
  height *= 1.1;
  dom.setAttribute('width', "".concat(width));
  dom.setAttribute('height', "".concat(height));
  return dom;
}
/**
 * pathタグを生成する
 * @param pointList 座標リスト
 * @param style スタイル情報
 * @return pathタグ
 */


function serializePath(pointList, style) {
  var dom = document.createElementNS(HTTP_SVG, 'path');
  dom.setAttribute('d', serializePointList(pointList));
  dom.setAttribute('style', serializeStyle(style));
  return dom;
}
/**
 * 座標リストをd属性文字列に変換する
 * @param pointList 座標リスト
 * @param open 閉じないフラグ
 * @return d属性文字列
 */


function serializePointList(pointList, open) {
  if (pointList.length === 0) return '';

  var _pointList = _toArray(pointList),
      head = _pointList[0],
      body = _pointList.slice(1);

  return "M ".concat(head.x, ",").concat(head.y) + body.map(function (p) {
    return " L ".concat(p.x, ",").concat(p.y);
  }).join('') + (open ? '' : ' Z');
}
/**
 * デフォルトstyle作成
 * @return スタイルオブジェクト
 */


function createStyle() {
  return {
    fill: false,
    fillGlobalAlpha: 1,
    fillStyle: '',
    lineCap: 'butt',
    lineDash: [],
    lineJoin: 'bevel',
    lineWidth: 1,
    stroke: false,
    strokeGlobalAlpha: 1,
    strokeStyle: ''
  };
}
/**
 * pathタグのスタイルを取得する
 * @param svgPath SVGのpathタグDOM
 * @return スタイルオブジェクト
 */


function parseTagStyle(svgPath) {
  // スタイル候補要素リスト
  var styleObject = {};
  svgPath.getAttributeNames().forEach(function (name) {
    var attr = svgPath.getAttributeNode(name);
    if (!attr) return;
    styleObject[attr.name] = attr.value;
  });
  var styleAttr = svgPath.getAttributeNode('style');

  if (styleAttr) {
    // style要素から取得
    var styleStr = styleAttr.value;
    styleStr.split(';').forEach(function (elem) {
      var splited = elem.split(':');
      if (splited.length !== 2) return;
      styleObject[splited[0].trim()] = splited[1].trim();
    });
  }

  return Object.entries(styleObject).reduce(function (ret, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    switch (key.toLowerCase()) {
      case 'fill':
        if (val === 'none') {
          ret.fillStyle = '';
          ret.fill = false;
        } else {
          ret.fillStyle = val;
          ret.fill = true;
        }

        break;

      case 'stroke':
        if (val === 'none') {
          ret.strokeStyle = '';
          ret.stroke = false;
        } else {
          ret.strokeStyle = val;
          ret.stroke = true;
        }

        break;

      case 'stroke-width':
        ret.lineWidth = _parseFloat(val);
        break;

      case 'stroke-opacity':
        ret.strokeGlobalAlpha = _parseFloat(val);
        break;

      case 'fill-opacity':
        ret.fillGlobalAlpha = _parseFloat(val);
        break;

      case 'stroke-linecap':
        ret.lineCap = val;
        break;

      case 'stroke-linejoin':
        ret.lineJoin = val;
        break;

      case 'stroke-dasharray':
        if (val.toLowerCase() === 'none') {
          ret.lineDash = [];
        } else {
          ret.lineDash = parseNumbers(val);
        }

        break;

      default:
        // 無視
        break;
    }

    return ret;
  }, createStyle());
}
/**
 * スタイル情報をstyle属性文字列に変換する
 * @method serializeStyle
 * @param style スタイル情報
 * @return style属性文字列
 */


function serializeStyle(style) {
  var ret = ''; // fill情報

  if (!style.fill) {
    ret += 'fill:none;';
  } else {
    ret += 'fill:' + style.fillStyle + ';';
  }

  if (style.fillGlobalAlpha) {
    ret += 'fill-opacity:' + style.fillGlobalAlpha + ';';
  } // stroke情報


  if (!style.stroke) {
    ret += 'stroke:none;';
  } else {
    ret += 'stroke:' + style.strokeStyle + ';';
  }

  if (style.lineWidth) {
    ret += 'stroke-width:' + style.lineWidth + ';';
  }

  if (style.strokeGlobalAlpha) {
    ret += 'stroke-opacity:' + style.strokeGlobalAlpha + ';';
  }

  if (style.lineCap) {
    ret += 'stroke-linecap:' + style.lineCap + ';';
  }

  if (style.lineJoin) {
    ret += 'stroke-linejoin:' + style.lineJoin + ';';
  }

  if (style.lineDash) {
    if (style.lineDash.length > 0) {
      ret += 'stroke-dasharray:' + style.lineDash.join(',') + ';';
    } else {
      ret += 'stroke-dasharray:none;';
    }
  }

  return ret;
}
/**
 * パス分割
 * @param path 対象パス
 * @param line 分割線
 * @return 分割後のパスリスト
 */


function splitPath(path, line) {
  var splited = geo.splitPolyByLine(path.d, line);
  if (splited.length < 2) return [path]; // 本体と回転方向が一致しているかで分類

  var rootLoopwise = geo.getLoopwise(path.d);
  var sameLoopwiseList = [];
  var oppositeLoopwiseList = [];

  if (path.included) {
    path.included.forEach(function (s) {
      if (geo.getLoopwise(s) === rootLoopwise) {
        sameLoopwiseList.push(s);
      } else {
        oppositeLoopwiseList.push(s);
      }
    });
  } // 本体と同回転のものはそのまま分割


  sameLoopwiseList.forEach(function (poly) {
    var sp = geo.splitPolyByLine(poly, line);
    splited = [].concat(_toConsumableArray(splited), _toConsumableArray(sp.length > 0 ? sp : [poly]));
  }); // 本体と逆回転のものは特殊処理

  var notPolyList = [];
  oppositeLoopwiseList.forEach(function (poly) {
    var sp = geo.splitPolyByLine(poly, line);

    if (sp.length > 0) {
      // 分割されたらブーリアン差をとるために集める
      notPolyList.push(poly);
    } else {
      // 分割なしならそのまま
      splited.push(poly);
    }
  }); // 切断されたくり抜き領域を差し引いたポリゴンを生成

  var splitedAfterNot = splited.map(function (s) {
    return notPolyList.reduce(function (p, c) {
      return geo.getPolygonNotPolygon(p, c);
    }, s);
  });
  return geo.getIncludedPolygonGroups(splitedAfterNot).map(function (group) {
    var _group = _toArray(group),
        d = _group[0],
        included = _group.slice(1);

    return {
      d: d,
      included: included,
      style: path.style
    };
  });
}
/**
 * ポリゴンリストをグルーピングしたパスリストに変換する
 * @param polygons ポリゴンリスト
 * @param style パススタイル
 * @return パスリスト
 */


function getGroupedPathList(polygons) {
  var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createStyle();
  return geo.getIncludedPolygonGroups(polygons).map(function (group) {
    var _group2 = _toArray(group),
        d = _group2[0],
        included = _group2.slice(1);

    return {
      d: d,
      included: included,
      style: style
    };
  });
}
/**
 * convert affine matrix to transform attribute value
 * @param matrix affine matrix
 * @return transform attribute value
 */


function affineToTransform(matrix) {
  return "matrix(".concat(matrix.join(','), ")");
}
/**
 * parse transform attribute value as affine matrix
 * @param transform attribute value
 * @return transform value
 */


function parseTransform(transformStr) {
  var transformStrList = transformStr.split(')').map(function (s) {
    return "".concat(s, ")");
  });
  var affines = transformStrList.map(function (str) {
    return parseUnitTransform(str);
  });
  return geo.multiAffines(affines);
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
  return _toConsumableArray(geo.IDENTITY_AFFINE);
}

function parseNumbers(str) {
  var list = str.trim().replace(/,/g, ' ').split(/ +/);
  return list.map(function (s) {
    return _parseFloat(s);
  });
}
/**
 * parse transform attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */


function parseTranslate(str) {
  var splited = str.match(/translate\((.+)\)/);
  if (!splited || splited.length < 1) return _toConsumableArray(geo.IDENTITY_AFFINE);
  var numbers = parseNumbers(splited[1]);

  if (numbers.length < 1) {
    return _toConsumableArray(geo.IDENTITY_AFFINE);
  } else if (numbers.length === 1) {
    return [1, 0, 0, 1, numbers[0], 0];
  } else {
    return [1, 0, 0, 1, numbers[0], numbers[1]];
  }
}
/**
 * parse translateX attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */


function parseTranslateX(str) {
  var splited = str.match(/translateX\((.+)\)/);
  if (!splited || splited.length < 1) return _toConsumableArray(geo.IDENTITY_AFFINE);
  var numbers = parseNumbers(splited[1]);

  if (numbers.length < 1) {
    return _toConsumableArray(geo.IDENTITY_AFFINE);
  } else {
    return [1, 0, 0, 1, numbers[0], 0];
  }
}
/**
 * parse translateY attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */


function parseTranslateY(str) {
  var splited = str.match(/translateY\((.+)\)/);
  if (!splited || splited.length < 1) return _toConsumableArray(geo.IDENTITY_AFFINE);
  var numbers = parseNumbers(splited[1]);

  if (numbers.length < 1) {
    return _toConsumableArray(geo.IDENTITY_AFFINE);
  } else {
    return [1, 0, 0, 1, 0, numbers[0]];
  }
}
/**
 * parse skewX attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */


function parseSkewX(str) {
  var splited = str.match(/skewX\((.+)\)/);
  if (!splited || splited.length < 1) return _toConsumableArray(geo.IDENTITY_AFFINE);
  var numbers = parseNumbers(splited[1]);

  if (numbers.length < 1) {
    return _toConsumableArray(geo.IDENTITY_AFFINE);
  } else {
    return [1, 0, Math.tan(numbers[0] * Math.PI / 180), 1, 0, 0];
  }
}
/**
 * parse skewY attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */


function parseSkewY(str) {
  var splited = str.match(/skewY\((.+)\)/);
  if (!splited || splited.length < 1) return _toConsumableArray(geo.IDENTITY_AFFINE);
  var numbers = parseNumbers(splited[1]);

  if (numbers.length < 1) {
    return _toConsumableArray(geo.IDENTITY_AFFINE);
  } else {
    return [1, Math.tan(numbers[0] * Math.PI / 180), 0, 1, 0, 0];
  }
}
/**
 * parse transform attribute value of scale as affine matrix
 * @param transform attribute value
 * @return transform value
 */


function parseScale(str) {
  var splited = str.match(/scale\((.+)\)/);
  if (!splited || splited.length < 2) return _toConsumableArray(geo.IDENTITY_AFFINE);
  var numbers = parseNumbers(splited[1]);

  if (numbers.length < 1) {
    return _toConsumableArray(geo.IDENTITY_AFFINE);
  } else if (numbers.length === 1) {
    return [numbers[0], 0, 0, numbers[0], 0, 0];
  } else {
    return [numbers[0], 0, 0, numbers[1], 0, 0];
  }
}
/**
 * parse ScaleX attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */


function parseScaleX(str) {
  var splited = str.match(/scaleX\((.+)\)/);
  if (!splited || splited.length < 1) return _toConsumableArray(geo.IDENTITY_AFFINE);
  var numbers = parseNumbers(splited[1]);

  if (numbers.length < 1) {
    return _toConsumableArray(geo.IDENTITY_AFFINE);
  } else {
    return [numbers[0], 0, 0, 1, 0, 0];
  }
}
/**
 * parse ScaleY attribute value of translate as affine matrix
 * @param transform attribute value
 * @return transform value
 */


function parseScaleY(str) {
  var splited = str.match(/scaleY\((.+)\)/);
  if (!splited || splited.length < 1) return _toConsumableArray(geo.IDENTITY_AFFINE);
  var numbers = parseNumbers(splited[1]);

  if (numbers.length < 1) {
    return _toConsumableArray(geo.IDENTITY_AFFINE);
  } else {
    return [1, 0, 0, numbers[0], 0, 0];
  }
}
/**
 * parse transform attribute value of rotate as affine matrix
 * @param transform attribute value
 * @return transform value
 */


function parseRotate(str) {
  var splited = str.match(/rotate\((.+)\)/);
  if (!splited || splited.length < 2) return _toConsumableArray(geo.IDENTITY_AFFINE);
  var numbers = parseNumbers(splited[1]);
  if (parseNumbers.length < 1) return _toConsumableArray(geo.IDENTITY_AFFINE);
  var rad = numbers[0] / 180 * Math.PI;
  var cos = Math.cos(rad);
  var sin = Math.sin(rad);
  var rot = [cos, sin, -sin, cos, 0, 0];

  if (numbers.length > 2) {
    return geo.multiAffine(geo.multiAffine([1, 0, 0, 1, numbers[1], numbers[2]], rot), [1, 0, 0, 1, -numbers[1], -numbers[2]]);
  } else {
    return rot;
  }
}
/**
 * parse transform attribute value of matrix as affine matrix
 * @param transform attribute value
 * @return transform value
 */


function parseMatrix(str) {
  var splited = str.match(/matrix\((.+)\)/);
  if (!splited || splited.length < 2) return _toConsumableArray(geo.IDENTITY_AFFINE);
  var numbers = parseNumbers(splited[1]);
  if (numbers.length < 5) return _toConsumableArray(geo.IDENTITY_AFFINE);
  return numbers.slice(0, 6);
}

function getUnknownError() {
  return new Error("Unexpected error");
}
},{"./geo":"WBaa"}],"ZCfc":[function(require,module,exports) {
"use strict";

var geo = _interopRequireWildcard(require("../src/geo"));

var svg = _interopRequireWildcard(require("../src/svg"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var fileInput = document.getElementById('input');

fileInput.onchange = function (e) {
  var file = e.target.files;
  if (!file || file.length === 0) return;
  var reader = new FileReader();
  reader.readAsText(file[0]);

  reader.onload = function () {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var pathInfoList = svg.parseSvgGraphicsStr(reader.result);
    var inRectList = svg.fitRect(pathInfoList, 0, 0, canvas.width, canvas.height);
    inRectList.forEach(function (info) {
      geo.triangleSplit(info.d).forEach(function (points) {
        svg.draw(ctx, {
          d: points,
          style: info.style
        });
      });
    });
  };
};

function runReverse() {
  var text = document.getElementById('input-path').value;
  document.getElementById('reverse-result').value = svg.pathSegmentRawsToString(svg.reversePath(svg.parsePathSegmentRaws(text)));
  document.getElementById('path-src').setAttribute('d', text);
  document.getElementById('path-dist').setAttribute('d', svg.pathSegmentRawsToString(svg.reversePath(svg.parsePathSegmentRaws(text))));
}

runReverse();
document.getElementById('run-reverse').addEventListener('click', runReverse);

function runModify() {
  var text = document.getElementById('input-path2').value;
  document.getElementById('path-src2').setAttribute('d', text);
  var segs = svg.parsePathSegmentRaws(text);
  document.getElementById('path-dist2').setAttribute('d', svg.pathSegmentRawsToString(svg.slidePath(segs, {
    x: 30,
    y: 30
  })));
  document.getElementById('path-dist3').setAttribute('d', svg.pathSegmentRawsToString(svg.scalePath(segs, {
    x: -1,
    y: 1
  })));
  document.getElementById('path-dist4').setAttribute('d', svg.pathSegmentRawsToString(svg.scalePath(segs, {
    x: 1,
    y: -1
  })));
  document.getElementById('path-dist5').setAttribute('d', svg.pathSegmentRawsToString(svg.scalePath(segs, {
    x: -1,
    y: -1
  })));
}

runModify();
document.getElementById('run-modify').addEventListener('click', runModify);

function runRotate() {
  var text = document.getElementById('input-rotate').value;
  document.getElementById('rotate-src2').setAttribute('d', text);
  var segs = svg.parsePathSegmentRaws(text);
  document.getElementById('rotate-dist2').setAttribute('d', svg.pathSegmentRawsToString(svg.rotatePath(segs, 2 * Math.PI / 5)));
  document.getElementById('rotate-dist3').setAttribute('d', svg.pathSegmentRawsToString(svg.rotatePath(segs, 2 * (Math.PI * 2) / 5)));
  document.getElementById('rotate-dist4').setAttribute('d', svg.pathSegmentRawsToString(svg.rotatePath(segs, 2 * (Math.PI * 3) / 5)));
  document.getElementById('rotate-dist5').setAttribute('d', svg.pathSegmentRawsToString(svg.rotatePath(segs, 2 * (Math.PI * 4) / 5)));
}

runRotate();
document.getElementById('run-rotate').addEventListener('click', runRotate);
},{"../src/geo":"WBaa","../src/svg":"tzhc"}]},{},["ZCfc"], null)
//# sourceMappingURL=main.4d00aa93.js.map