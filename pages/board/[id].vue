<template>
    <v-container class="fill-height">
        <v-row>
            <v-col cols="12">
                {{detail}}
                <v-avatar>
                    <v-img :src="url"/>
                </v-avatar>
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

let detail = ref()
async function getDetail() {
    const {data} = await supabase.from('board_detail')
        .select(`*, board_list(*)`)
        .eq('idx', route.params.id)
        .single()
    detail.value = data
    await getProfile(data.board_list.reg_id)
}
let writer:object
async function getProfile(uuid:string) {
    const {data} = await supabase.from('profiles')
        .select('avatar, nickname')
        .eq('id', uuid)
        .single()
    writer = data!
    await getAvatarUrl(uuid, data.avatar)
}
let url = ref()
async function getAvatarUrl(uuid:string, name:string) {
    const {data} = await supabase.storage.from('images').getPublicUrl(`${uuid}/${name}`)
    url.value = data.publicUrl
}
function update() {

}

onMounted(() => {
    getDetail()
})
</script>

<style scoped>

</style>