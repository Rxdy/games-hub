import { mount, RouterLinkStub } from '@vue/test-utils'
import { expect, it } from 'vitest'
import GameBand from './GameBand.vue'
import GameBandList from './GameBandList.vue'
import { games } from '../../data/games'

it('GameBandList : un bandeau par jeu, numérotés dans l’ordre', () => {
  const w = mount(GameBandList, { props: { games }, global: { stubs: { RouterLink: RouterLinkStub } } })
  const bandes = w.findAllComponents(GameBand)
  expect(bandes.map((b) => b.props('game').slug)).toEqual(games.map((g) => g.slug))
  expect(bandes.map((b) => b.props('index'))).toEqual([0, 1, 2])
  expect(w.attributes('aria-label')).toBe('Les jeux')
})
