<template>
    <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="12" lg="4">
                <AuthForm :title="'Login'"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import AuthForm from "~/components/AuthForm.vue";

definePageMeta({
    layout: 'auth'
})
const router = useRouter()
</script>

<style scoped>

</style>