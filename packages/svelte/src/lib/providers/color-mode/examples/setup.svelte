<script lang="ts">
  import { ColorModeProvider } from "@veehance/svelte/color-mode";
  import { EnvironmentProvider } from "@veehance/svelte/environment";
</script>

<iframe title="IFrame Context">
  <EnvironmentProvider>
    <ColorModeProvider><!-- Your App --></ColorModeProvider>
  </EnvironmentProvider>
</iframe>
