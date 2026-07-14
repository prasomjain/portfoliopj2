import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// BASE_PATH is set to '/portfoliopj2/' by the GitHub Pages workflow;
// everywhere else (local dev, Vercel) it defaults to '/'.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
