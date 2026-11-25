import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import SiteFooter from './SiteFooter.vue'
import { githubUrl, portfolioUrl } from '../../data/games'

it('SiteFooter : précise que le site ne contient aucun jeu, avec les deux liens', () => {
  const w = mount(SiteFooter)
  expect(w.text()).toContain('il n’en contient aucun')
  expect(w.find(`a[href="${portfolioUrl}"]`).exists()).toBe(true)
  expect(w.find(`a[href="${githubUrl}"]`).exists()).toBe(true)
})
