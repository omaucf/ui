<script lang="ts">
  import type { RootNode } from "@veehance/core/types";

  export interface AppProps {
    environment?: RootNode | (() => RootNode);
  }
</script>

<script setup lang="ts">
  import { EnvironmentProvider } from "../../providers/environment/index.js";

  const props = defineProps<AppProps>();
</script>

<template>
  <EnvironmentProvider :value="props.environment">
    <slot />
  </EnvironmentProvider>
</template>
