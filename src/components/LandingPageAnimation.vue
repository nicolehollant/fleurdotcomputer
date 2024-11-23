<template>
  <div
    class="grid pointer-events-none mx-auto max-w-[calc(100vw-4rem)] max-h-[50vh] w-[250px] h-[300px] md:w-[500px] md:h-[500px]"
    :style="{
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
    }"
  >
    <template v-for="column in Array.from({ length: 3 }).map((_, i) => i)">
      <template v-for="row in Array.from({ length: 3 }).map((_, i) => i)">
        <MouseSkew
          :invert="(column * 3 + row) % 2 === 0"
          :multiplier="5"
          class="w-full h-full flex items-center justify-center transition duration-500 sm:transition-none"
        >
          <LandingPageIcon class="w-10 md:w-20 h-10 md:h-20" />
        </MouseSkew>
      </template>
    </template>
  </div>
</template>
