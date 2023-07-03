import x from 'fs';
import w from 'path';
import { fileURLToPath } from 'url';

var n={".m":"margin:$px",".ml":"margin-left:$px",".mr":"margin-right:$px",".mt":"margin-top:$px",".mb":"margin-bottom:$px",".mx":"margin-left:$px;margin-right:$px",".my":"margin-top:$px;margin-bottom:$px",".mi":"margin:$px !important",".mli":"margin-left:$px !important",".mri":"margin-right:$px !important",".mti":"margin-top:$px !important",".mbi":"margin-bottom:$px !important",".mxi":"margin-left:$px !important;margin-right:$px !important",".myi":"margin-top:$px !important;margin-bottom:$px !important",".p":"padding:$px",".pl":"padding-left:$px",".pr":"padding-right:$px",".pt":"padding-top:$px",".pb":"padding-bottom:$px",".px":"padding-left:$px;padding-right:$px",".py":"padding-top:$px;padding-bottom:$px",".pi":"padding:$px !important",".pli":"padding-left:$px !important",".pri":"padding-right:$px !important",".pti":"padding-top:$px !important",".pbi":"padding-bottom:$px !important",".pxi":"padding-left:$px !important;padding-right:$px !important",".pyi":"padding-top:$px !important;padding-bottom:$px !important",".w":"width:$px",".wi":"width:$px !important",".mw":"min-width:$px",".wp":"width:$%",".wpi":"width:$% !important",".h":"height:$px",".hi":"height:$px !important",".mh":"min-height:$px",".hp":"height:$%",".hpi":"height:$% !important",".l":"left:$px",".r":"right:$px",".t":"top:$px",".b":"bottom:$px",".lh":"line-height:$px",".fs":"font-size:$px",".fw":"font-weight:$",".bgs":"background-size:$px",".br":"border-radius:$px",".c":"color: #",".bgc":"background-color: #",".z":"z-index: $"};function g(e,p={}){if(p.mode==="rem")for(let t in n)n[t]=n[t].replace(/\$px/gi,"$rem");n=Object.assign(n,p.config||{});let i="";for(let t in n){let m=n[t];m.indexOf("$")!=-1?i+=`\\${t}-[0-9]+|`:m.indexOf("#")!=-1?i+=`\\${t}-[0-9a-fA-F]+|`:i+=`\\${t}|`;}i=i.substr(0,i.length-1);let r,a,l;try{r=e.match(/<template lang=("|')pug("|')>([\s\S]*)<\/template>/g),a=e.match(/<template>([\s\S]*)<\/template>/g),r?l=r[0]:a&&(l="."+(a[0].match(/class=("|')([a-zA-Z0-9 \- _]*)("|')/gi)||[]).map(t=>t.replace(/class=('|")|("|')/g,"").split(" ").join(".")).join("."));}catch(t){return console.warn(t),e}if(!l)return {code:e,css:[]};(l.match(/include \S*\.pug/g)||[]).forEach(t=>{let m=this.resourcePath.substr(0,this.resourcePath.lastIndexOf("/")+1)+t.replace("include ","");this.addDependency(m);let o=x.readFileSync(m,"utf-8");l=l.replace(t,o);});let u=new RegExp(i,"ig");function h(t,m,o){return o.indexOf(t)===m}let b=(l.match(u)||[]).filter(h),s=[];return b.forEach(t=>{if(n[t.split("-")[0]]&&n[t.split("-")[0]].indexOf("$")==-1&&n[t.split("-")[0]].indexOf("#")!=-1){let o=t.match(/\.\w+/)[0],d="#"+t.split("-")[1];s.push(`${t}{${n[o].replace(/\#/g,d)}}`);}else if(/\d+/.test(t)){let o=t.match(/\.\w+/)[0],d=+t.match(/\d+/)[0];s.push(`${t}{${n[o].replace(/\$/g,d)}}`);}else {let o=t;s.push(`${t}{${n[o]}}`);}}),{code:`${e}
<style>${s.join("")}</style>
`,css:s}}function f(){return w.dirname(fileURLToPath(import.meta.url))+"/"}var $={};function F(e,p,i){return i.indexOf(e)===p}function j(){let e=[];for(let p in $)e=e.concat($[p]).filter(F);x.writeFileSync(f()+"atomcss-generated.css",e.join(""),"utf8");}var c=/\.(vue)$/;function O(e){return {name:"vite-plugin-vue-atomcss",enforce:"pre",apply:"serve",transform(p,i){if(c.test(i))return {code:g(p,e).code}},transformIndexHtml(p){return [{tag:"script",attrs:{type:"module",src:f()+"client.js"},injectTo:"body"}]},handleHotUpdate({modules:p,server:i}){let r=p.filter(a=>c.test(a.id)).map(a=>a.id);if(r.length>0){let a=x.readFileSync(r[0],"utf8"),l=g(a);i.ws.send({type:"custom",event:"atomcss:update-style",data:{key:r[0],value:l.css.join("")}});}}}}function S(e){return {name:"vite-plugin-vue-atomcss",enforce:"pre",apply:"build",transform(p,i){if(c.test(i)){let r=g(p,e);$[i]=r.css,j();}}}}function P(e){return [O(e),S(e)]}

export { P as default };
