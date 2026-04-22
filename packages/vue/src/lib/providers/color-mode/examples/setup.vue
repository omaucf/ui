<script lang="ts" setup>
  import { ColorModeProvider } from "@veehance/vue/color-mode";
  import { EnvironmentProvider } from "@veehance/vue/environment";
</script>

<template>
  <iframe title="IFrame Context">
    <EnvironmentProvider>
      <ColorModeProvider><!-- Your App --></ColorModeProvider>
    </EnvironmentProvider>
  </iframe>
</template>
