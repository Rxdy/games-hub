// L'application entière, avec son vrai routeur : chaque page assemble bien ses composants.
import { createHead } from '@unhead/vue/client'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../../src/App.vue'
import { games, portfolioUrl } from '../../src/data/games'
import GameView from '../../src/views/GameView.vue'
import HomeView from '../../src/views/HomeView.vue'

async function visit(path: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: HomeView },
      { path: '/:slug', component: GameView, props: true },
    ],
  })
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router, createHead()] } })
  await flushPromises()
  return { wrapper, router }
}

describe('accueil', () => {
  it('propose un bandeau par jeu, qui mène à sa page', async () => {
    const { wrapper } = await visit('/')
    expect(wrapper.findAll('.bands a').map((a) => a.attributes('href'))).toEqual(games.map((g) => `/${g.slug}`))
  })

  it('renvoie au portfolio depuis le pied de page seulement', async () => {
    const { wrapper } = await visit('/')
    expect(wrapper.find(`footer a[href="${portfolioUrl}"]`).exists()).toBe(true)
    expect(wrapper.find(`header a[href="${portfolioUrl}"]`).exists()).toBe(false)
  })
})

describe('page d’un jeu', () => {
  it.each(games)('$slug : les sections dans l’ordre', async (game) => {
    const { wrapper } = await visit(`/${game.slug}`)
    expect(wrapper.find('h1').text()).toBe(game.title)
    expect(wrapper.findAll('.content-section').map((s) => s.attributes('id'))).toEqual([
      'principe', 'comment-jouer', 'galerie', 'points-forts', 'technos', 'autres-jeux',
    ])
    expect(wrapper.text()).not.toContain('Tous les jeux')
  })

  it('propose de jouer à un jeu en ligne', async () => {
    const { wrapper } = await visit('/queens')
    expect(wrapper.find('.fact-sheet a').attributes('href')).toBe('https://queens.rxdy.fr')
  })

  it('n’offre pas de lien pour un jeu en développement', async () => {
    const { wrapper } = await visit('/duck')
    expect(wrapper.find('.fact-sheet a').exists()).toBe(false)
    expect(wrapper.find('.fact-sheet').text()).toContain('Pas encore jouable')
  })

  it('change de contenu en passant à un autre jeu', async () => {
    const { wrapper, router } = await visit('/duck')
    await router.push('/queens')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Queens')
    expect(wrapper.findAll('.game-card')).toHaveLength(games.length - 1)
  })

  it('affiche la page introuvable pour une adresse inconnue', async () => {
    const { wrapper } = await visit('/inconnu')
    expect(wrapper.find('h1').text()).toBe('Page introuvable')
  })
})
