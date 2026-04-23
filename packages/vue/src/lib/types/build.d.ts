declare module "#build/app.config" {
  import type { AppConfig } from "@nuxt/schema";

  const _default: AppConfig;
  export default _default;
}

declare module "#build/ui/icons" {
  const _default: Record<string, Record<string, any>>;
  export default _default;
}

declare module "#build/ui/imports" {
  const defineNuxtPlugin: typeof import("../../base/composables/define-nuxt-plugin").defineNuxtPlugin;
  const useAppConfig: typeof import("../../base/composables/use-app-config").useAppConfig;
  const useColorMode: typeof import("../../base/composables/use-color-mode").useColorMode;
  const useEnvironment: typeof import("../../lib/composables/use-environment").useEnvironment;
  const useForwardExpose: typeof import("../../lib/composables/use-forward-expose").useForwardExpose;
  const useHead: typeof import("../../base/composables/use-head").useHead;
  const useNuxtApp: typeof import("../../base/composables/use-nuxt-app").useNuxtApp;
}
