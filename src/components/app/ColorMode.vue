<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <div class="relative flex">
        <Icon name="mdi:brightness-3" class="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon
          name="mdi:brightness-5"
          class="absolute top-0 left-0 w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="colorMode.preference = 'light'"> Light </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'dark'"> Dark </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'system'"> System </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
