<script lang="ts" setup>
  import { useColorMode } from "@veehance/vue/use-color-mode";

  // biome-ignore lint/correctness/noUnusedVariables: safe_to_set
  const colorMode = useColorMode();
</script>

<template>
  <pre>{{ colorMode.mode }}</pre>
</template>
