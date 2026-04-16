<script setup lang="ts">
import englishWordsWith5Letters from '@/englishWordsWith5Letters.json'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'
import { ref } from 'vue'

defineProps({
	wordOfTheDay: {
		type: String,
		validator: (value: string) => englishWordsWith5Letters.includes(value) && value.toUpperCase() === value,
	},
})

const guessInProgress = ref('')
const guessSubmitted = ref('')
</script>
<template>
	<input type="text" v-model="guessInProgress" @keydown.enter="guessSubmitted = guessInProgress" />
	<p v-if="guessSubmitted.length > 0" v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"></p>
</template>
