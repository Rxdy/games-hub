import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SkipLink from './SkipLink.vue'

describe('SkipLink', () => {
  it('par défaut : saute vers #contenu', () => {
    const w = mount(SkipLink)
    expect(w.attributes('href')).toBe('#contenu')
    expect(w.text()).toBe('Aller au contenu')
  })
  it('cible personnalisable', () => {
    expect(mount(SkipLink, { props: { target: '#main' } }).attributes('href')).toBe('#main')
  })
})
