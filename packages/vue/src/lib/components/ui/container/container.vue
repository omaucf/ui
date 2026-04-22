<script lang="ts">
  import type { ContainerTheme } from "./container.types";

  export interface ContainerProps {
    class?: any;
    ui?: ContainerTheme["slots"];
  }
</script>

<script lang="ts" setup>
  import { ui as theme } from "@iueev/core/theme";
  import { cv } from "@iueev/core/utils";

  const props = defineProps<ContainerProps>();

  const ui = cv(theme.container);
</script>

<template>
  <div
    data-scope="container"
    :class="ui({ className: [props.ui?.base, props.class] })"
  >
    <slot />
  </div>
</template>
