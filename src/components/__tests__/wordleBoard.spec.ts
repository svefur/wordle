import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from '@/settings'
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
		beforeEach(() => {
			console.warn = vi.fn()
		})

		test.each([
			{ wordOfTheDay: 'FLY', reason: `words-of-the-day must have ${WORD_SIZE} characters` },
			{ wordOfTheDay: 'apple', reason: 'words-of-the-day must be all in uppercase' },
			{ wordOfTheDay: 'DASAA', reason: 'words-of-the-day must be a valid english word' },
		])('Since $reason: $wordOfTheDay is invalid, a warning must be emitted', async ({ wordOfTheDay }) => {
			mount(WordleBoard, { props: { wordOfTheDay } })

			expect(console.warn).toHaveBeenCalled()
		})

		test('If the word of the day is a real word, a warning is not emitted', async () => {
			mount(WordleBoard, {
				props: {
					wordOfTheDay: 'APPLE',
				},
			})

			expect(console.warn).not.toHaveBeenCalled()
		})
	})
	describe('Player input', () => {
		test(`player guesses are limited to ${WORD_SIZE} letters`, async () => {
			await playerSubmitsGuess(wordOfTheDay + 'EXTRA')

			expect(wrapper.text()).toContain(VICTORY_MESSAGE)
		})

		test('player guesses can only be submitted if they are real words', async () => {
			await playerSubmitsGuess('TTTTT')

			expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
			expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
		})
		test('player guesses are not case-sensitive', async () => {
			await playerSubmitsGuess(wordOfTheDay.toLowerCase())

			expect(wrapper.text()).toContain(VICTORY_MESSAGE)
		})
		test('player guesses can only contain letters', async () => {
			await playerSubmitsGuess('H3!RT')

			expect(wrapper.find<HTMLInputElement>('input[type=text]')?.element.value).toEqual('HRT')
		})
		test('non-letter characters do not render on the screen while being typed', async () => {
			await playerSubmitsGuess('12')
			await playerSubmitsGuess('123')

			expect(wrapper.find<HTMLInputElement>('input[type=text]')?.element.value).toEqual('')
		})
	})
})
