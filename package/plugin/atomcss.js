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
          attrs: { type: 'module', src: '/node_modules/vite-plugin-vue-atomcss/client.js' },
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
    // 在closeBundle钩子中，操作打包后的dist文件夹
    closeBundle(build){
      // 拿到当前存储样式的atomcss-generated.css的路径
      let readFileUrl = dirname() + 'atomcss-generated.css';
      // 读取文件内容
      let readContent = fs.readFileSync(readFileUrl, 'utf8');

      // 命名加入到dist中的文件名
      let fileName = 'atomcss.css';
      // 获取dist文件夹跟路径
      let distMkdirUrl = path.join(
        dirname().split('node_modules')[0],
        '/dist'
      );
      // 获取index.html文件的路径
      let writeFileUrl = path.join(distMkdirUrl,'index.html');
      // 获取写入文件atomcss.css的地址
      let completeUrl = path.join(distMkdirUrl, fileName);

      // 判断是否存在dist文件夹
      fs.mkdirSync(distMkdirUrl, { recursive: true });

      // 将样式写入atomcss.css文件
      fs.writeFileSync(completeUrl, readContent);

      // 读取出index.html的内容并加入新的link标签
      const content = fs.readFileSync(writeFileUrl, 'utf8');
      const linkStr = `<link rel="stylesheet" href="/atomcss.css">`;
      const newData = content.replace('</head>', linkStr + '</head>');

      // 回写数据到index.html
      fs.writeFileSync(writeFileUrl, newData, 'utf8');
    },
  };
}

export default function atomcss(config) {
  return [servePlugin(config), buildPlugin(config)];
}
