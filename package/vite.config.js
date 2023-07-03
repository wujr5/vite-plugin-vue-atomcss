import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ReactivityTransform from '@vue-macros/reactivity-transform/vite';

import atomcss from './plugin/atomcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ReactivityTransform(), vue(), atomcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./test', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5050',
      '/yuque': 'http://localhost:5050',
    },
  },
});
