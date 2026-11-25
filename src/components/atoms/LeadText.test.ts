import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import LeadText from './LeadText.vue'

it('LeadText : un paragraphe d’introduction', () => {
  const w = mount(LeadText, { slots: { default: 'Accroche' } })
  expect(w.element.tagName).toBe('P')
  expect(w.text()).toBe('Accroche')
})
