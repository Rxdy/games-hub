import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import FeatureCard from './FeatureCard.vue'
import FeatureList from './FeatureList.vue'

it('FeatureList : une carte par fonctionnalité, dans une vraie liste', () => {
  const features = [
    { title: 'A', text: 'a' },
    { title: 'B', text: 'b' },
  ]
  const w = mount(FeatureList, { props: { features } })
  expect(w.findAll('ul > li')).toHaveLength(2)
  expect(w.findAllComponents(FeatureCard).map((c) => c.props('title'))).toEqual(['A', 'B'])
})
