import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import FeatureCard from './FeatureCard.vue'

it('FeatureCard : titre en h3 et texte', () => {
  const w = mount(FeatureCard, { props: { title: 'Benchmark', text: 'Compare les méthodes.' } })
  expect(w.find('h3').text()).toBe('Benchmark')
  expect(w.find('p').text()).toBe('Compare les méthodes.')
})
