<template>
  <Sheet>
    <SheetTrigger asChild>
      <slot name="trigger">
        <Button> Import </Button>
      </slot>
    </SheetTrigger>
    <SheetContent class="max-h-full overflow-auto !p-0">
      <template #close> <span></span> </template>
      <SheetHeader class="sticky z-50 top-0 bg-background/90 backdrop-blur p-6">
        <SheetTitle>{{ title }}</SheetTitle>
        <SheetDescription>
          {{ description }}
        </SheetDescription>
        <DialogClose
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
        >
          <Icon name="mdi:close" class="w-4 h-4 text-muted-foreground" />
        </DialogClose>
      </SheetHeader>
      <div class="p-6">
        <slot name="leading" :file="file" :sheets="sheets"></slot>
        <FileInput v-if="!file" v-model="file" read-as="array-buffer" />
        <Card v-else-if="sheets.data.length">
          <CardHeader>
            <CardTitle> Preview </CardTitle>
          </CardHeader>
          <CardContent class="max-h-96 overflow-auto">
            <Table>
              <TableHeader>
                <TableHead
                  class="text-left !p-2"
                  v-for="header of Object.keys(sheets.data[sheets.activeSheetIndex][0])"
                >
                  {{ header }}
                </TableHead>
              </TableHeader>
              <TableBody>
                <TableRow v-for="row of sheets.data[sheets.activeSheetIndex]">
                  <TableCell class="!p-2" v-for="cell of row">
                    {{ cell }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Alert v-else>
          <Icon name="mdi:alert" class="h-4 w-4" />
          <AlertTitle>{{ errors?.invalidFile?.title ?? 'Heads up!' }}</AlertTitle>
          <AlertDescription> {{ errors?.invalidFile?.description ?? 'Invalid File' }} </AlertDescription>
          <Button @click="() => (file = undefined)">{{ errors?.invalidFile?.action ?? 'Remove File' }}</Button>
        </Alert>
        <slot name="trailing" :file="file" :sheets="sheets"></slot>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import * as XLSX from 'xlsx'

const props = defineProps<{
  title: string
  description: string
  data: object[][]
  errors?: {
    invalidFile?: {
      title?: string
      description?: string
      action?: string
    }
  }
}>()

const emits = defineEmits<{
  (event: 'update:data', value: object[][]): void
}>()

const file = ref<ArrayBuffer>()
const sheets = ref({
  activeSheetIndex: 0,
  sheetnames: [] as string[],
  data: [] as object[][],
})

async function parseWorkbook(f: ArrayBuffer) {
  const workbook = XLSX.read(f)
  const sheetnames: string[] = []
  const data: object[][] = []
  for (let i = 0; i < workbook.SheetNames.length; i++) {
    const worksheet = workbook.Sheets[workbook.SheetNames[i]]
    // const raw_data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    const raw_data = XLSX.utils.sheet_to_json(worksheet)
    sheetnames.push(workbook.SheetNames[i])
    data.push(raw_data)
  }
  return { sheetnames, data }
}

watch(
  () => file.value,
  async () => {
    if (!file.value) {
      return
    }
    const { sheetnames, data } = await parseWorkbook(file.value)
    sheets.value.data = data
    sheets.value.sheetnames = sheetnames
    emits('update:data', data)
  }
)
</script>
