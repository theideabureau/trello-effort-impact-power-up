!function(t){var r={};function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:e})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,r){if(1&r&&(t=n(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)n.d(e,o,function(r){return t[r]}.bind(null,o));return e},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},n.p="/",n(n.s=1)}([function(t,r){var n=9007199254740991,e="[object Arguments]",o="[object Function]",u="[object GeneratorFunction]",c=/^(?:0|[1-9]\d*)$/;function i(t,r){for(var n=-1,e=t?t.length:0;++n<e&&!1!==r(t[n],n,t););return t}var f,a,l=Object.prototype,p=l.hasOwnProperty,s=l.toString,m=l.propertyIsEnumerable,b=(f=Object.keys,a=Object,function(t){return f(a(t))});function d(t,r){var n=O(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&S(t)}(t)&&p.call(t,"callee")&&(!m.call(t,"callee")||s.call(t)==e)}(t)?function(t,r){for(var n=-1,e=Array(t);++n<t;)e[n]=r(n);return e}(t.length,String):[],o=n.length,u=!!o;for(var c in t)!r&&!p.call(t,c)||u&&("length"==c||x(c,o))||n.push(c);return n}var y,v,h=(y=function(t,r){return t&&g(t,r,k)},function(t,r){if(null==t)return t;if(!S(t))return y(t,r);for(var n=t.length,e=v?n:-1,o=Object(t);(v?e--:++e<n)&&!1!==r(o[e],e,o););return t}),g=function(t){return function(r,n,e){for(var o=-1,u=Object(r),c=e(r),i=c.length;i--;){var f=c[t?i:++o];if(!1===n(u[f],f,u))break}return r}}();function j(t){if(n=(r=t)&&r.constructor,e="function"==typeof n&&n.prototype||l,r!==e)return b(t);var r,n,e,o=[];for(var u in Object(t))p.call(t,u)&&"constructor"!=u&&o.push(u);return o}function x(t,r){return!!(r=null==r?n:r)&&("number"==typeof t||c.test(t))&&t>-1&&t%1==0&&t<r}var O=Array.isArray;function S(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=n}(t.length)&&!function(t){var r=function(t){var r=typeof t;return!!t&&("object"==r||"function"==r)}(t)?s.call(t):"";return r==o||r==u}(t)}function k(t){return S(t)?d(t):j(t)}function w(t){return t}t.exports=function(t,r){return(O(t)?i:h)(t,"function"==typeof r?r:w)}},function(t,r,n){t.exports=n(6)},,,,,function(t,r,n){"use strict";n.r(r);var e=n(0),o=n.n(e);function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var c=TrelloPowerUp.Promise;function i(t){return{1:"Low",2:"High"}[t]}function f(t,r,n){return{"1_2":1,"2_2":2,"1_1":3,"2_1":4}[r+"_"+n]}function a(t,r,n){return new c(function(e,u){(function(t){return t.get("board","private","labels").then(function(t){if(void 0===t)return{1:"Quick win",2:"Major project",3:"Fill in job",4:"Thankless task"};var r={1:"Quick win",2:"Major project",3:"Fill in job",4:"Thankless task"};return o()(t,function(n,e){""===n&&(t[e]=r[e])}),t})})(t).then(function(t){var o=t[f(0,r,n)];e(o)})})}function l(t){return"object"===u(t)&&(void 0!==t.effort&&(-1!==[1,2].indexOf(parseInt(t.effort))&&(void 0!==t.impact&&-1!==[1,2].indexOf(parseInt(t.impact)))))}function p(t,r,n,e){return new c(function(o,u){var c={};r.cards.length;r.cards.forEach(function(r){t.get(r.id,"shared","effort-impact").then(function(t){if(void 0!==t){var u={effort:t.effort,impact:t.impact,score:f(0,t.effort,t.impact)};c[r.id]=u[n]}else c[r.id]="asc"===e?9:-1;o(c)})})}).then(function(t){var n=r.cards.sort(function(r,n){var e=t[r.id],o=t[n.id];return e>o?1:o>e?-1:0}).map(function(t){return t.id});return"desc"===e&&(n=n.reverse()),{sortedIds:n}})}TrelloPowerUp.Promise;TrelloPowerUp.initialize({"show-settings":function(t,r){return t.popup({title:"Effort / Impact Settings",url:"./templates/settings.html",height:184})},"card-badges":function(t,r){return t.get("card","shared","effort-impact").then(function(r){return a(t,r.effort,r.impact).then(function(t){if(l(r))return[{text:"Effort: "+i(r.effort)},{text:"Impact: "+i(r.impact)},{text:"Score: "+t}]})})},"card-buttons":function(t,r){return[{icon:"./img/icon-square-grayscale.svg",text:"Effort / Impact",callback:function(t){return t.popup({title:"Effort / Impact",url:"./templates/input.html"})}}]},"card-detail-badges":function(t,r){return t.get("card","shared","effort-impact").then(function(r){return a(t,r.effort,r.impact).then(function(t){if(l(r)){var n=[{title:"Effort",text:i(r.effort),callback:function(t,r){return t.popup({title:"Effort / Impact",url:"./templates/input.html"})}},{title:"Impact",text:i(r.impact),callback:function(t,r){return t.popup({title:"Effort / Impact",url:"./templates/input.html"})}}];return n.push({title:"Score",text:t}),n}})})},"list-sorters":function(t){return t.list("name","id").then(function(t){return[{text:"Effort (Lowest First)",callback:function(t,r){return p(t,r,"effort","asc")}},{text:"Impact (Highest First)",callback:function(t,r){return p(t,r,"impact","desc")}},{text:"Score (Best First)",callback:function(t,r){return p(t,r,"score","asc")}}]})}})}]);