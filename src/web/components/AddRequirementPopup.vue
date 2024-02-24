<template>
    <v-row justify="center">
        <v-dialog
            v-model="open"
            persistent
            width="550"
        >
            <v-card>
                <v-card-title class="requirement-dialog__title">
                    Требования к дисциплине

                    <span class="requirement-dialog__label">
                        {{ disciplineName }}
                    </span>
                </v-card-title>

                <div class="requirement-dialog__content">
                    <v-select
                        v-model="selectedRequirementType"
                        :items="requirementsTypes"
                        item-title="name"
                        item-value="id"
                        density="compact"
                        label="Выберите подходящее требование"
                        return-object
                    />

                    <v-textarea
                        v-model="requirement.description"
                        label="Текст"
                        counter
                    />
                </div>

                <v-card-actions>
                    <v-spacer />

                    <v-btn
                        v-if="!!requirement.id"
                        color="red-darken-1"
                        variant="tonal"
                        @click="onDelete"
                    >
                        Удалить
                    </v-btn>
                
                    <v-btn
                        color="green-darken-1"
                        variant="tonal"
                        @click="$emit('close')"
                    >
                        Отменить
                    </v-btn>

                    <v-btn
                        color="grey-darken-1"
                        variant="elevated"
                        @click="onSave"
                    >
                        Сохранить
                    </v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type {
    Requirement,
    RequirementType,
} from '../types/requirement'

import {
    computed,
    onBeforeMount,
    ref,
} from 'vue'

import addRequirement from '../api/addRequirement'
import deleteRequirement from '../api/deleteRequirement'
import getTypesRequirements from '../api/requirementsTypes'

const props = defineProps({
    opened: {
        type: Boolean,
        default: false
    },

    requirement: {
        type: null as unknown as PropType<Requirement>,
        default: () => {},
    },

    scheduleId: {
        type: null as unknown as PropType<Number|null>,
        default: null,
    },

    disciplineName: {
        type: String,
        default: '',
    }
})

const emits = defineEmits([ 'close' ])

const requirementsTypes = ref([] as RequirementType[])

const selectedRequirementType = computed({
    get (): RequirementType {
        return {
            id: props.requirement.id,
            name: props.requirement.name,
        }
    },
    
    set (value: RequirementType) {
        props.requirement.id = value.id
        props.requirement.name = value.name
    }
})

const open = computed(() => props.opened)

onBeforeMount(async () => {
    try {
        requirementsTypes.value = await getTypesRequirements()
    } catch (e) {
        console.log(e)
    }
})

const onSave = async () => {
    try {
        await addRequirement({
            id: props.requirement.id,
            description: props.requirement.description,
        }, props.scheduleId as number)
    } catch (e) {
        console.log(e)
    } finally {
        emits('close')
    }
}

const onDelete = async () => {
    try {
        // TODO: добавить обработку запроса, при ошибке подсвечивать алерт
        await deleteRequirement(
            props.requirement.id as number,
            props.scheduleId as number,
        )
    } catch (e) {
        console.log(e)
    } finally {
        emits('close')
    }
}
</script>

<style lang="less">
@import './src/assets/variables.less';

.requirement-dialog {
  min-width: 800px;

  &__title {
    display: flex;
    justify-content: space-between;
  }

  &__label {
    font-size: 16px;
    color: grey;
    text-decoration: underline;
  }

  &__content {
    padding: 16px;
  }
}
</style>
