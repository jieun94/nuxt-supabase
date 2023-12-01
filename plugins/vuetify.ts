import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// @ts-ignore
import {mdi} from "vuetify/lib/iconsets/mdi-svg";
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
        }
    });

    NuxtApp.vueApp.use(vuetify);
});