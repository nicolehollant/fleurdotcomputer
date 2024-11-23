<template>
  <section class="fixed -inset-10 z-0 overflow-hidden">
    <div class="flex flex-wrap items-center justify-center gap-12 w-full h-full">
      <template v-for="column in Array.from({ length: 8 }).map((_, i) => i)">
        <template v-for="row in Array.from({ length: 5 }).map((_, i) => i)">
          <MouseSkew
            :invert="(column * 3 + row) % 2 === 0"
            :multiplier="6"
            class="w-max h-max flex items-center justify-center transition duration-500 sm:transition-none"
          >
            <LandingPageIcon class="w-[max(6rem,11vw)] h-[max(6rem,18vh)]" />
          </MouseSkew>
        </template>
      </template>
    </div>
    <div class="absolute -inset-40 backdrop-blur-sm bg-pink-600/20"></div>
  </section>
  <div class="z-10 relative flex flex-col min-h-[100dvh]">
    <header class="px-4 lg:px-6 h-14 flex items-center">
      <AppLogo></AppLogo>
      <nav class="ml-auto flex gap-4 sm:gap-6">
        <Button class="bg-pink-300 hover:bg-pink-200" asChild>
          <a
            class="!text-2xl"
            style="text-shadow: 0 0 1px #000000"
            href="https://bsky.app/profile/fleur.computer"
            aria-label="bluesky"
          >
            🦋
          </a>
        </Button>
        <Button class="bg-pink-300 hover:bg-pink-200" asChild>
          <a
            class="!text-2xl"
            style="text-shadow: 0 0 1px #000000"
            href="https://x.com/gaybugfeet"
            aria-label="twitter"
          >
            🐥
          </a>
        </Button>
        <Button class="bg-pink-300 hover:bg-pink-200" asChild>
          <a
            class="!text-2xl"
            style="text-shadow: 0 0 1px #000000"
            href="https://postbyurself.com"
            aria-label="postbyurself"
          >
            🕊️
          </a>
        </Button>
      </nav>
    </header>
    <main class="flex-1 w-full py-12 pt-24 md:py-24 lg:py-32 xl:py-48 min-h-[calc(100vh-56px)]">
      <AppContainer class="max-w-xl">
        <Card class="bg-pink-400/30 border-purple-600/50 backdrop-blur">
          <CardHeader>
            <h1 class="text-pink-700 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              hiiiiii :3
            </h1>
          </CardHeader>
          <CardContent>
            <p class="text-pink-950 text-xl font-bold">its fleur, come hang out c:</p>
            <ul class="space-y-2 mt-4 text-pink-950">
              <li class="">
                <a class="!text-2xl group" href="https://bsky.app/profile/fleur.computer" aria-label="bluesky">
                  🦋
                  <span class="ml-2 decoration-dotted underline group-hover:decoration-solid">bluesky</span>
                </a>
              </li>
              <li class="">
                <a class="!text-2xl group" href="https://x.com/gaybugfeet" aria-label="twitter">
                  🐥
                  <span class="ml-2 decoration-dotted underline group-hover:decoration-solid">twitter</span>
                </a>
              </li>
              <li class="">
                <a class="!text-2xl group" href="https://postbyurself.com" aria-label="postbyurself">
                  🕊️
                  <span class="ml-2 decoration-dotted underline group-hover:decoration-solid">postbyurself</span>
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </AppContainer>
    </main>
  </div>
</template>
