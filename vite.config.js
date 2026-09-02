import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

// Opt in with `ANALYZE=1 pnpm build` — otherwise the build stays headless,
// which matters on CI and on Vercel where nothing can open a browser.
const analyze = process.env.ANALYZE === '1'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    analyze &&
      visualizer({
        open: true,
        filename: 'stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },

  build: {
    target: 'es2022',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Keep the long-lived libraries in their own chunks so a copy change
        // does not invalidate the vendor code in everyone's cache. Matching on
        // the resolved path rather than a bare name catches sub-entries such as
        // `react-dom/client`, which a string map misses.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) {
            return 'react'
          }
          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) {
            return 'motion'
          }
          if (/[\\/]node_modules[\\/](lucide-react|react-icons)[\\/]/.test(id)) {
            return 'icons'
          }
          return undefined
        },
      },
    },
  },

  server: {
    host: true,
  },
})
