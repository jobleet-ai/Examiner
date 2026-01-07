import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      // This maps the '@' symbol to the 'src' folder
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000, // Change the port here
  },
  
})

