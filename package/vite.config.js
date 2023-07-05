import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import atomcss from './plugin/atomcss';
import atomcssConfig from './atomcss.config.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [atomcss(atomcssConfig), vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./test', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5050',
    },
  },
});
