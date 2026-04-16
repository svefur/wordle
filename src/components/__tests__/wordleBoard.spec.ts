import { describe, expect, it } from 'vitest'

import WordleBoard from '@/components/WordleBoard.vue'
import { mount } from '@vue/test-utils'

describe('Wordle board', () => {
	it('renders properly', () => {
		const wrapper = mount(WordleBoard, {
			props: {
				msg: 'You did it!',
			},
		})
		expect(wrapper.text()).toContain('You did it!')
	})
})
