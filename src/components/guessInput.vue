<script setup lang="ts">
import englishWords from '@/englishWordsWith5Letters.json'
import { WORD_SIZE } from '@/settings'
import { computed, ref, triggerRef } from 'vue'

const guessInProgress = ref<string | null>(null)

const emit = defineEmits<{
	guessSubmitted: [guess: string]
}>()
const formattedGuessInProgress = computed<string>({
	get() {
		return guessInProgress.value ?? ''
	},
	set(rawValue: string) {
		guessInProgress.value = null

		guessInProgress.value = rawValue
			.slice(0, WORD_SIZE)
			.toUpperCase()
			.replace(/[^A-Z]+/gi, '')

		triggerRef(formattedGuessInProgress)
	},
})

function onSubmit() {
	if (!englishWords.includes(formattedGuessInProgress.value)) {
		return
	}

	emit('guessSubmitted', formattedGuessInProgress.value)
}
</script>

<template>
	<input v-model="formattedGuessInProgress" :maxlength="WORD_SIZE" type="text" @keydown.enter="onSubmit" />
</template>
