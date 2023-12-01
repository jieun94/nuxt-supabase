<template>
    <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="12" lg="4">
                <v-card>
                    <v-card-text>
                        <v-text-field v-model="user.id" :prepend-icon="mdiAccount" label="ID"/>
                        <v-text-field v-model="user.pwd" :prepend-icon="mdiLock" label="PASSWORD"/>
                        <v-btn block color="primary" text="login" variant="flat" @click="login"/>
                        <v-btn class="mt-2" block color="secondary" text="sign up" variant="flat" @click="signup"/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {mdiAccount, mdiLock} from '@mdi/js'
import {reactive} from "vue";
import {useRouter} from "vue-router";
// @ts-ignore
const supabase = useSupabaseClient()
const router = useRouter()

const user = reactive({
    id: '',
    pwd: ''
})
async function login() {
    const {error, data} = await supabase.auth.signInWithPassword({
        email: user.id,
        password: user.pwd
    })
    if (data) router.push('/')
    if (error) {

    }
}
async function signup() {
    const {error, data} = await supabase.auth.signUp({
        email: user.id,
        password: user.pwd
    })
    console.log(data)
    if (error) console.log(error)
}
</script>

<style scoped>

</style>