<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '@/lib/utils'
import { useFieldGroupProps } from '.'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const resolvedProps = useFieldGroupProps(props)
</script>

<template>
  <div v-bind="delegatedProps" :class="cn('field-group-hint', props.class)">
    <slot>
      <span>{{ resolvedProps.hint }}</span>
    </slot>
  </div>
</template>
