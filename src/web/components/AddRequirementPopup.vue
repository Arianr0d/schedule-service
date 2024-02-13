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
                        v-model="selectTypeRequirement"
                        :items="typesRequirement"
                        item-title="typeRequirement"
                        item-value="requirementTypeId"
                        density="compact"
                        label="Выберите подходящее требование"
                        return-object
                    />

                    <v-textarea
                        v-model="requirement.descriptionRequirement"
                        label="Text"
                        counter
                    />
                </div>

                <v-card-actions>
                    <v-spacer />

                    <v-btn
                        v-if="deleted"
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
    TypeRequirement
} from '../types/requirement' 

import {
    computed,
    onBeforeMount,
    ref
} from 'vue'

import {
    deleteRequirement,
    insertRequirement,
    updateRequirement,
} from '../api/requirement'
import getTypeRequirement from '../api/typesRequirement'

const props = defineProps({
    opened: {
        type: Boolean,
        default: false
    },

    requirement: {
        type: null as unknown as PropType<Requirement>,
        default: () => {},
    },

    requirementId: {
        type: null as unknown as PropType<Number|null>,
        default: null,
    },

    disciplineName: {
        type: String,
        default: '',
    }
})

const emits = defineEmits([ 'close' ])

const typesRequirement = ref([] as TypeRequirement[])

const deleted = computed(() => props.requirement && props.requirement.requirementTypeId)
const selectTypeRequirement = computed({
    get (): TypeRequirement {
        return {
            requirementTypeId: props.requirement.requirementTypeId,
            typeRequirement: props.requirement.typeRequirement 
        }
    },
    
    set (value: TypeRequirement) {
        props.requirement.requirementTypeId = value.requirementTypeId
        props.requirement.typeRequirement = value.typeRequirement
    }
})

const open = computed(() => props.opened)

onBeforeMount(async () => {
    try {
        typesRequirement.value = await getTypeRequirement('http://localhost:8081/api')
    } catch (e) {
        console.log(e)
    }
})

const onSave = async () => {
    const requirement = {
        requirementTypeId: props.requirement.requirementTypeId,
        typeRequirement: props.requirement.typeRequirement,
        scheduleId: props.requirement.scheduleId,
        descriptionRequirement: props.requirement.descriptionRequirement,
    }

    try {
        if (props.requirementId) {
            await updateRequirement('http://localhost:8081/api', requirement)
        } else {
            await insertRequirement('http://localhost:8081/api', requirement)
        }
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
            'http://localhost:8081/api',
            props.requirement.requirementTypeId as number,
            props.requirement.scheduleId,
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
