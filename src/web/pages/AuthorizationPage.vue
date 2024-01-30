<template>
    <v-card
        class="mx-auto pa-12 pb-8 authorization-form"
        elevation="8"
        max-width="400"
        rounded="lg"
    >
        <template #title>
            <div class="authorization-form__title">Авторизация</div>
        </template>

        <div class="text-subtitle-1 text-medium-emphasis mt-8">Логин</div>

        <v-text-field
            v-model="form.login"
            density="compact"
            placeholder="Логин"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            class="authorization-form__text-field"
        />

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Пароль
        </div>

        <v-text-field
            v-model="form.password"
            :append-inner-icon="form.passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="form.passwordVisible ? 'text' : 'password'"
            density="compact"
            placeholder="Введите пароль"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            class="authorization-form__text-field"
            @click:append-inner="form.passwordVisible = !form.passwordVisible"
        />

        <v-btn
            :active="!loading"
            class="mb-8 mt-8"
            color="blue"
            size="large"
            variant="tonal"
            block
            @click="onSubmit"
        >
            Войти
        </v-btn>
    </v-card>
</template>

<script lang="ts" setup>
import {
    reactive,
    ref,
} from 'vue'

import login from '../api/login'

import { useUserStore } from '../stores/user'

const store = useUserStore()

const loading = ref(false)

const form = reactive({
    login: '',
    password: '',
    passwordVisible: false,
})

const onSubmit = async () => {
    try {
        loading.value = true

        const { id, token, userInfo } = await login('http://localhost:8081/api', form.login, form.password)
        store.set(id, token, userInfo )
    } catch (err) {
        console.log(err)
    } finally {
        loading.value = false
    }
}
</script>

<style lang="less">
@import './src/assets/variables.less';

.authorization-form {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 450px;
    display: flex;
    flex-direction: column;

    &__title {
        text-align: center;
        font-size: 24px;
        font-weight: 500;
        opacity: 0.65;
    }

    &__text-field {
        height: 24px;
    }
}
</style>
