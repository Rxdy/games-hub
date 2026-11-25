import { mount, RouterLinkStub } from '@vue/test-utils'
import { expect, it } from 'vitest'
import SiteHeader from './SiteHeader.vue'
import { portfolioUrl } from '../../data/games'

it('SiteHeader : logo vers l’accueil et retour vers le portfolio', () => {
  const w = mount(SiteHeader, { global: { stubs: { RouterLink: RouterLinkStub } } })
  expect(w.find('header').exists()).toBe(true)
  expect(w.findComponent(RouterLinkStub).props('to')).toBe('/')
  expect(w.find(`a[href="${portfolioUrl}"]`).exists()).toBe(true)
})
