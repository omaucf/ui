<script lang="ts" setup>
  import en from "@veehance/core/locale/en";
  import { LocaleProvider } from "@veehance/vue/locale";

  import Usage from "./usage.vue";
</script>

<template>
  <LocaleProvider :value="en">
    <Usage />
  </LocaleProvider>
</template>
