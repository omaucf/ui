import { alphabetical, isString } from "radashi";

import { parsePkg } from "@/helpers/parse.js";
import type { Registry } from "@/types/registry.js";
import type { Config } from "@/types/schema.js";

export function dedupeImports(entries: Registry["imports"]) {
  const imports = new Map<string, string>();
  const raw: Registry["imports"][number][] = [];

  for (const entry of entries ?? []) {
    if (isRawImport(entry)) {
      raw.push(entry);
      continue;
    }

    for (const name of entry.names) {
      imports.set(name, entry.from);
    }
  }

  const grouped = new Map<string, string[]>();

  for (const name of alphabetical([...imports.keys()], (n) => n)) {
    const from = imports.get(name)!;
    let group = grouped.get(from);

    if (!group) {
      group = [];
      grouped.set(from, group);
    }

    group.push(name);
  }

  return [
    ...alphabetical([...grouped.entries()], ([from]) => from).map(
      ([from, names]) => ({
        from,
        names,
      })
    ),
    ...raw,
  ];
}

export function resolveImports({ router, style, target, ...options }: Config) {
  const entries: Registry["imports"] = [
    resolve(
      [target, "interaction"],
      "useFocusVisible",
      "useInteractionModality"
    ),
    resolve(
      [target, "keyboard"],
      "useFormatHotkey",
      "useHotkey",
      "useHotkeyRecorder",
      "useHotkeyRegistrations",
      "useHotkeyStore",
      "useHotkeys",
      "useIsKeyPressed",
      "usePlatform",
      "usePressedKeys"
    ),
    resolve([target, "locale"], "useCollator", "useDateFormatter", "useFilter"),
    resolve([target, "use-app-config"], "useAppConfig"),
    resolve([target, "use-color-mode"], "useColorMode"),
    resolve([target, "use-environment"], "useEnvironment"),
    resolve([target, "use-icon"], "useIcon"),
    resolve([target, "use-locale"], "useLocale"),
  ];

  if (!style?.cssVariables) {
    entries.push(
      resolve(["core", "functions/color"], "defineColors", "extendColors")
    );
  }

  if (options.locale) {
    entries.push(
      resolve(["core", "functions/locale"], "defineLocale", "extendLocale")
    );
  }

  if (target === "react") {
    entries.push(
      resolve([target, "use-composed-refs"], "useComposedRefs"),
      resolve([target, "use-controllable-state"], "useControllableState"),
      resolve([target, "use-debounce"], "useDebounce"),
      resolve([target, "use-effect-once"], "useEffectOnce"),
      resolve([target, "use-event"], "useEvent"),
      resolve([target, "use-safe-layout-effect"], "useSafeLayoutEffect")
    );
  }

  if (target === "solid") {
    entries.push(
      resolve([target, "use-controllable-state"], "useControllableState")
    );
  }

  if (target === "vue") {
    entries.push(
      resolve([target, "use-emit-as-props"], "useEmitAsProps"),
      resolve([target, "use-forward-expose"], "useForwardExpose"),
      resolve([target, "use-forward-props"], "useForwardProps"),
      resolve([target, "use-forward-props-emits"], "useForwardPropsEmits"),
      resolve([target, "use-scope-id"], "useScopeId")
    );

    if (router === "inertia") {
      entries.push(resolve([target, "use-route", router], "useRoute"));
    } else if (router === true) {
      entries.push(resolve("vue-router", "useRoute"));
    } else {
      entries.push(resolve([target, "use-route"], "useRoute"));
    }

    if (router !== "nuxt") {
      entries.push(resolve(["@unhead/vue"], "useHead"));
    }
  }

  return entries;
}

export function resolveTypes(_config: Config) {
  return [
    resolve(
      ["core", "types/abstract"],
      "Accessor",
      "Assign",
      "Id",
      "MaybeAccessor",
      "MaybePromise",
      "MaybeString"
    ),
    resolve(["core", "types/component"], "ClassValue", "ComponentApi"),
    resolve(["core", "types/locale"], "Locale", "Messages", "Translator"),
    resolve(
      ["core", "types/ui"],
      "Icon",
      "ImageProvider",
      "Theme",
      "ThemeMode",
      "UI"
    ),
  ];
}

export function resolveUtils(_config: Config) {
  return [
    resolve(["core", "utils/class"], "cc", "cn", "cv", "cx"),
    resolve(["core", "utils/icon"], "toIconify", "toSVG"),
  ];
}

function isRawImport(
  entry: Registry["imports"][number]
): entry is Extract<Registry["imports"][number], { raw: string }> {
  return "raw" in entry;
}

function resolve<T extends string | undefined>(
  from: string | T[],
  ...names: string[]
): Registry["imports"][number] {
  return { from: isString(from) ? parsePkg(from) : parsePkg(...from), names };
}
