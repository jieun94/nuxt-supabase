import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// @ts-ignore
import {mdi} from "vuetify/lib/iconsets/mdi";
import '@mdi/font/css/materialdesignicons.css'
import {defineNuxtPlugin} from "nuxt/app";

export default defineNuxtPlugin((NuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        icons: {
            defaultSet: 'mdi',
            sets: {
                mdi
            }
        },
        theme: {
            themes: {
                light: {
                    colors: {
                        background: '#f3f3f3',
                    }
                }
            }
        }
    });

    NuxtApp.vueApp.use(vuetify);
});