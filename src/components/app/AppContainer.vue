<template>
  <component :is="as" class="px-4 md:px-6 w-full mx-auto" v-bind="$attrs">
    <slot></slot>
  </component>
  <!-- <component :is="as" class="container" v-bind="$attrs">
    <slot></slot>
  </component> -->
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string
  }>(),
  {
    as: 'div',
  }
)
</script>
