<template>
  <ClientOnly>
    <div
      class="w-full h-full flex items-center justify-center transition duration-1000"
      :style="ignoreTransformations ? '' : transformations"
      ref="iconRef"
    >
      <Icon v-if="defs.iconIndex.current === 0" name="mdi:lock-outline" v-bind="$attrs" class="icon-animated"></Icon>
      <Icon v-if="defs.iconIndex.current === 1" name="mdi:key-outline" v-bind="$attrs" class="icon-animated"></Icon>
      <Icon v-if="defs.iconIndex.current === 2" name="mdi:fingerprint" v-bind="$attrs" class="icon-animated"></Icon>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { timeline, type AnimationControls } from 'motion'

const props = withDefaults(
  defineProps<{
    ignoreTransformations?: boolean
  }>(),
  {
    ignoreTransformations: false,
  }
)

const iconRef = ref<SVGElement | null>(null)

const defs = ref({
  toRender: {
    // criteria: 0.36,
    criteria: 1,
    current: -1,
    roll: () => Math.random() < defs.value.toRender.criteria,
  },
  iconIndex: {
    numIcons: 3,
    // numIcons: 0,
    current: 0,
    roll: () => Math.floor(Math.random() * defs.value.iconIndex.numIcons),
  },
  animationDuration: {
    current: 2,
    roll: () => Math.floor(Math.random() * 3) + 2,
  },
})

const draw = (progress: number) => ({
  // This property makes the line "draw" in when animated
  strokeDashoffset: 1 - progress,

  // Each line will be hidden until it starts drawing
  // to fix a bug in Safari where the line can be
  // partially visible even when progress is at 0
  visibility: 'visible',
})

const timelineControls = ref<AnimationControls>()

const DO_RENDER_NEXT_ITERATION = ref(false)

function reset(duration: number) {
  if (!DO_RENDER_NEXT_ITERATION.value) {
    defs.value.iconIndex.current = -1
    return
  }
  const prevRoll = defs.value.iconIndex.current
  defs.value.iconIndex.current = defs.value.iconIndex.roll()
  if (timelineControls.value) {
    if (prevRoll === defs.value.iconIndex.current) {
      timelineControls.value?.reverse()
    } else {
      timelineControls.value.stop()
      timelineControls.value.cancel()
    }
  }
  transformations.value = resetTransformations()
  nextTick(() => {
    nextTick(() => {
      setTimeout(() => {
        for (const path of iconRef.value!.querySelectorAll('path')) {
          path.setAttribute('pathLength', '1')
        }
        if (!timelineControls.value || prevRoll !== defs.value.iconIndex.current) {
          timelineControls.value = timeline([[iconRef.value!.querySelectorAll('path'), draw(1), { duration }]])
        }
        timelineControls.value.play()
      }, 300)
    })
  })
}

function resetTransformations() {
  return {
    transform: `scale(${Math.pow(Math.random() / 2 + 0.75, 1.2)}) rotateX(${(Math.random() - 1) * 20}deg) rotateY(${
      (Math.random() - 1) * 20
    }deg) translateX(${(Math.random() - 1) * 30}%) translateY(${(Math.random() - 1) * 30}%) skew(${
      (Math.random() - 1) * 20
    }deg, ${(Math.random() - 1) * 20}deg)`,
    opacity: `${Math.random() / 4 + 0.75}`,

    color: ['#fb7185', '#f43f5e', '#e11d48', '#be123c'][Math.floor(Math.random() * 4)],
    // color: ['#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'][Math.floor(Math.random() * 4)],
  }
}
const transformations = ref(resetTransformations())

function step() {
  setTimeout(() => {
    defs.value.animationDuration.current = defs.value.animationDuration.roll() + 2
    reset(defs.value.animationDuration.current)
    DO_RENDER_NEXT_ITERATION.value = defs.value.toRender.roll()
    step()
  }, (defs.value.animationDuration.current + defs.value.animationDuration.roll()) * 1000)
}

onMounted(() => {
  DO_RENDER_NEXT_ITERATION.value = defs.value.toRender.roll()
  reset(defs.value.animationDuration.current)
  step()
})
</script>

<style>
.icon-animated path {
  fill: transparent;
  stroke: currentColor;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  visibility: hidden;
}
</style>
