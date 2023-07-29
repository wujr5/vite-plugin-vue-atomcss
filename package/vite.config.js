import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import atomcss from 'vite-plugin-vue-atomcss';
import atomcssConfig from './atomcss.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [atomcss(atomcssConfig), vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./test', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5050',
    },
  },
});
