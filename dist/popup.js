!function(){"use strict";var n,e={871:function(n,e,r){var t=r(81),o=r.n(t),i=r(645),a=r.n(i)()(o());a.push([n.id,".App {\r\n  text-align: center;\r\n}\r\n\r\n.App-logo {\r\n  height: 40vmin;\r\n  pointer-events: none;\r\n}\r\n\r\n@media (prefers-reduced-motion: no-preference) {\r\n  .App-logo {\r\n    animation: App-logo-spin infinite 20s linear;\r\n  }\r\n}\r\n\r\n.App-header {\r\n  background-color: #282c34;\r\n  min-height: 100vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: calc(10px + 2vmin);\r\n  color: white;\r\n}\r\n\r\n.App-link {\r\n  color: #61dafb;\r\n}\r\n\r\n@keyframes App-logo-spin {\r\n  from {\r\n    transform: rotate(0deg);\r\n  }\r\n  to {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n",""]),e.Z=a},645:function(n){n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var r="",t=void 0!==e[5];return e[4]&&(r+="@supports (".concat(e[4],") {")),e[2]&&(r+="@media ".concat(e[2]," {")),t&&(r+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),r+=n(e),t&&(r+="}"),e[2]&&(r+="}"),e[4]&&(r+="}"),r})).join("")},e.i=function(n,r,t,o,i){"string"==typeof n&&(n=[[null,n,void 0]]);var a={};if(t)for(var c=0;c<this.length;c++){var u=this[c][0];null!=u&&(a[u]=!0)}for(var s=0;s<n.length;s++){var f=[].concat(n[s]);t&&a[f[0]]||(void 0!==i&&(void 0===f[5]||(f[1]="@layer".concat(f[5].length>0?" ".concat(f[5]):""," {").concat(f[1],"}")),f[5]=i),r&&(f[2]?(f[1]="@media ".concat(f[2]," {").concat(f[1],"}"),f[2]=r):f[2]=r),o&&(f[4]?(f[1]="@supports (".concat(f[4],") {").concat(f[1],"}"),f[4]=o):f[4]="".concat(o)),e.push(f))}},e}},81:function(n){n.exports=function(n){return n[1]}},379:function(n){var e=[];function r(n){for(var r=-1,t=0;t<e.length;t++)if(e[t].identifier===n){r=t;break}return r}function t(n,t){for(var i={},a=[],c=0;c<n.length;c++){var u=n[c],s=t.base?u[0]+t.base:u[0],f=i[s]||0,l="".concat(s," ").concat(f);i[s]=f+1;var p=r(l),d={css:u[1],media:u[2],sourceMap:u[3],supports:u[4],layer:u[5]};if(-1!==p)e[p].references++,e[p].updater(d);else{var v=o(d,t);t.byIndex=c,e.splice(c,0,{identifier:l,updater:v,references:1})}a.push(l)}return a}function o(n,e){var r=e.domAPI(e);return r.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;r.update(n=e)}else r.remove()}}n.exports=function(n,o){var i=t(n=n||[],o=o||{});return function(n){n=n||[];for(var a=0;a<i.length;a++){var c=r(i[a]);e[c].references--}for(var u=t(n,o),s=0;s<i.length;s++){var f=r(i[s]);0===e[f].references&&(e[f].updater(),e.splice(f,1))}i=u}}},569:function(n){var e={};n.exports=function(n,r){var t=function(n){if(void 0===e[n]){var r=document.querySelector(n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(n){r=null}e[n]=r}return e[n]}(n);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");t.appendChild(r)}},216:function(n){n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:function(n,e,r){n.exports=function(n){var e=r.nc;e&&n.setAttribute("nonce",e)}},795:function(n){n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(r){!function(n,e,r){var t="";r.supports&&(t+="@supports (".concat(r.supports,") {")),r.media&&(t+="@media ".concat(r.media," {"));var o=void 0!==r.layer;o&&(t+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),t+=r.css,o&&(t+="}"),r.media&&(t+="}"),r.supports&&(t+="}");var i=r.sourceMap;i&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(t,n,e.options)}(e,n,r)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:function(n){n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},410:function(n,e,r){var t=r(893),o=r(294),i=r(745),a=r(379),c=r.n(a),u=r(795),s=r.n(u),f=r(569),l=r.n(f),p=r(565),d=r.n(p),v=r(216),m=r.n(v),h=r(589),y=r.n(h),g=r(871),b={};b.styleTagTransform=y(),b.setAttributes=d(),b.insert=l().bind(null,"head"),b.domAPI=s(),b.insertStyleElement=m(),c()(g.Z,b),g.Z&&g.Z.locals&&g.Z.locals;var x=function(){return x=Object.assign||function(n){for(var e,r=1,t=arguments.length;r<t;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n},x.apply(this,arguments)},O=document.createElement("div");O.className="container",document.body.appendChild(O),i.createRoot(O).render((0,t.jsx)(o.StrictMode,{children:(0,t.jsx)((function(){return(0,t.jsx)("div",x({className:"App"},{children:"Hello World"}))}),{})}))}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var i=r[n]={id:n,exports:{}};return e[n](i,i.exports,t),i.exports}t.m=e,n=[],t.O=function(e,r,o,i){if(!r){var a=1/0;for(f=0;f<n.length;f++){r=n[f][0],o=n[f][1],i=n[f][2];for(var c=!0,u=0;u<r.length;u++)(!1&i||a>=i)&&Object.keys(t.O).every((function(n){return t.O[n](r[u])}))?r.splice(u--,1):(c=!1,i<a&&(a=i));if(c){n.splice(f--,1);var s=o();void 0!==s&&(e=s)}}return e}i=i||0;for(var f=n.length;f>0&&n[f-1][2]>i;f--)n[f]=n[f-1];n[f]=[r,o,i]},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,{a:e}),e},t.d=function(n,e){for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},function(){var n={42:0};t.O.j=function(e){return 0===n[e]};var e=function(e,r){var o,i,a=r[0],c=r[1],u=r[2],s=0;if(a.some((function(e){return 0!==n[e]}))){for(o in c)t.o(c,o)&&(t.m[o]=c[o]);if(u)var f=u(t)}for(e&&e(r);s<a.length;s++)i=a[s],t.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return t.O(f)},r=self.webpackChunktask_time_tracker=self.webpackChunktask_time_tracker||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}(),t.nc=void 0;var o=t.O(void 0,[67],(function(){return t(410)}));o=t.O(o)}();