<script lang="ts">
  import { ColorModeProvider } from "@veehance/svelte/color-mode";
  import { EnvironmentProvider } from "@veehance/svelte/environment";

  import Usage from "./usage.svelte";
</script>

<EnvironmentProvider>
  <ColorModeProvider>
    <Usage />
  </ColorModeProvider>
</EnvironmentProvider>
