import { mount, RouterLinkStub } from '@vue/test-utils'
import { expect, it } from 'vitest'
import GameTeaser from './../molecules/GameTeaser.vue'
import OtherGames from './OtherGames.vue'
import { games } from '../../data/games'

it('OtherGames : titre et un aperçu par jeu', () => {
  const w = mount(OtherGames, { props: { games: games.slice(1) }, global: { stubs: { RouterLink: RouterLinkStub } } })
  expect(w.find('h2').text()).toBe('Les autres jeux')
  expect(w.findAllComponents(GameTeaser)).toHaveLength(2)
})
