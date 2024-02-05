<template>
    <div class="schedule-form">
        <MainHeader :user="store.user" />

        <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items-length="totalItems"
            :items="schedulesRows"
            :loading="loading"
            :search="searchValue"
            item-value="disciplineName"
            class="schedule-form__table"
            @update:options="loadData"
            @click="onClick"
        >
            <template #tfoot>
                <tr>
                    <td/>
                    <td/>
                    <td>
                        <v-text-field
                            v-model="searchColumn"
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
            :requirement="{
                disciplineName: '',
                typeRequirement: [''],
                descriptionRequirement: ''
            }"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import AddRequirementPopup from '../components/AddRequirementPopup.vue'
import MainHeader from '../components/MainHeader.vue'

import { useUserStore } from '../stores/user'

import getSchedules from '../api/schedules'

import { Schedule } from '../types/schedule'

const store = useUserStore()

let schedulesRows = ref([] as Schedule[])
let totalItems = ref(0)

const searchValue = ref('')
const searchColumn = ref('')
const itemsPerPage = ref(10)
const loading = ref(true)

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
        key: 'kindOfWishesId',
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

type SortBy = {
    key: string,
    order: string,
}

const loadData = async ({ sortBy }: { sortBy: SortBy[] }) => {
    loading.value = true

    try {
        schedulesRows.value = []
        schedulesRows.value = await getSchedules(
            'http://localhost:8081/api',
            store.user.id,
            sortBy.length ? sortBy[0] : null
        )
        totalItems.value = schedulesRows.value.length
    } catch (err) {
        console.log(err)
    } finally {
        loading.value = false
    }
}

const onClick = (data: any) => {
    console.log('onClick', data)
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
