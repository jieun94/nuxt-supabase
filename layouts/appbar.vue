<template>
    <v-navigation-drawer class="bg-deep-purple" permanent>
        <v-list color="transparent" nav>
            <v-list-item link prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
            <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
            <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn block variant="flat" color="grey" @click="logout" :prepend-icon="mdiLogout" text="logout"/>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import {mdiLogout} from "@mdi/js"
import {useRouter} from "vue-router";
// @ts-ignore
const supabase = useSupabaseClient()
const router = useRouter()
async function logout() {
    const {error} = await supabase.auth.signOut()
    router.push('/login')
}
</script>

<style scoped>

</style>