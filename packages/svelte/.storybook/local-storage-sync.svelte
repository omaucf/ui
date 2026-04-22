<script lang="ts">
  import type { Snippet } from "svelte";

  let { theme = "light", children }: { theme?: string; children?: Snippet } =
    $props();

  $effect(() => {
    const currentTheme = theme || "light";

    localStorage.setItem("ui-theme", currentTheme);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "ui-theme",
        newValue: currentTheme,
      })
    );
  });
</script>

{@render children?.()}
