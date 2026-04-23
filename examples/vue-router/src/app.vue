<script setup lang="ts">
  import { App } from "@veehance/vue/app";
</script>

<template>
  <App>
    <Suspense> <RouterView /> </Suspense>
  </App>
</template>
