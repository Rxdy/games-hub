import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import ProseBlock from './ProseBlock.vue'

it('ProseBlock : un <p> par paragraphe, dans l’ordre', () => {
  const w = mount(ProseBlock, { props: { paragraphs: ['Un', 'Deux', 'Trois'] } })
  expect(w.findAll('p').map((p) => p.text())).toEqual(['Un', 'Deux', 'Trois'])
})
