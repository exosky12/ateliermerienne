export default defineNuxtConfig({
  modules: ['@nuxt/ui'],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3333',
    },
  },

  compatibilityDate: '2025-01-15',
})
