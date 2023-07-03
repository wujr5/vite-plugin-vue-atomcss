import u from 'fs';
import x from 'path';
import { fileURLToPath } from 'url';

var n = {
    '.m': 'margin:$px',
    '.ml': 'margin-left:$px',
    '.mr': 'margin-right:$px',
    '.mt': 'margin-top:$px',
    '.mb': 'margin-bottom:$px',
    '.mx': 'margin-left:$px;margin-right:$px',
    '.my': 'margin-top:$px;margin-bottom:$px',
    '.mi': 'margin:$px !important',
    '.mli': 'margin-left:$px !important',
    '.mri': 'margin-right:$px !important',
    '.mti': 'margin-top:$px !important',
    '.mbi': 'margin-bottom:$px !important',
    '.mxi': 'margin-left:$px !important;margin-right:$px !important',
    '.myi': 'margin-top:$px !important;margin-bottom:$px !important',
    '.p': 'padding:$px',
    '.pl': 'padding-left:$px',
    '.pr': 'padding-right:$px',
    '.pt': 'padding-top:$px',
    '.pb': 'padding-bottom:$px',
    '.px': 'padding-left:$px;padding-right:$px',
    '.py': 'padding-top:$px;padding-bottom:$px',
    '.pi': 'padding:$px !important',
    '.pli': 'padding-left:$px !important',
    '.pri': 'padding-right:$px !important',
    '.pti': 'padding-top:$px !important',
    '.pbi': 'padding-bottom:$px !important',
    '.pxi': 'padding-left:$px !important;padding-right:$px !important',
    '.pyi': 'padding-top:$px !important;padding-bottom:$px !important',
    '.w': 'width:$px',
    '.wi': 'width:$px !important',
    '.mw': 'min-width:$px',
    '.wp': 'width:$%',
    '.wpi': 'width:$% !important',
    '.h': 'height:$px',
    '.hi': 'height:$px !important',
    '.mh': 'min-height:$px',
    '.hp': 'height:$%',
    '.hpi': 'height:$% !important',
    '.l': 'left:$px',
    '.r': 'right:$px',
    '.t': 'top:$px',
    '.b': 'bottom:$px',
    '.lh': 'line-height:$px',
    '.fs': 'font-size:$px',
    '.fw': 'font-weight:$',
    '.bgs': 'background-size:$px',
    '.br': 'border-radius:$px',
    '.c': 'color: #',
    '.bgc': 'background-color: #',
    '.z': 'z-index: $',
  },
  s = {},
  F = () => x.resolve() + '/../../atomcss.config.js',
  j = () => x.resolve() + '/plugin/atomcss.config.js';
try {
  s = () => import(F());
} catch {
  s = () => import(j());
}
console.log('这里这里：', s.mode);
if (s.mode === 'rem') for (let t in n) n[t] = n[t].replace(/\$px/gi, '$rem');
n = Object.assign(n, s.config);
var o = '';
for (let t in n) {
  let i = n[t];
  i.indexOf('$') != -1
    ? (o += `\\${t}-[0-9]+|`)
    : i.indexOf('#') != -1
    ? (o += `\\${t}-[0-9a-fA-F]+|`)
    : (o += `\\${t}|`);
}
o = o.substr(0, o.length - 1);
function g(t) {
  let i, r, p;
  try {
    (i = t.match(/<template lang=("|')pug("|')>([\s\S]*)<\/template>/g)),
      (r = t.match(/<template>([\s\S]*)<\/template>/g)),
      i
        ? (p = i[0])
        : r &&
          (p =
            '.' +
            (r[0].match(/class=("|')([a-zA-Z0-9 \- _]*)("|')/gi) || [])
              .map((e) =>
                e
                  .replace(/class=('|")|("|')/g, '')
                  .split(' ')
                  .join('.')
              )
              .join('.'));
  } catch (e) {
    return console.warn(e), t;
  }
  if (!p) return { code: t, css: [] };
  (p.match(/include \S*\.pug/g) || []).forEach((e) => {
    let m =
      this.resourcePath.substr(0, this.resourcePath.lastIndexOf('/') + 1) +
      e.replace('include ', '');
    this.addDependency(m);
    let a = u.readFileSync(m, 'utf-8');
    p = p.replace(e, a);
  });
  let b = new RegExp(o, 'ig');
  function y(e, m, a) {
    return a.indexOf(e) === m;
  }
  let w = (p.match(b) || []).filter(y),
    l = [];
  return (
    w.forEach((e) => {
      if (
        n[e.split('-')[0]] &&
        n[e.split('-')[0]].indexOf('$') == -1 &&
        n[e.split('-')[0]].indexOf('#') != -1
      ) {
        let a = e.match(/\.\w+/)[0],
          d = '#' + e.split('-')[1];
        l.push(`${e}{${n[a].replace(/\#/g, d)}}`);
      } else if (/\d+/.test(e)) {
        let a = e.match(/\.\w+/)[0],
          d = +e.match(/\d+/)[0];
        l.push(`${e}{${n[a].replace(/\$/g, d)}}`);
      } else {
        let a = e;
        l.push(`${e}{${n[a]}}`);
      }
    }),
    {
      code: `${t}
<style>${l.join('')}</style>
`,
      css: l,
    }
  );
}
function h() {
  return x.dirname(fileURLToPath(import.meta.url)) + '/';
}
var c = {};
function S(t, i, r) {
  return r.indexOf(t) === i;
}
function C() {
  let t = [];
  for (let i in c) t = t.concat(c[i]).filter(S);
  u.writeFileSync(h() + 'atomcss-generated.css', t.join(''), 'utf8');
}
var $ = /\.(vue)$/;
function k() {
  return {
    name: 'vite-plugin-vue-atomcss',
    enforce: 'pre',
    apply: 'serve',
    transform(t, i) {
      if ($.test(i)) return { code: g(t).code };
    },
    transformIndexHtml(t) {
      return [
        {
          tag: 'script',
          attrs: { type: 'module', src: h() + 'client.js' },
          injectTo: 'body',
        },
      ];
    },
    handleHotUpdate({ modules: t, server: i }) {
      let r = t.filter((p) => $.test(p.id)).map((p) => p.id);
      if (r.length > 0) {
        let p = u.readFileSync(r[0], 'utf8'),
          f = g(p);
        i.ws.send({
          type: 'custom',
          event: 'atomcss:update-style',
          data: { key: r[0], value: f.css.join('') },
        });
      }
    },
  };
}
function z() {
  return {
    name: 'vite-plugin-vue-atomcss',
    enforce: 'pre',
    apply: 'build',
    transform(t, i) {
      if ($.test(i)) {
        let r = g(t);
        (c[i] = r.css), C();
      }
    },
  };
}
function A() {
  return [k(), z()];
}

export { A as default };
