<script lang="ts" setup>
  import { ColorModeProvider } from "@veehance/vue/color-mode";
  import { EnvironmentProvider } from "@veehance/vue/environment";

  import Usage from "./usage.vue";
</script>

<template>
  <EnvironmentProvider>
    <ColorModeProvider>
      <Usage />
    </ColorModeProvider>
  </EnvironmentProvider>
</template>
