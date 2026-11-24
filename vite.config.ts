import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { games } from './src/data/games'

export default defineConfig({
  plugins: [vue()],
  // Une vraie page HTML par route : /duck/index.html, /queens/index.html…
  ssgOptions: {
    dirStyle: 'nested',
    includedRoutes: () => ['/', ...games.map((g) => `/${g.slug}`), '/404'],
  },
})
