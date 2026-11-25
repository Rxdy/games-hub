import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import TagList from './TagList.vue'

it('TagList : une puce par techno, dans une vraie liste', () => {
  const w = mount(TagList, { props: { tags: ['Vue', 'Docker'] } })
  expect(w.findAll('li').map((l) => l.text())).toEqual(['Vue', 'Docker'])
})
