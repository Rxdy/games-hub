import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import TagChip from './TagChip.vue'

it('TagChip : affiche son contenu', () => {
  expect(mount(TagChip, { slots: { default: 'Vue 3' } }).text()).toBe('Vue 3')
})
