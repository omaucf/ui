<script lang="ts">
  import { UContainer, UIcon, UImage, ULink } from "#build/ui/components";
</script>

<svelte:head> <title>Veehance UI</title> </svelte:head>

<UContainer class="flex flex-col items-center justify-center gap-8 lg:grow">
  <div class="flex gap-2">
    <UImage alt="Framework" height={64} src="/favicon.png" width={64} />
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
  <div class="flex gap-2">
    <UIcon class="size-5" name="dark" />
    <UIcon class="size-5" name="light" />
    <UIcon class="size-5" name="system" />
    <UIcon class="size-5" name="user" />
  </div>
  <div class="flex gap-2">
    <ULink to="/playground"> Go to Playground </ULink>
  </div>
</UContainer>
