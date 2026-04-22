<script lang="ts" setup>
  import { UApp, UIcon, ULink, UMain } from "#build/ui/components";

  import { Outlet } from "@tanstack/vue-router";
  import { TanStackRouterDevtools } from "@tanstack/vue-router-devtools";
</script>

<template>
  <UApp>
    <header
      class="bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50"
    >
      <div
        class="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <ULink
          class="text-highlighted hover:text-primary text-lg font-semibold"
          to="/"
        >
          Veehance UI
        </ULink>

        <UIcon class="size-6" name="menu" />
      </div>
    </header>

    <UMain class="flex flex-col items-center justify-center">
      <Outlet />
    </UMain>
    <TanStackRouterDevtools position="bottom-left" />
  </UApp>
</template>
