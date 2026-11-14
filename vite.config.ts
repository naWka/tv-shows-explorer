import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  // Локально сервер живёт отдельным процессом (server/listen.ts), сайт ходит к нему по тому же пути /api, что и на Vercel.
  server: { proxy: { '/api': 'http://localhost:3001' } },
})
