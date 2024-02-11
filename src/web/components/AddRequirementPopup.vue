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
                        {{ requirement.disciplineName }}
                    </span>
                </v-card-title>

                <div class="requirement-dialog__content">
                    <v-select
                        v-model="requirement.typeRequirement"
                        :items="typesRequirement"
                        density="compact"
                        label="Выберите подходящее требование"
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

import type { Requirement } from '../types/requirement' 

import {
    computed,
    defineEmits,
    reactive
} from 'vue'

const props = defineProps({
    opened: {
        type: Boolean,
        default: false
    },

    requirement: {
        type: null as unknown as PropType<Requirement>,
        default: () => {},
    }
})

const emits = defineEmits([ 'close' ])

const open = computed(() => props.opened)

const typesRequirement = reactive(['ТСО'])

const onSave = () => {
    //fetch
    emits('close')
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
