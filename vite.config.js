import { fileURLToPath, URL } from 'node:url';
import Inspect from 'vite-plugin-inspect';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import atomcss from './plugin/atomcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    atomcss(),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5050',
      '/yuque': 'http://localhost:5050',
    },
  },
});
