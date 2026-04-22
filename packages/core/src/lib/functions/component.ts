import { alphabetical, isString, objectify } from "radashi";

import { PRESET_MAP } from "@/constants/theme.js";
import { CONFIG_DEFAULTS } from "@/defaults.js";
import { mergeThemes } from "@/helpers/merge.js";
import { parsePkg as pkg } from "@/helpers/parse.js";
import type { Components } from "@/types/component.js";
import type { Registry } from "@/types/registry.js";
import type { Config, Schema } from "@/types/schema.js";

import { resolveTheme } from "./theme.js";

export function defineComponents(
  prefix = CONFIG_DEFAULTS.style.prefix,
  colors: Schema["theme"]["colors"] = CONFIG_DEFAULTS.theme.colors,
  preset: Schema["theme"]["preset"] = CONFIG_DEFAULTS.theme.preset,
  transitions: Schema["theme"]["transitions"] = CONFIG_DEFAULTS.theme
    .transitions,
  components: Components<any> = {}
) {
  return objectify(
    alphabetical(
      Object.entries(mergeThemes(components, PRESET_MAP[preset])),
      ([name]) => name
    ),
    ([name]) => name,
    ([, theme]) =>
      resolveTheme(theme, { style: { prefix }, theme: { colors, transitions } })
  );
}

export function dedupeComponents(entries: Registry["components"]) {
  const map = new Map<string, Registry["components"][number]>();
  const raw: Registry["components"][number][] = [];

  for (const entry of entries ?? []) {
    if (isRawEntry(entry)) {
      raw.push(entry);
      continue;
    }

    const existing = map.get(entry.name);
    if (!existing || isRawEntry(existing)) {
      map.set(entry.name, entry);
      continue;
    }

    map.set(entry.name, {
      ...existing,
      ...entry,
      export: entry.export ?? existing.export,
      from: entry.from ?? existing.from,
      prefix: entry.prefix ?? existing.prefix,
      static: entry.static ?? existing.static,
    });
  }

  return [
    ...alphabetical(Array.from(map.values()), (entry) =>
      isRawEntry(entry) ? "" : entry.name
    ),
    ...raw,
  ];
}

export function resolveComponents({
  dts,
  image,
  router,
  target,
  ...options
}: Config) {
  const entries: Registry["components"] = [
    ...resolveElements({ image, router, target }),
    ...resolveProviders({ target }),
    resolve([target, "container"], "Container"),
    resolve([target, "main"], "Main"),
  ];

  const prefix = dts?.prefixNamespaces;

  if (options.colorMode) {
    entries.push(
      resolve([target, "color-mode/image"], "ColorModeImage", { prefix })
    );
  }

  if (options.prose) {
    entries.push(
      resolve([target, "prose/h1"], "ProseH1", { prefix: false }),
      resolve([target, "prose/h2"], "ProseH2", { prefix: false }),
      resolve([target, "prose/h3"], "ProseH3", { prefix: false }),
      resolve([target, "prose/h4"], "ProseH4", { prefix: false }),
      resolve([target, "prose/icon"], "ProseIcon", { prefix: false })
    );
  }

  return entries;
}

export function resolvePrefix(
  entry: Registry["components"][number],
  globalPrefix = ""
) {
  if (isRawEntry(entry)) return globalPrefix;
  if (entry.prefix === false) return "";
  if (isString(entry.prefix)) return entry.prefix;
  return globalPrefix;
}

function resolveElements({ image, router, target }: Config) {
  const entries: Registry["components"] = [
    resolve([target, "factory"], "Factory", { prefix: false }),
    resolve([target, "icon"], "Icon", { static: true }),
    resolve([target, "placeholder"], "Placeholder", { prefix: false }),
  ];

  if (image && (router === "next" || router === "nuxt")) {
    entries.push(resolve([target, "image", router], "Image", { static: true }));
  } else {
    entries.push(resolve([target, "image"], "Image", { static: true }));
  }

  if (
    router === "inertia" ||
    router === "next" ||
    router === "nuxt" ||
    router === "start"
  ) {
    entries.push(resolve([target, "link", router], "Link", { static: true }));
  } else if (!(target === "solid" || target === "svelte") && router === true) {
    entries.push(resolve([target, "link", "router"], "Link", { static: true }));
  } else {
    entries.push(resolve([target, "link"], "Link", { static: true }));
  }

  return entries;
}

function resolveProviders({ target }: Config) {
  const entries: Registry["components"] = [
    resolve([target, "app"], "App", { static: "AppProvider" }),
    resolve([target, "color-mode"], "ColorMode", {
      static: "ColorModeProvider",
    }),
    resolve([target, "environment"], "Environment", {
      static: "EnvironmentProvider",
    }),
    resolve([target, "locale"], "Locale", { static: "LocaleProvider" }),
  ];

  return entries;
}

function isRawEntry(
  entry: Registry["components"][number]
): entry is Extract<Registry["components"][number], { raw: string }> {
  return "raw" in entry;
}

function resolve<T extends string | undefined>(
  from: string | T[],
  name: string,
  options: Omit<Registry["components"][number], "from" | "name"> = {}
): Registry["components"][number] {
  return { from: isString(from) ? pkg(from) : pkg(...from), name, ...options };
}
