import type { AuthenticatedUser, User } from '../types/user'

import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: (): AuthenticatedUser => {
        return {
            id: 0,
            token: null,
            fullName: '',
            chairName: '',
            facultyCode: ''
        }
    },

    getters: {
        user: state => state
    },

    actions: {
        set (token: string|null, user: User) {
            this.id = user.id
            this.token = token
            this.fullName = user.fullName
            this.chairName = user.chairName
            this.facultyCode = user.facultyCode
        },

        unset () {
            this.id = 0
            this.token = null
            this.fullName = ''
            this.chairName = ''
            this.facultyCode = ''
        }
    }
})
