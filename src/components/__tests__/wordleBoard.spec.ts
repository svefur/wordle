import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'
import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'

const wordOfTheDay = 'TESTS'
describe('Wordle board', () => {
	it('a victory message appers when the user makes a guess that matches the word of the day', async () => {
		const wrapper = mount(WordleBoard, {
			props: {
				wordOfTheDay: wordOfTheDay,
			},
		})

		const guessInput = wrapper.find('input[type=text]')
		await guessInput.setValue(wordOfTheDay)
		await guessInput.trigger('keydown.enter')

		expect(wrapper.text()).toContain(VICTORY_MESSAGE)
	})

	test('a defeat message appers if the user makes a guess that is incorrect', async () => {
		const wrapper = mount(WordleBoard, {
			props: {
				wordOfTheDay: wordOfTheDay,
			},
		})

		const guessInput = wrapper.find('input[type=text]')
		await guessInput.setValue('WRONG')
		await guessInput.trigger('keydown.enter')

		expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
	})
	test('no end-of-game message appears if the user has not yet made a guess', async () => {
		const wrapper = mount(WordleBoard, {
			props: {
				wordOfTheDay: wordOfTheDay,
			},
		})

		expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
		expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
	})
})
