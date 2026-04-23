<script lang="ts">
  import "../styles.css";

  import { App } from "@veehance/svelte/app";

  const { children } = $props();
</script>

<App> {@render children()} </App>
