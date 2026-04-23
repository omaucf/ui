<script setup lang="ts">
  import { App } from "@veehance/vue/app";

  useHead({
    htmlAttrs: { dir: "ltr", lang: "en" },
    link: [{ rel: "icon", href: "/favicon.ico" }],
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  });
</script>

<template>
  <Body>
    <App>
      <NuxtLayout> <NuxtPage /> </NuxtLayout>
    </App>
  </Body>
</template>
