import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4000,
  },
  proxy: {
    '^/api/.*': {
      target: 'localhost:3000', // 万山医生工作站
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
})
