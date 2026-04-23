<script module lang="ts">
  import type { Snippet } from "svelte";

  import type { Theme } from "@veehance/core/types";

  export interface ColorModeProps {
    children?: Snippet;
    value?: {
      defaultTheme?: Theme;
      disableTransition?: boolean;
      storageKey?: string;
    };
  }
</script>

<script lang="ts">
  import { ModeWatcher } from "mode-watcher";

  import appConfig from "#build/app.config";

  let { children, value }: ColorModeProps = $props();
</script>

<ModeWatcher
  defaultMode={value?.defaultTheme ?? (appConfig.colorMode ? "system" : "light")}
  track={appConfig.colorMode}
/>
{@render children?.()}
