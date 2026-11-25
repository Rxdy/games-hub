import { config, mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MediaGallery from '../MediaGallery.vue'

// AppButton sait aussi faire un lien interne : le routeur est simulé.
config.global.stubs = { RouterLink: RouterLinkStub }

const media = ['a', 'b', 'c'].map((n) => ({ src: `/${n}.webp`, alt: `Capture ${n}`, width: 8, height: 6 }))
const open = async (i: number) => {
  const w = mount(MediaGallery, { props: { media, emblem: 'queens' }, attachTo: document.body })
  await w.findAll('.thumb')[i]!.trigger('click')
  return w
}
const shown = (w: Awaited<ReturnType<typeof open>>) => w.find('dialog img').attributes('src')

describe('MediaGallery', () => {
  it('sans capture : un aperçu à venir, rien à agrandir', () => {
    const w = mount(MediaGallery, { props: { media: [], emblem: 'duck' } })
    expect(w.text()).toContain('Aperçu bientôt')
    expect(w.find('button').exists()).toBe(false)
  })

  it('agrandit la capture choisie', async () => {
    expect(shown(await open(1))).toBe('/b.webp')
  })

  it('boucle avec les boutons', async () => {
    const w = await open(2)
    await w.find('[data-action="next"]').trigger('click')
    expect(shown(w)).toBe('/a.webp')
    await w.find('[data-action="previous"]').trigger('click')
    expect(shown(w)).toBe('/c.webp')
  })

  it('se pilote au clavier', async () => {
    const w = await open(0)
    await w.find('dialog').trigger('keydown', { key: 'ArrowRight' })
    expect(shown(w)).toBe('/b.webp')
    await w.find('dialog').trigger('keydown', { key: 'ArrowLeft' })
    expect(shown(w)).toBe('/a.webp')
  })

  it('se balaie au doigt, mais ignore un petit geste', async () => {
    const w = await open(0)
    const swipe = async (from: number, to: number) => {
      await w.find('dialog').trigger('touchstart', { changedTouches: [{ clientX: from }] })
      await w.find('dialog').trigger('touchend', { changedTouches: [{ clientX: to }] })
    }
    await swipe(200, 180)
    expect(shown(w)).toBe('/a.webp')
    await swipe(200, 80)
    expect(shown(w)).toBe('/b.webp')
  })

  it('se ferme', async () => {
    const w = await open(0)
    await w.find('[data-action="close"]').trigger('click')
    await new Promise((r) => setTimeout(r, 0))
    expect(w.find('dialog img').exists()).toBe(false)
  })
})
