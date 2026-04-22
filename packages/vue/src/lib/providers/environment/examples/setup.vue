<script lang="ts" setup>
  import { EnvironmentProvider } from "@veehance/vue/environment";
</script>

<template>
  <iframe title="IFrame Context">
    <EnvironmentProvider><!-- Your App --></EnvironmentProvider>
  </iframe>
</template>
