<script lang="ts">
  import en from "@veehance/core/locale/en";
  import { LocaleProvider } from "@veehance/svelte/locale";

  import Usage from "./usage.svelte";
</script>

<LocaleProvider value={en}>
  <Usage />
</LocaleProvider>
