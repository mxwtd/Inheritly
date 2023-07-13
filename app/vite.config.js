import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const getBaseUrl = (node_env) => {
  let url
  switch (node_env) {
    case 'production':
      url = 'https://inheritly-app-d2c2366c08d3.herokuapp.com'
    default:
      url = 'http://localhost:3001'
  }
  return url
}

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: getBaseUrl(process.env.NODE_ENV),
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
