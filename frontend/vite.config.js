import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chit-chat-q27g.onrender.com', // Replace with your backend server URL
        changeOrigin: true,
        secure: false
      }
    }
  }
})