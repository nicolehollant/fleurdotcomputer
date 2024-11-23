<template>
  <div
    v-bind="$attrs"
    :style="{
      transform: `skew(${skew.x}deg, ${skew.y}deg)`,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core'
const props = withDefaults(
  defineProps<{
    invert: boolean
    multiplier: number
  }>(),
  {
    invert: false,
    multiplier: 1,
  }
)

const { x, y } = useMouse()
const skew = computed(() => {
  const maxWidth = window?.innerWidth ?? 1000
  const maxHeight = window?.innerHeight ?? 1000
  return {
    x: ((maxWidth / 2 - x.value) / maxWidth) * 1.8 * props.multiplier * (props.invert ? -1 : 1),
    y: ((maxHeight / 2 - y.value) / maxHeight) * 1.2 * props.multiplier * (props.invert ? -1 : 1),
  }
})
</script>
