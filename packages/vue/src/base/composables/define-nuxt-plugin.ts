import type { Plugin as VuePlugin } from "vue";

export const defineNuxtPlugin = (plugin: (nuxtApp: any) => void) =>
  ({
    install(app) {
      app.runWithContext(() => plugin({ vueApp: app } as any));
    },
  }) satisfies VuePlugin;
