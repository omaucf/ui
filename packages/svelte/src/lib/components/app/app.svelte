<script module lang="ts">
  import type { Snippet } from "svelte";

  import type { RootNode } from "@veehance/core/types";
  import type { ColorModeProps } from "../../plugins/color-mode.svelte";

  export interface AppProps {
    children?: Snippet;
    environment?: RootNode | (() => RootNode) | undefined;
    theme?: ColorModeProps["value"];
  }
</script>

<script lang="ts">
  import { default as ColorMode } from "../../plugins/color-mode.svelte";
  import { EnvironmentProvider } from "../../providers/environment/index.js";

  let { children, environment, theme }: AppProps = $props();
</script>

<EnvironmentProvider value={environment}>
  <ColorMode value={theme}> {@render children?.()} </ColorMode>
</EnvironmentProvider>
