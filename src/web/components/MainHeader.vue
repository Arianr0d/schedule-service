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
						aria-label="Данные пользователя"
						role="button"
						@click="openAboutUser = !openAboutUser"
					/>
				</template>

				<v-card
					class="schedule-form-header__menu"
					role="menu"
				>
					<v-card
						title="ФИО:"
						:subtitle="user?.fullName"
						role="menuitem"
					/>
					<v-card
						title="Факультет:"
						:subtitle="user?.facultyCode"
						role="menuitem"
					/>
					<v-card
						title="Кафедра:"
						:subtitle="user?.chairName"
						role="menuitem"
					/>
				</v-card>
			</v-menu>

			<v-btn
				icon="mdi-account-arrow-right-outline"
				size="small"
				class="schedule-form-header__icon"
				aria-label="Выход из аккаунта"
				role="button"
				@click="logout"
			/>
		</div>
	</header>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { User } from '../types/user';

import { ref } from 'vue';

import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

defineProps({
	user: {
		type: null as unknown as PropType<User|null>,
		default: null,
	}
});

const openAboutUser = ref(false);

const logout = async () => {
	await store.unset()

	setTimeout(() => router.push({ path: '/login' }), 2000);
};
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
