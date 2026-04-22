<script lang="ts" setup>
  import { toRef } from "vue";

  import type { LocaleProviderProps } from "./locale.types";
  import { LocaleContextProvider } from "./use-locale-context";

  const props = defineProps<LocaleProviderProps>();

  const locale = toRef(() => props.value!);
  LocaleContextProvider(locale);
</script>

<template>
  <slot />
</template>
