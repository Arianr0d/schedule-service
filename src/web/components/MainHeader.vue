<template>
    <header class="shedule-form-header">
        <div class="shedule-form-header__logo">
            <span class="shedule-form-header__label-logo">ЭИОС "ЛГТУ"</span>
        </div>

        <div class="shedule-form-header__action">
            <v-menu transition="slide-y-transition">
                <template #activator="{ props }">
                    <v-btn
                        icon="mdi-account-badge-outline"
                        v-bind="props"
                        size="x-large"
                        class="shedule-form-header__icon"
                        @click="openAboutUser = !openAboutUser"
                    ></v-btn>
                </template>

                <v-card class="shedule-form-header__menu">
                    <v-card title="ФИО:" :subtitle="'Иванов Иван Иванович'"></v-card>
                    <v-card title="Факультет:" :subtitle="'ФАИ'"></v-card>
                    <v-card title="Кафедра:" :subtitle="'Прикладная математика'"></v-card>
                </v-card>
            </v-menu>

            <v-btn
                icon="mdi-account-arrow-right-outlinee"
                size="x-large"
                class="shedule-form-header__icon"
            ></v-btn>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const openAboutUser = ref(false)
</script>

<style lang="less">
@import './src/assets/variables.less';
@import './src/assets/mixins.less';

.shedule-form-header {
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

    &__action {
        margin-left: auto @spacing-sm;
    }

    &__icon { width: 28px; }
    &__button-icon {
        min-width: @size-sm !important;
        border-radius: 4px !important;
        margin: 0px !important;
    }

    &__menu {
        padding: 16px;
        background: white;
    }
}
</style>
