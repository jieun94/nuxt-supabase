<template>
    <v-card elevation="0">
        <v-card-title>{{props.title}}</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field v-model="user.email" :prepend-icon="mdiAccount" label="ID"/>
                <v-text-field v-model="user.password" :prepend-icon="mdiLock" label="PASSWORD"/>
                <v-text-field v-if="props.title !== 'Login'" v-model="user.phone" :prepend-icon="mdiPhone" label="PHONE"/>
                <v-btn block color="primary" text="login" variant="flat" @click="submitHandler(user)"/>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {mdiAccount, mdiLock, mdiPhone} from "@mdi/js";
import {useRouter} from "vue-router";

const props = defineProps({
    title: {
        type: String,
        default: 'Login'
    }
})
const client = useSupabaseClient()
const router = useRouter()

const user = reactive({
    email: undefined,
    password: undefined,
    phone: undefined
})

async function submitHandler(params:any) {
    const method = props.title === 'Login' ? 'signInWithPassword' : 'signUp'
    Object.keys(params).forEach((key) => {
        if (params[key] === null) {
            delete params[key]
        }
    })
    const {error} = await client.auth[method](params)

    if (error) {
        alert(error.message)
    }
    router.push('/')
}
</script>

<style scoped>

</style>