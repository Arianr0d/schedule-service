<template>
    <div class="schedule-form">
        <MainHeader :user="store.user" />

        <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items-length="totalItems"
            :items="schedulesRows"
            :loading="loading"
            :search="tableSearch"
            item-value="disciplineName"
            class="schedule-form__table"
            @update:options="loadData"
            @click:row="onClick"
        >
            <template #tfoot>
                <tr>
                    <td/>
                    <td/>
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

        <AddRequirementPopup
            :opened="openPopup"
            :requirement="currentRequirement"
            :requirementId="currentRequirement.requirementTypeId"
            @close="onClosePopup"
        />
    </div>
</template>

<script lang="ts" setup>
import type { Schedule } from '../types/schedule'
import type { SortBy } from '../types/table'
import type { Requirement } from '../types/requirement'

import { ref, watch } from 'vue'

import AddRequirementPopup from '../components/AddRequirementPopup.vue'
import MainHeader from '../components/MainHeader.vue'

import { useUserStore } from '../stores/user'

import getSchedules from '../api/schedules'

const store = useUserStore()

const schedulesRows = ref([] as Schedule[])
const currentRequirement = ref({} as Requirement)
const totalItems = ref(0)

const tableSearch = ref('')
const searchValue = ref('')
const itemsPerPage = ref(10)

const loading = ref(true)
const openPopup = ref(false)

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
        key: 'requirementTypeId',
        title: 'ID требования'
    },
    {
        key: 'requirementType',
        title: 'Тип пожелания'
    },
    {
        key: 'requirementDescription',
        title: 'Пожелание'
    }
] as const)

const loadData = async ({ sortBy }: { sortBy: SortBy[] }) => {
    loading.value = true

    try {
        schedulesRows.value = []
        schedulesRows.value = await getSchedules(
            'http://localhost:8081/api',
            store.user.id,
            sortBy.length ? sortBy[0] : null,
            {
                value: searchValue.value,
                column: 'disciplineName',
            },
        )
        totalItems.value = schedulesRows.value.length
    } catch (err) {
        console.log(err)
    } finally {
        loading.value = false
    }
}

watch(searchValue, () => tableSearch.value = String(Date.now()))

const onClick = (event: Event, { item }: { item: Schedule }) => {
    if (item) {
        currentRequirement.value = {
            scheduleId: item.scheduleId,
            requirementTypeId: item.requirementTypeId,
            typeRequirement: item.requirementType,
            descriptionRequirement: item.requirementDescription
        }

        openPopup.value = true
    }

    return
}

const onClosePopup = () => {
    openPopup.value = false
}
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
