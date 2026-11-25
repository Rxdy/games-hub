import { beforeEach, describe, expect, it, vi } from 'vitest'

const useHead = vi.hoisted(() => vi.fn())
vi.mock('@unhead/vue', () => ({ useHead }))

import { usePageHead } from './head'

type Meta = { name?: string; property?: string; content: string }
const appel = () => useHead.mock.calls[0][0] as { title: string; link: { rel: string; href: string }[]; meta: Meta[] }
const meta = (cle: string) => appel().meta.find((m) => m.name === cle || m.property === cle)?.content

describe('usePageHead', () => {
  beforeEach(() => useHead.mockClear())

  it('adresse canonique avec « / » final (pages générées en /x/index.html)', () => {
    usePageHead({ title: 'T', description: 'D', path: '/duck' })
    expect(appel().link).toEqual([{ rel: 'canonical', href: 'https://games.rxdy.fr/duck/' }])
  })
  it('accueil : pas de double « / »', () => {
    usePageHead({ title: 'T', description: 'D', path: '/' })
    expect(appel().link[0].href).toBe('https://games.rxdy.fr/')
  })
  it('titre et description repris dans la description et l’aperçu de partage', () => {
    usePageHead({ title: 'Duck', description: 'Desc', path: '/duck' })
    expect(appel().title).toBe('Duck')
    expect(meta('description')).toBe('Desc')
    expect(meta('og:title')).toBe('Duck')
    expect(meta('og:description')).toBe('Desc')
    expect(meta('og:url')).toBe('https://games.rxdy.fr/duck/')
  })
  it('noindex seulement si demandé', () => {
    usePageHead({ title: 'T', description: 'D', path: '/404', noindex: true })
    expect(meta('robots')).toBe('noindex')
    useHead.mockClear()
    usePageHead({ title: 'T', description: 'D', path: '/' })
    expect(meta('robots')).toBeUndefined()
  })
})
