import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { games } from './src/data/games'

export default defineConfig({
  plugins: [vue()],
  // Tests unitaires : à côté de chaque composant (*.test.ts). Intégration : tests/integration.
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts', 'tests/integration/**/*.test.ts'],
  },
  // Une vraie page HTML par route : /duck/index.html, /queens/index.html…
  ssgOptions: {
    dirStyle: 'nested',
    includedRoutes: () => ['/', ...games.map((g) => `/${g.slug}`), '/404'],
  },
})
