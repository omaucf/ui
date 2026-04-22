<script lang="ts">
  import { useColorMode } from "@veehance/svelte/use-color-mode";

  const { mode } = useColorMode();
</script>

<pre>{JSON.stringify(mode(), null, 2)}</pre>
