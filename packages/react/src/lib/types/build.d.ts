declare module "#build/app.config" {
  const _default: {
    colorMode: Record<string, any>;
    locale: { dir: "ltr" | "rtl"; lang: string };
    ui: Record<string, any>;
  };
  export default _default;
}

declare module "#build/ui/components" {
  const Factory: typeof import("../elements/factory").Factory;
  const Icon: typeof import("../elements/icon").Icon;
  const Image: typeof import("../elements/image").Image;
  const Link: typeof import("../elements/link").Link;
}

declare module "#build/ui/icons" {
  const _default: Record<string, Record<string, any>>;
  export default _default;
}

declare module "#build/ui/imports" {
  const useAppConfig: typeof import("../composables/use-app-config").useAppConfig;
  const useCollator: typeof import("../providers/locale/use-collator").useCollator;
  const useColorMode: typeof import("../composables/use-color-mode").useColorMode;
  const useComposedRefs: typeof import("../composables/use-composed-refs").useComposedRefs;
  const useControllableState: typeof import("../composables/use-controllable-state").useControllableState;
  const useDateFormatter: typeof import("../providers/locale/use-date-formatter").useDateFormatter;
  const useDebounce: typeof import("../composables/use-debounce").useDebounce;
  const useEffectOnce: typeof import("../composables/use-effect-once").useEffectOnce;
  const useEnvironment: typeof import("../composables/use-environment").useEnvironment;
  const useEvent: typeof import("../composables/use-event").useEvent;
  const useFilter: typeof import("../providers/locale/use-filter").useFilter;
  const useFocusVisible: typeof import("../providers/interaction/use-focus-visible").useFocusVisible;
  const useFormatHotkey: typeof import("../providers/keyboard/use-hotkey").useHotkey;
  const useHotkey: typeof import("../providers/keyboard/use-hotkeys").useHotkeys;
  const useHotkeyRecorder: typeof import("../providers/keyboard/use-hotkey-recorder").useHotkeyRecorder;
  const useHotkeyRegistrations: typeof import("../providers/keyboard/use-hotkey-registrations").useHotkeyRegistrations;
  const useHotkeys: typeof import("../providers/keyboard/use-hotkeys").useHotkeys;
  const useHotkeyStore: typeof import("../providers/keyboard/use-hotkey-store").useHotkeyStore;
  const useIcon: typeof import("../composables/use-icon").useIcon;
  const useInteractionModality: typeof import("../providers/interaction/use-interaction-modality").useInteractionModality;
  const useIsKeyPressed: typeof import("../providers/keyboard/use-is-key-pressed").useIsKeyPressed;
  const useLocale: typeof import("../composables/use-locale").useLocale;
  const usePlatform: typeof import("../providers/keyboard/use-platform").usePlatform;
  const usePressedKeys: typeof import("../providers/keyboard/use-pressed-keys").usePressedKeys;
  const useSafeLayoutEffect: typeof import("../composables/use-safe-layout-effect").useSafeLayoutEffect;
}

declare module "#build/ui/utils" {
  const cc: typeof import("@veehance/core/utils/class").cc;
  const cn: typeof import("@veehance/core/utils/class").cn;
  const cv: typeof import("@veehance/core/utils/class").cv;
  const cx: typeof import("@veehance/core/utils/class").cx;
  const toIconify: typeof import("@veehance/core/utils/icon").toIconify;
  const toSVG: typeof import("@veehance/core/utils/icon").toSVG;
}
