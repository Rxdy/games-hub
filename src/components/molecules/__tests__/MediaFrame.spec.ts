import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MediaFrame from '../MediaFrame.vue'

describe('MediaFrame', () => {
  it('sans capture : emblème et « Aperçu bientôt », aucune image', () => {
    const w = mount(MediaFrame, { props: { emblem: 'duck' } })
    expect(w.text()).toContain('Aperçu bientôt')
    expect(w.find('img').exists()).toBe(false)
    expect(w.find('svg[data-emblem="duck"]').exists()).toBe(true)
  })

  it('avec capture : l’image et sa légende', () => {
    const media = { src: '/a.webp', alt: 'Grille', caption: 'Grille 8×8', width: 8, height: 6 }
    const w = mount(MediaFrame, { props: { emblem: 'queens', media } })
    expect(w.find('img').attributes('src')).toBe('/a.webp')
    expect(w.text()).toBe('Grille 8×8')
  })
})
