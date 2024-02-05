<template>
    <div class="schedule-form">
        <MainHeader :user="store.user" />

        <v-card flat title="Поиск по совпадению" class="schedule-form__table">
            <template #text>
                <v-text-field
                    v-model="searchValue"
                    label="Введите слово"
                    prepend-inner-icon="mdi-magnify"
                    single-line
                    variant="outlined"
                    hide-details
                />
            </template>

            <!--<v-data-table
                v-model="rowSelected"
                :headers="headers"
                :items="tableData"
                :search="searchValue"
                return-object
                @click="onRowClick"
            />-->

            <v-data-table-server
                v-model:items-per-page="itemsPerPage"
                :headers="headers"
                :items-length="totalItems"
                :items="schedulesRows"
                :loading="loading"
                :search="searchValue"
                item-value="name"
                @update:options="loadData"
            />
        </v-card>

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

const loadData = async () => {
    loading.value = true

    try {
        schedulesRows.value = await getSchedules('http://localhost:8081/api', store.user.id)
        totalItems.value = schedulesRows.value.length
    } catch (err) {
        console.log(err)
    } finally {
        loading.value = false
    }
}

const tableData = ref([
{
    disciplineCode: '1232123',
    disciplineName: 'Теория принятия решений',
    auditorium: '9-405',
    lessonNumber: 1,
    dayOfWeek: 'ЧТ',
    weekType: 'З',
    groupName: 'М-ПМ-22-1',
    course: 2,
    numberStudents: 8,
    lessonType: 'практика',
    requirementType: '',
    requirementDescription: ''
},
{
    disciplineCode: '32823894',
    disciplineName: 'Математический анализ',
    auditorium: '9-418',
    lessonNumber: 2,
    dayOfWeek: 'ПТ',
    weekType: 'Б',
    groupName: 'М-ПМ-22-1',
    course: 2,
    numberStudents: 8,
    lessonType: 'практика',
    requirementType: '',
    requirementDescription: ''
}
])
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
}
</style>
