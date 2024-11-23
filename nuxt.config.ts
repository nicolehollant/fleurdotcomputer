// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
  ],
  build: {
    transpile: ['trpc-nuxt'],
  },
  colorMode: {
    classSuffix: '',
  },
  vite: {
    optimizeDeps: {
      exclude: ['vee-validate'],
    },
  },
  googleFonts: {
    families: {
      Roboto: {
        italic: '200..700',
        normal: '200..700',
      },
      Dosis: '200..700',
      Inter: '200..700',
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './src/components/ui',
  },

  srcDir: './src',
})
