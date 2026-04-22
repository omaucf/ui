<script lang="ts" module>
  import { getContext, setContext } from "svelte";

  import type { ColorModeProviderProps } from "./color-mode.types.js";
  import ColorModeProvider from "./color-mode-provider.svelte";

  export const COLOR_MODE_BOUND_KEY = Symbol("ColorModeBound");
</script>

<script lang="ts">
  let { children, value }: ColorModeProviderProps = $props();

  const bound = getContext<boolean>(COLOR_MODE_BOUND_KEY);
  if (!bound) {
    setContext(COLOR_MODE_BOUND_KEY, true);
  }
</script>

{#if bound}
  {@render children?.()}
{:else}
  <ColorModeProvider {value}>
    {#snippet children()}
      {@render children?.()}
    {/snippet}
  </ColorModeProvider>
{/if}
