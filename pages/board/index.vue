<template>
    <v-container class="fill-height">
        <v-data-table
            v-model:page="table.page"
            :items-per-page="table.itemsPerPage"
            :items="table.items"
            :headers="table.header"
            @click:row="getDetail">
            <template #item.title="{item}">
                {{item.board_detail.title}}
            </template>
            <template #bottom>
                <v-pagination rounded="circle"></v-pagination>
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
    const {data, error} = await client
        .from('board_list')
        .select(`
        idx,
        reg_id,
        created_at,
        board_detail(title)`)
    if (error) {
        throw error
    }
    table.items = data
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