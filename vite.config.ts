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
  server: {
    proxy: {
      '/api': {
        target: 'https://www.bilibili.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
        // secure: false
      },
      '/video': {
        target: 'https://api.bilibili.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/video/, ''),
        // secure: false
      },
      '/video-src': {
        target: 'https://gitee.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/video-src/, ''),
        secure: true
      }
    }
  }
})
