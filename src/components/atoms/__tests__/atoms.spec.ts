import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppButton from '../AppButton.vue'
import MediaImage from '../MediaImage.vue'
import StatusBadge from '../StatusBadge.vue'

const global = { stubs: { RouterLink: RouterLinkStub } }

describe('AppButton', () => {
  it('est un lien externe avec href', () => {
    const w = mount(AppButton, { props: { href: 'https://queens.rxdy.fr' }, global })
    expect(w.element.tagName).toBe('A')
    expect(w.attributes('href')).toBe('https://queens.rxdy.fr')
  })

  it('est un lien interne avec to', () => {
    const w = mount(AppButton, { props: { to: '/' }, global })
    expect(w.findComponent(RouterLinkStub).props('to')).toBe('/')
  })

  it('est un bouton sans destination', () => {
    const w = mount(AppButton, { global })
    expect(w.element.tagName).toBe('BUTTON')
    expect(w.attributes('type')).toBe('button')
  })

  it('est annoncé inactif quand il est désactivé', () => {
    const w = mount(AppButton, { props: { disabled: true, href: 'https://x.test' }, global })
    expect(w.attributes('aria-disabled')).toBe('true')
    expect(w.attributes('href')).toBeUndefined()
  })
})

describe('StatusBadge', () => {
  it('affiche le libellé de l’état', () => {
    expect(mount(StatusBadge, { props: { status: 'en-developpement' } }).text()).toBe('En développement')
  })
})

describe('MediaImage', () => {
  it('réserve sa place et se charge à la demande', () => {
    const w = mount(MediaImage, { props: { src: '/a.webp', alt: 'Grille résolue', width: 800, height: 600 } })
    expect(w.attributes()).toMatchObject({ alt: 'Grille résolue', width: '800', height: '600', loading: 'lazy' })
  })
})
