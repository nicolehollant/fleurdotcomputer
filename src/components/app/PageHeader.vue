<template>
  <header class="w-full bg-background">
    <AppContainer class="py-8 md:py-10 grid gap-2">
      <slot name="leading"></slot>
      <slot name="title">
        <h2 class="text-4xl font-bold font-dosis text-accent-foreground">
          {{ title }}
        </h2>
      </slot>

      <slot name="trailing"></slot>
    </AppContainer>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
