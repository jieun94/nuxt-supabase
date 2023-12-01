<template>
    <v-app>
        <Appbar/>
        <v-main>
            <slot/>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import Appbar from "./appbar.vue";

</script>

<style scoped>

</style>