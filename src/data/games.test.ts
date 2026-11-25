import { describe, expect, it } from 'vitest'
import { findGame, games, githubUrl, portfolioUrl, siteUrl, statusLabel } from './games'

describe('données des jeux', () => {
  it('trois jeux, dans l’ordre Duck, Queens, Train Tracks', () => {
    expect(games.map((g) => g.slug)).toEqual(['duck', 'queens', 'traintracks'])
  })
  it('slugs uniques et utilisables dans une adresse', () => {
    const slugs = games.map((g) => g.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/)
  })
  it('un jeu en ligne a une adresse https, un jeu en développement n’en a pas', () => {
    for (const g of games) {
      if (g.status === 'en-ligne') expect(g.url, g.slug).toMatch(/^https:\/\//)
      else expect(g.url, g.slug).toBeUndefined()
    }
  })
  it('contenu complet pour chaque jeu', () => {
    for (const g of games) {
      expect(g.title, g.slug).not.toBe('')
      expect(g.description.length, g.slug).toBeGreaterThan(0)
      expect(g.features.length, g.slug).toBeGreaterThan(0)
      expect(g.tags.length, g.slug).toBeGreaterThan(0)
      expect(statusLabel[g.status]).toBeTruthy()
    }
  })
  it('adresses du site sans « / » final (le code l’ajoute)', () => {
    for (const u of [siteUrl, portfolioUrl, githubUrl]) expect(u).toMatch(/^https:\/\/[^/]+(\/[^/]+)*[^/]$/)
  })
  it('findGame', () => {
    expect(findGame('queens')?.title).toBe('Queens')
    expect(findGame('nimporte')).toBeUndefined()
  })
})
