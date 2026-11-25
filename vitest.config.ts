import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'happy-dom',
      include: ['src/**/*.spec.ts', 'tests/integration/**/*.spec.ts'],
      coverage: { include: ['src/**/*.{ts,vue}'], exclude: ['src/**/*.spec.ts', 'src/main.ts'] },
    },
  }),
)
