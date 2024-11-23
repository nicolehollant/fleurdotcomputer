<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '@/lib/utils'
import { useFieldGroupProps } from '.'
import { cva, type VariantProps } from 'class-variance-authority'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: 'invalid' | 'base' | 'success'
  hideIcon?: boolean
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const resolvedProps = useFieldGroupProps(props)

const statusVariants = cva('flex items-center gap-4 text-base field-group-status-message', {
  variants: {
    variant: {
      invalid: 'text-destructive-foreground [&>svg]:text-destructive-foreground',
      success: 'text-accent-foreground [&>svg]:text-accent-foreground',
      base: 'text-foreground [&>svg]:text-foreground',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
})
type StatusVariants = VariantProps<typeof statusVariants>

const defaultIcon = computed(
  () =>
    ({
      success: 'mdi:check-circle',
      invalid: 'mdi:alert-circle',
      base: 'mdi:information',
    }[resolvedProps.value.variant || 'base'] ?? 'mdi:information')
)
</script>

<template>
  <div v-bind="delegatedProps" :class="cn(statusVariants({ variant: resolvedProps.variant }), props.class)">
    <slot name="icon" v-if="!hideIcon">
      <Icon :name="defaultIcon" class="w-4 h-4 shrink-0"></Icon>
    </slot>
    <slot>
      {{ resolvedProps.status }}
    </slot>
  </div>
</template>
