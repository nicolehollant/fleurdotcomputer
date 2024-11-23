<template>
  <div class="relative w-full items-center">
    <slot name="leading">
      <span class="absolute start-0 inset-y-0 flex items-center justify-center">
        <FieldIcon v-if="leading" :name="leading" :size="size"></FieldIcon>
      </span>
    </slot>
    <slot></slot>
    <slot name="trailing">
      <span class="absolute end-0 inset-y-0 flex items-center justify-center">
        <FieldIcon v-if="trailing" :name="trailing" :size="size"></FieldIcon>
      </span>
    </slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    leading?: string
    trailing?: string
    size?: number
  }>(),
  {
    size: 20,
  }
)
</script>

<style scoped></style>
