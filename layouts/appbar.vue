<template>
    <v-navigation-drawer permanent>
        <v-list color="primary" nav mandatory>
            <v-list-item link v-for="item in nav" :prepend-icon="item.icon" :title="item.title" :to="item.link"></v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn block variant="flat" color="grey" @click="logout" prepend-icon="mdi-logout" text="logout"/>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
// @ts-ignore
const supabase = useSupabaseClient()
const router = useRouter()

const nav = [
    {title: '게시판', icon: 'mdi-view-dashboard', link: '/'},
    {title: '내정보', icon: 'mdi-account-box', link: '/account'}
]
async function logout() {
    const {error} = await supabase.auth.signOut()
    router.push('/login')
}
</script>

<style scoped>

</style>