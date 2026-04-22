<template>
  <header
    class="bg-default/75 backdrop-blur border-b border-default h-[var(--ui-header-height)] sticky top-0 z-50"
  >
    <div class="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <ULink class="text-highlighted hover:text-primary text-lg font-semibold" to="/">
        Veehance UI
      </ULink>

      <div class="flex gap-2">
        <UIcon class="size-5" name="github" />
        <UIcon class="size-5" name="menu" />
      </div>
    </div>
  </header>

  <UMain class="flex flex-col items-center justify-center">
    <slot />
  </UMain>
</template>
