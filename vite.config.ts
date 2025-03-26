import { fileURLToPath, URL } from 'node:url'
import path from 'path'

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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@vue-office/excel': path.resolve(__dirname, 'node_modules/@vue-office/excel/'),
      '@vue-office/docx': path.resolve(__dirname, 'node_modules/@vue-office/docx/'),
      '@vue-office/pdf': path.resolve(__dirname, 'node_modules/@vue-office/pdf/'),
      '@vue-office/pptx': path.resolve(__dirname, 'node_modules/@vue-office/pptx/'),
    },
  },
  optimizeDeps: {
    include: ['@vue-office/docx', '@vue-office/excel', '@vue-office/pdf', '@vue-office/pptx']
  },
})
