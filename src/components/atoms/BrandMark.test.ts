import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import BrandMark from './BrandMark.vue'

it('BrandMark : décoratif, caché des lecteurs d’écran', () => {
  expect(mount(BrandMark).attributes('aria-hidden')).toBe('true')
})
