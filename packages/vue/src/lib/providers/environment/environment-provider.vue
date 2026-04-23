<script setup lang="ts">
  import { computed, ref } from "vue";

  import type { RootNode } from "@veehance/core/types";
  import { getDocument, getWindow } from "@veehance/core/utils";

  import { runIfFn } from "../../utils/run-if-fn.js";
  import { EnvironmentContextProvider } from "./use-environment-context.js";

  export interface EnvironmentProviderProps {
    value?: RootNode | (() => RootNode);
  }

  const props = defineProps<EnvironmentProviderProps>();
  const spanRef = ref<HTMLSpanElement | null>(null);

  const getRootNode = () =>
    runIfFn(props.value) ?? spanRef.value?.getRootNode() ?? document;

  const environment = computed(() => ({
    getRootNode,
    getDocument: () => getDocument(getRootNode()),
    getWindow: () => getWindow(getRootNode()),
  }));

  EnvironmentContextProvider(environment);
</script>

<template>
  <slot />
  <span v-if="!props.value" hidden ref="spanRef"></span>
</template>
