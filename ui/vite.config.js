import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4000,
  },
  proxy: {
    // '^/graphql/.*': {
    //   target: 'localhost:4001',
    //   changeOrigin: true,
    //   rewrite: (path) => path.replace(/^\/graphql/, ''),
    // },
  },
})
