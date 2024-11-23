<template>
  <div v-if="editor" class="rounded-lg focus-within:ring border">
    <div class="control-group p-2 border-b">
      <div class="flex gap-1 flex-wrap">
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              :variant="editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'"
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            >
              <Icon name="mdi:format-header-1" />
            </Button>
          </TooltipTrigger>
          <TooltipContent> Heading 1 </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              :variant="editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            >
              <Icon name="mdi:format-header-2" />
            </Button>
          </TooltipTrigger>
          <TooltipContent> Heading 2 </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              :variant="editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'"
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            >
              <Icon name="mdi:format-header-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent> Heading 3 </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              :variant="editor.isActive('paragraph') ? 'secondary' : 'ghost'"
              @click="editor.chain().focus().setParagraph().run()"
            >
              <Icon name="mdi:format-paragraph" />
            </Button>
          </TooltipTrigger>
          <TooltipContent> Paragraph </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              :variant="editor.isActive('bold') ? 'secondary' : 'ghost'"
              @click="editor.chain().focus().toggleBold().run()"
            >
              <Icon name="mdi:format-bold" />
            </Button>
          </TooltipTrigger>
          <TooltipContent> Bold </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              :variant="editor.isActive('italic') ? 'secondary' : 'ghost'"
              @click="editor.chain().focus().toggleItalic().run()"
            >
              <Icon name="mdi:format-italic" />
            </Button>
          </TooltipTrigger>
          <TooltipContent> Italic </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              :variant="editor.isActive('underline') ? 'secondary' : 'ghost'"
              @click="editor.chain().focus().toggleUnderline().run()"
            >
              <Icon name="mdi:format-underline" />
            </Button>
          </TooltipTrigger>
          <TooltipContent> Underline </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              :variant="editor.isActive('strike') ? 'secondary' : 'ghost'"
              @click="editor.chain().focus().toggleStrike().run()"
            >
              <Icon name="mdi:format-strikethrough" />
            </Button>
          </TooltipTrigger>
          <TooltipContent> Strike Through </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              :variant="editor.isActive('highlight') ? 'secondary' : 'ghost'"
              @click="editor.chain().focus().toggleHighlight().run()"
            >
              <Icon name="mdi:format-color-highlight" />
            </Button>
          </TooltipTrigger>
          <TooltipContent> Highlight </TooltipContent>
        </Tooltip>
      </div>
    </div>
    <ClientOnly>
      <div class="p-2">
        <editor-content :editor="editor" />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
  defaultValue?: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const editor = ref<Editor>()

function updateModelValue() {
  if (editor.value) {
    modelValue.value = JSON.stringify(editor.value.getJSON())
  }
}

const debouncedUpdateModelValue = useDebounceFn(updateModelValue, 500)

function tryParseOrNull(val: string) {
  try {
    return JSON.parse(val)
  } catch (error) {
    return null
  }
}

onMounted(() => {
  editor.value = new Editor({
    editorProps: {
      attributes: {
        class: 'prose max-w-full dark:prose-invert prose-sm md:prose-base prose-strong:font-extrabold outline-none',
      },
    },
    extensions: [StarterKit, Highlight, Underline],
    content: tryParseOrNull(props.modelValue),
  })
  editor.value.on('update', () => {
    debouncedUpdateModelValue()
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
