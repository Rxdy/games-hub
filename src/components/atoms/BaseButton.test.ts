import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseButton from './BaseButton.vue'

const global = { stubs: { RouterLink: RouterLinkStub } }

describe('BaseButton', () => {
  it('lien externe', () => {
    const w = mount(BaseButton, { props: { href: 'https://queens.rxdy.fr' }, slots: { default: 'Jouer' }, global })
    expect(w.element.tagName).toBe('A')
    expect(w.attributes('href')).toBe('https://queens.rxdy.fr')
    expect(w.classes()).toContain('btn')
  })
  it('lien interne', () => {
    const w = mount(BaseButton, { props: { to: '/' }, slots: { default: 'Accueil' }, global })
    expect(w.findComponent(RouterLinkStub).props('to')).toBe('/')
  })
  it('désactivé : ce n’est plus un lien et c’est annoncé comme tel', () => {
    const w = mount(BaseButton, { props: { disabled: true, href: 'https://x.fr' }, slots: { default: 'Bientôt' }, global })
    expect(w.element.tagName).toBe('SPAN')
    expect(w.attributes('aria-disabled')).toBe('true')
    expect(w.find('a').exists()).toBe(false)
  })
})
