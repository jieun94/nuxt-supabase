import {defineStore} from "pinia";
// @ts-ignore
import {useUserStore} from "./user.ts";

export const useMainStore = defineStore('main', () => {
    const user = useUserStore()

    return {user}
})
