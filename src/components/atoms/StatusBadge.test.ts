import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import StatusBadge from './StatusBadge.vue'

describe('StatusBadge', () => {
  it.each([
    ['en-ligne', 'En ligne'],
    ['en-developpement', 'En développement'],
  ] as const)('%s → « %s »', (status, label) => {
    const w = mount(StatusBadge, { props: { status } })
    expect(w.text()).toBe(label)
    expect(w.attributes('data-status')).toBe(status)
  })
})
