import { VUE_ANATOMY } from "../../lib/constants/anatomy.js";
import type { ImportResolver } from "../../lib/types/template.js";

export const vueBase: ImportResolver = () => [
  {
    from: `${VUE_ANATOMY.NAME}/define-nuxt-plugin`,
    names: ["defineNuxtPlugin"],
  },
  {
    from: `${VUE_ANATOMY.NAME}/use-app-config`,
    names: ["useAppConfig"],
  },
  {
    from: `${VUE_ANATOMY.NAME}/use-color-mode`,
    names: ["useColorMode"],
  },
  {
    from: `${VUE_ANATOMY.NAME}/use-environment`,
    names: ["useEnvironment"],
  },
  {
    from: `${VUE_ANATOMY.NAME}/use-forward-expose`,
    names: ["useForwardExpose"],
  },
  {
    from: `${VUE_ANATOMY.NAME}/use-head`,
    names: ["useHead"],
  },
  {
    from: `${VUE_ANATOMY.NAME}/use-nuxt-app`,
    names: ["useNuxtApp"],
  },
];

export const vueNuxtCore: ImportResolver = () => [
  {
    from: "nuxt/app",
    names: ["defineNuxtPlugin", "useAppConfig", "useHead", "useNuxtApp"],
  },
];

export const vueNuxtColorMode: ImportResolver = (options) => [
  {
    from:
      options.colorMode === false
        ? `${VUE_ANATOMY.NAME}/use-color-mode/nuxt`
        : `${process.cwd()}/node_modules/@nuxtjs/color-mode/dist/runtime/composables`,
    names: ["useColorMode"],
  },
];

export const vueNuxtExtras: ImportResolver = () => [
  {
    from: `${VUE_ANATOMY.NAME}/use-environment`,
    names: ["useEnvironment"],
  },
  {
    from: `${VUE_ANATOMY.NAME}/use-forward-expose`,
    names: ["useForwardExpose"],
  },
];
