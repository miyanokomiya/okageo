parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"8iHP":[function(require,module,exports) {
"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(r){for(var t,n=1,e=arguments.length;n<e;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(r[o]=t[o]);return r}).apply(this,arguments)};function t(r,t){return{x:r.x+t.x,y:r.y+t.y}}function n(r,t){return{x:r.x-t.x,y:r.y-t.y}}function e(r,t){return{x:r.x*t,y:r.y*t}}function o(r,t){var e=n(r,t);return Math.abs(e.x)<exports.MINVALUE&&Math.abs(e.y)<exports.MINVALUE}function x(r,t){var e=n(r,t);return Math.sqrt(e.x*e.x+e.y*e.y)}function a(r){return x(r,{x:0,y:0})}function u(r){return a(r)<exports.MINVALUE}function s(r){var t=a(r);if(t<exports.MINVALUE)throw new Error("cannot get unit vector of zero vector");return e(r,1/t)}function i(r,t){return r.x*t.y-r.y*t.x}function y(r,t){return r.x*t.x+r.y*t.y}function f(t){return t.map(function(t){return r({},t)})}function p(r,n){return e(t(r,n),.5)}function c(r,t){void 0===t&&(t={x:0,y:0});var e=n(r,t);return Math.atan2(e.y,e.x)}function h(r,o){return void 0===o&&(o={x:0,y:0}),t(e(n(o,r),2),r)}function v(r,e,o){void 0===o&&(o={x:0,y:0});var x=n(r,o);return t({x:Math.cos(e)*x.x-Math.sin(e)*x.y,y:Math.sin(e)*x.x+Math.cos(e)*x.y},o)}function l(r,t,n){if(0===r)return 0===t?[]:[-n/t];var e=t*t-4*r*n;if(e<0)return[];var o=.5/r;if(0===e)return[-t*o];var x=Math.sqrt(e);return[(-t+x)*o,(-t-x)*o]}function g(r,o){if(2!==o.length)throw new Error("line must be length = 2");var x=o[0],a=n(o[1],x);return t(x,e(a,y(a,n(r,x))/y(a,a)))}function M(r,t,n,e,o){var x=o.x-e.x,a=o.y-e.y,u=r.x-2*t.x+n.x,s=2*(t.x-r.x),i=r.x,y=r.y-2*t.y+n.y,f=2*(t.y-r.y),p=r.y;return l(u*a-x*y,s*a-x*f,a*i-a*e.x-x*p+x*e.y)}function d(r,t,n,e,o){return M(r,t,n,e,o).filter(function(r){return 0<=r&&r<=1}).map(function(e){return{x:(n.x-2*t.x+r.x)*e*e+2*(t.x-r.x)*e+r.x,y:(n.y-2*t.y+r.y)*e*e+2*(t.y-r.y)*e+r.y}})}function E(r,t){var n=r[0].x,e=r[0].y,o=r[1].x,x=r[1].y,a=t[0].x,u=t[0].y,s=t[1].x,i=t[1].y;return((n-o)*(u-e)+(e-x)*(n-a))*((n-o)*(i-e)+(e-x)*(n-s))<0&&((a-s)*(e-u)+(u-i)*(a-n))*((a-s)*(x-u)+(u-i)*(a-o))<0}function b(r,t){var n=i(r,t);return Math.abs(n)<exports.MINVALUE}function m(r,t){return u(n(r,g(r,t)))}function O(t,e){if(b(n(t[0],t[1]),n(e[0],e[1])))return null;if(m(t[0],e))return r({},t[0]);if(m(t[1],e))return r({},t[1]);var o=((e[1].x-e[0].x)*(t[0].y-e[0].y)-(e[1].y-e[0].y)*(t[0].x-e[0].x))/2,x=o/(o+((e[1].x-e[0].x)*(e[0].y-t[1].y)-(e[1].y-e[0].y)*(e[0].x-t[1].x))/2);return 0<x&&x<1?{x:t[0].x+(t[1].x-t[0].x)*x,y:t[0].y+(t[1].y-t[0].y)*x}:null}function w(r,t){return!(!o(r[0],t[0])||!o(r[1],t[1]))||!(!o(r[0],t[1])||!o(r[1],t[0]))}function A(r,t){var n=[],e=[],o=[];if(r.forEach(function(x,a){var u=O([x,r[(a+1)%r.length]],t);n.push(x),u&&(n.push(u),e.push(a+1+e.length),o.push(u))}),e.length%2!=0)return[];var x=c(t[0],t[1]);o.sort(function(r,t){return v(r,-x).x-v(t,-x).x});for(var a=[],u=0;u<o.length-1;u+=2){for(var s=[o[u],o[u+1]],i=!1,y=0;y<r.length;y++)if(w(s,[r[y],r[(y+1)%r.length]])){i=!0;break}if(!i){a=s;break}}if(2!==a.length)return[];var f=o.concat(),p=f.indexOf(a[0]);-1!==p&&f.splice(p,1),-1!==(p=f.indexOf(a[1]))&&f.splice(p,1);var h=n.concat();f.forEach(function(r){var t=h.indexOf(r);h.splice(t,1)}),o=a;var l=(n=h).indexOf(o[0]),g=n.indexOf(o[1]);if(-1===l||-1===g)return[];(e=[])[0]=Math.min(l,g),e[1]=Math.max(l,g);for(var M=[],d=[],E=0;E<=e[0];E++)d.push({x:n[E].x,y:n[E].y});for(E=e[1];E<n.length;E++)d.push({x:n[E].x,y:n[E].y});M.push(d),d=[];for(E=e[0];E<=e[1];E++)d.push({x:n[E].x,y:n[E].y});M.push(d);var b=[];return M.forEach(function(r){var n=A(r,t);0===n.length?b.push(r):(b.push(n[0]),b.push(n[1]))}),b}function P(r){for(var t=B(r=C(r)),e=0,o=0,x=[];t.length>=3;){var u=t.concat();u.sort(function(r,t){return a(t)-a(r)}),e=t.indexOf(u[0]);var s=I(t,e);if(s)t.splice(e,1);else{var y=t.length;o=i(n(t[(e+1)%y],t[e]),n(t[e-1<0?y-1:e-1],t[e]));for(var f=e;!s;){if(i(n(t[((f=(f+1)%y)+1)%y],t[f]),n(t[f-1<0?y-1:f-1],t[f]))*o>0&&(s=I(t,f)),f===e)throw new Error("failed to split triangles")}t.splice(f,1)}x.push(s)}return x}function I(r,t){var n=r.length,e=r[t],o=r[(t+1)%n],x=r[t-1<0?n-1:t-1],a=[e,o,x],u=!1;return r.some(function(r){return r!==e&&r!==o&&r!==x&&S(a,r)&&(u=!0),u}),u?null:a}function S(r,t){var e=n(r[1],r[0]),o=n(r[2],r[1]),x=n(r[0],r[2]),a=n(t,r[0]),u=n(t,r[1]),s=n(t,r[2]),y=i(e,u),f=i(o,s),p=i(x,a);return y>=0&&f>=0&&p>=0||y<=0&&f<=0&&p<=0}function C(r){var t=r.concat();return-1===N(r)&&t.reverse(),t}function N(r){var t=R(r,!0);return t>0?1:t<0?-1:0}function R(r,t){if(void 0===t&&(t=!1),r.length<3)return 0;for(var n=0,e=r.length,o=0;o<e-1;o++)n+=(r[o].x-r[o+1].x)*(r[o].y+r[o+1].y);return n+=(r[e-1].x-r[0].x)*(r[e-1].y+r[0].y),n/=2,t||(n=Math.abs(n)),n}function U(r,t){var n=[],o=1/t;if(3===r.length)for(var x=0;x<=t;x++){var a=o*x,u=e(r[0],(1-a)*(1-a)),s=e(r[1],2*a*(1-a)),i=e(r[2],a*a);n.push({x:u.x+s.x+i.x,y:u.y+s.y+i.y})}else{if(4!==r.length)throw new Error("connot approximate");for(x=0;x<=t;x++){a=o*x,u=e(r[0],(1-a)*(1-a)*(1-a)),s=e(r[1],3*a*(1-a)*(1-a)),i=e(r[2],3*a*a*(1-a));var y=e(r[3],a*a*a);n.push({x:u.x+s.x+i.x+y.x,y:u.y+s.y+i.y+y.y})}}return n}function V(r,n,e,o,x,a,u){for(var s=[],i=(o-e)/u,y=0;y<=u;y++){var f=i*y+e-a;s.push(t(v({x:r*Math.cos(f),y:n*Math.sin(f)},a),x))}return s}function L(r,t,n,e,o,x,a,u){if(r*t==0)return[n,e];var s=_(n,e,r=Math.abs(r),t=Math.abs(t),a),i=s.centers;r*=s.radiusRate,t*=s.radiusRate;var y=null,f=0,p=0,c=q(n,r,y=o&&x||!o&&!x?N([n,e,i[0]])<0?i[0]:i[1]:N([n,e,i[0]])>0?i[0]:i[1],a),h=q(e,r,y,a);return x?c>h?(f=c-2*Math.PI,p=h):(f=c,p=h):c>h?(f=c,p=h):(f=c,p=h-2*Math.PI),V(r,t,f,p,y,a,u)}function q(r,t,n,e){r=v(r,-e,n);var o=Math.acos((r.x-n.x)/t);return r.y-n.y<0&&(o=-o+2*Math.PI),o+=e,o%=2*Math.PI}function _(r,t,n,e,o){r=v(r,-o),t=v(t,-o);var x=j({x:r.x/n,y:r.y/e},{x:t.x/n,y:t.y/e},1),a=x.centers,u={x:a[0].x*n,y:a[0].y*e},s={x:a[1].x*n,y:a[1].y*e};return{centers:[u=v(u,o),s=v(s,o)],radiusRate:x.radiusRate}}function j(r,t,n){var e=(r.x+t.x)/2,o=(r.x-t.x)/2,x=(r.y+t.y)/2,a=(r.y-t.y)/2,u=Math.sqrt(o*o+a*a),s=Math.pow(n/u,2)-1;if(s<0){var i=p(r,t);return{centers:[i,i],radiusRate:u/n}}var y=Math.sqrt(s);return{centers:[{x:e+a*y,y:x-o*y},{x:e-a*y,y:x+o*y}],radiusRate:1}}function k(r,t){var n=t[0],e=t[1],o=t[2],x=t[3],a=t[4],u=t[5];return r.map(function(r){return{x:n*r.x+o*r.y+a,y:e*r.x+x*r.y+u}})}function B(r){for(var t=r.concat(),n=r.length,e=0;e<n;e++){if(o(t[e],t[(e+1)%n])){t.splice(e,1),t=B(t);break}}return t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.MINVALUE=1e-6,exports.add=t,exports.sub=n,exports.multi=e,exports.isSame=o,exports.getDistance=x,exports.getNorm=a,exports.isZero=u,exports.getUnit=s,exports.getCross=i,exports.getInner=y,exports.cloneVectors=f,exports.getCenter=p,exports.getRadian=c,exports.getSymmetry=h,exports.rotate=v,exports.solveEquationOrder2=l,exports.getPedal=g,exports.getCrossLineAndBezier=d,exports.isCrossSegAndSeg=E,exports.isParallel=b,exports.isOnLine=m,exports.getCrossSegAndLine=O,exports.isSameSeg=w,exports.splitPolyByLine=A,exports.triangleSplit=P,exports.isPointOnTriangle=S,exports.convertLoopwise=C,exports.getLoopwise=N,exports.getArea=R,exports.approximateBezier=U,exports.approximateArc=V,exports.approximateArcWithPoint=L,exports.getEllipseCenter=_,exports.getCircleCenter=j,exports.transform=k,exports.omitSamePoint=B;
},{}],"ROsf":[function(require,module,exports) {
"use strict";var e=this&&this.__assign||function(){return(e=Object.assign||function(e){for(var t,a=1,r=arguments.length;a<r;a++)for(var s in t=arguments[a])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e}).apply(this,arguments)},t=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});var a=t(require("./geo"));function r(e,t){e.lineCap=t.style.lineCap,e.lineJoin=t.style.lineJoin,e.beginPath(),t.d.forEach(function(t,a){0===a?e.moveTo(t.x,t.y):e.lineTo(t.x,t.y)}),e.closePath(),t.style.fill&&(e.fillStyle=t.style.fillStyle,e.globalAlpha=t.style.fillGlobalAlpha,e.fill()),t.style.stroke&&(e.strokeStyle=t.style.strokeStyle,e.globalAlpha=t.style.strokeGlobalAlpha,e.lineWidth=t.style.lineWidth,e.setLineDash(t.style.lineDash),e.stroke()),e.globalAlpha=1}function s(t,a,r,s,l){var o=1/0,i=-1/0,n=1/0,p=-1/0;t.forEach(function(e){e.d.forEach(function(e){o=Math.min(o,e.x),i=Math.max(i,e.x),n=Math.min(n,e.y),p=Math.max(p,e.y)})});var c=t.map(function(t){return e({},t,{d:t.d.map(function(e){return{x:e.x-o,y:e.y-n}})})}),h=i-o,u=p-n,y=s/h,f=l/u,x=Math.min(y,f),g=c.map(function(t){return e({},t,{d:t.d.map(function(e){return{x:e.x*x,y:e.y*x}})})}),m=a+(s-h*x)/2,b=r+(l-u*x)/2;return g.map(function(t){return e({},t,{d:t.d.map(function(e){return{x:e.x+m,y:e.y+b}})})})}function l(e){var t=(new DOMParser).parseFromString(e,"image/svg+xml").getElementsByTagName("svg");return t&&0!==t.length?o(t[0]):[]}function o(e){for(var t=[],a=e.getElementsByTagName("path"),r=0;r<a.length;r++){var s=a[r];t.push({d:i(s),style:m(s)})}var l=e.getElementsByTagName("rect");for(r=0;r<l.length;r++){s=l[r];t.push({d:n(s),style:m(s)})}var o=e.getElementsByTagName("ellipse");for(r=0;r<o.length;r++){s=o[r];t.push({d:p(s),style:m(s)})}var h=e.getElementsByTagName("circle");for(r=0;r<h.length;r++){s=h[r];t.push({d:c(s),style:m(s)})}return t}function i(e){var t=[],r=e.getAttribute("d");if(!r)return[];var s=u(r),l={x:0,y:0},o={x:0,y:0};return s.forEach(function(e){var r=[],s=null,i=null,n=null,p=null;switch(e[0]){case"M":case"L":r.push({x:parseFloat(e[1]),y:parseFloat(e[2])});break;case"m":case"l":r.push({x:l.x+parseFloat(e[1]),y:l.y+parseFloat(e[2])});break;case"H":r.push({x:parseFloat(e[1]),y:l.y});break;case"V":r.push({x:l.x,y:parseFloat(e[1])});break;case"h":r.push({x:l.x+parseFloat(e[1]),y:l.y});break;case"v":r.push({x:l.x,y:l.y+parseFloat(e[1])});break;case"Q":s=l,i={x:parseFloat(e[1]),y:parseFloat(e[2])},n={x:parseFloat(e[3]),y:parseFloat(e[4])},(r=a.approximateBezier([s,i,n],exports.configs.bezierSplitSize)).shift();break;case"q":i={x:(s=l).x+parseFloat(e[1]),y:s.y+parseFloat(e[2])},n={x:s.x+parseFloat(e[3]),y:s.y+parseFloat(e[4])},(r=a.approximateBezier([s,i,n],exports.configs.bezierSplitSize)).shift();break;case"T":s=l,i=a.getSymmetry(s,o),n={x:parseFloat(e[1]),y:parseFloat(e[2])},(r=a.approximateBezier([s,i,n],exports.configs.bezierSplitSize)).shift();break;case"t":s=l,i=a.getSymmetry(s,o),n={x:s.x+parseFloat(e[1]),y:s.y+parseFloat(e[2])},(r=a.approximateBezier([s,i,n],exports.configs.bezierSplitSize)).shift();break;case"C":s=l,i={x:parseFloat(e[1]),y:parseFloat(e[2])},n={x:parseFloat(e[3]),y:parseFloat(e[4])},p={x:parseFloat(e[5]),y:parseFloat(e[6])},(r=a.approximateBezier([s,i,n,p],exports.configs.bezierSplitSize)).shift();break;case"c":i={x:(s=l).x+parseFloat(e[1]),y:s.y+parseFloat(e[2])},n={x:s.x+parseFloat(e[3]),y:s.y+parseFloat(e[4])},p={x:s.x+parseFloat(e[5]),y:s.y+parseFloat(e[6])},(r=a.approximateBezier([s,i,n,p],exports.configs.bezierSplitSize)).shift();break;case"S":s=l,i=a.getSymmetry(s,o),n={x:parseFloat(e[1]),y:parseFloat(e[2])},p={x:parseFloat(e[3]),y:parseFloat(e[4])},(r=a.approximateBezier([s,i,n,p],exports.configs.bezierSplitSize)).shift();break;case"s":s=l,i=a.getSymmetry(s,o),n={x:s.x+parseFloat(e[1]),y:s.y+parseFloat(e[2])},p={x:s.x+parseFloat(e[3]),y:s.y+parseFloat(e[4])},(r=a.approximateBezier([s,i,n,p],exports.configs.bezierSplitSize)).shift();break;case"A":s=l,i={x:parseFloat(e[6]),y:parseFloat(e[7])},(r=a.approximateArcWithPoint(parseFloat(e[1]),parseFloat(e[2]),s,i,!!parseInt(e[4],10),!!parseInt(e[5],10),parseFloat(e[3])/180*Math.PI,exports.configs.bezierSplitSize)).shift();break;case"a":i={x:(s=l).x+parseFloat(e[6]),y:s.y+parseFloat(e[7])},(r=a.approximateArcWithPoint(parseFloat(e[1]),parseFloat(e[2]),s,i,!!parseInt(e[4],10),!!parseInt(e[5],10),parseFloat(e[3])/180*Math.PI,exports.configs.bezierSplitSize)).shift()}r.length>0&&(l=r[r.length-1],t=t.concat(r),r.length>1&&(o=r[r.length-2]))}),t=h(e.getAttribute("transform"),t)}function n(e){var t=[],a=parseFloat(e.getAttribute("x")||"0"),r=parseFloat(e.getAttribute("y")||"0"),s=parseFloat(e.getAttribute("width")||"0"),l=parseFloat(e.getAttribute("height")||"0");return t.push({x:a,y:r}),t.push({x:a+s,y:r}),t.push({x:a+s,y:r+l}),t.push({x:a,y:r+l}),t=h(e.getAttribute("transform"),t)}function p(e){var t=[],r=parseFloat(e.getAttribute("cx")||"0"),s=parseFloat(e.getAttribute("cy")||"0"),l=parseFloat(e.getAttribute("rx")||"1"),o=parseFloat(e.getAttribute("ry")||"1");return t=a.approximateArc(l,o,0,2*Math.PI,{x:r,y:s},0,exports.configs.ellipseSplitSize),t=h(e.getAttribute("transform"),t)}function c(e){var t=[],r=parseFloat(e.getAttribute("cx")||"0"),s=parseFloat(e.getAttribute("cy")||"0"),l=parseFloat(e.getAttribute("r")||"1");return t=a.approximateArc(l,l,0,2*Math.PI,{x:r,y:s},0,exports.configs.ellipseSplitSize),t=h(e.getAttribute("transform"),t)}function h(e,t){if(!e)return t;var r=a.cloneVectors(t);return e.split(/\)/).forEach(function(e){var t=e.split(/\(/);if(2===t.length){var s=t[0],l=[];switch(t[1].split(/,/).forEach(function(e){return l.push(parseFloat(e))}),s.trim().toLowerCase()){case"matrix":r=a.transform(r,l);break;case"translate":r=r.map(function(e){return{x:e.x+l[0],y:e.y+l[1]}});break;case"scale":var o=l[0],i=l[0];l.length>1&&(i=l[1]),r=r.map(function(e){return{x:e.x*o,y:e.y*i}});break;case"rotate":var n={x:0,y:0};l.length>2&&(n={x:l[1],y:l[2]}),r=r.map(function(e){return a.rotate(e,l[0]*Math.PI/180,n)});break;case"skewx":r=r.map(function(e){return{x:e.x+Math.tan(l[0]*Math.PI/180)*e.y,y:e.y}});break;case"skewy":r=r.map(function(e){return{x:e.x,y:e.y+Math.tan(l[0]*Math.PI/180)*e.x}})}}}),r}function u(e){for(var t=/M|m|L|l|H|h|V|v|C|c|S|s|Q|q|T|t|A|a|Z|z/,a=e.trim().split(/,| /).filter(function(e){return e}),r="M",s=[],l=0;l<a.length;){var o=[];if(a[l].match(t)?(o[0]=a[l].trim(),r=o[0],l++):o[0]=r,o[0].match(/Z|z/))   ;else if(o[0].match(/V|v|H|h/))o=o.concat(a.slice(l,l+1)),l+=1;else if(o[0].match(/M|m|L|l|T|t/))o=o.concat(a.slice(l,l+2)),l+=2;else if(o[0].match(/Q|q|S|s/))o=o.concat(a.slice(l,l+4)),l+=4;else if(o[0].match(/C|c/))o=o.concat(a.slice(l,l+6)),l+=6;else{if(!o[0].match(/A|a/))break;o=o.concat(a.slice(l,l+7)),l+=7}s.push(o)}return s}function y(e){var t=f(e);return(new XMLSerializer).serializeToString(t)}function f(e){var t=document.createElementNS("http://www.w3.org/2000/svg","svg"),a=1,r=1;return e.forEach(function(e){t.appendChild(x(e.d,e.style)),e.d.forEach(function(e){a=Math.max(a,e.x),r=Math.max(r,e.y)})}),a*=1.1,r*=1.1,t.setAttribute("width",""+a),t.setAttribute("height",""+r),t}function x(e,t){var a=document.createElementNS("http://www.w3.org/2000/svg","path");return a.setAttribute("d",g(e)),a.setAttribute("style",b(t)),a}function g(e){var t="";return e.forEach(function(a,r){0===r?t+="M "+a.x+","+a.y:(t+=" L "+a.x+","+a.y,r===e.length-1&&(t+=" Z"))}),t}function m(e){var t={fill:!1,fillGlobalAlpha:1,fillStyle:"",lineCap:"butt",lineDash:[],lineJoin:"bevel",lineWidth:1,stroke:!1,strokeGlobalAlpha:1,strokeStyle:""},a={},r=e.getAttributeNode("style");r?r.value.split(";").forEach(function(e){var t=e.split(":");2===t.length&&(a[t[0].trim()]=t[1].trim())}):e.getAttributeNames().forEach(function(t){var r=e.getAttributeNode(t);r&&(a[r.name]=r.value)});return Object.keys(a).forEach(function(e){e=e.toLowerCase();var r=a[e];if("fill"===e)"none"===r?(t.fillStyle="",t.fill=!1):(t.fillStyle=r,t.fill=!0);else if("stroke"===e)"none"===r?(t.strokeStyle="",t.stroke=!1):(t.strokeStyle=r,t.stroke=!0);else if("stroke-width"===e)t.lineWidth=parseFloat(r);else if("stroke-opacity"===e)t.strokeGlobalAlpha=parseFloat(r);else if("fill-opacity"===e)t.fillGlobalAlpha=parseFloat(r);else if("stroke-linecap"===e)t.lineCap=r;else if("stroke-linejoin"===e)t.lineJoin=r;else if("stroke-dasharray"===e)if("none"===r.toLowerCase())t.lineDash=[];else{var s=r.split(",");t.lineDash=[],s.forEach(function(e){t.lineDash.push(parseFloat(e))})}}),t}function b(e){var t="";return e.fill?t+="fill:"+e.fillStyle+";":t+="fill:none;",e.fillGlobalAlpha&&(t+="fill-opacity:"+e.fillGlobalAlpha+";"),e.stroke?t+="stroke:"+e.strokeStyle+";":t+="stroke:none;",e.lineWidth&&(t+="stroke-width:"+e.lineWidth+";"),e.strokeGlobalAlpha&&(t+="stroke-opacity:"+e.strokeGlobalAlpha+";"),e.lineCap&&(t+="stroke-linecap:"+e.lineCap+";"),e.lineJoin&&(t+="stroke-linejoin:"+e.lineJoin+";"),e.lineDash&&(e.lineDash.length>0?t+="stroke-dasharray:"+e.lineDash.join(",")+";":t+="stroke-dasharray:none;"),t}exports.configs={bezierSplitSize:10,ellipseSplitSize:20},exports.draw=r,exports.fitRect=s,exports.parseSvgGraphicsStr=l,exports.parseSvgGraphics=o,exports.parsePath=i,exports.parseRect=n,exports.parseEllipse=p,exports.parseCircle=c,exports.adoptTransform=h,exports.splitD=u,exports.serializeSvgString=y,exports.serializeSvg=f,exports.serializePath=x,exports.serializePointList=g,exports.parseTagStyle=m,exports.serializeStyle=b;
},{"./geo":"8iHP"}],"sSsW":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r};Object.defineProperty(exports,"__esModule",{value:!0});var r=e(require("./geo")),t=e(require("./svg"));exports.default={geo:r,svg:t};
},{"./geo":"8iHP","./svg":"ROsf"}]},{},["sSsW"], null)
//# sourceMappingURL=/okageo.map