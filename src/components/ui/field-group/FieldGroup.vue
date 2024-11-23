<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Label, type LabelProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import { useProvideFieldGroupProps, type FieldGroupRootProps } from '.'

const props = withDefaults(defineProps<LabelProps & FieldGroupRootProps & { class?: HTMLAttributes['class'] }>(), {
  optional: false,
  hint: '',
  status: '',
  charactersRemaining: '',
  label: '',
  variant: 'base',
  disabled: false,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

useProvideFieldGroupProps(computed(() => props))
</script>

<template>
  <Label v-bind="delegatedProps" :class="cn('flex flex-col gap-1 peer-disabled:cursor-not-allowed group', props.class)">
    <slot :variant="variant" :disabled="disabled" :optional="optional" name="label">
      <FieldGroupLabel v-if="label" :variant="variant" :disabled="disabled" :optional="optional"></FieldGroupLabel>
    </slot>
    <slot :variant="variant" :disabled="disabled" :optional="optional" />
    <slot :variant="variant" :disabled="disabled" :optional="optional" name="hint">
      <FieldGroupHint v-if="hint" :variant="variant" :disabled="disabled" :optional="optional"></FieldGroupHint>
    </slot>
    <slot :variant="variant" :disabled="disabled" :optional="optional" name="status">
      <FieldGroupStatus v-if="status" :variant="variant" :disabled="disabled" :optional="optional"></FieldGroupStatus>
    </slot>
  </Label>
</template>
