import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3003, // frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // backend port
        changeOrigin: true,
      },
    },
  },
})