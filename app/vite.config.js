import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://inheritly-app-d2c2366c08d3.herokuapp.com',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist'
  },
  optimizeDeps: {
    exclude: ['js-cookie']
  }
})
