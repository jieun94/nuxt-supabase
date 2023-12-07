import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
    const supabase = useSupabaseClient()
    let profile = ref()

    async function getUser() {
        const {data: {session}} = await supabase.auth.getSession()
        // @ts-ignore
        await getProfile(session.user.id)
    }
    async function getProfile(uuid:string) {
        const {data} = await supabase.from('profiles')
            .select('*')
            .eq('id', uuid)
            .single()
        profile.value = data
    }
    return {profile, getUser, getProfile}
}, {
    persist: true
})