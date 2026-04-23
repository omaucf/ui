declare module "#build/app.config" {
  // biome-ignore assist/source/organizeImports: safe_to_set
  import type { UI } from "@veehance/core/types";
  import type theme from "#build/theme/index";

  const _default: { colorMode: boolean; ui: UI<typeof theme> };
  export default _default;
}

declare module "#build/ui/icons" {
  const _default: Record<string, Record<string, any>>;
  export default _default;
}

declare module "#build/ui/imports" {
  const useAppConfig: typeof import("../../lib/composables/use-app-config").useAppConfig;
  const useEnvironment: typeof import("../../lib/composables/use-environment").useEnvironment;
  const useHead: typeof import("../../lib/composables/use-head").useHead;
}
