<template>
    <v-container class="fill-height">
        <v-row>
            <v-col cols="12">
                {{detail}}
            </v-col>
            <v-col cols="auto">
                <v-btn color="secondary" text="수정" @click="update"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";

const supabase = useSupabaseClient()
const route = useRoute()

let detail:object = ref()
async function getDetail() {
    const {data} = await supabase.from('board_detail')
        .select('*')
        .eq('idx', route.params.id)
        .single()
    detail.value = data
}
function update() {

}

onMounted(() => {
    getDetail()
})
</script>

<style scoped>

</style>