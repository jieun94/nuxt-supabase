<template>
    <NuxtLayout v-if="route.path !== '/login'">
        <NuxtPage/>
    </NuxtLayout>
    <NuxtPage v-else/>
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute()
</script>
<style>
html,body, #__nuxt, #__layout{
    height:100%;
    width: 100%;
}
</style>
