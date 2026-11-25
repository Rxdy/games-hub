import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const pages = ['/', '/duck/', '/queens/', '/traintracks/']

test('on va de l’accueil à un jeu, puis à un autre', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /Queens/ }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Queens')
  await expect(page.getByRole('link', { name: 'Jouer à Queens' })).toHaveAttribute('href', 'https://queens.rxdy.fr')
  await page.getByRole('link', { name: /Train Tracks/ }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Train Tracks')
  await expect(page).toHaveTitle('Train Tracks · games.rxdy.fr')
})

test('une adresse inconnue répond 404', async ({ page }) => {
  const response = await page.goto('/inexistant')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page introuvable')
})

for (const path of pages) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`${path} (${colorScheme}) : accessible, sans erreur ni défilement horizontal`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (e) => errors.push(e.message))
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
      await page.goto(path, { waitUntil: 'networkidle' })
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0)
      expect(errors).toEqual([])
    })
  }
}
