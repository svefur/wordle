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

	describe('End-of-game messages', () => {
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
	})

	describe('Word of the day validation', () => {
		test.each([
			{ wordOfTheDay: 'FLY', reason: 'words-of-the-day must have 5 characters' },
			{ wordOfTheDay: 'apple', reason: 'words-of-the-day must be all in uppercase' },
			{ wordOfTheDay: 'DASAA', reason: 'words-of-the-day must be a valid english word' },
		])('Since $reason: $wordOfTheDay is invalid, a warning must be emitted', async ({ wordOfTheDay }) => {
			console.warn = vi.fn()

			mount(WordleBoard, { props: { wordOfTheDay } })

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
	describe('Player input', () => {
		test.todo('player guesses are limited to 5 letters')
		test.todo('player guesses can only be submitted if they are real words')
		test.todo('player guesses are not case-sensitive')
		test.todo('player guesses can only contain letters')
	})
})
