import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseLink from './BaseLink.vue'

const global = { stubs: { RouterLink: RouterLinkStub } }

describe('BaseLink', () => {
  it('avec `to` : lien interne du routeur', () => {
    const w = mount(BaseLink, { props: { to: '/duck' }, slots: { default: 'Duck' }, global })
    expect(w.findComponent(RouterLinkStub).props('to')).toBe('/duck')
    expect(w.text()).toBe('Duck')
  })
  it('avec `href` : lien externe classique', () => {
    const w = mount(BaseLink, { props: { href: 'https://rxdy.fr' }, slots: { default: 'Portfolio' }, global })
    expect(w.find('a').attributes('href')).toBe('https://rxdy.fr')
    expect(w.findComponent(RouterLinkStub).exists()).toBe(false)
  })
  it('transmet les classes au lien', () => {
    const w = mount(BaseLink, { props: { href: '#' }, attrs: { class: 'x' } })
    expect(w.classes()).toContain('x')
  })
})
