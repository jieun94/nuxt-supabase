<template>
    <v-row v-if="isShow" justify="end">

        <v-col cols="12">
            <v-text-field :readonly="readonly" :disabled="readonly" v-model="user.email" label="E-MAIL"/>
        </v-col>
        <v-col cols="12">
            <v-text-field :readonly="readonly" :disabled="readonly" v-model="user.phone" label="PHONE NUMBER"/>
        </v-col>
        <v-col cols="auto">
            <v-btn color="secondary" text="수정" @click="modeHandler(false)"/>
            <v-btn class="ml-2" color="error" text="취소" @click="modeHandler(true)"/>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const supabase = useSupabaseClient()
let isShow = ref(false)
let readonly = ref(true)
let user
async function getUUID() {
    isShow.value = false
    const {data : {session}} = await supabase.auth.getSession()
    user = session.user
    await getProfile(user.id)
    isShow.value = true
}
let profile
async function getProfile(uuid:string) {
    const {data} = await supabase.from('profiles')
        .select('*')
        .eq('id', uuid)
        .single()
    profile = data
}

function modeHandler(val:boolean) {
    readonly.value = val
}
onMounted(() => {
    getUUID()
})
</script>

<style scoped>

</style>