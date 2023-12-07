<template>
    <v-container class="fill-height">
        <v-data-table
            v-model:page="table.page"
            :items-per-page="table.itemsPerPage"
            :items="table.items"
            :headers="table.header"
            :loading="table.loading"
            @click:row="getDetail">
            <template #item.title="{item}">
                {{item.board_detail.title}}
            </template>
            <template #item.reg_id="{item}">
                {{item.profiles.nickname}}
            </template>
            <template #bottom>
                <v-row justify="end">
                    <v-col cols="12">
                        <v-pagination rounded="circle"></v-pagination>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn color="primary" variant="flat" text="등록" @click="router.push('/board/insert')"/>
                    </v-col>
                </v-row>
            </template>
        </v-data-table>
    </v-container>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {useRuntimeConfig} from "nuxt/app";
import {useRouter} from "vue-router";

const router = useRouter()
const config = useRuntimeConfig()
const client = useSupabaseClient()
const table = reactive({
    loading: false,
    page: 1,
    itemsPerPage: 10,
    header: [
        {title: '글번호', key: 'idx'},
        {title: '제목', key: 'title'},
        {title: '작성자', key: 'reg_id'},
        {title: '등록일자', key: 'created_at'}],
    items: []
})
async function getBoardList() {
    table.loading = true
    const {data, error} = await client
        .from('board_list')
        .select(`
        idx,
        profiles(nickname),
        created_at,
        board_detail(title)`)
        .eq('use', true)
    if (error) {
        throw error
    }
    table.items = data
    table.loading = false
}
function getDetail(item, data) {
    router.push('/board/'.concat(data.item.idx))
}
onMounted(() => {
    getBoardList()
})
</script>

<style scoped>

</style>