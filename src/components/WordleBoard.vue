<script setup lang="ts">
import englishWordsWith5Letters from '@/englishWordsWith5Letters.json'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from '@/settings'
import { computed, ref } from 'vue'

defineProps({
	wordOfTheDay: {
		type: String,
		validator: (value: string) => englishWordsWith5Letters.includes(value) && value.toUpperCase() === value,
	},
})

const guessInProgress = ref('')
const guessSubmitted = ref('')

const formattedGuestInProgress = computed({
	get() {
		return guessInProgress.value.toUpperCase()
	},
	set(rawValue: string) {
		guessInProgress.value = rawValue
			.slice(0, WORD_SIZE)
			.toUpperCase()
			.replace(/[^A-Z]+/gi, '')
	},
})

const submitWord = () => {
	if (englishWordsWith5Letters.includes(formattedGuestInProgress.value)) {
		guessSubmitted.value = formattedGuestInProgress.value
	}
}
</script>
<template>
	<input type="text" v-model="formattedGuestInProgress" @keydown.enter="submitWord" :maxlength="WORD_SIZE" />
	<p v-if="guessSubmitted.length > 0" v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"></p>
</template>
