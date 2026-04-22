import {
  isArray,
  isFunction,
  isObject,
  isString,
  objectify,
  unique,
} from "radashi";
import type { Rule } from "unocss";

import { ACCENT_COLORS, NEUTRAL_COLORS } from "@/colors.js";
import { SHADE_KEYS } from "@/constants/color.js";
import {
  BACKGROUND_KEYS,
  BORDER_KEYS,
  OUTLINE_KEYS,
  TEXT_KEYS,
} from "@/constants/style.js";
import { THEME_MAP } from "@/constants/theme.js";
import { COLOR_KEYS } from "@/constants/ui.js";
import { mergeThemes } from "@/helpers/merge.js";
import {
  applyArbitraryVars,
  applyPrefixToObject,
  applyUnstyled,
} from "@/helpers/transform.js";
import type { Namespace } from "@/types/registry.js";
import type { Config } from "@/types/schema.js";

import { compileThemeCSS, emitCSS } from "./css.js";

const NAMESPACES: Namespace[] = [
  { enabled: (c) => !!c.prose, name: "prose", source: THEME_MAP.prose },
];

export function definePreflights(config: Config) {
  const themes = [
    ...resolveNamespaces(config).map((namespace) =>
      resolveThemeMap(
        mergeThemes(
          namespace.source,
          config.ui?.components?.[namespace.name] ?? {}
        ),
        config
      )
    ),
    resolveThemeMap(
      mergeThemes(THEME_MAP.ui, resolveOverrides(config)),
      config
    ),
  ];

  const rules = themes.flatMap((theme) =>
    Object.entries(theme).flatMap(([component, value]) =>
      compileThemeCSS(value, component)
    )
  );

  return [
    { getCSS: () => emitCSS(rules, { engine: "unocss" }), layer: "components" },
  ];
}

export function defineRules() {
  return Object.entries({
    bg: {
      property: "background-color",
      values: BACKGROUND_KEYS,
      variable: "--ui-bg",
    },
    border: {
      property: "border-color",
      values: BORDER_KEYS,
      variable: "--ui-border",
    },
    fill: { property: "fill", values: OUTLINE_KEYS, variable: "--ui-border" },
    outline: {
      property: "outline-color",
      values: OUTLINE_KEYS,
      variable: "--ui-border",
    },
    stroke: {
      property: "stroke",
      values: OUTLINE_KEYS,
      variable: "--ui-border",
    },
    text: { property: "color", values: TEXT_KEYS, variable: "--ui-text" },
  }).flatMap(([p, c]) =>
    c.values.map(
      (value) =>
        [
          `${p}-${value}`,
          { [c.property]: resolveVariable(c.variable, value) },
        ] satisfies Rule<object>
    )
  );
}

export function defineSafelist(config: Config) {
  return unique(
    [
      ...(config.style?.safelist ?? []),
      ...Object.values(config.ui?.icons ?? {}),
    ].flatMap(extractClasses)
  );
}

export function defineShortcuts() {
  const createSet = (prefix: string, css: string) =>
    objectify(
      [...BORDER_KEYS, "bg"],
      (key) => `${prefix}-${key}`,
      (key) => `${css}-[var(--ui-${key === "bg" ? "bg" : `border-${key}`})]`
    );

  return {
    ...createSet("ring", "ring"),
    ...createSet("ring-offset", "ring-offset"),
    ...createSet("divide", "divide"),
    "border-bg": "border-[var(--ui-bg)]",
    "fill-bg": "fill-[var(--ui-bg)]",
    "stroke-bg": "stroke-[var(--ui-bg)]",
  };
}

export function defineTheme(colors?: string[]) {
  const tokens = defineTokens(colors);
  return {
    colors: extractThemeColors(tokens),
    containers: extractByPrefix(tokens.inline, "container-"),
    font: extractByPrefix(tokens.inline, "font-"),
    radius: extractByPrefix(tokens.inline, "radius-"),
  };
}

export function defineTokens(colors = COLOR_KEYS as unknown as string[]) {
  const colorTokens = [
    "neutral",
    ...colors.filter((c) => !(c in { ...ACCENT_COLORS, ...NEUTRAL_COLORS })),
  ];

  const semanticColors = objectify<string, string, string>(
    colorTokens.flatMap((color) =>
      SHADE_KEYS.map((shade) => `${color}-${shade}`)
    ),
    (key) => `color-${key}`,
    (key) => `var(--ui-${key})`
  );

  const semanticAliases = objectify<string, string, string>(
    colors,
    (color) => `color-${color}`,
    (color) => `var(--ui-${color})`
  );

  const semanticTokens: Record<string, string> = Object.assign(
    {},
    ...Object.entries({
      background: { source: "background", variants: BACKGROUND_KEYS },
      border: { source: "border", variants: [...BORDER_KEYS, "bg"] },
      divide: { source: "border", variants: [...BORDER_KEYS, "bg"] },
      fill: { source: "border", variants: [...OUTLINE_KEYS, "bg"] },
      outline: { source: "border", variants: OUTLINE_KEYS },
      ring: { source: "border", variants: [...BORDER_KEYS, "bg"] },
      "ring-offset": { source: "border", variants: [...BORDER_KEYS, "bg"] },
      stroke: { source: "border", variants: [...OUTLINE_KEYS, "bg"] },
      text: { source: "text", variants: TEXT_KEYS },
    } as const).map(([group, config]) =>
      objectify(
        config.variants,
        (variant) =>
          group === "stroke" || group === "fill"
            ? `${group}-${variant}`
            : `${group}-color-${variant}`,
        (variant) => {
          const source = config.source === "background" ? "bg" : config.source;
          if (variant === "bg") return "var(--ui-bg)";
          if (variant === "default") return `var(--ui-${source})`;
          return `var(--ui-${source}-${variant})`;
        }
      )
    )
  );

  return {
    inline: {
      ...semanticColors,
      ...semanticAliases,
      ...semanticTokens,
      "container-8xl": "90rem",
      "font-heading": "var(--font-sans)",
      "radius-2xl": "calc(var(--ui-radius) * 1.8)",
      "radius-3xl": "calc(var(--ui-radius) * 2.2)",
      "radius-4xl": "calc(var(--ui-radius) * 2.6)",
      "radius-lg": "var(--ui-radius)",
      "radius-md": "calc(var(--ui-radius) * 0.8)",
      "radius-sm": "calc(var(--ui-radius) * 0.6)",
      "radius-xl": "calc(var(--ui-radius) * 1.4)",
      "radius-xs": "calc(var(--ui-radius) * 0.4)",
    },
    static: objectify(
      SHADE_KEYS,
      (shade) => `color-old-neutral-${shade}`,
      (shade) => NEUTRAL_COLORS.neutral[shade]
    ),
  };
}

export function extractClasses(input: unknown): string[] {
  // biome-ignore lint/performance/useTopLevelRegex: safe_to_set
  if (isString(input)) return input.split(/\s+/).filter(Boolean);
  if (isArray(input)) return input.flatMap(extractClasses);
  if (!isObject(input)) return [];
  return Object.values(input).flatMap(extractClasses);
}

export function extractThemeIcons(config: Config) {
  return Object.entries(config.ui?.icons ?? {}).map(([key, value]) => ({
    key,
    value,
  }));
}

export function resolveNamespaces(config: Config) {
  return NAMESPACES.filter((namespace) => namespace.enabled?.(config) ?? true);
}

export function resolveOverrides(config: Config) {
  const namespaces = new Set(NAMESPACES.map(({ name }) => name));
  return Object.fromEntries(
    Object.entries(config.ui?.components ?? {}).filter(
      ([name]) => !namespaces.has(name)
    )
  );
}

export function resolveTheme(theme: unknown, config: Config) {
  const prefix = config.style?.prefix ?? "";
  let result = isFunction(theme) ? theme(config) : theme;

  if (config.theme?.unstyled) return applyUnstyled(result);
  if (config.style?.engine === "unocss") result = applyArbitraryVars(result);
  if (prefix !== "") result = applyPrefixToObject(result, prefix);

  return result;
}

function extractByPrefix(
  values: Record<string, string>,
  prefix: string
): Record<string, string> {
  return objectify(
    Object.entries(values).filter(([k]) => k.startsWith(prefix)),
    ([key]) => key.slice(prefix.length),
    ([, value]) => value
  );
}

function extractThemeColors(tokens: ReturnType<typeof defineTokens>) {
  const result: Record<string, Record<string, string>> = {};

  for (const [key, value] of Object.entries({
    ...tokens.static,
    ...tokens.inline,
  })) {
    if (!key.startsWith("color-")) continue;

    const parts = key.slice(6).split("-");
    const shade = parts.at(-1);
    const hasShade = SHADE_KEYS.includes(shade as never);

    const name = hasShade ? parts.slice(0, -1).join("-") : parts.join("-");
    result[name] ??= {};

    if (hasShade) {
      result[name][shade!] = value;
      if (shade === "500") result[name].DEFAULT ??= value;
    } else {
      result[name].DEFAULT = value;
    }
  }

  return result;
}

function resolveThemeMap<T>(input: T, config: Config): T {
  if (isFunction(input)) return resolveTheme(input, config) as T;
  if (isArray(input))
    return input.map((item) => resolveThemeMap(item, config)) as T;
  if (isObject(input)) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        key,
        resolveThemeMap(value, config),
      ])
    ) as T;
  }

  return input;
}

function resolveVariable(variable: string, value: string) {
  return value === "default" ? `var(${variable})` : `var(${variable}-${value})`;
}
