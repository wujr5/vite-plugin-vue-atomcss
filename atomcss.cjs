'use strict';

var c = require('fs');
var v = require('path');
var url = require('url');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var c__default = /*#__PURE__*/_interopDefault(c);
var v__default = /*#__PURE__*/_interopDefault(v);

var l={".m":"margin:$px",".ml":"margin-left:$px",".mr":"margin-right:$px",".mt":"margin-top:$px",".mb":"margin-bottom:$px",".mx":"margin-left:$px;margin-right:$px",".my":"margin-top:$px;margin-bottom:$px",".mi":"margin:$px !important",".mli":"margin-left:$px !important",".mri":"margin-right:$px !important",".mti":"margin-top:$px !important",".mbi":"margin-bottom:$px !important",".mxi":"margin-left:$px !important;margin-right:$px !important",".myi":"margin-top:$px !important;margin-bottom:$px !important",".p":"padding:$px",".pl":"padding-left:$px",".pr":"padding-right:$px",".pt":"padding-top:$px",".pb":"padding-bottom:$px",".px":"padding-left:$px;padding-right:$px",".py":"padding-top:$px;padding-bottom:$px",".pi":"padding:$px !important",".pli":"padding-left:$px !important",".pri":"padding-right:$px !important",".pti":"padding-top:$px !important",".pbi":"padding-bottom:$px !important",".pxi":"padding-left:$px !important;padding-right:$px !important",".pyi":"padding-top:$px !important;padding-bottom:$px !important",".w":"width:$px",".wi":"width:$px !important",".mw":"min-width:$px",".wp":"width:$%",".wpi":"width:$% !important",".h":"height:$px",".hi":"height:$px !important",".mh":"min-height:$px",".hp":"height:$%",".hpi":"height:$% !important",".l":"left:$px",".r":"right:$px",".t":"top:$px",".b":"bottom:$px",".lh":"line-height:$px",".fs":"font-size:$px",".fw":"font-weight:$",".bgs":"background-size:$px",".br":"border-radius:$px",".c":"color: #",".bgc":"background-color: #",".z":"z-index: $"},m=null,$="";function b(e){if(m)return $;{if(m=e,m.mode==="rem")for(let t in l)l[t]=l[t].replace(/\$px/gi,"$rem");l=Object.assign(l,m.config||{});let i=[];for(let t in l){let n=l[t];n.indexOf("$")!=-1?i.push(`\\${t}-[0-9]+`):n.indexOf("#")!=-1?i.push(`\\${t}-[0-9a-fA-F]+`):i.push(`\\${t}`);}return i.sort((t,n)=>n.length-t.length),$=i.join("|"),$}}function y(e){let i="",t="",n="";try{i=e.match(/<template lang=("|')pug("|')>([\s\S]*)<\/template>/g),t=e.match(/<template>([\s\S]*)<\/template>/g),i?n=i[0]:t&&(n="."+(t[0].match(/class=("|')([a-zA-Z0-9 \- _]*)("|')/gi)||[]).map(r=>r.replace(/class=('|")|("|')/g,"").split(" ").join(".")).join("."));}catch(r){return console.warn(r),""}return n}function w(e,i){let t=new RegExp(e,"ig");function n(a,u,p){return p.indexOf(a)===u}let r=(i.match(t)||[]).filter(n),o=[];return r.forEach(a=>{if(l[a.split("-")[0]]&&l[a.split("-")[0]].indexOf("$")==-1&&l[a.split("-")[0]].indexOf("#")!=-1&&/^[0-9a-fA-F]+$/.test(a.split("-")[1])){let p=a.split("-");if(p.length>1){let g=p.slice(0,p.length-1).join("-"),d="#"+p[p.length-1];o.push(`${a}{${l[g].replace(/\#/g,d)}}`);}}else if(/\d+/.test(a)){let p=a.split("-");if(p.length>1){let g=p.slice(0,p.length-1).join("-"),d=p[p.length-1];o.push(`${a}{${l[g].replace(/\$/g,d)}}`);}}else {let p=a;o.push(`${a}{${l[p]}}`);}}),o}function s(e,i={}){let t=b(i),n=y(e);if(!n)return {code:e,css:[]};let r=w(t,n);return {code:`${e}
<style>${r.join("")}</style>
`,css:r}}function h(){return v__default.default.dirname(url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (document.currentScript && document.currentScript.src || new URL('out.js', document.baseURI).href))))+"/"}var x={};function A(e,i,t){return t.indexOf(e)===i}function C(){let e=[];for(let i in x)e=e.concat(x[i]).filter(A);c__default.default.writeFileSync(h()+"atomcss-generated.css",e.join(""),"utf8");}var f=/\.(vue)$/;function S(e){return {name:"vite-plugin-vue-atomcss",enforce:"pre",apply:"serve",transform(i,t){if(f.test(t))return {code:s(i,e).code}},transformIndexHtml(i){return [{tag:"script",attrs:{type:"module",src:h()+"client.js"},injectTo:"body"}]},handleHotUpdate({modules:i,server:t}){let n=i.filter(r=>f.test(r.id)).map(r=>r.id);if(n.length>0){let r=c__default.default.readFileSync(n[0],"utf8"),o=s(r,e);t.ws.send({type:"custom",event:"atomcss:update-style",data:{key:n[0],value:o.css.join("")}});}}}}function F(e){return {name:"vite-plugin-vue-atomcss",enforce:"pre",apply:"build",transform(i,t){if(f.test(t)){let n=s(i,e);x[t]=n.css,C();}}}}function R(e){return [S(e),F(e)]}

module.exports = R;
