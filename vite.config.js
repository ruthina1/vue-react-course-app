import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Vite configuration file
// This tells Vite how to build our Vue application
export default defineConfig({
  plugins: [vue()],
  // Development server configuration
  server: {
    port: 3000,
    open: true // Automatically open browser when starting dev server
  }
})

