<script lang="ts" setup>
  import { useEnvironment } from "@veehance/vue/use-environment";

  // biome-ignore lint/correctness/noUnusedVariables: safe_to_set
  const { getRootNode } = useEnvironment();
</script>

<template>
  <pre>{{ getRootNode().nodeName }}</pre>
</template>
