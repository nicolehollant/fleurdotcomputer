<script setup lang="ts">
import { cn } from '~/lib/utils'
import { useFocus } from '@vueuse/core'
import {
  ListboxContent,
  ListboxFilter,
  ListboxItem,
  ListboxItemIndicator,
  ListboxRoot,
  ListboxVirtualizer,
} from 'radix-vue'

type AcceptableValue = string | number | boolean | Record<string, any>

const props = defineProps<{
  modelValue?: AcceptableValue
  defaultOpen?: boolean
  defaultValue?: AcceptableValue
  displayText: string
  isSelectedOption: (option: { value: AcceptableValue; label: string }) => boolean
  toKey: (option: { value: AcceptableValue; label: string }) => string | number
  toCompletionValue: (option: { value: AcceptableValue; label: string }) => string
  options: { value: AcceptableValue; label: string }[]
  commandPlaceholder?: string
  commandEmpty?: string
  contentCn?: string
  triggerCn?: string
  triggerWidth?: string
  filterClass?: string
  listboxRootClass?: string
  listboxItemClass?: string
  autoFocus?: boolean
  onInputEnter?: (
    e: KeyboardEvent,
    searchTerm: string,
    options: { value: AcceptableValue; label: string }[],
    closeMenu: () => void
  ) => void
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const open = ref(props.defaultOpen)

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const searchTerm = ref('')

function closeMenu() {
  open.value = false
}

const target = ref()
const { focused } = useFocus(target)

onMounted(() => {
  if (props.autoFocus) {
    focused.value = true
  }
})

const filteredOptions = computed(() => {
  if (searchTerm.value === '') {
    return props.options
  }
  return props.options.filter((i) => i.label.toLowerCase().includes(searchTerm.value?.toLowerCase()))
})

watch(
  () => modelValue.value,
  () => {
    open.value = false
  }
)
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        ref="target"
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        :class="cn('w-[200px] justify-between', triggerWidth, triggerCn)"
      >
        <span>
          {{ displayText }}
        </span>
        <Icon name="mdi:menu-swap" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent :class="cn('w-[200px] p-0', triggerWidth, contentCn)">
      <ListboxRoot
        v-model="modelValue"
        :class="
          cn(
            'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
            props.listboxRootClass
          )
        "
      >
        <ListboxContent>
          <div class="flex items-center border-b px-3" cmdk-input-wrapper>
            <Icon name="mdi:search" class="mr-2 h-4 w-4 shrink-0 opacity-50" />

            <ListboxFilter
              v-model="searchTerm"
              @keypress.enter="(e: KeyboardEvent) => onInputEnter?.(e, searchTerm, filteredOptions, closeMenu)"
              auto-focus
              :class="
                cn(
                  'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
                  props.filterClass
                )
              "
            />
          </div>
          <div class="max-h-[300px] overflow-auto p-1 text-foreground">
            <!-- checkout https://radix-vue.com/components/listbox.html#virtualizer -->
            <ListboxVirtualizer
              :estimateSize="40"
              v-slot="{ option }"
              :options="filteredOptions"
              :text-content="(opt) => opt.label"
            >
              <ListboxItem
                :value="option.value"
                :class="
                  cn(
                    'relative w-full flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    props.listboxItemClass
                  )
                "
              >
                {{ option.label }}
                <ListboxItemIndicator class="absolute right-0 w-[25px] inline-flex items-center justify-center">
                  <Icon name="mdi:check" />
                </ListboxItemIndicator>
              </ListboxItem>
            </ListboxVirtualizer>
          </div>
          <slot name="trailingCommand" :searchTerm="searchTerm" :closeMenu="closeMenu"></slot>
        </ListboxContent>
      </ListboxRoot>
      <!-- <Command
        v-model:search-term="searchTerm"
        @keypress.enter="(e: KeyboardEvent) => onInputEnter?.(e, searchTerm, options, closeMenu)"
      >
        <CommandInput class="h-9" :placeholder="commandPlaceholder || 'Search...'" />
        <slot name="empty" :searchTerm="searchTerm">
          <CommandEmpty>
            {{ commandEmpty || 'No option found.' }}
          </CommandEmpty>
        </slot>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="toKey(option)"
              :value="toCompletionValue(option)"
              @select="
                () => {
                  modelValue = option.value
                  open = false
                }
              "
            >
              {{ option.label }}
              <Icon
                name="mdi:check-bold"
                :class="cn('ml-auto h-4 w-4', isSelectedOption(option) ? 'opacity-100' : 'opacity-0')"
              />
            </CommandItem>
            <slot name="trailingCommand" :searchTerm="searchTerm" :closeMenu="closeMenu"></slot>
          </CommandGroup>
        </CommandList>
      </Command> -->
      <slot name="trailing" :searchTerm="searchTerm" :closeMenu="closeMenu"></slot>
    </PopoverContent>
  </Popover>
</template>
