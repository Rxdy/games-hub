import { mount, RouterLinkStub } from '@vue/test-utils'
import { expect, it } from 'vitest'
import BrandLink from './BrandLink.vue'

it('BrandLink : ramène à l’accueil, avec un nom accessible', () => {
  const w = mount(BrandLink, { global: { stubs: { RouterLink: RouterLinkStub } } })
  expect(w.findComponent(RouterLinkStub).props('to')).toBe('/')
  expect(w.attributes('aria-label')).toBe('games.rxdy.fr, accueil')
  expect(w.text()).toBe('games.rxdy.fr')
})
