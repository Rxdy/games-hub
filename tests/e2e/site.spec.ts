import { expect, test } from '@playwright/test'

// Parcours d'un visiteur sur le site compilé, sur bureau et sur téléphone (voir playwright.config.ts).
const pages = ['/', '/duck/', '/queens/', '/traintracks/', '/inexistant']

test.describe('affichage', () => {
  for (const chemin of pages) {
    test(`${chemin} : pas de défilement horizontal, pas d'erreur console`, async ({ page }) => {
      const erreurs: string[] = []
      page.on('pageerror', (e) => erreurs.push(e.message))
      // Sur la page 404, le navigateur journalise lui-même le 404 de la page (vrai nginx en production) : normal.
      const est404 = chemin === '/inexistant'
      page.on('console', (m) => m.type() === 'error' && !(est404 && /status of 404/.test(m.text())) && erreurs.push(m.text()))
      await page.goto(chemin)
      await expect(page.locator('h1')).toHaveCount(1)
      const debordement = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(debordement).toBeLessThanOrEqual(0)
      expect(erreurs).toEqual([])
    })
  }

  test('les illustrations restent dans la largeur de l’écran', async ({ page, viewport }) => {
    await page.goto('/duck/')
    for (const svg of await page.locator('svg.motif').all()) {
      const box = await svg.boundingBox()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width)
    }
  })
})

test.describe('parcours', () => {
  test('accueil → page d’un jeu → retour', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Les jeux de Rudy')
    await expect(page.locator('a.band')).toHaveCount(3)

    await page.locator('a.band', { hasText: 'Queens' }).click()
    await expect(page).toHaveURL(/\/queens\/?$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Queens')
    await expect(page).toHaveTitle(/Queens · games\.rxdy\.fr/)

    await page.getByRole('link', { name: 'games.rxdy.fr, accueil' }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Les jeux de Rudy')
  })

  test('« Jouer » mène au vrai jeu, pour les trois jeux', async ({ page }) => {
    await page.goto('/queens/')
    await expect(page.getByRole('link', { name: /Jouer à Queens/ })).toHaveAttribute('href', 'https://queens.rxdy.fr')
    await page.goto('/traintracks/')
    await expect(page.getByRole('link', { name: /Jouer à Train Tracks/ })).toHaveAttribute('href', 'https://traintracks.rxdy.fr')
    await page.goto('/duck/')
    await expect(page.getByRole('link', { name: /Jouer à Duck/ })).toHaveAttribute('href', 'https://duck.rxdy.fr')
  })

  test('« Les autres jeux » ouvre un autre jeu', async ({ page }) => {
    await page.goto('/duck/')
    await page.locator('a.teaser', { hasText: 'Train Tracks' }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Train Tracks')
  })

  test('adresse inconnue : page introuvable, retour à l’accueil possible', async ({ page }) => {
    await page.goto('/inexistant')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page introuvable')
    await page.getByRole('link', { name: 'Voir tous les jeux' }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Les jeux de Rudy')
  })

  test('le lien d’évitement mène au contenu au clavier', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused()
  })
})

test.describe('référencement', () => {
  test('page de jeu : titre, description, adresse canonique', async ({ page }) => {
    await page.goto('/duck/')
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://games.rxdy.fr/duck/')
    await expect(page.locator('meta[name=description]')).toHaveAttribute('content', /canards/)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Duck/)
  })
  test('404 non indexée', async ({ page }) => {
    await page.goto('/inexistant')
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex')
  })
})
