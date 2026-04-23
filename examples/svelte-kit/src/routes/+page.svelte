<script lang="ts">
  import { Container } from "@veehance/svelte/container";
  import { Main } from "@veehance/svelte/main";
</script>

<svelte:head> <title>Veehance UI</title> </svelte:head>

<Main class="flex min-h-screen flex-col items-center justify-center">
  <Container class="flex flex-col items-center justify-center gap-8 lg:grow">
    <div class="flex gap-2">
      <img
        alt="Framework"
        height={64}
        src="https://logo.svgcdn.com/logos/svelte-icon.png"
        width={64}
      >
    </div>
    <h1 class="font-bold text-5xl md:text-7xl">Veehance UI</h1>
    <div class="flex gap-2">
      <div class="size-8 rounded-xs border border-default bg-primary"></div>
      <div class="size-8 rounded-xs border border-default bg-secondary"></div>
      <div class="size-8 rounded-xs border border-default bg-default"></div>
      <div class="size-8 rounded-xs border border-default bg-muted"></div>
      <div class="size-8 rounded-xs border border-default bg-elevated"></div>
      <div class="size-8 rounded-xs border border-default bg-accented"></div>
      <div class="size-8 rounded-xs border border-default bg-inverted"></div>
      <div class="size-8 rounded-xs border border-default bg-success"></div>
      <div class="size-8 rounded-xs border border-default bg-info"></div>
      <div class="size-8 rounded-xs border border-default bg-warning"></div>
      <div class="size-8 rounded-xs border border-default bg-error"></div>
    </div>
    <div class="flex gap-2">
      <span class="text-dimmed">Dimmed</span>
      <span class="text-muted">Muted</span>
      <span class="text-toned">Toned</span>
      <span class="text-default">Default</span>
      <span class="text-highlighted">Highlighted</span>
    </div>
  </Container>
</Main>
