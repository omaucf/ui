<script setup lang="ts">
  import { App } from "@veehance/vue/app";

  import { Outlet } from "@tanstack/vue-router";
  import { TanStackRouterDevtools } from "@tanstack/vue-router-devtools";
</script>

<template>
  <App> <Outlet /> </App>
  <TanStackRouterDevtools position="bottom-left" />
</template>
