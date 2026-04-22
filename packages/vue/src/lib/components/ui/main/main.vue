<script lang="ts">
  import type { MainTheme } from "./main.types";

  export interface MainProps {
    class?: any;
    ui?: MainTheme["slots"];
  }
</script>

<script lang="ts" setup>
  import { ui as theme } from "@iueev/core/theme";
  import { cv } from "@iueev/core/utils";

  const props = defineProps<MainProps>();

  const ui = cv(theme.main);
</script>

<template>
  <main
    data-scope="main"
    :class="ui({ className: [props.ui?.base, props.class] })"
  >
    <slot />
  </main>
</template>
