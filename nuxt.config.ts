// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @ts-ignore
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/common.scss" as *;'
        }
      }
    }
  },
  modules: ['@nuxtjs/supabase', '@pinia/nuxt'],
  devtools: { enabled: true },
})
