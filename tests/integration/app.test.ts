import { mount, flushPromises } from '@vue/test-utils'
import { createHead } from '@unhead/vue/client'
import { createMemoryHistory, createRouter } from 'vue-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../../src/App.vue'
import { routes } from '../../src/routes'
import { games } from '../../src/data/games'

// Intégration : le vrai routeur, les vraies vues et tous les composants ensemble.
async function ouvrir(chemin: string) {
  const router = createRouter({ history: createMemoryHistory(), routes })
  const wrapper = mount(App, { global: { plugins: [router, createHead()] } })
  await router.push(chemin)
  await flushPromises()
  return { router, wrapper }
}

describe('site complet', () => {
  beforeEach(() => document.body.replaceChildren())

  it('accueil : un bandeau par jeu, un seul h1', async () => {
    const { wrapper } = await ouvrir('/')
    expect(wrapper.findAll('h1')).toHaveLength(1)
    expect(wrapper.find('h1').text()).toBe('Les jeux de Rudy')
    expect(wrapper.findAll('a.band').map((a) => a.attributes('href'))).toEqual(games.map((g) => `/${g.slug}`))
  })

  it('en-tête, contenu et pied de page sont toujours là', async () => {
    const { wrapper } = await ouvrir('/')
    expect(wrapper.find('a.skip').exists()).toBe(true)
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('main#contenu').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('cliquer sur un bandeau ouvre la page du jeu', async () => {
    const { wrapper, router } = await ouvrir('/')
    await wrapper.find('a[href="/queens"]').trigger('click')
    await vi.waitFor(() => expect(router.currentRoute.value.path).toBe('/queens'))
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Queens')
  })

  it.each(games)('page « $slug » : titre, description, fonctionnalités, techno et autres jeux', async (game) => {
    const { wrapper } = await ouvrir(`/${game.slug}`)
    expect(wrapper.find('h1').text()).toBe(game.title)
    expect(wrapper.findAll('h2').map((h) => h.text())).toEqual(['Le jeu', 'Ce qu’on y trouve', 'Sous le capot', 'Les autres jeux'])
    expect(wrapper.findAll('article.feature')).toHaveLength(game.features.length)
    expect(wrapper.findAll('.chip').map((c) => c.text())).toEqual(game.tags)
    expect(wrapper.findAll('a.teaser')).toHaveLength(games.length - 1)
    expect(wrapper.find(`a.teaser[href="/${game.slug}"]`).exists()).toBe(false)
  })

  it('jeu en ligne : « Jouer » ; jeu en développement : bouton désactivé', async () => {
    const queens = await ouvrir('/queens')
    expect(queens.wrapper.find('a.btn').attributes('href')).toBe('https://queens.rxdy.fr')
    const duck = await ouvrir('/duck')
    expect(duck.wrapper.find('[aria-disabled="true"]').text()).toBe('Pas encore jouable')
    expect(duck.wrapper.find('a.btn').exists()).toBe(false)
  })

  it.each(['/nimporte-quoi', '/a/b/c', '/404'])('adresse inconnue %s : page introuvable avec retour à l’accueil', async (chemin) => {
    const { wrapper } = await ouvrir(chemin)
    expect(wrapper.find('h1').text()).toBe('Page introuvable')
    expect(wrapper.find('a.btn').attributes('href')).toBe('/')
  })

  it('le lien « autres jeux » change de page', async () => {
    const { wrapper } = await ouvrir('/duck')
    await wrapper.find('a.teaser[href="/traintracks"]').trigger('click')
    await vi.waitFor(() => expect(wrapper.find('h1').text()).toBe('Train Tracks'))
  })
})
