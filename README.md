# vite-plugin-vue-atomcss

simple atomic plugin for vite and vue

目前仅支持 `module` 的方式引用，因此需在 package.json 中添加 `"type": "module"`，在 `main.js` 中增加：

```js
import 'vite-plugin-vue-atomcss/plugin/atomcss.css';
```
