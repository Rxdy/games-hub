import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GameMotif from './GameMotif.vue'
import type { MotifName } from '../../data/games'

describe('GameMotif', () => {
  it.each(['duck', 'queens', 'tracks'] as MotifName[])('« %s » dessine un SVG décoratif', (name) => {
    const w = mount(GameMotif, { props: { name } })
    expect(w.element.tagName.toLowerCase()).toBe('svg')
    expect(w.attributes('aria-hidden')).toBe('true')
    expect(w.findAll('*').length).toBeGreaterThan(3)
  })
  it('Queens : une reine par zone (5)', () => {
    expect(mount(GameMotif, { props: { name: 'queens' } }).findAll('.queen')).toHaveLength(5)
  })
  it('les trois motifs sont différents', () => {
    const rendu = (name: MotifName) => mount(GameMotif, { props: { name } }).html()
    expect(new Set([rendu('duck'), rendu('queens'), rendu('tracks')]).size).toBe(3)
  })
})
