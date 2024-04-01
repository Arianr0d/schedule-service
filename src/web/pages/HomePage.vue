<template>
	<div class="schedule-form">
		<main-header :user="store.user" />

		<v-data-table-server
			v-model:items-per-page="itemsPerPage"
			:headers="headers"
			:items-length="totalItems"
			:items="schedules"
			:loading="loading"
			:search="columnSearch"
			item-value="disciplineName"
			class="schedule-form__table"
			aria-role="row"
			@update:options="loadData"
			@click:row="onClick"
		>
			<template #tfoot>
				<tr>
					<td />
					<td />
					<td>
						<v-text-field
							v-model="searchValue"
							placeholder="Поиск по дисциплине"
							class="ma-2 schedule-form__search-field"
							density="compact"
							hide-details
						/>
					</td>
				</tr>
			</template>
		</v-data-table-server>

		<add-requirement-popup
			v-model:requirement="selectedRequirement"
			:opened="openPopup"
			:schedule-id="selectedScheduleId"
			:discipline-name="selectedDisciplineName"
			@close="onClosePopup"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import getSchedules from '../api/schedules';
import AddRequirementPopup from '../components/AddRequirementPopup.vue';
import MainHeader from '../components/MainHeader.vue';
import { useUserStore } from '../stores/user';
import type { Requirement } from '../types/requirement';
import type { Schedule } from '../types/schedule';
import type { SortBy } from '../types/table';


const store = useUserStore();

const schedules = ref([] as Schedule[]);

const selectedScheduleId = ref(null as number|null);
const selectedDisciplineName = ref('');
const selectedRequirement = ref({} as Requirement);

const totalItems = ref(0);
const itemsPerPage = ref(10);

const columnSearch = ref('');
const searchValue = ref('');
const sortValue = ref(null as SortBy[]|null);

const loading = ref(true);
const openPopup = ref(false);

const headers = ref([
	{
		key: 'scheduleId',
		title: 'ID'
	},
	{
		align: 'start',
		key: 'disciplineCode',
		title: 'Шифр дисциплины'
	},
	{
		key: 'disciplineName',
		title: 'Наименование дисциплины'
	},
	{
		key: 'auditorium',
		title: 'Аудитория'
	},
	{
		key: 'lessonNumber',
		title: 'Номер занятия'
	},
	{
		key: 'dayOfWeek',
		title: 'День недели'
	},
	{
		key: 'weekType',
		title: 'Неделя'
	},
	{
		key: 'groupName',
		title: 'Группа'
	},
	{
		key: 'course',
		title: 'Курс'
	},
	{
		key: 'numberStudents',
		title: 'Количество студентов'
	},
	{
		key: 'lessonType',
		title: 'Тип занятия'
	},
	{
		key: 'requirementId',
		title: 'ID требования'
	},
	{
		key: 'requirementName',
		title: 'Тип пожелания'
	},
	{
		key: 'requirementDescription',
		title: 'Пожелание'
	}
] as const);

const loadData = async ({ sortBy }: { sortBy: SortBy[]|null }) => {
	loading.value = true;

	try {
		schedules.value = [];
		schedules.value = await getSchedules(
			store.user.id,
			sortBy && sortBy.length ? {
				key: sortBy[0]?.key,
				order: sortBy[0]?.order.toUpperCase()
			} as SortBy : null,
			{
				value: searchValue.value,
				column: 'disciplineName',
			},
		);
		totalItems.value = schedules.value.length;
		sortValue.value = sortBy;
	} catch (err) {
		console.log(err);
	} finally {
		loading.value = false;
	}
};

watch(searchValue, () => columnSearch.value = String(Date.now()));

const onClick = (event: Event, { item }: { item: Schedule }) => {
	if (item) {
		selectedScheduleId.value = item.scheduleId;
		selectedDisciplineName.value = item.disciplineName;
		selectedRequirement.value = {
			id: item.requirementId,
			name: item.requirementName,
			description: item.requirementDescription,
		};

		openPopup.value = true;
	}

	return;
};

const onClosePopup = async () => {
	openPopup.value = false;
	await loadData({ sortBy: sortValue.value });
};
</script>

<style lang="less">
@import './src/assets/variables.less';

.schedule-form {
    height: auto !important;
    max-height: 800px !important;

    &__table {
        position: relative;
        top: @spacing-lg;
        bottom: 0;
        overflow: hidden;
    }

    &__search-field {
        width: 250px;
    }
}
</style>
