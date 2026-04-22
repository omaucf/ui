<script lang="ts" setup>
  useHead({
    htmlAttrs: { dir: "ltr", lang: "en-US" },
    link: [{ href: "/favicon.png", rel: "icon", type: "image/png" }],
    meta: [
      { content: "width=device-width, initial-scale=1", name: "viewport" },
    ],
  });
</script>

<template>
  <Body>
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </Body>
</template>
