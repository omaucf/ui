<script lang="ts">
  import { useLocale } from "@veehance/svelte/use-locale";

  const { code } = useLocale();
</script>

<pre>{JSON.stringify(code(), null, 2)}</pre>
