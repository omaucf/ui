<script lang="ts">
  import { EnvironmentProvider } from "@veehance/svelte/environment";

  import Usage from "./usage.svelte";
</script>

<EnvironmentProvider>
  <Usage />
</EnvironmentProvider>
