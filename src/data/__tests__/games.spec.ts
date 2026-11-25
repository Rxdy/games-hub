// @vitest-environment node
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { findGame, games, siteUrl } from '../games'

const sitemap = readFileSync('public/sitemap.xml', 'utf8')

describe('contenu des jeux', () => {
  it('a des identifiants uniques', () => {
    expect(new Set(games.map((g) => g.slug)).size).toBe(games.length)
  })

  it.each(games)('$slug : fiche complète', (game) => {
    expect(game.steps).toHaveLength(3)
    expect(game.description.length).toBeGreaterThan(0)
    expect(game.features.length).toBeGreaterThan(0)
    expect(game.facts.length).toBeGreaterThan(0)
    expect(sitemap).toContain(`${siteUrl}/${game.slug}/`)
  })

  it.each(games)('$slug : lien présent si le jeu est en ligne, absent sinon', (game) => {
    if (game.status === 'en-ligne') expect(game.url).toMatch(/^https:\/\//)
    else expect(game.url).toBeUndefined()
  })

  it.each(games)('$slug : chaque capture existe et est décrite', (game) => {
    for (const item of game.media) {
      expect(existsSync(`public${item.src}`), item.src).toBe(true)
      expect(item.alt.trim()).not.toBe('')
    }
  })

  it('retrouve un jeu par son identifiant', () => {
    expect(findGame('queens')?.title).toBe('Queens')
    expect(findGame('inconnu')).toBeUndefined()
  })
})
