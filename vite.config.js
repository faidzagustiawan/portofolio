import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    visualizer({
      open: true,       // Otomatis buka browser setelah build selesai
      filename: 'stats.html', // Nama file hasil analisanya
      gzipSize: true,   // Menampilkan ukuran setelah dikompresi (lebih akurat)
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  assetsInclude: ["**/*.glb", "**/*.gltf"],
  server: {
    // Masukkan domain ngrok kamu di sini
    allowedHosts: ['326104c33c7b.ngrok-free.app'],
    host: true
  }
})