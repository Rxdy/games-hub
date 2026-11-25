import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GameBand from './GameBand.vue'
import StatusBadge from '../atoms/StatusBadge.vue'
import { games } from '../../data/games'

const global = { stubs: { RouterLink: RouterLinkStub } }

describe('GameBand', () => {
  it('tout le bandeau mène à la page du jeu', () => {
    const w = mount(GameBand, { props: { game: games[0], index: 0 }, global })
    expect(w.findComponent(RouterLinkStub).props('to')).toBe('/queens')
  })
  it('numérote à partir de 01', () => {
    expect(mount(GameBand, { props: { game: games[0], index: 0 }, global }).find('.index').text()).toBe('01')
    expect(mount(GameBand, { props: { game: games[2], index: 2 }, global }).find('.index').text()).toBe('03')
  })
  it('affiche titre, accroche, résumé, état et motif', () => {
    const g = games[1]
    const w = mount(GameBand, { props: { game: g, index: 1 }, global })
    expect(w.find('h2').text()).toBe(g.title)
    expect(w.text()).toContain(g.tagline)
    expect(w.text()).toContain(g.summary)
    expect(w.findComponent(StatusBadge).props('status')).toBe(g.status)
    expect(w.find('svg').exists()).toBe(true)
  })
})
