<template>
  <div class="rounded-lg">
    <ClientOnly>
      <div
        class="prose dark:prose-invert prose-sm md:prose-base prose-strong:font-extrabold outline-none"
        v-html="rendered"
      ></div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { generateHTML } from '@tiptap/html'

const props = defineProps<{
  content: string
}>()

function tryParseOrNull(val: string) {
  try {
    return JSON.parse(val)
  } catch (error) {
    return null
  }
}

const rendered = computed(() => {
  try {
    const json = tryParseOrNull(props.content)
    return generateHTML(json, [StarterKit, Highlight, Underline])
  } catch (error) {
    return null
  }
})
</script>
