export const CORE_ANATOMY = Object.freeze({
  COMMON: [],
  NAME: "@veehance/core",
  PLUGIN: ["unplugin-auto-import", "vite-plugin-webfont-dl"],
  TAILWIND: ["@iconify/tailwind4"],
});

export const REACT_ANATOMY = Object.freeze({
  COMMON: [],
  IMAGE: ["@unpic/react"],
  INERTIA: ["@inertiajs/react"],
  META: [],
  NAME: "@veehance/react",
  PLUGIN: ["unplugin-react-components"],
  ROUTER: ["react-router"],
  START: ["@tanstack/react-router"],
});

export const SOLID_ANATOMY = Object.freeze({
  COMMON: [],
  IMAGE: ["@unpic/solid"],
  INERTIA: ["inertia-adapter-solid"],
  META: [],
  NAME: "@veehance/solid",
  PLUGIN: [],
  ROUTER: ["@solidjs/router"],
  START: ["@tanstack/solid-router"],
});

export const SVELTE_ANATOMY = Object.freeze({
  COMMON: [],
  IMAGE: ["@unpic/svelte"],
  INERTIA: ["@inertiajs/svelte"],
  META: [],
  NAME: "@veehance/svelte",
  PLUGIN: ["unplugin-svelte-components"],
  ROUTER: ["sv-router"],
  START: [],
});

export const VUE_ANATOMY = Object.freeze({
  COMMON: ["@unhead/vue", "@vueuse/core"],
  IMAGE: ["@unpic/vue"],
  INERTIA: ["@inertiajs/vue3"],
  META: [],
  NAME: "@veehance/vue",
  PLUGIN: ["unplugin-vue-components"],
  ROUTER: ["vue-router"],
  START: ["@tanstack/vue-router"],
});
