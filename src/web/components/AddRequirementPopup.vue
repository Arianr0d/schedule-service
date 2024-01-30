<template>
    <v-row justify="center">
        <v-dialog
            v-model="opened"
            persistent
            width="500"
        >
            <template #activator="{ props }">
                <slot name="trigger" />
            </template>
        
            <v-card>
                <v-card-title class="text-h5">
                    Требования к дисциплине

                    <span class="requirement-dialog__label">
                        {{ requirement.disciplineName }}
                    </span>
                </v-card-title>

                <div class="requirement-dialog__content">
                    <v-select
                        v-model="requirement.typeRequirement"
                        :items="typesRequirement"
                        label="Выберите подходящее требование"
                        multiple
                    >
                        <template #prepend-item>
                            <v-list-item
                                title="Выбрать все"
                                @click="onSelectedAll"
                            >
                                <template #prepend>
                                    <v-checkbox-btn
                                        :color="areSomeSelected ? 'indigo-darken-4' : undefined"
                                        :indeterminate="indeterminate"
                                        :model-value="areSomeSelected"
                                    />
                                </template>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                        </template>
                    </v-select>

                    <v-textarea
                        v-model:value="requirement.descriptionRequirement"
                        label="Text"
                        counter
                    />
                </div>

                <v-card-actions>
                    <v-spacer />
                
                    <v-btn
                        color="green-darken-1"
                        variant="tonal"
                        @click="opened = false"
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

import {
    computed,
    reactive,
    ref
} from 'vue'

import type { Requirement } from '../types/requirement' 

const props = defineProps({
    requirement: {
        type: null as unknown as PropType<Requirement>,
        default: () => {},
    }
})

const opened = ref(true)
const typesRequirement = reactive(['ТСО'])

const areAllSelected = computed((): boolean => {
    return props.requirement?.typeRequirement.length === typesRequirement.length
})
const areSomeSelected = computed((): boolean => {
    return !!props.requirement && props.requirement?.typeRequirement.length > 0
})

const indeterminate = computed((): boolean => {
    return areSomeSelected.value && !areAllSelected.value
})

const onSave = () => {}
const onSelected = () => {}
const onSelectedAll = () => {}
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
    margin-left: @spacing-lg;
    font-size: 16px;
    color: grey;
    text-decoration: underline;
  }

  &__content {
    padding: 16px;
  }
}
</style>
