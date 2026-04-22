<script lang="ts" setup>
  import { EnvironmentProvider } from "@veehance/vue/environment";

  import Usage from "./usage.vue";
</script>

<template>
  <EnvironmentProvider>
    <Usage />
  </EnvironmentProvider>
</template>
