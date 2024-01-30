import { defineStore } from 'pinia'

import {
    LoginResponse,
    UserInfo,
} from '../types/userInfo'


export const useUserStore = defineStore('user', {
    state: (): LoginResponse => {
        return {
            id: 0,
            token: null,
            userInfo: null,
        }
    },

    actions: {
        set (id: number, token: string|null, userInfo: UserInfo|null) {
            this.id = id
            this.token = token
            this.userInfo = userInfo
        },

        unset () {
            this.id = 0
            this.token = null
            this.userInfo = null
        }
    }
})
