import { test } from '@playwright/test'

// Prend une capture de chaque page, sur bureau et téléphone (projets Playwright).
// Lancer : npm run captures  → dossier captures/
const pages = [
  ['accueil', '/'],
  ['duck', '/duck/'],
  ['queens', '/queens/'],
  ['traintracks', '/traintracks/'],
  ['404', '/inexistant'],
]

for (const [nom, chemin] of pages) {
  test(`capture ${nom} @capture`, async ({ page }, info) => {
    await page.goto(chemin)
    await page.screenshot({ path: `captures/${info.project.name}-${nom}.png`, fullPage: true })
  })
}
