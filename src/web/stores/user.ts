import { defineStore } from 'pinia'

type UserState = {
    id: number,
    token: string | null,
}

export const useUserStore = defineStore('user', {
    state: (): UserState => {
        return {
            id: 0,
            token: null
        }
    },

    actions: {
        set (id: number, token: string) {
            this.id = id
            this.token = token
        },

        unset () {
            this.id = 0
            this.token = null
        }
    }
})
