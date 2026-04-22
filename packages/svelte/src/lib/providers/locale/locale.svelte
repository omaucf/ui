<script lang="ts">
  import type { LocaleProviderProps } from "./locale.types";
  import { LocaleContextProvider } from "./use-locale-context";

  let { children, value }: LocaleProviderProps = $props();

  $effect(() => {
    LocaleContextProvider(() => value!);
  });
</script>

{@render children?.()}
