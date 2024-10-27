import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath } from "url"

export default defineConfig({
  plugins: [
    react(),
    svgr({ include: '**/*.svg' }),
  ],
  resolve: {
    alias: [
      { find: '@app', replacement: fileURLToPath(new URL('./src/app', import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      { find: '@modules', replacement: fileURLToPath(new URL('./src/modules', import.meta.url)) },
      { find: '@shared', replacement: fileURLToPath(new URL('./src/shared', import.meta.url)) },
      { find: '@rtk', replacement: fileURLToPath(new URL('./src/rtk', import.meta.url)) },
      { find: '@pages', replacement: fileURLToPath(new URL('./src/pages', import.meta.url)) },
    ],
  }
})
