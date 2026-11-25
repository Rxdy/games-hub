import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import PageHero from './PageHero.vue'

it('PageHero : surtitre, h1 unique et contenu en slot', () => {
  const w = mount(PageHero, { props: { eyebrow: '404', title: 'Page introuvable' }, slots: { default: '<p id="s">slot</p>' } })
  expect(w.find('.eyebrow').text()).toBe('404')
  expect(w.findAll('h1')).toHaveLength(1)
  expect(w.find('h1').text()).toBe('Page introuvable')
  expect(w.find('#s').exists()).toBe(true)
})
