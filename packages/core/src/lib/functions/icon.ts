import { defu } from "defu";
import { alphabetical } from "radashi";

import { ICONSET_MAP } from "@/constants/theme.js";
import { CONFIG_DEFAULTS, FEATURE_DEFAULTS } from "@/defaults.js";
import { formatIconName, isFormattedIcon } from "@/helpers/format.js";
import type { IconEntry, Registry } from "@/types/registry.js";
import type { Config, Schema } from "@/types/schema.js";
import type { Icons } from "@/types/ui.js";

export function defineIcons(
  prefix = FEATURE_DEFAULTS.icons.prefix,
  engine: Schema["style"]["engine"] = CONFIG_DEFAULTS.style.engine,
  iconset: Schema["theme"]["iconset"] = CONFIG_DEFAULTS.theme.iconset,
  icons: Icons<any> = {}
) {
  return withPrefix(
    defu(icons, ICONSET_MAP[iconset]),
    toIconPrefix(engine, { prefix }),
    engine !== "unocss"
  );
}

export function dedupeIcons(icons: IconEntry[]) {
  const seen = new Set<string>();

  return icons.filter((icon) => {
    const key = `${icon.type}:${icon.name}`;

    if (seen.has(key)) return false;
    seen.add(key);

    return true;
  });
}

export function deriveIcons(config: Config) {
  return resolveIcons(config).filter((icon) => icon.type === "virtual");
}

export function extractIcons(icons?: Icons<any>) {
  if (!icons) return [CONFIG_DEFAULTS.theme.iconset];

  const collections = [
    ...new Set(
      Object.values(icons)
        .map((icon) => extractIcon(icon)?.collection)
        .filter((collection): collection is string => !!collection)
    ),
  ];

  return collections.length ? collections : [CONFIG_DEFAULTS.theme.iconset];
}

export function resolveIcons({ registry, ui }: Config) {
  return dedupeIcons([
    ...extractIcons(ui?.icons).map((name) => ({
      name,
      type: "external" as const,
    })),
    ...(registry?.icons ?? []).map(toIconEntry),
  ]);
}

export function resolveExternalIcons(config: Config) {
  const prefix = toIconPrefix(config.style?.engine, config.icons);

  return defu(
    { ...config.icons, prefix },
    detectCollections(
      resolveIcons({ ...config, icons: { ...config.icons, prefix } })
    )
  );
}

export function toIconPrefix(
  engine: Schema["style"]["engine"],
  icons: Config["icons"]
): string {
  const fallback = engine === "unocss" ? "i-" : FEATURE_DEFAULTS.icons.prefix;
  if (icons === false) return fallback;
  if (engine === "unocss" && icons?.prefix === FEATURE_DEFAULTS.icons.prefix)
    return "i-";
  return icons?.prefix ?? fallback;
}

function detectCollections(icons: IconEntry[]) {
  const iconifyCollections = new Set<string>();
  const collections: Record<string, any> = {};

  for (const icon of icons) {
    if (icon.type === "external") {
      if (!icon.from || icon.from.includes("@iconify-json")) {
        iconifyCollections.add(icon.name);
      }
      continue;
    }

    collections[icon.name] ??= {};
    Object.assign(collections[icon.name], icon.raw);
  }

  return { collections, collectionsNames: [...iconifyCollections] };
}

function extractIcon(value: string) {
  const input = value.trim();

  if (input.includes(":")) {
    const [left, name] = input.split(":", 2);
    const parts = left.split("-");
    if (parts.length > 1) parts.shift();
    const collection = parts.join("-");
    return collection && name ? { collection, name } : null;
  }

  // biome-ignore lint/performance/useTopLevelRegex: safe_to_set
  const [, raw] = input.split(/\s+/, 2);
  if (!raw) return null;

  const [collection, name] = raw.split("--", 2);
  return collection && name ? { collection, name } : null;
}

function toIconEntry(icon: Registry["icons"][number]): IconEntry {
  return "raw" in icon
    ? { name: icon.name, raw: icon.raw, type: "virtual" }
    : { from: icon.from, name: icon.name, type: "external" };
}

function withPrefix(icons: Icons<any>, prefix: string, transform: boolean) {
  return Object.fromEntries(
    alphabetical(Object.entries(icons), ([key]) => key).map(([key, value]) => [
      key,
      isFormattedIcon(value, prefix, transform)
        ? value
        : formatIconName(value, prefix, transform),
    ])
  );
}
