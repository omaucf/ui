export const CORE_ANATOMY = Object.freeze({
  NAME: "@veehance/core",
  PLUGIN: ["@tailwindcss/vite", "vite-plugin-webfont-dl"],
  SHARED: ["@iconify/utils", "defu", "scule", "tailwind-variants", "zod"],
});

export const REACT_ANATOMY = Object.freeze({
  NAME: "@veehance/react",
  INERTIA: ["@inertiajs/react", "next-themes"],
  META: ["next-themes"],
  OPTIMIZE: ["@unhead/react/client"],
  PLUGIN: ["unplugin-auto-import"],
  ROUTER: ["next-themes", "react-router"],
  SHARED: ["@base-ui/react", "@iconify/react", "@unhead/react"],
  START: ["@tanstack/react-router", "next-themes"],
  VITE: [],
  VITE_IMAGE: ["@unpic/react"],
});

export const SVELTE_ANATOMY = Object.freeze({
  NAME: "@veehance/svelte",
  INERTIA: ["@inertiajs/svelte"],
  META: [],
  OPTIMIZE: ["@unhead/svelte/client"],
  PLUGIN: ["unplugin-auto-import", "unplugin-svelte-components"],
  ROUTER: ["sv-router"],
  SHARED: ["@iconify/svelte", "@unhead/svelte", "bits-ui"],
  START: [],
  VITE: ["mode-watcher"],
  VITE_IMAGE: ["@unpic/svelte"],
});

export const VUE_ANATOMY = Object.freeze({
  NAME: "@veehance/vue",
  INERTIA: ["@inertiajs/vue3"],
  META: ["@nuxtjs/color-mode", "@nuxt/fonts", "@nuxt/image"],
  OPTIMIZE: ["@unhead/vue/client"],
  PLUGIN: ["unplugin-auto-import", "unplugin-vue-components"],
  ROUTER: ["vue-router"],
  SHARED: ["@iconify/vue", "@unhead/vue", "@vueuse/core", "reka-ui"],
  START: ["@tanstack/vue-router"],
  VITE: ["hookable"],
  VITE_IMAGE: ["@unpic/vue"],
});
