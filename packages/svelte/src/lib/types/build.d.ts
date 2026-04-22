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
  const useCollator: typeof import("../providers/locale/use-collator.svelte").useCollator;
  const useColorMode: typeof import("../composables/use-color-mode").useColorMode;
  const useDateFormatter: typeof import("../providers/locale/use-date-formatter.svelte").useDateFormatter;
  const useEnvironment: typeof import("../composables/use-environment").useEnvironment;
  const useFilter: typeof import("../providers/locale/use-filter.svelte").useFilter;
  const useFocusVisible: typeof import("../providers/interaction/use-focus-visible.svelte").useFocusVisible;
  const useFormatHotkey: typeof import("../providers/keyboard/use-format-hotkey.svelte").useFormatHotkey;
  const useHotkey: typeof import("../providers/keyboard/use-hotkey.svelte").useHotkey;
  const useHotkeyRecorder: typeof import("../providers/keyboard/use-hotkey-recorder.svelte").useHotkeyRecorder;
  const useHotkeyRegistrations: typeof import("../providers/keyboard/use-hotkey-registrations.svelte").useHotkeyRegistrations;
  const useHotkeys: typeof import("../providers/keyboard/use-hotkeys.svelte").useHotkeys;
  const useHotkeyStore: typeof import("../providers/keyboard/use-hotkey-store.svelte").useHotkeyStore;
  const useIcon: typeof import("../composables/use-icon").useIcon;
  const useInteractionModality: typeof import("../providers/interaction/use-interaction-modality.svelte").useInteractionModality;
  const useIsKeyPressed: typeof import("../providers/keyboard/use-is-key-pressed.svelte").useIsKeyPressed;
  const useLocale: typeof import("../composables/use-locale").useLocale;
  const usePlatform: typeof import("../providers/keyboard/use-platform.svelte").usePlatform;
  const usePressedKeys: typeof import("../providers/keyboard/use-pressed-keys.svelte").usePressedKeys;
}

declare module "#build/ui/utils" {
  const cc: typeof import("@veehance/core/utils/class").cc;
  const cn: typeof import("@veehance/core/utils/class").cn;
  const cv: typeof import("@veehance/core/utils/class").cv;
  const cx: typeof import("@veehance/core/utils/class").cx;
  const toIconify: typeof import("@veehance/core/utils/icon").toIconify;
  const toSVG: typeof import("@veehance/core/utils/icon").toSVG;
}
