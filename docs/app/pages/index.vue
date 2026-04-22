<script lang="ts" setup>
  import { Container } from "@iueev/vue/container";

  useSeoMeta({ title: "Veehance UI" });
</script>

<template>
  <Container class="flex flex-col items-center justify-center gap-8 lg:grow">
    <div class="flex gap-2">
      <img alt="Framework" src="/favicon.png" :height="96" :width="96">
    </div>
    <h1 class="font-bold text-5xl md:text-7xl">Veehance UI</h1>
  </Container>
</template>
