<script lang="ts" setup>
  import { useLocale } from "@veehance/vue/use-locale";

  // biome-ignore lint/correctness/noUnusedVariables: safe_to_set
  const { code } = useLocale();
</script>

<template>
  <pre>{{ JSON.stringify(code, null, 2) }}</pre>
</template>
