<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
  autoresize?: boolean
  rows?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <div
    v-if="autoresize"
    :class="
      cn(
        'flex w-full rounded-md border border-input bg-background text-sm disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
    class="grid [&>textarea]:text-inherit [&>textarea]:resize-none [&>textarea]:overflow-hidden [&>textarea]:[grid-area:1/1/2/2]"
  >
    <textarea
      class="w-full bg-background placeholder:text-muted-foreground border border-transparent appearance-none rounded px-3 py-2 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
      :rows="rows || '2'"
      v-model="modelValue"
      v-bind="$attrs"
    ></textarea>
    <div class="[grid-area:1/1/2/2] whitespace-pre-wrap invisible border px-3 py-2 text-inherit">
      {{ modelValue + ' ' }}
    </div>
  </div>
  <textarea
    v-else
    v-model="modelValue"
    :class="
      cn(
        'flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  />
</template>
