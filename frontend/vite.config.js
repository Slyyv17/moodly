import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- NEW IMPORT

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // <-- Existing React plugin
    tailwindcss(), // <-- Tailwind CSS plugin
  ],
})