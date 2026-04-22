<script lang="ts">
  import { useEnvironment } from "@veehance/svelte/use-environment";

  const { getRootNode } = useEnvironment();
</script>

<pre>{JSON.stringify(getRootNode().nodeName, null, 2)}</pre>
