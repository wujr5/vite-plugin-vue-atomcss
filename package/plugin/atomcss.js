import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import atomcssLoader from './atomcss-loader.js';

function dirname() {
  return path.dirname(fileURLToPath(import.meta.url)) + '/';
}

const cssFileStyle = {};

// 结合 Array.filter 函数使用，过滤重复值
function unique(value, index, self) {
  return self.indexOf(value) === index;
}

function generateAtomcssFile() {
  // 合并所有原子类，并去除重复值
  let generatedCss = [];
  for (let key in cssFileStyle) {
    generatedCss = generatedCss.concat(cssFileStyle[key]).filter(unique);
  }

  // 将生成的原子类写入文件
  fs.writeFileSync(
    dirname() + 'atomcss-generated.css',
    generatedCss.join(''),
    'utf8'
  );
}

const vuefileRegex = /\.(vue)$/;

function servePlugin(config) {
  return {
    name: 'vite-plugin-vue-atomcss',
    enforce: 'pre',
    apply: 'serve',
    transform(code, id) {
      if (vuefileRegex.test(id)) {
        let result = atomcssLoader(code, config);
        return { code: result.code };
      }
    },
    transformIndexHtml(html) {
      return [
        {
          tag: 'script',
          attrs: { type: 'module', src: dirname() + 'client.js' },
          injectTo: 'body',
        },
      ];
    },
    handleHotUpdate({ modules, server }) {
      let vueFiles = modules
        .filter((i) => vuefileRegex.test(i.id))
        .map((i) => i.id);

      if (vueFiles.length > 0) {
        let code = fs.readFileSync(vueFiles[0], 'utf8');
        let result = atomcssLoader(code, config);
        server.ws.send({
          type: 'custom',
          event: 'atomcss:update-style',
          data: { key: vueFiles[0], value: result.css.join('') },
        });
      }
    },
  };
}

function buildPlugin(config) {
  return {
    name: 'vite-plugin-vue-atomcss',
    enforce: 'pre',
    apply: 'build',
    transform(code, id) {
      if (vuefileRegex.test(id)) {
        let result = atomcssLoader(code, config);
        cssFileStyle[id] = result.css;
        generateAtomcssFile();
      }
    },
  };
}

export default function atomcss(config) {
  return [servePlugin(config), buildPlugin(config)];
}
