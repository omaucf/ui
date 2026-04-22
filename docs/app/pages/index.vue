<script lang="ts" setup>
  useSeoMeta({ title: "Veehance UI" });
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center gap-8 lg:grow">
    <div class="flex gap-2">
      <UImage alt="Framework" src="/favicon.png" :height="96" :width="96" />
    </div>
    <h1 class="font-bold text-5xl md:text-7xl">Veehance UI</h1>
    <div class="flex gap-2">
      <div class="size-8 rounded-xs border border-default bg-primary" />
      <div class="size-8 rounded-xs border border-default bg-secondary" />
      <div class="size-8 rounded-xs border border-default bg-default" />
      <div class="size-8 rounded-xs border border-default bg-muted" />
      <div class="size-8 rounded-xs border border-default bg-elevated" />
      <div class="size-8 rounded-xs border border-default bg-accented" />
      <div class="size-8 rounded-xs border border-default bg-inverted" />
      <div class="size-8 rounded-xs border border-default bg-success" />
      <div class="size-8 rounded-xs border border-default bg-info" />
      <div class="size-8 rounded-xs border border-default bg-warning" />
      <div class="size-8 rounded-xs border border-default bg-error" />
    </div>
    <div class="flex gap-2">
      <span class="text-dimmed">Dimmed</span>
      <span class="text-muted">Muted</span>
      <span class="text-toned">Toned</span>
      <span class="text-default">Default</span>
      <span class="text-highlighted">Highlighted</span>
    </div>
    <div class="flex gap-2">
      <UIcon class="size-5" name="light" />
      <UIcon class="size-5" name="dark" />
      <UIcon class="size-5" name="system" />
      <UIcon class="size-5" name="iconify lucide--user" />
    </div>
    <div class="flex gap-2">
      <ULink to="/playground">Go to Playground</ULink>
    </div>
  </UContainer>
</template>
