<script setup lang="ts">
  import { Container } from "@veehance/vue/container";
  import { Main } from "@veehance/vue/main";

  import { useHead } from "#build/ui/imports";

  useHead({ title: "Veehance UI" });
</script>

<template>
  <Main class="flex min-h-screen flex-col items-center justify-center">
    <Container class="flex flex-col items-center justify-center gap-8 lg:grow">
      <div class="flex gap-2">
        <img
          src="https://logo.svgcdn.com/logos/vitejs.png"
          alt="Framework"
          :height="64"
          :width="64"
        >
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
    </Container>
  </Main>
</template>
