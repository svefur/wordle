import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'
import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'

const wordOfTheDay = 'APPLE'
describe('Wordle board', () => {
	let wrapper: ReturnType<typeof mount>

	beforeEach(() => {
		wrapper = mount(WordleBoard, {
			props: {
				wordOfTheDay: wordOfTheDay,
			},
		})
	})

	async function playerSubmitsGuess(guess: string) {
		const guessInput = wrapper.find('input[type=text]')
		await guessInput.setValue(guess)
		await guessInput.trigger('keydown.enter')
	}

	it('a victory message appers when the user makes a guess that matches the word of the day', async () => {
		await playerSubmitsGuess(wordOfTheDay)

		expect(wrapper.text()).toContain(VICTORY_MESSAGE)
	})

	test('a defeat message appers if the user makes a guess that is incorrect', async () => {
		await playerSubmitsGuess('WRONG')

		expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
	})
	test('no end-of-game message appears if the user has not yet made a guess', async () => {
		expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
		expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
	})

	test('If a word of the day provided does not have exactly 5 characters, a warning is emitted', async () => {
		console.warn = vi.fn()

		mount(WordleBoard, {
			props: {
				wordOfTheDay: 'FLY',
			},
		})

		expect(console.warn).toHaveBeenCalled()
	})

	test('If the word of the day is not all in uppercase, a warning is emitted', async () => {
		console.warn = vi.fn()

		mount(WordleBoard, {
			props: {
				wordOfTheDay: 'apple',
			},
		})

		expect(console.warn).toHaveBeenCalled()
	})

	test('If the word of the day is not a real word, a warning is emitted', async () => {
		console.warn = vi.fn()

		mount(WordleBoard, {
			props: {
				wordOfTheDay: 'DASAA',
			},
		})

		expect(console.warn).toHaveBeenCalled()
	})

	test('If the word of the day is a real word, a warning is not emitted', async () => {
		console.warn = vi.fn()

		mount(WordleBoard, {
			props: {
				wordOfTheDay: 'APPLE',
			},
		})

		expect(console.warn).not.toHaveBeenCalled()
	})
})
