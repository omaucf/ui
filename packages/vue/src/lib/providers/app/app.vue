<script lang="ts" setup>
  import { ColorModeProvider } from "../color-mode";
  import { EnvironmentProvider } from "../environment";
  import { LocaleProvider } from "../locale";
  import type { AppProviderProps } from "./app.types";

  const props = defineProps<AppProviderProps>();
</script>

<template>
  <EnvironmentProvider :value="props.environment">
    <LocaleProvider :value="props.locale">
      <ColorModeProvider :value="props.colorMode">
        <slot />
      </ColorModeProvider>
    </LocaleProvider>
  </EnvironmentProvider>
</template>
