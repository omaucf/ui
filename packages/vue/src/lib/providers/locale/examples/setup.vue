<script lang="ts" setup>
  import en from "@veehance/core/locale/en";
  import { LocaleProvider } from "@veehance/vue/locale";
</script>

<template>
  <iframe title="IFrame Context">
    <LocaleProvider :value="en"><!-- Your App --></LocaleProvider>
  </iframe>
</template>
