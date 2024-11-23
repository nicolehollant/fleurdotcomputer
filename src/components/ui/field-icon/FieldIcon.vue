<template>
  <span class="px-2 flex items-center justify-center">
    <Icon :name="name" :size="size" class="text-muted-foreground" />
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    size?: number
  }>(),
  {
    size: 20,
  }
)
</script>
