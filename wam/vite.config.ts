import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

const API_BASE =
  process.env.VITE_API_BASE ||
  `http://localhost:${process.env.SERVER_PORT ?? 8000}`

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@wam': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: './dist',
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: parseInt(process.env.CLIENT_PORT ?? '3000'),
    proxy: {
      '/api': {
        target: API_BASE,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        ws: true,
      },
    },
  },
})
