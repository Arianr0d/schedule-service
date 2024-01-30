<template>
    <div class="schedule-form">
        <MainHeader :user-info="userStore.userInfo" />



        <!--<v-card flat title="Nutrition" class="schedule-form__table">
            <template #text>
                <v-text-field
                    v-model="searchValue"
                    label="Поиск по совпадению"
                    prepend-inner-icon="mdi-magnify"
                    single-line
                    variant="outlined"
                    hide-details
                ></v-text-field>
            </template>

            <v-data-table
                :headers="headers"
                :items="tableData"
                :search="searchValue"
            ></v-data-table>
        </v-card>-->

        <AddRequirementPopup />
    </div>
</template>

<script lang="ts" setup>
import {
    computed,
    reactive,
    readonly,
    ref
} from 'vue'

import AddRequirementPopup from '../components/AddRequirementPopup.vue'
import MainHeader from '../components/MainHeader.vue'

import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const searchValue = ref('')

const headers = reactive(readonly<[
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
        key: 'NumberStudents',
        title: 'Количество студентов'
    },
    {
        key: 'lessonType',
        title: 'Тип занятия'
    },
    {
        key: 'requirementType',
        title: 'Тип пожелания'
    },
    {
        key: 'requirementDescription',
        title: 'Пожелание'
    }
]>)

const tableData = reactive([
{
    disciplineCode: '1232123',
    disciplineName: 'Теория принятия решений',
    auditorium: '9-405',
    lessonNumber: 1,
    dayOfWeek: 'ЧТ',
    weekType: 'З',
    groupName: 'М-ПМ-22-1',
    course: 2,
    NumberStudents: 8,
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
    NumberStudents: 8,
    lessonType: 'практика',
    requirementType: '',
    requirementDescription: ''
}
])

const onClick = () => {}
</script>

<style lang="less">
@import './src/assets/variables.less';

.schedule-form {
  &__table {
    position: relative;
    top: @spacing-lg;
    bottom: 0;
    overflow: hidden;
  }

    height: auto !important;
    max-height: 800px !important;
}
</style>
