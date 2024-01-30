<template>
    <header class="schedule-form-header">
        <div class="schedule-form-header__logo">
            <span class="schedule-form-header__label-logo">ЭИОС "ЛГТУ"</span>
        </div>

        <div class="schedule-form-header__action">
            <v-menu transition="slide-y-transition">
                <template #activator="{ props }">
                    <v-btn
                        icon="mdi-account-badge-outline"
                        v-bind="props"
                        size="small"
                        class="schedule-form-header__icon"
                        @click="openAboutUser = !openAboutUser"
                    ></v-btn>
                </template>

                <v-card class="schedule-form-header__menu">
                    <v-card title="ФИО:" :subtitle="userInfo?.fullNameTeacher"></v-card>
                    <v-card title="Факультет:" :subtitle="userInfo?.facultyCode"></v-card>
                    <v-card title="Кафедра:" :subtitle="userInfo?.chairName"></v-card>
                </v-card>
            </v-menu>

            <v-btn
                icon="mdi-account-arrow-right-outline"
                size="small"
                class="schedule-form-header__icon"
                @click="logout"
            ></v-btn>
        </div>
    </header>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import { ref } from 'vue'

import { UserInfo } from '../types/userInfo'

defineProps({
    userInfo: {
        type: null as unknown as PropType<UserInfo|null>,
        default: null,
    }
})

const openAboutUser = ref(false)

const logout = () => {}
</script>

<style lang="less">
@import './src/assets/variables.less';
@import './src/assets/mixins.less';

.schedule-form-header {
    position: fixed;
    top: 0px;
    height: @height-header;
    width: 100%;
    padding: 0 @spacing-sm;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: @background-color-header;

    &__label-logo {
        color: white;
        font-weight: 100;
        font-size: 24px;
    }

    &__action > button + button {
        margin-left: 4px;
    }
}
</style>
