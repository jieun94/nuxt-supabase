<template>
    <v-card>
        <v-card-text>
            <v-form ref="form">
                <v-row v-if="isShow" justify="center">
                    <v-col cols="auto">
                        <div id="avatar">
                            <v-avatar size="100" color="brown">
                                <v-img v-if="previewUrl !== undefined" :src="previewUrl"/>
                                <span v-else class="text-h4">{{profile.nickname.substring(0,2)}}</span>
                            </v-avatar>
                            <v-tooltip text="edit avatar" location="bottom">
                                <template #activator="{props}">
                                    <v-btn id="plus" v-bind="props" size="30" variant="flat" icon="mdi-camera" @click="uploadAvatar"/>
                                </template>
                            </v-tooltip>
                            <v-file-input v-model="avatar" class="file-upload" accept="image/png, image/jpg, image/bmp" @update:modelValue="getPreview"/>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field readonly disabled v-model="user.email" label="E-MAIL"/>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="profile.first_name" label="FIRST NAME"/>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="profile.last_name" label="LAST NAME"/>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="profile.nickname" label="NICKNAME"/>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="user.phone" label="PHONE NUMBER"/>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn block color="secondary" text="수정" @click="submit"/>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
    <v-row  justify="end">

    </v-row>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useUserStore} from "../stores/user";
import {v4 as uuid} from 'uuid'

const supabase = useSupabaseClient()
let isShow = ref(false)
const store = useUserStore()
let user:object
let profile:object
async function getUUID() {
    isShow.value = false
    const {data : {session}} = await supabase.auth.getSession()
    user = session!.user
    isShow.value = true
    profile = reactive(Object.assign({}, store.profile))
    await getAvatar(user.id)
}

let avatar = ref()
let previewUrl = ref()
function uploadAvatar() {
    const real = document.querySelector('.v-field__field') as HTMLElement
    real.click()
}

function getPreview(file:FileList) {
    previewUrl.value = URL.createObjectURL(file[0])
}

const form = ref()
async function submit() {
    const params:object = {

    }
    if (avatar.value) {
        const filename = uuid()+'_'+avatar.value[0].name
        const {error} = await supabase.storage
            .from('images')
            .upload(`${user.id}/${filename}`, avatar.value[0], {
                cacheControl: '3600',
                upsert: false
            })
        if(error) {
            alert(error.message)
        }
    }
    const update = await supabase
        .from('profiles')
        .update({avatar: filename})
        .eq('id', user.id)
        .select()
    if (update.error) {
        alert(update.error.message)
    }
}

async function getAvatar(uuid:string) {
    const {data} = await supabase.storage.from('images').getPublicUrl(`${uuid}/${profile.avatar}`)
    if(data.publicUrl) {
        previewUrl.value = data.publicUrl
    }
}
onMounted(() => {
    getUUID()
})
</script>

<style scoped>
#avatar {
    position: relative;
}
#plus {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 2;
}
.file-upload {
    display: none;
}
</style>