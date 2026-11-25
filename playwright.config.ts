import { defineConfig, devices } from '@playwright/test'

// Les tests de bout en bout parcourent le site compilé (dist), comme un visiteur.
// BASE_URL permet de viser autre chose (l'image nginx, la production…) ; sinon on sert dist en local.
const baseURL = process.env.BASE_URL ?? 'http://localhost:4173'

export default defineConfig({
  testDir: 'tests/e2e',
  outputDir: 'test-results',
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [
    { name: 'bureau', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'telephone', use: { ...devices['Pixel 7'] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: 'npx vite preview --port 4173 --strictPort', url: baseURL, reuseExistingServer: !process.env.CI },
})
