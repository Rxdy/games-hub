import { mount, RouterLinkStub } from '@vue/test-utils'
import { expect, it } from 'vitest'
import SiteHeader from './SiteHeader.vue'

it('SiteHeader : logo vers l’accueil, rien d’autre', () => {
  const w = mount(SiteHeader, { global: { stubs: { RouterLink: RouterLinkStub } } })
  expect(w.find('header').exists()).toBe(true)
  expect(w.findComponent(RouterLinkStub).props('to')).toBe('/')
  expect(w.findAll('a')).toHaveLength(1)
})
