const $42a19166d05576d2$export$e1764cb99718e49f = 0.000001;
const $42a19166d05576d2$export$6b37290cfd5aead9 = [
    1,
    0,
    0,
    1,
    0,
    0
];
function $42a19166d05576d2$export$202e0172ed3c7be0(x, y) {
    return {
        x: x,
        y: y
    };
}
function $42a19166d05576d2$export$e16d8520af44a096(a, b) {
    return $42a19166d05576d2$export$202e0172ed3c7be0(a.x + b.x, a.y + b.y);
}
function $42a19166d05576d2$export$f93b5905241a7cca(a, b) {
    return $42a19166d05576d2$export$202e0172ed3c7be0(a.x - b.x, a.y - b.y);
}
function $42a19166d05576d2$export$13e2537ceeaf8a3a(a, b) {
    return $42a19166d05576d2$export$202e0172ed3c7be0(a.x * b, a.y * b);
}
function $42a19166d05576d2$export$18ac18efd9e98d41(a, b) {
    const dif = $42a19166d05576d2$export$f93b5905241a7cca(a, b);
    return Math.abs(dif.x) < $42a19166d05576d2$export$e1764cb99718e49f && Math.abs(dif.y) < $42a19166d05576d2$export$e1764cb99718e49f;
}
function $42a19166d05576d2$export$79376507b09a66f(a, b) {
    return $42a19166d05576d2$export$1972ae378e9b44ab($42a19166d05576d2$export$f93b5905241a7cca(a, b));
}
function $42a19166d05576d2$export$e029b07aa8e85de4(polyline, closed = false) {
    if (polyline.length < 2) return 0;
    let ret = 0;
    for(let i = 0; i < polyline.length - 1; i++)ret += $42a19166d05576d2$export$79376507b09a66f(polyline[i], polyline[i + 1]);
    if (closed) ret += $42a19166d05576d2$export$79376507b09a66f(polyline[polyline.length - 1], polyline[0]);
    return ret;
}
function $42a19166d05576d2$export$1972ae378e9b44ab(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y);
}
function $42a19166d05576d2$export$c46ec7d82fb1f602(a) {
    return $42a19166d05576d2$export$1972ae378e9b44ab(a) < $42a19166d05576d2$export$e1764cb99718e49f;
}
function $42a19166d05576d2$export$65f2564e9a9b9222(a) {
    const d = $42a19166d05576d2$export$1972ae378e9b44ab(a);
    if (d < $42a19166d05576d2$export$e1764cb99718e49f) throw new Error("cannot get unit vector of zero vector");
    return $42a19166d05576d2$export$13e2537ceeaf8a3a(a, 1 / d);
}
function $42a19166d05576d2$export$6da5cfd0145f763d(a, b) {
    return a.x * b.y - a.y * b.x;
}
function $42a19166d05576d2$export$d262b423ef7122a5(a, b) {
    return a.x * b.x + a.y * b.y;
}
function $42a19166d05576d2$export$67b7da414b044aeb(vectors) {
    return vectors.map((v)=>Object.assign({}, v));
}
function $42a19166d05576d2$export$c91255cadecfe081(a, b) {
    return $42a19166d05576d2$export$13e2537ceeaf8a3a($42a19166d05576d2$export$e16d8520af44a096(a, b), 0.5);
}
function $42a19166d05576d2$export$e2456a15fce484f1(rec) {
    return $42a19166d05576d2$export$202e0172ed3c7be0(rec.x + rec.width / 2, rec.y + rec.height / 2);
}
function $42a19166d05576d2$export$abeade588884fa4f(polygon) {
    if (polygon.length === 0) return $42a19166d05576d2$export$202e0172ed3c7be0(0, 0);
    return $42a19166d05576d2$export$13e2537ceeaf8a3a(polygon.reduce((p, c)=>$42a19166d05576d2$export$e16d8520af44a096(p, c), $42a19166d05576d2$export$202e0172ed3c7be0(0, 0)), 1 / polygon.length);
}
function $42a19166d05576d2$export$5f24487807f871fb(a, from = $42a19166d05576d2$export$202e0172ed3c7be0(0, 0)) {
    const dif = $42a19166d05576d2$export$f93b5905241a7cca(a, from);
    return Math.atan2(dif.y, dif.x);
}
function $42a19166d05576d2$export$d5201b68c60913ce(a, from = $42a19166d05576d2$export$202e0172ed3c7be0(0, 0)) {
    return $42a19166d05576d2$export$e16d8520af44a096($42a19166d05576d2$export$13e2537ceeaf8a3a($42a19166d05576d2$export$f93b5905241a7cca(from, a), 2), a);
}
function $42a19166d05576d2$export$bb628a54ab399bc9(a, radian, from = $42a19166d05576d2$export$202e0172ed3c7be0(0, 0)) {
    const fromBase = $42a19166d05576d2$export$f93b5905241a7cca(a, from);
    const s = Math.sin(radian);
    const c = Math.cos(radian);
    return $42a19166d05576d2$export$e16d8520af44a096($42a19166d05576d2$export$202e0172ed3c7be0(c * fromBase.x - s * fromBase.y, s * fromBase.x + c * fromBase.y), from);
}
function $42a19166d05576d2$var$getRotateFn(radian, from = $42a19166d05576d2$export$202e0172ed3c7be0(0, 0)) {
    const s = Math.sin(radian);
    const c = Math.cos(radian);
    return (a, reverse)=>{
        const fromBase = $42a19166d05576d2$export$f93b5905241a7cca(a, from);
        return reverse ? $42a19166d05576d2$export$e16d8520af44a096($42a19166d05576d2$export$202e0172ed3c7be0(c * fromBase.x + s * fromBase.y, -s * fromBase.x + c * fromBase.y), from) : $42a19166d05576d2$export$e16d8520af44a096($42a19166d05576d2$export$202e0172ed3c7be0(c * fromBase.x - s * fromBase.y, s * fromBase.x + c * fromBase.y), from);
    };
}
function $42a19166d05576d2$export$b5a1995c4855c266(a, b, c) {
    if ($42a19166d05576d2$var$isCloseToZero(a)) return $42a19166d05576d2$var$isCloseToZero(b) ? [] : [
        -c / b
    ];
    const d = b * b - 4 * a * c;
    if (d < 0) return [];
    const ia = 0.5 / a;
    if ($42a19166d05576d2$var$isCloseToZero(d)) return [
        -b * ia
    ];
    const sd = Math.sqrt(d);
    return [
        (-b + sd) * ia,
        (-b - sd) * ia
    ];
}
function $42a19166d05576d2$export$27896705feb2b5c9(p, line) {
    if (line.length !== 2) throw new Error("line must be length = 2");
    const s = line[0];
    const t = line[1];
    const vecST = $42a19166d05576d2$export$f93b5905241a7cca(t, s);
    const vecSP = $42a19166d05576d2$export$f93b5905241a7cca(p, s);
    const inner = $42a19166d05576d2$export$d262b423ef7122a5(vecST, vecSP);
    const rate = inner / $42a19166d05576d2$export$d262b423ef7122a5(vecST, vecST);
    return $42a19166d05576d2$export$e16d8520af44a096(s, $42a19166d05576d2$export$13e2537ceeaf8a3a(vecST, rate));
}
/**
 * 2次ベジェ曲線と直線の当たり判定用パラメータを取得する
 * @param p0 ベジェ曲線始点
 * @param p1 ベジェ曲線制御点
 * @param p2 ベジェ曲線終点
 * @param p 直線始点
 * @param q 直線終点
 * @return ベジェ曲線パラメータ配列
 */ function $42a19166d05576d2$var$rayToBezier(p0, p1, p2, p, q) {
    const vx = q.x - p.x;
    const vy = q.y - p.y;
    const a = p0.x - 2 * p1.x + p2.x;
    const b = 2 * (p1.x - p0.x);
    const c = p0.x;
    const d = p0.y - 2 * p1.y + p2.y;
    const e = 2 * (p1.y - p0.y);
    const f = p0.y;
    return $42a19166d05576d2$export$b5a1995c4855c266(a * vy - vx * d, b * vy - vx * e, vy * c - vy * p.x - vx * f + vx * p.y);
}
function $42a19166d05576d2$export$94845d9831d42b38(p0, p1, p2, p, q) {
    return $42a19166d05576d2$var$rayToBezier(p0, p1, p2, p, q).filter((t)=>0 <= t && t <= 1).map((t)=>$42a19166d05576d2$export$202e0172ed3c7be0((p2.x - 2 * p1.x + p0.x) * t * t + 2 * (p1.x - p0.x) * t + p0.x, (p2.y - 2 * p1.y + p0.y) * t * t + 2 * (p1.y - p0.y) * t + p0.y));
}
function $42a19166d05576d2$export$60d04f6074c4a6a5(seg1, seg2) {
    const { ta: ta , tb: tb , tc: tc , td: td  } = $42a19166d05576d2$var$getCrossSegAndSegParams(seg1, seg2);
    return tc * td < 0 && ta * tb < 0;
}
function $42a19166d05576d2$export$d8f7925ac694ab7c(seg1, seg2) {
    const { ta: ta , tb: tb , tc: tc , td: td  } = $42a19166d05576d2$var$getCrossSegAndSegParams(seg1, seg2);
    return tc * td <= 0 && ta * tb <= 0;
}
function $42a19166d05576d2$var$getCrossSegAndSegParams(seg1, seg2) {
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
        ta: ta,
        tb: tb,
        tc: tc,
        td: td
    };
}
function $42a19166d05576d2$export$8768f1dbbca5504b(a, b) {
    const cross = $42a19166d05576d2$export$6da5cfd0145f763d(a, b);
    return Math.abs(cross) < $42a19166d05576d2$export$e1764cb99718e49f;
}
function $42a19166d05576d2$export$134ed2711bd43622(p, line) {
    return $42a19166d05576d2$export$c46ec7d82fb1f602($42a19166d05576d2$export$f93b5905241a7cca(p, $42a19166d05576d2$export$27896705feb2b5c9(p, line)));
}
function $42a19166d05576d2$export$f128eccdbbcf596(p, seg) {
    if (!$42a19166d05576d2$export$c46ec7d82fb1f602($42a19166d05576d2$export$f93b5905241a7cca(p, $42a19166d05576d2$export$27896705feb2b5c9(p, seg)))) return false;
    const v1 = $42a19166d05576d2$export$f93b5905241a7cca(seg[1], seg[0]);
    const v2 = $42a19166d05576d2$export$f93b5905241a7cca(p, seg[0]);
    if ($42a19166d05576d2$export$d262b423ef7122a5(v1, v2) < 0) return false;
    if ($42a19166d05576d2$export$1972ae378e9b44ab(v1) < $42a19166d05576d2$export$1972ae378e9b44ab(v2)) return false;
    return true;
}
/**
 * 点から正の方向へ伸ばした水平線が線分と交差するか判定
 * 点が面上にあるか判定に利用する
 * 点が線分上の場合はfalse
 * @param p 点
 * @param seg 線分
 * @return 交差するフラグ
 */ function $42a19166d05576d2$var$isCrossSegAndRightHorizon(p, seg) {
    // 平行な場合はfalse
    if (Math.abs(seg[0].y - seg[1].y) < $42a19166d05576d2$export$e1764cb99718e49f) return false;
    // 線分の上側端点との接触はfalse、下側端点との接触はtrueで統一
    let top, bottom;
    if (seg[0].y < seg[1].y) [bottom, top] = seg;
    else [top, bottom] = seg;
    if (p.y < bottom.y || top.y <= p.y) return false;
    // 交点は厳密にpの右側でなければいけない
    const cross = $42a19166d05576d2$export$c2b04831d534c8e0(seg, [
        p,
        $42a19166d05576d2$export$202e0172ed3c7be0(p.x + 1, p.y)
    ]);
    if (!cross || cross.x <= p.x) return false;
    return true;
}
function $42a19166d05576d2$export$5fa2dd9499a076de(p, polygon) {
    // 頂点上判定
    if (polygon.find((point)=>p.x === point.x && p.y === point.y)) return true;
    const segs = polygon.map((point, i)=>{
        return [
            point,
            i < polygon.length - 1 ? polygon[i + 1] : polygon[0]
        ];
    })// 長さ0の辺は扱わない
    .filter((seg)=>!$42a19166d05576d2$export$18ac18efd9e98d41(seg[0], seg[1]));
    // 辺上判定
    for(let i = 0; i < segs.length; i++){
        const seg = segs[i];
        if ($42a19166d05576d2$export$f128eccdbbcf596(p, seg)) return true;
    }
    const hitSegs = segs.filter((seg)=>$42a19166d05576d2$var$isCrossSegAndRightHorizon(p, seg));
    return hitSegs.length % 2 === 1;
}
function $42a19166d05576d2$export$c2b04831d534c8e0(seg, line) {
    if ($42a19166d05576d2$export$8768f1dbbca5504b($42a19166d05576d2$export$f93b5905241a7cca(seg[0], seg[1]), $42a19166d05576d2$export$f93b5905241a7cca(line[0], line[1]))) return null;
    if ($42a19166d05576d2$export$134ed2711bd43622(seg[0], line)) return Object.assign({}, seg[0]);
    if ($42a19166d05576d2$export$134ed2711bd43622(seg[1], line)) return Object.assign({}, seg[1]);
    const s1 = ((line[1].x - line[0].x) * (seg[0].y - line[0].y) - (line[1].y - line[0].y) * (seg[0].x - line[0].x)) / 2;
    const s2 = ((line[1].x - line[0].x) * (line[0].y - seg[1].y) - (line[1].y - line[0].y) * (line[0].x - seg[1].x)) / 2;
    const rate = s1 / (s1 + s2);
    const isExistCorss = 0 < rate && rate < 1;
    return isExistCorss ? $42a19166d05576d2$export$202e0172ed3c7be0(seg[0].x + (seg[1].x - seg[0].x) * rate, seg[0].y + (seg[1].y - seg[0].y) * rate) : null;
}
function $42a19166d05576d2$export$90290c36af70b73a(ab, cd) {
    if ($42a19166d05576d2$export$18ac18efd9e98d41(ab[0], cd[0]) && $42a19166d05576d2$export$18ac18efd9e98d41(ab[1], cd[1])) return true;
    if ($42a19166d05576d2$export$18ac18efd9e98d41(ab[0], cd[1]) && $42a19166d05576d2$export$18ac18efd9e98d41(ab[1], cd[0])) return true;
    return false;
}
function $42a19166d05576d2$export$2757549f1e61727a(pol, line) {
    let points = [];
    let crossIndex = [];
    let crossList = [];
    pol.forEach((p, i)=>{
        const targetLine = [
            p,
            pol[(i + 1) % pol.length]
        ];
        const cross = $42a19166d05576d2$export$c2b04831d534c8e0(targetLine, line);
        points.push(p);
        if (cross) {
            points.push(cross);
            crossIndex.push(i + 1 + crossIndex.length);
            crossList.push(cross);
        }
    });
    if (crossIndex.length % 2 !== 0) return [];
    // 近い順に並べる -> 直線をx軸と重なるよう回転してx座標で比較
    const rad = $42a19166d05576d2$export$5f24487807f871fb(line[0], line[1]);
    crossList.sort((a, b)=>$42a19166d05576d2$export$bb628a54ab399bc9(a, -rad).x - $42a19166d05576d2$export$bb628a54ab399bc9(b, -rad).x);
    // 面の辺と同一ではないものを採用
    let targetSection = [];
    for(let k = 0; k < crossList.length - 1; k += 2){
        const section = [
            crossList[k],
            crossList[k + 1]
        ];
        let sameSeg = false;
        for(let l = 0; l < pol.length; l++)if ($42a19166d05576d2$export$90290c36af70b73a(section, [
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
    for(let i = 0; i <= crossIndex[0]; i++)splitPol.push($42a19166d05576d2$export$202e0172ed3c7be0(points[i].x, points[i].y));
    // 交点から追加
    for(let i = crossIndex[1]; i < points.length; i++)splitPol.push($42a19166d05576d2$export$202e0172ed3c7be0(points[i].x, points[i].y));
    // 確定
    splitedPolygons.push(splitPol);
    // 2つ目
    splitPol = [];
    // 交点から交点まで追加
    for(let i = crossIndex[0]; i <= crossIndex[1]; i++)splitPol.push($42a19166d05576d2$export$202e0172ed3c7be0(points[i].x, points[i].y));
    // 確定
    splitedPolygons.push(splitPol);
    // 再帰的に分割
    const recursiveResult = [];
    splitedPolygons.forEach((polygon)=>{
        const splited = $42a19166d05576d2$export$2757549f1e61727a(polygon, line);
        if (splited.length === 0) recursiveResult.push(polygon);
        else recursiveResult.push(...splited);
    });
    return recursiveResult;
}
function $42a19166d05576d2$export$a5bc0a37e5a5fe6d(polygon) {
    // 時計周りに揃える
    polygon = $42a19166d05576d2$export$11fb61ceb1a6f6d3(polygon);
    // ポリゴン複製
    const targetPoly = $42a19166d05576d2$export$4006bf3b02ff3c0e(polygon);
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
            return $42a19166d05576d2$export$1972ae378e9b44ab(b) - $42a19166d05576d2$export$1972ae378e9b44ab(a);
        });
        farthestIndex = targetPoly.indexOf(sorted[0]);
        // 分割実行
        let tri = $42a19166d05576d2$var$getTriangle(targetPoly, farthestIndex);
        if (!tri) {
            // 最遠点では失敗
            const size = targetPoly.length;
            // 外積計算
            const pa = $42a19166d05576d2$export$f93b5905241a7cca(targetPoly[(farthestIndex + 1) % size], targetPoly[farthestIndex]);
            const pb = $42a19166d05576d2$export$f93b5905241a7cca(targetPoly[farthestIndex - 1 < 0 ? size - 1 : farthestIndex - 1], targetPoly[farthestIndex]);
            currentCross = $42a19166d05576d2$export$6da5cfd0145f763d(pa, pb);
            let index = farthestIndex;
            // 最遠点以外で探す
            while(!tri){
                index = (index + 1) % size;
                // 最遠点の外積と同じ符号かを判定
                const v1 = $42a19166d05576d2$export$f93b5905241a7cca(targetPoly[(index + 1) % size], targetPoly[index]);
                const v2 = $42a19166d05576d2$export$f93b5905241a7cca(targetPoly[index - 1 < 0 ? size - 1 : index - 1], targetPoly[index]);
                const tmpCross = $42a19166d05576d2$export$6da5cfd0145f763d(v1, v2);
                if (tmpCross * currentCross > 0) // 判定続行
                tri = $42a19166d05576d2$var$getTriangle(targetPoly, index);
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
 */ function $42a19166d05576d2$var$getTriangle(polygon, index) {
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
            if ($42a19166d05576d2$export$1f7018e156a31fec(tri, p)) // 失敗
            invalid = true;
        }
        return invalid;
    });
    return invalid ? null : tri;
}
function $42a19166d05576d2$export$1f7018e156a31fec(tri, p) {
    // 三角形の3つのベクトル
    const ab = $42a19166d05576d2$export$f93b5905241a7cca(tri[1], tri[0]);
    const bc = $42a19166d05576d2$export$f93b5905241a7cca(tri[2], tri[1]);
    const ca = $42a19166d05576d2$export$f93b5905241a7cca(tri[0], tri[2]);
    // 三角形の各点からpへのベクトル
    const ap = $42a19166d05576d2$export$f93b5905241a7cca(p, tri[0]);
    const bp = $42a19166d05576d2$export$f93b5905241a7cca(p, tri[1]);
    const cp = $42a19166d05576d2$export$f93b5905241a7cca(p, tri[2]);
    // 外積を求める
    const crossABP = $42a19166d05576d2$export$6da5cfd0145f763d(ab, bp);
    const crossBCP = $42a19166d05576d2$export$6da5cfd0145f763d(bc, cp);
    const crossCAP = $42a19166d05576d2$export$6da5cfd0145f763d(ca, ap);
    // 外積の符号が全て同じなら内部にある
    // 0も含む→境界も含む
    if (crossABP >= 0 && crossBCP >= 0 && crossCAP >= 0 || crossABP <= 0 && crossBCP <= 0 && crossCAP <= 0) return true;
    return false;
}
function $42a19166d05576d2$export$11fb61ceb1a6f6d3(polygon) {
    const ret = polygon.concat();
    if ($42a19166d05576d2$export$a818964288006665(polygon) === -1) ret.reverse();
    return ret;
}
function $42a19166d05576d2$export$a818964288006665(polygon) {
    const area = $42a19166d05576d2$export$520c40045967cb15(polygon, true);
    if (area > 0) return 1;
    if (area < 0) return -1;
    return 0;
}
function $42a19166d05576d2$export$520c40045967cb15(polygon, allowNegative = false) {
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
function $42a19166d05576d2$export$ddaacf79debd9c9b(pointList, size) {
    const ret = [];
    const unitT = 1 / size;
    if (pointList.length === 3) // ２次ベジェの場合
    for(let i = 0; i <= size; i++)ret.push($42a19166d05576d2$export$807445714fa82091(pointList, unitT * i));
    else if (pointList.length === 4) // 3次ベジェの場合
    for(let i = 0; i <= size; i++)ret.push($42a19166d05576d2$export$34ab0e500ce89bb4(pointList, unitT * i));
    else throw new Error("connot approximate");
    return ret;
}
function $42a19166d05576d2$export$807445714fa82091(pointList, rate) {
    const t = rate;
    const nt = 1 - t;
    const c0 = $42a19166d05576d2$export$13e2537ceeaf8a3a(pointList[0], nt * nt);
    const c1 = $42a19166d05576d2$export$13e2537ceeaf8a3a(pointList[1], 2 * t * nt);
    const c2 = $42a19166d05576d2$export$13e2537ceeaf8a3a(pointList[2], t * t);
    return $42a19166d05576d2$export$202e0172ed3c7be0(c0.x + c1.x + c2.x, c0.y + c1.y + c2.y);
}
function $42a19166d05576d2$export$64a6049d45cf5beb(pointList) {
    return (t)=>$42a19166d05576d2$export$807445714fa82091(pointList, t);
}
function $42a19166d05576d2$export$34ab0e500ce89bb4(pointList, rate) {
    const t = rate;
    const nt = 1 - t;
    const c0 = $42a19166d05576d2$export$13e2537ceeaf8a3a(pointList[0], nt * nt * nt);
    const c1 = $42a19166d05576d2$export$13e2537ceeaf8a3a(pointList[1], 3 * t * nt * nt);
    const c2 = $42a19166d05576d2$export$13e2537ceeaf8a3a(pointList[2], 3 * t * t * nt);
    const c3 = $42a19166d05576d2$export$13e2537ceeaf8a3a(pointList[3], t * t * t);
    return $42a19166d05576d2$export$202e0172ed3c7be0(c0.x + c1.x + c2.x + c3.x, c0.y + c1.y + c2.y + c3.y);
}
function $42a19166d05576d2$export$512a3af25faf9bbd(pointList) {
    return (t)=>$42a19166d05576d2$export$34ab0e500ce89bb4(pointList, t);
}
function $42a19166d05576d2$export$794c52996a27d3f4(pointList, x) {
    const [p0, p1, p2, p3] = pointList;
    const a = -p0.x + 3 * p1.x - 3 * p2.x + p3.x;
    const b = 3 * p0.x - 6 * p1.x + 3 * p2.x;
    const c = -3 * p0.x + 3 * p1.x;
    const d = p0.x - x;
    const t = $42a19166d05576d2$var$solveBezier3Fomula(a, b, c, d);
    const tt = t * t;
    const ttt = tt * t;
    const tm = 1 - t;
    const tmtm = tm * tm;
    const tmtmtm = tmtm * tm;
    return tmtmtm * p0.y + 3 * t * tmtm * p1.y + 3 * tt * tm * p2.y + ttt * p3.y;
}
function $42a19166d05576d2$export$2d3e06704631d4b1(rx, ry, startRadian, endRadian, center, radian, size) {
    const ret = [];
    const range = endRadian - startRadian;
    const unitT = range / size;
    const rotateFn = $42a19166d05576d2$var$getRotateFn(radian);
    for(let i = 0; i <= size; i++){
        const t = unitT * i + startRadian - radian;
        ret.push($42a19166d05576d2$export$e16d8520af44a096(rotateFn($42a19166d05576d2$export$202e0172ed3c7be0(rx * Math.cos(t), ry * Math.sin(t))), center));
    }
    return ret;
}
function $42a19166d05576d2$export$e3c4c7c70c07bd5d(rx, ry, startPoint, endPoint, largeArcFlag, sweepFlag, radian, size) {
    if (Math.abs(rx * ry) < $42a19166d05576d2$export$e1764cb99718e49f) return [
        startPoint,
        endPoint
    ];
    return $42a19166d05576d2$export$aef8effa323ac3b3($42a19166d05576d2$export$f0a1dd234d8c498c(rx, ry, startPoint, endPoint, largeArcFlag, sweepFlag, radian), size);
}
function $42a19166d05576d2$export$f0a1dd234d8c498c(rx, ry, startPoint, endPoint, largeArcFlag, sweepFlag, radian) {
    if (Math.abs(rx * ry) < $42a19166d05576d2$export$e1764cb99718e49f) return (t)=>$42a19166d05576d2$export$1bfe9e4b89f5e7d9(startPoint, endPoint, t);
    const r = radian;
    const rotateFn = $42a19166d05576d2$var$getRotateFn(r);
    const p0 = startPoint;
    const p1 = endPoint;
    const a = rotateFn($42a19166d05576d2$export$202e0172ed3c7be0((p0.x - p1.x) / 2, (p0.y - p1.y) / 2), true);
    const ax2 = a.x * a.x;
    const ay2 = a.y * a.y;
    const l = ax2 / rx / rx + ay2 / ry / ry;
    const lsqrt = l > 1 ? Math.sqrt(l) : 1;
    const { x: rxa , y: rya  } = $42a19166d05576d2$export$202e0172ed3c7be0(Math.abs(rx) * lsqrt, Math.abs(ry) * lsqrt);
    const rx2 = rxa * rxa;
    const ry2 = rya * rya;
    const b = $42a19166d05576d2$export$13e2537ceeaf8a3a($42a19166d05576d2$export$13e2537ceeaf8a3a($42a19166d05576d2$export$202e0172ed3c7be0(rxa * a.y / rya, -rya * a.x / rxa), Math.sqrt(Math.max(0, rx2 * ry2 - rx2 * ay2 - ry2 * ax2) / (rx2 * ay2 + ry2 * ax2))), largeArcFlag === sweepFlag ? -1 : 1);
    const c = $42a19166d05576d2$export$e16d8520af44a096(rotateFn(b), $42a19166d05576d2$export$13e2537ceeaf8a3a($42a19166d05576d2$export$e16d8520af44a096(p0, p1), 0.5));
    const u = $42a19166d05576d2$export$202e0172ed3c7be0((a.x - b.x) / rxa, (a.y - b.y) / rya);
    const v = $42a19166d05576d2$export$202e0172ed3c7be0((-a.x - b.x) / rxa, (-a.y - b.y) / rya);
    const theta = $42a19166d05576d2$export$5f24487807f871fb(u);
    const dtheta_tmp = ($42a19166d05576d2$export$5f24487807f871fb(v) - $42a19166d05576d2$export$5f24487807f871fb(u)) % (2 * Math.PI);
    const dtheta = !sweepFlag && 0 < dtheta_tmp ? dtheta_tmp - 2 * Math.PI : sweepFlag && dtheta_tmp < 0 ? dtheta_tmp + 2 * Math.PI : dtheta_tmp;
    return (t)=>{
        if (t === 0) return startPoint;
        else if (t === 1) return endPoint;
        else {
            const dr = theta + dtheta * t;
            return $42a19166d05576d2$export$e16d8520af44a096(rotateFn($42a19166d05576d2$export$202e0172ed3c7be0(rxa * Math.cos(dr), rya * Math.sin(dr))), c);
        }
    };
}
function $42a19166d05576d2$export$1bfe9e4b89f5e7d9(a, b, t) {
    return $42a19166d05576d2$export$e16d8520af44a096(a, $42a19166d05576d2$export$13e2537ceeaf8a3a($42a19166d05576d2$export$f93b5905241a7cca(b, a), t));
}
function $42a19166d05576d2$export$aef8effa323ac3b3(lerpFn, split) {
    if (split <= 1) return [
        lerpFn(0),
        lerpFn(1)
    ];
    const points = [];
    let step = 1 / split;
    for(let i = 0; i <= split; i++)points.push(lerpFn(step * i));
    return points;
}
function $42a19166d05576d2$export$7b50b2f810f6ba6d(a, b, rx, ry, radian) {
    // 回転を打ち消す
    a = $42a19166d05576d2$export$bb628a54ab399bc9(a, -radian);
    b = $42a19166d05576d2$export$bb628a54ab399bc9(b, -radian);
    // 媒介変数を利用して円の中心問題にする
    const A = $42a19166d05576d2$export$202e0172ed3c7be0(a.x / rx, a.y / ry);
    const B = $42a19166d05576d2$export$202e0172ed3c7be0(b.x / rx, b.y / ry);
    // 円の中心取得
    const centerInfo = $42a19166d05576d2$export$5758bd826bc20e64(A, B, 1);
    const C = centerInfo.centers;
    // 楕円に戻す
    let ans1 = $42a19166d05576d2$export$202e0172ed3c7be0(C[0].x * rx, C[0].y * ry);
    let ans2 = $42a19166d05576d2$export$202e0172ed3c7be0(C[1].x * rx, C[1].y * ry);
    // 回転を戻す
    ans1 = $42a19166d05576d2$export$bb628a54ab399bc9(ans1, radian);
    ans2 = $42a19166d05576d2$export$bb628a54ab399bc9(ans2, radian);
    return {
        centers: [
            ans1,
            ans2
        ],
        radiusRate: centerInfo.radiusRate
    };
}
function $42a19166d05576d2$export$5758bd826bc20e64(a, b, radius) {
    const u1 = (a.x + b.x) / 2;
    const u2 = (a.x - b.x) / 2;
    const v1 = (a.y + b.y) / 2;
    const v2 = (a.y - b.y) / 2;
    const L = Math.sqrt(u2 * u2 + v2 * v2);
    const t2 = Math.pow(radius / L, 2) - 1;
    // 2点が直径以上に離れている => 2点を直径とみなす
    if (t2 < 0) {
        const center = $42a19166d05576d2$export$c91255cadecfe081(a, b);
        return {
            centers: [
                center,
                center
            ],
            radiusRate: L / radius
        };
    }
    const t = Math.sqrt(t2);
    const ans1 = $42a19166d05576d2$export$202e0172ed3c7be0(u1 + v2 * t, v1 - u2 * t);
    const ans2 = $42a19166d05576d2$export$202e0172ed3c7be0(u1 - v2 * t, v1 + u2 * t);
    return {
        centers: [
            ans1,
            ans2
        ],
        radiusRate: 1
    };
}
function $42a19166d05576d2$export$51186ad6e864892a(points, params) {
    const a = params[0];
    const b = params[1];
    const c = params[2];
    const d = params[3];
    const e = params[4];
    const f = params[5];
    return points.map((p)=>$42a19166d05576d2$export$202e0172ed3c7be0(a * p.x + c * p.y + e, b * p.x + d * p.y + f));
}
function $42a19166d05576d2$export$86904325d12790cd(params) {
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
function $42a19166d05576d2$export$defd75fdf417c537(a, b) {
    return [
        a[0] * b[0] + a[2] * b[1],
        a[1] * b[0] + a[3] * b[1],
        a[0] * b[2] + a[2] * b[3],
        a[1] * b[2] + a[3] * b[3],
        a[0] * b[4] + a[2] * b[5] + a[4],
        a[1] * b[4] + a[3] * b[5] + a[5]
    ];
}
function $42a19166d05576d2$export$39e2946afec0625e(affines) {
    return affines.reduce((p, c)=>{
        return $42a19166d05576d2$export$defd75fdf417c537(p, c);
    }, $42a19166d05576d2$export$6b37290cfd5aead9);
}
function $42a19166d05576d2$export$8cb23e22f8f81351(affine, v) {
    return $42a19166d05576d2$export$202e0172ed3c7be0(affine[0] * v.x + affine[2] * v.y + affine[4], affine[1] * v.x + affine[3] * v.y + affine[5]);
}
function $42a19166d05576d2$export$4006bf3b02ff3c0e(polygon) {
    let ret = polygon.concat();
    // サイズ
    const size = polygon.length;
    // 同一点探す
    for(let i = 0; i < size; i++){
        const p1 = ret[i];
        const p2 = ret[(i + 1) % size];
        if ($42a19166d05576d2$export$18ac18efd9e98d41(p1, p2)) {
            // 同一
            ret.splice(i, 1);
            // 再帰
            ret = $42a19166d05576d2$export$4006bf3b02ff3c0e(ret);
            break;
        }
    }
    return ret;
}
function $42a19166d05576d2$export$c3914593588f19db(radius, n) {
    const unitRad = Math.PI / n;
    const unitArea = Math.pow(radius, 2) * Math.sin(unitRad) * Math.cos(unitRad);
    return unitArea * n;
}
function $42a19166d05576d2$export$7444ed9d49806b92(area, n) {
    const unitRad = Math.PI / n;
    const unitArea = area / n;
    return Math.sqrt(unitArea / Math.sin(unitRad) / Math.cos(unitRad));
}
function $42a19166d05576d2$export$301d301794861250(polygons) {
    const sorted = polygons.concat();
    sorted.sort((a, b)=>{
        return $42a19166d05576d2$export$520c40045967cb15(b) - $42a19166d05576d2$export$520c40045967cb15(a);
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
            const pointsOnPolygon = c.filter((point)=>$42a19166d05576d2$export$5fa2dd9499a076de(point, p));
            if (pointsOnPolygon.length !== c.length) return false;
            hit[j] = true;
            return true;
        }));
        ret.push(group);
    });
    return ret;
}
function $42a19166d05576d2$export$a9718a9904071bdb(target, poly) {
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
            if ($42a19166d05576d2$export$60d04f6074c4a6a5(currentSeg, seg)) {
                const p = $42a19166d05576d2$export$c2b04831d534c8e0(currentSeg, seg);
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
    const distList = cross.map((p)=>$42a19166d05576d2$export$79376507b09a66f(p, target[targetCrossIndex]));
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
function $42a19166d05576d2$export$93836cccefaa956d(polygons) {
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
function $42a19166d05576d2$export$85a47b3ccce199ed(range, gridSize, dX = 0, dY = 0) {
    const gridList = [];
    const minX = range.x;
    const maxX = range.x + range.width;
    const minY = range.y;
    const maxY = range.y + range.height;
    let x = minX + dX;
    while(x < maxX){
        if (minX < x && x < maxX) gridList.push([
            $42a19166d05576d2$export$202e0172ed3c7be0(x, minY),
            $42a19166d05576d2$export$202e0172ed3c7be0(x, maxY)
        ]);
        x += gridSize;
    }
    let y = minY + dY;
    while(y < maxY){
        if (minY < y && y < maxY) gridList.push([
            $42a19166d05576d2$export$202e0172ed3c7be0(minX, y),
            $42a19166d05576d2$export$202e0172ed3c7be0(maxX, y)
        ]);
        y += gridSize;
    }
    return gridList;
}
function $42a19166d05576d2$export$bb83c32694619426(org, dW, dH) {
    return {
        x: org.x - dW / 2,
        y: org.y - dH / 2,
        width: org.width + dW,
        height: org.height + dH
    };
}
function $42a19166d05576d2$export$dd4c8928dbf2da5d(org, scaleW, scaleH) {
    return $42a19166d05576d2$export$bb83c32694619426(org, org.width * (scaleW - 1), org.height * (scaleH - 1));
}
function $42a19166d05576d2$export$22a203dd8a99d3d1(from, to, rate) {
    return from * (1 - rate) + to * rate;
}
function $42a19166d05576d2$export$e59c1c31adf59555(from, to, rate) {
    return $42a19166d05576d2$export$202e0172ed3c7be0($42a19166d05576d2$export$22a203dd8a99d3d1(from.x, to.x, rate), $42a19166d05576d2$export$22a203dd8a99d3d1(from.y, to.y, rate));
}
/**
 * solve cubic equation for bezier3
 * throw if the equation does not have real solution in 0 <= t <= 1
 * @param a t^3 param
 * @param b t^2 param
 * @param c t param
 * @param d constant param
 * @return unique solution
 */ function $42a19166d05576d2$var$solveBezier3Fomula(a, b, c, d) {
    const list = $42a19166d05576d2$export$721a941b8db8dcde(a, b, c, d);
    if (list.length === 0) return 0;
    const ret = $42a19166d05576d2$var$getCloseInRangeValue(list, 0, 1);
    if (ret === undefined) throw new Error("Error: Cannot resolve uniquely in 0 <= t <= 1.");
    return Math.max(Math.min(ret, 1), 0);
}
function $42a19166d05576d2$export$721a941b8db8dcde(a, b, c, d) {
    if ($42a19166d05576d2$var$isCloseToZero(a)) return $42a19166d05576d2$export$b5a1995c4855c266(b, c, d);
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    const Z = -b / (3 * a);
    if ($42a19166d05576d2$var$isCloseToZero(p) && $42a19166d05576d2$var$isCloseToZero(q)) // triple real root
    return [
        Z
    ];
    const D = (27 * q * q + 4 * p * p * p) / 108;
    if ($42a19166d05576d2$var$isCloseToZero(D)) {
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
function $42a19166d05576d2$var$getCloseInRangeValue(values, min, max) {
    return values.find((val)=>{
        if (min <= val && val <= max) return true;
        if ($42a19166d05576d2$var$isCloseTo(val, min) || $42a19166d05576d2$var$isCloseTo(val, max)) return true;
        return false;
    });
}
function $42a19166d05576d2$var$isCloseTo(val, target) {
    return Math.abs(val - target) < $42a19166d05576d2$export$e1764cb99718e49f;
}
function $42a19166d05576d2$var$isCloseToZero(val) {
    return Math.abs(val) < $42a19166d05576d2$export$e1764cb99718e49f;
}
function $42a19166d05576d2$export$7d15b64cf5a3a4c4(min = -Infinity, max = Infinity, val) {
    return Math.max(Math.min(val, max), min);
}
function $42a19166d05576d2$export$b38acdfe4c38b83(min, max, val) {
    if (min === max) return min;
    if (max < val) return (val - max) % (max - min) + min;
    else if (val < min) return max - (min - val) % (max - min);
    else return val;
}
function $42a19166d05576d2$export$c5c0749208795ef4(min, max, val) {
    const harf = max - min;
    const length = 2 * harf;
    if (length === 0) return min;
    const d = Math.abs(val - min) % length;
    if (d < harf) return d + min;
    else return length - d + min;
}


const $4739f3f564343508$var$HTTP_SVG = "http://www.w3.org/2000/svg";
// Unary plus operator seems faster than native parseFloat
const $4739f3f564343508$var$_parseFloat = (v)=>+v;
const $4739f3f564343508$export$c884d9dcb329c3c = {
    bezierSplitSize: 10,
    ellipseSplitSize: 20
};
function $4739f3f564343508$export$e529deb2bfd496dc(ctx, pathInfo) {
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
function $4739f3f564343508$export$9167472d9dbc32b3(pathInfoList, x, y, width, height) {
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
            d: info.d.map((p)=>$42a19166d05576d2$export$202e0172ed3c7be0(p.x - minX, p.y - minY))
        }));
    // 伸縮
    const orgWidth = maxX - minX;
    const orgHeight = maxY - minY;
    const rateX = width / orgWidth;
    const rateY = height / orgHeight;
    const rate = Math.min(rateX, rateY);
    const scaledList = fromBaseList.map((info)=>Object.assign(Object.assign({}, info), {
            d: info.d.map((p)=>$42a19166d05576d2$export$202e0172ed3c7be0(p.x * rate, p.y * rate))
        }));
    // 矩形位置に移動
    const difX = x + (width - orgWidth * rate) / 2;
    const difY = y + (height - orgHeight * rate) / 2;
    const convertedList = scaledList.map((info)=>Object.assign(Object.assign({}, info), {
            d: info.d.map((p)=>$42a19166d05576d2$export$202e0172ed3c7be0(p.x + difX, p.y + difY)),
            included: (info.included || []).map((poly)=>{
                return poly.map((p)=>$42a19166d05576d2$export$202e0172ed3c7be0((p.x - minX) * rate + difX, (p.y - minY) * rate + difY));
            })
        }));
    return convertedList;
}
function $4739f3f564343508$export$f24e17869322fd61(svgString) {
    const domParser = new DOMParser();
    const svgDom = domParser.parseFromString(svgString, "image/svg+xml");
    const svgTags = svgDom.getElementsByTagName("svg");
    if (!svgTags || svgTags.length === 0) return [];
    return $4739f3f564343508$export$ceb6fd9d476d0ad7(svgTags[0]);
}
/**
 * parse SVG tree
 * @param elm SVGElement
 * @return path informations
 */ function $4739f3f564343508$var$parseSvgTree(elm, parentInfo) {
    var _a, _b;
    const style = Object.assign(Object.assign({}, (_a = parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.style) !== null && _a !== void 0 ? _a : {}), $4739f3f564343508$export$ea651f49739595b5(elm));
    const transformStr = elm.getAttribute("transform");
    const parentTransform = (_b = parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.transform) !== null && _b !== void 0 ? _b : $42a19166d05576d2$export$6b37290cfd5aead9;
    let ret = [];
    const svgPath = $4739f3f564343508$var$parseSVGShape(elm);
    if (svgPath) ret.push(Object.assign(Object.assign({}, svgPath), {
        d: svgPath.d.map((v)=>$42a19166d05576d2$export$8cb23e22f8f81351(parentTransform, v))
    }));
    if (elm.children.length > 0) {
        const transform = transformStr ? $42a19166d05576d2$export$defd75fdf417c537(parentTransform, $4739f3f564343508$export$99f660e5a014b917(transformStr)) : parentTransform;
        Array.from(elm.children).forEach((child)=>{
            ret = ret.concat($4739f3f564343508$var$parseSvgTree(child, {
                style: style,
                transform: transform
            }));
        });
    }
    return ret;
}
function $4739f3f564343508$var$parseSVGShape(elm) {
    switch(elm.tagName.toLowerCase()){
        case "path":
            return {
                d: $4739f3f564343508$export$8ccf933b0513f8d0(elm),
                style: $4739f3f564343508$export$ea651f49739595b5(elm)
            };
        case "rect":
            return {
                d: $4739f3f564343508$export$b0107eabf4066626(elm),
                style: $4739f3f564343508$export$ea651f49739595b5(elm)
            };
        case "ellipse":
            return {
                d: $4739f3f564343508$export$dc2e748a816b89ef(elm),
                style: $4739f3f564343508$export$ea651f49739595b5(elm)
            };
        case "circle":
            return {
                d: $4739f3f564343508$export$347295f3a35d1b04(elm),
                style: $4739f3f564343508$export$ea651f49739595b5(elm)
            };
        default:
            return undefined;
    }
}
function $4739f3f564343508$export$ceb6fd9d476d0ad7(svgTag) {
    return $4739f3f564343508$var$parseSvgTree(svgTag);
}
function $4739f3f564343508$export$10b46c17039f4ee5(command) {
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
function $4739f3f564343508$export$566d17fc995038e9(fontPath) {
    const pathInfoList = [];
    let current = "";
    fontPath.commands.forEach((c)=>{
        current += $4739f3f564343508$export$10b46c17039f4ee5(c) + " ";
        if (current && c.type.toUpperCase() === "Z") {
            const pathList = $4739f3f564343508$export$4d4f451a69577108(current);
            pathInfoList.push({
                d: pathList,
                style: Object.assign(Object.assign({}, $4739f3f564343508$export$712f75a7545ed530()), {
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
function $4739f3f564343508$var$parsePathSegmentRaw(segment) {
    if (segment.length === 8) return [
        segment[0],
        $4739f3f564343508$var$_parseFloat(segment[1]),
        $4739f3f564343508$var$_parseFloat(segment[2]),
        $4739f3f564343508$var$_parseFloat(segment[3]),
        segment[4] !== "0",
        segment[5] !== "0",
        $4739f3f564343508$var$_parseFloat(segment[6]),
        $4739f3f564343508$var$_parseFloat(segment[7])
    ];
    else {
        const [c, ...values] = segment;
        return [
            c,
            ...values.map($4739f3f564343508$var$_parseFloat)
        ];
    }
}
function $4739f3f564343508$export$9a6f66774133b5ba(dStr) {
    return $4739f3f564343508$export$2e40abba722fb6e(dStr).map((c)=>$4739f3f564343508$var$parsePathSegmentRaw(c));
}
function $4739f3f564343508$export$649ea7d53d441340(segs) {
    return segs.map($4739f3f564343508$export$d801e79c7e79af9).join(" ");
}
function $4739f3f564343508$export$d801e79c7e79af9(seg) {
    return seg.map((v)=>{
        if (v === true) return "1";
        else if (v === false) return "0";
        else return v.toString();
    }).join(" ");
}
function $4739f3f564343508$export$4c18b684aa252af0(dStr) {
    return $4739f3f564343508$var$_parsePathSegments($4739f3f564343508$export$9a6f66774133b5ba(dStr));
}
function $4739f3f564343508$var$_parsePathSegments(segments) {
    const ret = [];
    let startP = $42a19166d05576d2$export$202e0172ed3c7be0(0, 0);
    let currentP = startP;
    let currentControlP = startP;
    let currentBezier = 1;
    segments.forEach((current)=>{
        switch(current[0]){
            case "M":
                {
                    const p1 = $42a19166d05576d2$export$202e0172ed3c7be0(current[1], current[2]);
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
                    const p1 = $42a19166d05576d2$export$202e0172ed3c7be0(current[1], current[2]);
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
                    const p1 = $42a19166d05576d2$export$202e0172ed3c7be0(current[1], current[2]);
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
                    const p1 = $42a19166d05576d2$export$e16d8520af44a096(currentP, $42a19166d05576d2$export$202e0172ed3c7be0(current[1], current[2]));
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
                    const p1 = $42a19166d05576d2$export$202e0172ed3c7be0(current[1], p0.y);
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
                    const p1 = $42a19166d05576d2$export$202e0172ed3c7be0(current[1] + p0.x, p0.y);
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
                    const p1 = $42a19166d05576d2$export$202e0172ed3c7be0(p0.x, current[1]);
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
                    const p1 = $42a19166d05576d2$export$202e0172ed3c7be0(p0.x, current[1] + p0.y);
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
                    const p1 = $42a19166d05576d2$export$202e0172ed3c7be0(current[1], current[2]);
                    const p2 = $42a19166d05576d2$export$202e0172ed3c7be0(current[3], current[4]);
                    ret.push({
                        command: "Q",
                        lerpFn: $42a19166d05576d2$export$64a6049d45cf5beb([
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
                    const p1 = $42a19166d05576d2$export$e16d8520af44a096(p0, $42a19166d05576d2$export$202e0172ed3c7be0(current[1], current[2]));
                    const p2 = $42a19166d05576d2$export$e16d8520af44a096(p0, $42a19166d05576d2$export$202e0172ed3c7be0(current[3], current[4]));
                    ret.push({
                        command: "q",
                        lerpFn: $42a19166d05576d2$export$64a6049d45cf5beb([
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
                    const p1 = currentBezier === 2 ? $42a19166d05576d2$export$d5201b68c60913ce(currentControlP, p0) : p0;
                    const p2 = $42a19166d05576d2$export$202e0172ed3c7be0(current[1], current[2]);
                    ret.push({
                        command: "T",
                        lerpFn: $42a19166d05576d2$export$64a6049d45cf5beb([
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
                    const p1 = currentBezier === 2 ? $42a19166d05576d2$export$d5201b68c60913ce(currentControlP, p0) : p0;
                    const p2 = $42a19166d05576d2$export$e16d8520af44a096(p0, $42a19166d05576d2$export$202e0172ed3c7be0(current[1], current[2]));
                    ret.push({
                        command: "t",
                        lerpFn: $42a19166d05576d2$export$64a6049d45cf5beb([
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
                    const p1 = $42a19166d05576d2$export$202e0172ed3c7be0(current[1], current[2]);
                    const p2 = $42a19166d05576d2$export$202e0172ed3c7be0(current[3], current[4]);
                    const p3 = $42a19166d05576d2$export$202e0172ed3c7be0(current[5], current[6]);
                    ret.push({
                        command: "C",
                        lerpFn: $42a19166d05576d2$export$512a3af25faf9bbd([
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
                    const p1 = $42a19166d05576d2$export$e16d8520af44a096(p0, $42a19166d05576d2$export$202e0172ed3c7be0(current[1], current[2]));
                    const p2 = $42a19166d05576d2$export$e16d8520af44a096(p0, $42a19166d05576d2$export$202e0172ed3c7be0(current[3], current[4]));
                    const p3 = $42a19166d05576d2$export$e16d8520af44a096(p0, $42a19166d05576d2$export$202e0172ed3c7be0(current[5], current[6]));
                    ret.push({
                        command: "c",
                        lerpFn: $42a19166d05576d2$export$512a3af25faf9bbd([
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
                    const p1 = currentBezier === 3 ? $42a19166d05576d2$export$d5201b68c60913ce(currentControlP, p0) : p0;
                    const p2 = $42a19166d05576d2$export$202e0172ed3c7be0(current[1], current[2]);
                    const p3 = $42a19166d05576d2$export$202e0172ed3c7be0(current[3], current[4]);
                    ret.push({
                        command: "S",
                        lerpFn: $42a19166d05576d2$export$512a3af25faf9bbd([
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
                    const p1 = currentBezier === 3 ? $42a19166d05576d2$export$d5201b68c60913ce(currentControlP, p0) : p0;
                    const p2 = $42a19166d05576d2$export$e16d8520af44a096(p0, $42a19166d05576d2$export$202e0172ed3c7be0(current[1], current[2]));
                    const p3 = $42a19166d05576d2$export$e16d8520af44a096(p0, $42a19166d05576d2$export$202e0172ed3c7be0(current[3], current[4]));
                    ret.push({
                        command: "s",
                        lerpFn: $42a19166d05576d2$export$512a3af25faf9bbd([
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
                    const p1 = $42a19166d05576d2$export$202e0172ed3c7be0(current[6], current[7]);
                    ret.push({
                        command: "A",
                        lerpFn: $42a19166d05576d2$export$f0a1dd234d8c498c(rx, ry, p0, p1, large, sweep, radian),
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
                    const p1 = $42a19166d05576d2$export$e16d8520af44a096(p0, $42a19166d05576d2$export$202e0172ed3c7be0(current[6], current[7]));
                    ret.push({
                        command: "a",
                        lerpFn: $42a19166d05576d2$export$f0a1dd234d8c498c(rx, ry, p0, p1, large, sweep, radian),
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
function $4739f3f564343508$export$80460385208b7854(dStr, split = $4739f3f564343508$export$c884d9dcb329c3c.bezierSplitSize) {
    return $4739f3f564343508$export$4c18b684aa252af0(dStr).map((seg)=>({
            lerpFn: seg.curve ? seg.lerpFn : (t)=>$42a19166d05576d2$export$1bfe9e4b89f5e7d9(seg.segment[0], seg.segment[1], t),
            length: $42a19166d05576d2$export$e029b07aa8e85de4(seg.curve ? $42a19166d05576d2$export$aef8effa323ac3b3(seg.lerpFn, split) : seg.segment)
        }));
}
function $4739f3f564343508$export$7778653c861a18d7(structs) {
    return structs.reduce((p, s)=>p + s.length, 0);
}
function $4739f3f564343508$export$cf3eae7710f0aabd(dStr, split = $4739f3f564343508$export$c884d9dcb329c3c.bezierSplitSize) {
    return $4739f3f564343508$export$7778653c861a18d7($4739f3f564343508$export$80460385208b7854(dStr, split));
}
function $4739f3f564343508$export$d60e24de5abc127f(structs, distance) {
    let l = Math.max(distance, 0);
    for(let i = 0; i < structs.length; i++){
        const s = structs[i];
        if (l < s.length) return s.lerpFn(l / s.length);
        else l -= s.length;
    }
    return structs.length > 0 ? structs[structs.length - 1].lerpFn(1) : $42a19166d05576d2$export$202e0172ed3c7be0(0, 0);
}
function $4739f3f564343508$export$7d6b779419fb20e8(dStr, distance, split = $4739f3f564343508$export$c884d9dcb329c3c.bezierSplitSize) {
    return $4739f3f564343508$export$d60e24de5abc127f($4739f3f564343508$export$80460385208b7854(dStr, split), distance);
}
function $4739f3f564343508$var$getPathAbsPoints(segments) {
    const points = [];
    const controls = [];
    let seg;
    let startP = $42a19166d05576d2$export$202e0172ed3c7be0(0, 0);
    let absP = startP;
    let preC = startP;
    let preCType = 1;
    for(let i = 0; i < segments.length; i++){
        seg = segments[i];
        switch(seg[0]){
            case "M":
                {
                    const p = $42a19166d05576d2$export$202e0172ed3c7be0(seg[1], seg[2]);
                    startP = absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "m":
                {
                    const p = $42a19166d05576d2$export$e16d8520af44a096($42a19166d05576d2$export$202e0172ed3c7be0(seg[1], seg[2]), absP);
                    startP = absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "L":
                {
                    const p = $42a19166d05576d2$export$202e0172ed3c7be0(seg[1], seg[2]);
                    startP !== null && startP !== void 0 ? startP : startP = p;
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "l":
                {
                    const p = $42a19166d05576d2$export$e16d8520af44a096($42a19166d05576d2$export$202e0172ed3c7be0(seg[1], seg[2]), absP);
                    startP !== null && startP !== void 0 ? startP : startP = p;
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "H":
                {
                    const p = $42a19166d05576d2$export$202e0172ed3c7be0(seg[1], absP.y);
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "h":
                {
                    const p = $42a19166d05576d2$export$202e0172ed3c7be0(seg[1] + absP.x, absP.y);
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "V":
                {
                    const p = $42a19166d05576d2$export$202e0172ed3c7be0(absP.x, seg[1]);
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "v":
                {
                    const p = $42a19166d05576d2$export$202e0172ed3c7be0(absP.x, seg[1] + absP.y);
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "Q":
                {
                    const p = $42a19166d05576d2$export$202e0172ed3c7be0(seg[1], seg[2]);
                    preC = p;
                    absP = $42a19166d05576d2$export$202e0172ed3c7be0(seg[3], seg[4]);
                    preCType = 2;
                    break;
                }
            case "q":
                {
                    const p = $42a19166d05576d2$export$202e0172ed3c7be0(seg[1] + absP.x, seg[2] + absP.y);
                    preC = p;
                    absP = $42a19166d05576d2$export$202e0172ed3c7be0(seg[3] + absP.x, seg[4] + absP.y);
                    preCType = 2;
                    break;
                }
            case "T":
                {
                    const p = preCType === 2 ? $42a19166d05576d2$export$1bfe9e4b89f5e7d9(preC, absP, 2) : absP;
                    preC = p;
                    absP = $42a19166d05576d2$export$202e0172ed3c7be0(seg[1], seg[2]);
                    preCType = 2;
                    break;
                }
            case "t":
                {
                    const p = preCType === 2 ? $42a19166d05576d2$export$1bfe9e4b89f5e7d9(preC, absP, 2) : absP;
                    preC = p;
                    absP = $42a19166d05576d2$export$202e0172ed3c7be0(seg[1] + absP.x, seg[2] + absP.y);
                    preCType = 2;
                    break;
                }
            case "C":
                {
                    const p = $42a19166d05576d2$export$202e0172ed3c7be0(seg[3], seg[4]);
                    preC = p;
                    absP = $42a19166d05576d2$export$202e0172ed3c7be0(seg[5], seg[6]);
                    preCType = 3;
                    break;
                }
            case "c":
                {
                    const p = $42a19166d05576d2$export$202e0172ed3c7be0(seg[3] + absP.x, seg[4] + absP.y);
                    preC = p;
                    absP = $42a19166d05576d2$export$202e0172ed3c7be0(seg[5] + absP.x, seg[6] + absP.y);
                    preCType = 3;
                    break;
                }
            case "S":
                {
                    const p = preCType === 3 ? $42a19166d05576d2$export$1bfe9e4b89f5e7d9(preC, absP, 2) : absP;
                    preC = p;
                    absP = $42a19166d05576d2$export$202e0172ed3c7be0(seg[3], seg[4]);
                    preCType = 3;
                    break;
                }
            case "s":
                {
                    const p = preCType === 3 ? $42a19166d05576d2$export$1bfe9e4b89f5e7d9(preC, absP, 2) : absP;
                    preC = p;
                    absP = $42a19166d05576d2$export$202e0172ed3c7be0(seg[3] + absP.x, seg[4] + absP.y);
                    preCType = 3;
                    break;
                }
            case "A":
                {
                    const p = $42a19166d05576d2$export$202e0172ed3c7be0(seg[6], seg[7]);
                    absP = preC = p;
                    preCType = 1;
                    break;
                }
            case "a":
                {
                    const p = $42a19166d05576d2$export$202e0172ed3c7be0(seg[6] + absP.x, seg[7] + absP.y);
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
                throw $4739f3f564343508$var$getUnknownError();
        }
        controls.push(preC);
        points.push(absP);
    }
    return {
        points: points,
        controls: controls
    };
}
function $4739f3f564343508$var$isCurveCommand(c) {
    return /Q|q|T|t|C|c|S|s|A|a/.test(c);
}
function $4739f3f564343508$export$48a03785919bd95c(segments) {
    if (segments.length < 2) return segments;
    const ret = [];
    const { points: absPoints , controls: absContolPoints  } = $4739f3f564343508$var$getPathAbsPoints(segments);
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
                    if ($4739f3f564343508$var$isCurveCommand(ret[ret.length - 1][0])) ret.push([
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
                    if ($4739f3f564343508$var$isCurveCommand(ret[ret.length - 1][0])) ret.push([
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
                    if ($4739f3f564343508$var$isCurveCommand(ret[ret.length - 1][0])) ret.push([
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
                    if ($4739f3f564343508$var$isCurveCommand(ret[ret.length - 1][0])) ret.push([
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
function $4739f3f564343508$export$6b790dc62d315a41(segments, diff) {
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
function $4739f3f564343508$export$5051f29c6bc7129e(segments, scale) {
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
function $4739f3f564343508$var$convertHVToL(segments) {
    // If neither "H" nor "V" exists, abstract points doesn't have to be computed.
    const absVHExisted = segments.some((s)=>/H|V/.test(s[0]));
    const { points: points  } = $4739f3f564343508$var$getPathAbsPoints(absVHExisted ? segments : []);
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
function $4739f3f564343508$export$4a61cfef64167fa8(segments, radian) {
    const sin = Math.sin(radian);
    const cos = Math.cos(radian);
    return $4739f3f564343508$var$convertHVToL(segments).map((current)=>{
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
function $4739f3f564343508$export$4d4f451a69577108(dStr, split = $4739f3f564343508$export$c884d9dcb329c3c.bezierSplitSize) {
    const _split = Math.max(1, split);
    let ret = [];
    let step = 1 / _split;
    $4739f3f564343508$export$4c18b684aa252af0(dStr).forEach((seg)=>{
        if (seg.command === "Z" || seg.command === "z") return;
        if (seg.curve) for(let i = 1; i <= _split; i++)ret.push(seg.lerpFn(step * i));
        else ret.push(seg.segment[1]);
    });
    return ret;
}
function $4739f3f564343508$export$8ccf933b0513f8d0(svgPath) {
    const dStr = svgPath.getAttribute("d");
    return dStr ? $4739f3f564343508$export$c904ad00c567a3a6(svgPath.getAttribute("transform"), $4739f3f564343508$export$4d4f451a69577108(dStr)) : [];
}
function $4739f3f564343508$export$b0107eabf4066626(svgRect) {
    const x = $4739f3f564343508$var$_parseFloat(svgRect.getAttribute("x") || "0");
    const y = $4739f3f564343508$var$_parseFloat(svgRect.getAttribute("y") || "0");
    const width = $4739f3f564343508$var$_parseFloat(svgRect.getAttribute("width") || "0");
    const height = $4739f3f564343508$var$_parseFloat(svgRect.getAttribute("height") || "0");
    // トランスフォーム
    return $4739f3f564343508$export$c904ad00c567a3a6(svgRect.getAttribute("transform"), [
        $42a19166d05576d2$export$202e0172ed3c7be0(x, y),
        $42a19166d05576d2$export$202e0172ed3c7be0(x + width, y),
        $42a19166d05576d2$export$202e0172ed3c7be0(x + width, y + height),
        $42a19166d05576d2$export$202e0172ed3c7be0(x, y + height)
    ]);
}
function $4739f3f564343508$export$dc2e748a816b89ef(svgEllipse) {
    const cx = $4739f3f564343508$var$_parseFloat(svgEllipse.getAttribute("cx") || "0");
    const cy = $4739f3f564343508$var$_parseFloat(svgEllipse.getAttribute("cy") || "0");
    const rx = $4739f3f564343508$var$_parseFloat(svgEllipse.getAttribute("rx") || "1");
    const ry = $4739f3f564343508$var$_parseFloat(svgEllipse.getAttribute("ry") || "1");
    // トランスフォーム
    return $4739f3f564343508$export$c904ad00c567a3a6(svgEllipse.getAttribute("transform"), $42a19166d05576d2$export$2d3e06704631d4b1(rx, ry, 0, Math.PI * 2, $42a19166d05576d2$export$202e0172ed3c7be0(cx, cy), 0, $4739f3f564343508$export$c884d9dcb329c3c.ellipseSplitSize));
}
function $4739f3f564343508$export$347295f3a35d1b04(svgCircle) {
    const cx = $4739f3f564343508$var$_parseFloat(svgCircle.getAttribute("cx") || "0");
    const cy = $4739f3f564343508$var$_parseFloat(svgCircle.getAttribute("cy") || "0");
    const r = $4739f3f564343508$var$_parseFloat(svgCircle.getAttribute("r") || "1");
    // トランスフォーム
    return $4739f3f564343508$export$c904ad00c567a3a6(svgCircle.getAttribute("transform"), $42a19166d05576d2$export$2d3e06704631d4b1(r, r, 0, Math.PI * 2, $42a19166d05576d2$export$202e0172ed3c7be0(cx, cy), 0, $4739f3f564343508$export$c884d9dcb329c3c.ellipseSplitSize));
}
function $4739f3f564343508$export$c904ad00c567a3a6(commandStr, points) {
    if (!commandStr) return points;
    let ret = $42a19166d05576d2$export$67b7da414b044aeb(points);
    // 複数コマンドの場合もあるのでループ
    const commandList = commandStr.split(/\)/);
    commandList.forEach((current)=>{
        const tmp = current.split(/\(/);
        if (tmp.length === 2) {
            const command = tmp[0].trim().toLowerCase();
            const params = $4739f3f564343508$var$parseNumbers(tmp[1]);
            switch(command){
                case "matrix":
                    ret = $42a19166d05576d2$export$51186ad6e864892a(ret, params);
                    break;
                case "translate":
                    ret = ret.map((p)=>$42a19166d05576d2$export$202e0172ed3c7be0(p.x + params[0], p.y + params[1]));
                    break;
                case "scale":
                    {
                        const scaleX = params[0];
                        // XY等倍の場合を考慮
                        let scaleY = params[0];
                        if (params.length > 1) scaleY = params[1];
                        ret = ret.map((p)=>$42a19166d05576d2$export$202e0172ed3c7be0(p.x * scaleX, p.y * scaleY));
                        break;
                    }
                case "rotate":
                    {
                        // 回転基準点
                        let base = $42a19166d05576d2$export$202e0172ed3c7be0(0, 0);
                        if (params.length > 2) base = $42a19166d05576d2$export$202e0172ed3c7be0(params[1], params[2]);
                        ret = ret.map((p)=>$42a19166d05576d2$export$bb628a54ab399bc9(p, params[0] * Math.PI / 180, base));
                        break;
                    }
                case "skewx":
                    ret = ret.map((p)=>$42a19166d05576d2$export$202e0172ed3c7be0(p.x + Math.tan(params[0] * Math.PI / 180) * p.y, p.y));
                    break;
                case "skewy":
                    ret = ret.map((p)=>$42a19166d05576d2$export$202e0172ed3c7be0(p.x, p.y + Math.tan(params[0] * Math.PI / 180) * p.x));
                    break;
            }
        }
    });
    return ret;
}
// All commands (BbRr isn't supported)
const $4739f3f564343508$var$allCommand = /M|m|L|l|H|h|V|v|C|c|S|s|Q|q|T|t|A|a|Z|z/g;
function $4739f3f564343508$export$2e40abba722fb6e(dString) {
    // 要素分割
    const strList = dString.replace($4739f3f564343508$var$allCommand, " $& ")// Insert space before each signature, but don't destruct exponent exporession such as 2.2e-10.
    .replace(/([^e])(-|\+)/g, "$1 $2").split(/,| /).filter((str)=>str);
    // 直前のコマンド
    let pastCommand = "M";
    const ret = [];
    for(let i = 0; i < strList.length;){
        const info = [];
        // Check if a command exists
        if (strList[i].match($4739f3f564343508$var$allCommand)) {
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
                throw $4739f3f564343508$var$getUnknownError();
        }
        ret.push(info);
    }
    return ret;
}
function $4739f3f564343508$export$fcd3e6bef03de9b5(pathList) {
    const svg = $4739f3f564343508$export$23fffd85f6e7bf10(pathList);
    const xmlSerializer = new XMLSerializer();
    const textXml = xmlSerializer.serializeToString(svg);
    return textXml;
}
function $4739f3f564343508$export$23fffd85f6e7bf10(pathList) {
    const dom = document.createElementNS($4739f3f564343508$var$HTTP_SVG, "svg");
    // キャンバスサイズ
    let width = 1;
    let height = 1;
    pathList.forEach((path)=>{
        dom.appendChild($4739f3f564343508$export$2e1620420525139f(path.d, path.style));
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
function $4739f3f564343508$export$2e1620420525139f(pointList, style) {
    const dom = document.createElementNS($4739f3f564343508$var$HTTP_SVG, "path");
    dom.setAttribute("d", $4739f3f564343508$export$b17447bcace34a38(pointList));
    dom.setAttribute("style", $4739f3f564343508$export$71fc5f2a8ce00485(style));
    return dom;
}
function $4739f3f564343508$export$b17447bcace34a38(pointList, open) {
    if (pointList.length === 0) return "";
    const [head, ...body] = pointList;
    return `M ${head.x},${head.y}` + body.map((p)=>` L ${p.x},${p.y}`).join("") + (open ? "" : " Z");
}
function $4739f3f564343508$export$712f75a7545ed530() {
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
function $4739f3f564343508$export$ea651f49739595b5(svgPath) {
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
                ret.lineWidth = $4739f3f564343508$var$_parseFloat(val);
                break;
            case "stroke-opacity":
                ret.strokeGlobalAlpha = $4739f3f564343508$var$_parseFloat(val);
                break;
            case "fill-opacity":
                ret.fillGlobalAlpha = $4739f3f564343508$var$_parseFloat(val);
                break;
            case "stroke-linecap":
                ret.lineCap = val;
                break;
            case "stroke-linejoin":
                ret.lineJoin = val;
                break;
            case "stroke-dasharray":
                if (val.toLowerCase() === "none") ret.lineDash = [];
                else ret.lineDash = $4739f3f564343508$var$parseNumbers(val);
                break;
            default:
                break;
        }
        return ret;
    }, $4739f3f564343508$export$712f75a7545ed530());
}
function $4739f3f564343508$export$71fc5f2a8ce00485(style) {
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
function $4739f3f564343508$export$824c337f43f2b64d(path, line) {
    let splited = $42a19166d05576d2$export$2757549f1e61727a(path.d, line);
    if (splited.length < 2) return [
        path
    ];
    // 本体と回転方向が一致しているかで分類
    const rootLoopwise = $42a19166d05576d2$export$a818964288006665(path.d);
    const sameLoopwiseList = [];
    const oppositeLoopwiseList = [];
    if (path.included) path.included.forEach((s)=>{
        if ($42a19166d05576d2$export$a818964288006665(s) === rootLoopwise) sameLoopwiseList.push(s);
        else oppositeLoopwiseList.push(s);
    });
    // 本体と同回転のものはそのまま分割
    sameLoopwiseList.forEach((poly)=>{
        const sp = $42a19166d05576d2$export$2757549f1e61727a(poly, line);
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
        const sp = $42a19166d05576d2$export$2757549f1e61727a(poly, line);
        if (sp.length > 0) // 分割されたらブーリアン差をとるために集める
        notPolyList.push(poly);
        else // 分割なしならそのまま
        splited.push(poly);
    });
    // 切断されたくり抜き領域を差し引いたポリゴンを生成
    const splitedAfterNot = splited.map((s)=>notPolyList.reduce((p, c)=>$42a19166d05576d2$export$a9718a9904071bdb(p, c), s));
    return $42a19166d05576d2$export$301d301794861250(splitedAfterNot).map((group)=>{
        const [d, ...included] = group;
        return {
            d: d,
            included: included,
            style: path.style
        };
    });
}
function $4739f3f564343508$export$ddb6741fe18661da(polygons, style = $4739f3f564343508$export$712f75a7545ed530()) {
    return $42a19166d05576d2$export$301d301794861250(polygons).map((group)=>{
        const [d, ...included] = group;
        return {
            d: d,
            included: included,
            style: style
        };
    });
}
function $4739f3f564343508$export$5e4a93171a2cecef(matrix) {
    return `matrix(${matrix.join(",")})`;
}
function $4739f3f564343508$export$99f660e5a014b917(transformStr) {
    const transformStrList = transformStr.split(")").map((s)=>`${s})`);
    const affines = transformStrList.map((str)=>$4739f3f564343508$var$parseUnitTransform(str));
    return $42a19166d05576d2$export$39e2946afec0625e(affines);
}
function $4739f3f564343508$var$parseUnitTransform(str) {
    if (/translateX/.test(str)) return $4739f3f564343508$export$cfbb7daae60df2da(str);
    if (/translateY/.test(str)) return $4739f3f564343508$export$55034416ce644b0b(str);
    if (/translate/.test(str)) return $4739f3f564343508$export$8ea33f091e4ee473(str);
    if (/skewX/.test(str)) return $4739f3f564343508$export$4ee10febcc0667ba(str);
    if (/skewY/.test(str)) return $4739f3f564343508$export$526b0abc787d6147(str);
    if (/scaleX/.test(str)) return $4739f3f564343508$export$a7334c33d5322834(str);
    if (/scaleY/.test(str)) return $4739f3f564343508$export$c57105ed5304910(str);
    if (/scale/.test(str)) return $4739f3f564343508$export$534b094a708572c1(str);
    if (/rotate/.test(str)) return $4739f3f564343508$export$48229fbd5ecbd4ac(str);
    if (/matrix/.test(str)) return $4739f3f564343508$export$ecbfee2fb71e332e(str);
    return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
    ];
}
function $4739f3f564343508$var$parseNumbers(str) {
    const list = str.trim().replace(/,/g, " ").split(/ +/);
    return list.map((s)=>$4739f3f564343508$var$_parseFloat(s));
}
function $4739f3f564343508$export$8ea33f091e4ee473(str) {
    const splited = str.match(/translate\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
    ];
    const numbers = $4739f3f564343508$var$parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
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
function $4739f3f564343508$export$cfbb7daae60df2da(str) {
    const splited = str.match(/translateX\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
    ];
    const numbers = $4739f3f564343508$var$parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
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
function $4739f3f564343508$export$55034416ce644b0b(str) {
    const splited = str.match(/translateY\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
    ];
    const numbers = $4739f3f564343508$var$parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
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
function $4739f3f564343508$export$4ee10febcc0667ba(str) {
    const splited = str.match(/skewX\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
    ];
    const numbers = $4739f3f564343508$var$parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
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
function $4739f3f564343508$export$526b0abc787d6147(str) {
    const splited = str.match(/skewY\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
    ];
    const numbers = $4739f3f564343508$var$parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
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
function $4739f3f564343508$export$534b094a708572c1(str) {
    const splited = str.match(/scale\((.+)\)/);
    if (!splited || splited.length < 2) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
    ];
    const numbers = $4739f3f564343508$var$parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
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
function $4739f3f564343508$export$a7334c33d5322834(str) {
    const splited = str.match(/scaleX\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
    ];
    const numbers = $4739f3f564343508$var$parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
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
function $4739f3f564343508$export$c57105ed5304910(str) {
    const splited = str.match(/scaleY\((.+)\)/);
    if (!splited || splited.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
    ];
    const numbers = $4739f3f564343508$var$parseNumbers(splited[1]);
    if (numbers.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
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
function $4739f3f564343508$export$48229fbd5ecbd4ac(str) {
    const splited = str.match(/rotate\((.+)\)/);
    if (!splited || splited.length < 2) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
    ];
    const numbers = $4739f3f564343508$var$parseNumbers(splited[1]);
    if ($4739f3f564343508$var$parseNumbers.length < 1) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
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
    if (numbers.length > 2) return $42a19166d05576d2$export$defd75fdf417c537($42a19166d05576d2$export$defd75fdf417c537([
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
function $4739f3f564343508$export$ecbfee2fb71e332e(str) {
    const splited = str.match(/matrix\((.+)\)/);
    if (!splited || splited.length < 2) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
    ];
    const numbers = $4739f3f564343508$var$parseNumbers(splited[1]);
    if (numbers.length < 5) return [
        ...$42a19166d05576d2$export$6b37290cfd5aead9
    ];
    return numbers.slice(0, 6);
}
function $4739f3f564343508$var$getUnknownError() {
    return new Error(`Unexpected error`);
}



//# sourceMappingURL=index.99b46b95.js.map
