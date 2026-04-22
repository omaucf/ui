<script lang="ts">
  import { ColorModeProvider } from "../color-mode";
  import { EnvironmentProvider } from "../environment";
  import { LocaleProvider } from "../locale";
  import type { AppProviderProps } from "./app.types";

  const { environment, locale, colorMode, children }: AppProviderProps =
    $props();
</script>

<EnvironmentProvider value={environment}>
  <LocaleProvider value={locale}>
    <ColorModeProvider value={colorMode}>
      {@render children?.()}
    </ColorModeProvider>
  </LocaleProvider>
</EnvironmentProvider>
