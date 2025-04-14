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
    dedupe: ['vue']
  },
  optimizeDeps: {
    include: ['@vue-office/excel', '@vue-office/docx', '@vue-office/pptx', '@vue-office/pdf'],
    exclude: ['vue-demi']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /@vue-office\/excel/, /@vue-office\/docx/, /@vue-office\/pptx/, /@vue-office\/pdf/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      external: ['vue-demi'],
      output: {
        manualChunks: {
          'vue-office': ['@vue-office/excel']
        }
      }
    }
  },
})
