<template>
  <NuxtLink to="/" class="flex items-center gap-2 text-lg font-semibold md:text-base font-dosis">
    <figure class="flex items-center justify-center">
      <img class="w-12 h-12" src="@/assets/logo.svg" alt="" />
    </figure>
    <span class="text-xl md:text-3xl tracking-tighter font-black hidden sm:inline">
      <span class="text-outline text-red-500">fleur</span>
      <span class="text-outline text-pink-500 ml-1">dot</span>
      <span class="text-outline text-emerald-500 ml-1">computer</span>
    </span>
    <span class="sm:hidden sr-only">fleur dot computer</span>
  </NuxtLink>
</template>

<style>
.text-outline {
  text-shadow: -1px -1px 0 theme('colors.pink.950'), 1px -1px 0 theme('colors.pink.950'),
    -1px 1px 0 theme('colors.pink.950'), 1px 1px 0 theme('colors.pink.950');
}
</style>
