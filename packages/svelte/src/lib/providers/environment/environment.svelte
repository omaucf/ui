<script lang="ts">
  import { getDocument, getWindow } from "@zag-js/dom-query";

  import { runIfFn } from "$lib/utils/fn";

  import type {
    EnvironmentContext,
    EnvironmentProviderProps,
  } from "./environment.types";
  import { EnvironmentContextProvider } from "./use-environment-context";

  const { value, children }: EnvironmentProviderProps = $props();
  let spanRef: HTMLSpanElement | null = $state(null);

  const getRootNode = () =>
    runIfFn(value) ?? spanRef?.ownerDocument ?? document;

  const environment = $derived<ReturnType<EnvironmentContext>>({
    getDocument: () => getDocument(getRootNode()),
    getRootNode,
    getWindow: () => getWindow(getRootNode()),
  });

  EnvironmentContextProvider(() => environment);
</script>

{@render children?.()}
{#if !value}
  <span hidden bind:this={spanRef}></span>
{/if}
