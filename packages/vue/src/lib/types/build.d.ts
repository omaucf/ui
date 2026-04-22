declare module "#build/ui/components" {
  const Factory: typeof import("../elements/factory").Factory;
  const Icon: typeof import("../elements/icon").Icon;
  const Image: typeof import("../elements/image").Image;
  const Link: typeof import("../elements/link").Link;
  const NuxtImg: any;
  const NuxtLink: any;
}

declare module "#build/ui/icons" {
  const _default: Record<string, Record<string, any>>;
  export default _default;
}

declare module "#build/ui/imports" {
  const defineNuxtPlugin: typeof import("../../base/composables/define-nuxt-plugin").defineNuxtPlugin;
  const extendColors: typeof import("@veehance/core/functions/color").extendColors;
  const useAppConfig: typeof import("../../base/composables/use-app-config").useAppConfig;
  const useCollator: typeof import("../providers/locale/use-collator").useCollator;
  const useColorMode: typeof import("../composables/use-color-mode").useColorMode;
  const useDateFormatter: typeof import("../providers/locale/use-date-formatter").useDateFormatter;
  const useEmitAsProps: typeof import("../composables/use-emit-as-props").useEmitAsProps;
  const useEnvironment: typeof import("../composables/use-environment").useEnvironment;
  const useFilter: typeof import("../providers/locale/use-filter").useFilter;
  const useFocusVisible: typeof import("../providers/interaction/use-focus-visible").useFocusVisible;
  const useFormatHotkey: typeof import("../providers/keyboard/use-format-hotkey").useFormatHotkey;
  const useForwardExpose: typeof import("../composables/use-forward-expose").useForwardExpose;
  const useForwardProps: typeof import("../composables/use-forward-props").useForwardProps;
  const useForwardPropsEmits: typeof import("../composables/use-forward-props-emits").useForwardPropsEmits;
  const useHead: typeof import("@unhead/vue").useHead;
  const useHotkey: typeof import("../providers/keyboard/use-hotkey").useHotkey;
  const useHotkeyRecorder: typeof import("../providers/keyboard/use-hotkey-recorder").useHotkeyRecorder;
  const useHotkeyRegistrations: typeof import("../providers/keyboard/use-hotkey-registrations").useHotkeyRegistrations;
  const useHotkeys: typeof import("../providers/keyboard/use-hotkeys").useHotkeys;
  const useHotkeyStore: typeof import("../providers/keyboard/use-hotkey-store").useHotkeyStore;
  const useIcon: typeof import("../composables/use-icon").useIcon;
  const useInteractionModality: typeof import("../providers/interaction/use-interaction-modality").useInteractionModality;
  const useIsKeyPressed: typeof import("../providers/keyboard/use-is-key-pressed").useIsKeyPressed;
  const useLocale: typeof import("../composables/use-locale").useLocale;
  const useNuxtApp: typeof import("../../base/composables/use-nuxt-app").useNuxtApp;
  const usePlatform: typeof import("../providers/keyboard/use-platform").usePlatform;
  const usePressedKeys: typeof import("../providers/keyboard/use-pressed-keys").usePressedKeys;
  const useRoute: typeof import("../../base/composables/use-route").useRoute;
  const useScopeId: typeof import("../composables/use-scope-id").useScopeId;
}

declare module "#build/ui/utils" {
  const cc: typeof import("@veehance/core/utils/class").cc;
  const cn: typeof import("@veehance/core/utils/class").cn;
  const cv: typeof import("@veehance/core/utils/class").cv;
  const cx: typeof import("@veehance/core/utils/class").cx;
  const toIconify: typeof import("@veehance/core/utils/icon").toIconify;
  const toSVG: typeof import("@veehance/core/utils/icon").toSVG;
}
