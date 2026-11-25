import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BackLink from './BackLink.vue'

describe('BackLink', () => {
  it('affiche le texte et pointe vers l’adresse', () => {
    const w = mount(BackLink, { props: { href: 'https://rxdy.fr' }, slots: { default: '← rxdy.fr' } })
    expect(w.text()).toBe('← rxdy.fr')
    expect(w.attributes('href')).toBe('https://rxdy.fr')
  })
})
