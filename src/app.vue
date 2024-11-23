<template>
  <ConfigProvider :use-id="useIdFunction">
    <div class="h-screen w-screen">
      <TooltipProvider>
        <NuxtLayout>
          <NuxtPage></NuxtPage>
        </NuxtLayout>
      </TooltipProvider>
      <Toaster />
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
const useIdFunction = () => useId()
</script>
