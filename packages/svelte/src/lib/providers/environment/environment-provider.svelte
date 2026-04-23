<script module lang="ts">
  import type { Snippet } from "svelte";

  import type { MaybeFunction, RootNode } from "@veehance/core/types";
  import { getDocument, getWindow } from "@veehance/core/utils";

  import type { UseEnvironmentContext } from "./use-environment-context.js";

  export interface EnvironmentProviderProps {
    children?: Snippet;
    value?: MaybeFunction<RootNode>;
  }
</script>

<script lang="ts">
  import { runIfFn } from "../../utils/run-if-fn.js";
  import { EnvironmentContextProvider } from "./use-environment-context.js";

  const { value, children }: EnvironmentProviderProps = $props();
  let spanRef: HTMLSpanElement | null = $state(null);

  const getRootNode = () =>
    runIfFn(value) ?? spanRef?.ownerDocument ?? document;

  const environment = $derived<ReturnType<UseEnvironmentContext>>({
    getRootNode,
    getDocument: () => getDocument(getRootNode()),
    getWindow: () => getWindow(getRootNode()),
  });

  EnvironmentContextProvider(() => environment);
</script>

{@render children?.()}
{#if !value}
  <span bind:this={spanRef} hidden></span>
{/if}
