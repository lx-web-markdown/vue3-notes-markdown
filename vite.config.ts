import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue({
      include: [/\.vue$/],
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  optimizeDeps: {
    include: ['@vue-office/excel', '@vue-office/docx', '@vue-office/pptx', '@vue-office/pdf'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /@vue-office\/excel/, /@vue-office\/docx/, /@vue-office\/pptx/, /@vue-office\/pdf/],
    },
  },
})
