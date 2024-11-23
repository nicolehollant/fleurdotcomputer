<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Label, type LabelProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import { useFieldGroupProps } from '.'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const resolvedProps = useFieldGroupProps(props)
</script>

<template>
  <Label
    v-bind="delegatedProps"
    :class="
      cn(
        'field-group-label text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.class
      )
    "
  >
    <slot>
      <span>{{ resolvedProps.label }}</span>
    </slot>
  </Label>
</template>
