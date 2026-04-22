<script lang="ts" setup>
  import { computed, ref } from "vue";

  import { getDocument, getWindow } from "@zag-js/dom-query";

  import { runIfFn } from "@/utils/fn.js";

  import type { EnvironmentProviderProps } from "./environment.types";
  import { EnvironmentContextProvider } from "./use-environment-context";

  const props = defineProps<EnvironmentProviderProps>();
  const spanRef = ref<HTMLSpanElement | null>(null);

  const getRootNode = () =>
    runIfFn(props.value) ?? spanRef.value?.getRootNode() ?? document;

  const environment = computed(() => ({
    getDocument: () => getDocument(getRootNode()),
    getRootNode,
    getWindow: () => getWindow(getRootNode()),
  }));

  EnvironmentContextProvider(environment);
</script>

<template>
  <slot />
  <span hidden v-if="!props.value" ref="spanRef"></span>
</template>
