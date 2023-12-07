<template>
    <v-card class="flex-1-1-100">
        <v-card-text>
            <v-form ref="form">
                <v-row justify="end">
                    <v-col cols="12">
                        <v-text-field v-model="board.title" label="title"/>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea v-model="board.content" label="content"/>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn color="error" variant="flat" text="취소" @click="router.back()"/>
                        <v-btn class="ml-2" color="primary" variant="flat" text="등록" @click="insertList"/>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const supabase = useSupabaseClient()
const board = reactive({
    title: null,
    content: null
})
const form = ref()
async function insertList() {
    const {data} = await supabase.from('board_list')
        .insert([{}])
        .select()
    board.idx = data[0].idx
    await insertDetail(board)
}
async function insertDetail(obj:object) {
    const {data, error} = await supabase.from('board_detail')
        .insert([obj])
        .select()
    if (data) {
        alert('등록 성공')
        router.push('/board')
    }
}
</script>

<style scoped>

</style>