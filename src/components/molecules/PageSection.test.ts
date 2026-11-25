import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'
import PageSection from './PageSection.vue'

describe('PageSection', () => {
  it('avec titre : le h2 nomme la section', () => {
    const w = mount(PageSection, { props: { title: 'Le jeu' }, slots: { default: '<p>contenu</p>' } })
    const h2 = w.find('h2')
    expect(h2.text()).toBe('Le jeu')
    expect(w.attributes('aria-labelledby')).toBe(h2.attributes('id'))
    expect(w.attributes('aria-label')).toBeUndefined()
    expect(w.text()).toContain('contenu')
  })
  it('sans titre : `label` donne le nom accessible, pas de h2', () => {
    const w = mount(PageSection, { props: { label: 'Les jeux' } })
    expect(w.find('h2').exists()).toBe(false)
    expect(w.attributes('aria-label')).toBe('Les jeux')
  })
  it('deux sections de la même page ont des identifiants différents', () => {
    const Page = defineComponent({
      components: { PageSection },
      template: '<div><PageSection title="A" /><PageSection title="B" /></div>',
    })
    const [a, b] = mount(Page).findAll('h2').map((h) => h.attributes('id'))
    expect(a).toBeTruthy()
    expect(a).not.toBe(b)
  })
})
