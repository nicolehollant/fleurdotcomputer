<template>
  <ConfigProvider :use-id="useIdFunction">
    <div class="h-screen w-screen">
      <TooltipProvider>
        <NuxtLayout>
          <NuxtPage></NuxtPage>
        </NuxtLayout>
      </TooltipProvider>
      <Toaster />
      <Analytics></Analytics>
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

import { ConfigProvider } from 'radix-vue'
const useIdFunction = () => useId()
</script>
