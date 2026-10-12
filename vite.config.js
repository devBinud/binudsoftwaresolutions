import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import seoPages from './vite-plugins/seo-pages.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    seoPages(),
  ],
})
