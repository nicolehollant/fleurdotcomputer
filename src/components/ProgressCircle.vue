<template>
  <div class="relative flex items-center justify-center overflow-hidden rounded-full">
    <svg
      class="-rotate-90 transform"
      :style="{
        width: circumference + 'px',
        height: circumference + 'px',
      }"
    >
      <circle
        class="text-gray-200 dark:text-gray-700"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        fill="transparent"
        :r="circumference / 2 - strokeWidth / 2"
        :cx="circumference / 2"
        :cy="circumference / 2"
      ></circle>
      <circle
        class="text-primary-500"
        :stroke-width="strokeWidth"
        :stroke-dasharray="_circumference"
        :stroke-dashoffset="dashoffset"
        stroke-linecap="round"
        stroke="currentColor"
        fill="transparent"
        :r="circumference / 2 - strokeWidth / 2"
        :cx="circumference / 2"
        :cy="circumference / 2"
      ></circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value?: number
    maxValue?: number
    circumference?: number
    strokeWidth?: number
  }>(),
  {
    circumference: 100,
    strokeWidth: 12,
    value: 0,
    maxValue: 100,
  }
)
const _circumference = computed(() => (props.circumference - props.strokeWidth) * Math.PI)
const dashoffset = computed(() =>
  Math.max(0, _circumference.value - (props.value / props.maxValue) * _circumference.value)
)
</script>
