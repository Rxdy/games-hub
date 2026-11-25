import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GameHero from './GameHero.vue'
import { findGame } from '../../data/games'

const global = { stubs: { RouterLink: RouterLinkStub } }

describe('GameHero', () => {
  it('jeu en ligne : bouton « Jouer » vers son adresse', () => {
    const queens = findGame('queens')!
    const w = mount(GameHero, { props: { game: queens }, global })
    const bouton = w.find('a.btn')
    expect(bouton.attributes('href')).toBe(queens.url)
    expect(bouton.text()).toContain('Jouer à Queens')
    expect(w.find('[aria-disabled]').exists()).toBe(false)
  })
  it('jeu pas encore jouable : bouton désactivé, aucun lien de jeu', () => {
    // Aucun jeu du hub n'est dans cet état aujourd'hui : on le simule à partir d'un jeu existant.
    const bientot = { ...findGame('duck')!, url: undefined, status: 'en-developpement' as const }
    const w = mount(GameHero, { props: { game: bientot }, global })
    expect(w.find('[aria-disabled="true"]').text()).toBe('Pas encore jouable')
    expect(w.find('a.btn').exists()).toBe(false)
  })
  it('un seul h1 (le titre du jeu), pas de lien de retour', () => {
    const w = mount(GameHero, { props: { game: findGame('traintracks')! }, global })
    expect(w.findAll('h1')).toHaveLength(1)
    expect(w.find('h1').text()).toBe('Train Tracks')
    expect(w.findComponent(RouterLinkStub).exists()).toBe(false)
  })
})
