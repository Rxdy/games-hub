import { mount, RouterLinkStub } from '@vue/test-utils'
import { expect, it } from 'vitest'
import GameTeaser from './GameTeaser.vue'
import { games } from '../../data/games'

it('GameTeaser : titre, accroche et lien vers la page du jeu', () => {
  const game = games[1]
  const w = mount(GameTeaser, { props: { game }, global: { stubs: { RouterLink: RouterLinkStub } } })
  expect(w.findComponent(RouterLinkStub).props('to')).toBe(`/${game.slug}`)
  expect(w.find('h3').text()).toBe(game.title)
  expect(w.text()).toContain(game.tagline)
  expect(w.find('svg').exists()).toBe(true)
})
