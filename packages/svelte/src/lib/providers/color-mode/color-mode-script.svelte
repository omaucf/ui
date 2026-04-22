<script lang="ts">
  import {
    createColorScript,
    resolveColorScript,
  } from "@veehance/core/utils/script";

  import appConfig from "#build/app.config";

  import type { ColorModeValue } from "./color-mode.types.js";

  let value: ColorModeValue = $props();

  const script = $derived(
    createColorScript(resolveColorScript(value, appConfig.colorMode))
  );
</script>

<svelte:head> {@html `<script>${script}</script>`} </svelte:head>
