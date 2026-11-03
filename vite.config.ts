import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [],
      manifest: {
        name: 'ASTRA — AI Life Command Center',
        short_name: 'ASTRA',
        description: 'A private, mobile-first personal command center.',
        theme_color: '#090d18',
        background_color: '#090d18',
        display: 'standalone',
        start_url: '/',
        icons: [],
      },
    }),
  ],
})
