import { isEmpty, unique } from "radashi";

import { CONFIG_DEFAULTS } from "@/defaults.js";
import { defineColors, extendColors } from "@/functions/color.js";
import { defineTokens } from "@/functions/theme.js";
import { parsePkg as pkg } from "@/helpers/parse.js";
import type { Config } from "@/types/schema.js";

export function generateCSSFile({ icons, style, theme, ui }: Config) {
  const engine = style?.engine ?? CONFIG_DEFAULTS.style.engine;
  const prefix = style?.prefix ?? CONFIG_DEFAULTS.style.prefix;

  const colors = ui?.colors ?? defineColors(style?.baseColor, theme?.colors);
  const tokens = defineTokens(theme?.colors);

  if (engine !== "unocss")
    return [
      ...atImport([
        pkg("core", "tailwind.css"),
        pkg("core", "keyframes.css"),
        "./theme/index.css",
      ]),
      "",
      ...atInline([...(style?.safelist ?? [])]),
      ...atSource(["./app.config.{mjs,ts}", ...(style?.sources ?? [])]),
      "",
      ...pluginIcon({ icons, style, theme, ui }),
      themeBlock("static", tokens.static),
      "",
      themeBlock("inline", tokens.inline),
      "",
      `@layer base {\n  body {\n    @apply ${prefix}antialiased ${prefix}font-sans ${prefix}text-default ${prefix}bg-default;\n  }\n}`,
      "",
      ...(style?.cssVariables ? [extendColors(colors)] : []),
    ]
      .join("\n")
      .trim();

  return [
    ...atImport([pkg("core", "keyframes.css")]),
    "",
    `@layer base {\n  body {\n    --at-apply: '${prefix}antialiased ${prefix}font-sans ${prefix}text-default ${prefix}bg-default';\n  }\n}`,
    "",
    ...(style?.cssVariables ? [extendColors(colors)] : []),
  ]
    .join("\n")
    .trim();
}

function atImport(values: string[]) {
  return values.map((value) => `@import "${value}";`);
}

function atInline(values: string[]) {
  return values.map((value) => `@source inline("${value}");`);
}

function atSource(values: string[]) {
  return values.map((value) => `@source "${value}";`);
}

function pluginIcon({ icons }: Config) {
  if (!icons) return [];

  const { collections, collectionsNames, prefix, scale, unit } = icons;

  return [
    `@plugin "@iconify/tailwind4" {`,
    ...(isEmpty(collections)
      ? []
      : [
          `  icon-sets: ${Object.keys(collections || {})
            .map((name) => `from-json(${name}, "./ui/icons/${name}.json")`)
            .join(", ")};`,
        ]),
    `  prefix: "${prefix}";`,
    `  prefixes: ${unique(collectionsNames ?? []).join(", ")};`,
    `  scale: ${scale}${unit};`,
    "}",
    "",
  ];
}

function themeBlock(name: "static" | "inline", values: Record<string, string>) {
  return `@theme ${name} {\n${Object.entries(values)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join("\n")}\n}`;
}
