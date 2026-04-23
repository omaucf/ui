<script setup lang="ts">
  useHead({
    htmlAttrs: { dir: "ltr", lang: "en" },
    link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  });
</script>

<template>
  <Body>
    <NuxtLayout> <NuxtPage /> </NuxtLayout>
  </Body>
</template>
