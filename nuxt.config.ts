// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
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
  modules: ['@nuxtjs/supabase', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  supabase: {
     redirectOptions: {
       login: '/login',
       callback: '',
       exclude: ['/signup']
     }
  },
  piniaPersistedstate: {
    storage: 'sessionStorage'
  },
  devtools: { enabled: true },
})
