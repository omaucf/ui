import { default as COLORS } from "../colors.js";
import { SHADE_KEYS } from "../constants/color.js";
import { defineColors } from "../helpers/color.js";
import type { Options } from "../types/ui.js";
import { generateColors } from "./color.js";

export function generateCSS(options: Options = {}) {
  const cssPrefix = options.ui?.tw?.options?.cssPrefix || "";
  const cssPrelude = [
    options.tailwind?.plugins &&
      generateDirectives("plugin", options.tailwind.plugins),
    options.tailwind?.sources &&
      generateDirectives("source", options.tailwind.sources),
    options.tailwind?.inlines && generateInlines(options.tailwind.inlines),
  ]
    .filter(Boolean)
    .join("\n");

  const cssVariables = `${cssPrelude}
@layer base {
  body {
    @apply ${cssPrefix}antialiased ${cssPrefix}text-default ${cssPrefix}bg-default;
  }
}

@theme static {
  --color-old-neutral-50: ${COLORS.neutral[50]};
  --color-old-neutral-100: ${COLORS.neutral[100]};
  --color-old-neutral-200: ${COLORS.neutral[200]};
  --color-old-neutral-300: ${COLORS.neutral[300]};
  --color-old-neutral-400: ${COLORS.neutral[400]};
  --color-old-neutral-500: ${COLORS.neutral[500]};
  --color-old-neutral-600: ${COLORS.neutral[600]};
  --color-old-neutral-700: ${COLORS.neutral[700]};
  --color-old-neutral-800: ${COLORS.neutral[800]};
  --color-old-neutral-900: ${COLORS.neutral[900]};
  --color-old-neutral-950: ${COLORS.neutral[950]};
}

@theme inline {
  ${[...(options.theme?.colors || []).filter((color) => !COLORS[color as keyof typeof COLORS]), "neutral"].map((color) => `${SHADE_KEYS.map((shade) => `--color-${color}-${shade}: var(--ui-color-${color}-${shade});`).join("\n\t")}\n`).join("\n\t")}
  ${options.theme?.colors?.map((color) => `--color-${color}: var(--ui-${color});`).join("\n\t")}

  --text-color-dimmed: var(--ui-text-dimmed);
  --text-color-muted: var(--ui-text-muted);
  --text-color-toned: var(--ui-text-toned);
  --text-color-default: var(--ui-text);
  --text-color-highlighted: var(--ui-text-highlighted);
  --text-color-inverted: var(--ui-text-inverted);

  --background-color-default: var(--ui-bg);
  --background-color-muted: var(--ui-bg-muted);
  --background-color-elevated: var(--ui-bg-elevated);
  --background-color-accented: var(--ui-bg-accented);
  --background-color-inverted: var(--ui-bg-inverted);
  --background-color-border: var(--ui-border);

  --border-color-default: var(--ui-border);
  --border-color-muted: var(--ui-border-muted);
  --border-color-accented: var(--ui-border-accented);
  --border-color-inverted: var(--ui-border-inverted);
  --border-color-bg: var(--ui-bg);

  --ring-color-default: var(--ui-border);
  --ring-color-muted: var(--ui-border-muted);
  --ring-color-accented: var(--ui-border-accented);
  --ring-color-inverted: var(--ui-border-inverted);
  --ring-color-bg: var(--ui-bg);

  --ring-offset-color-default: var(--ui-border);
  --ring-offset-color-muted: var(--ui-border-muted);
  --ring-offset-color-accented: var(--ui-border-accented);
  --ring-offset-color-inverted: var(--ui-border-inverted);
  --ring-offset-color-bg: var(--ui-bg);

  --divide-color-default: var(--ui-border);
  --divide-color-muted: var(--ui-border-muted);
  --divide-color-accented: var(--ui-border-accented);
  --divide-color-inverted: var(--ui-border-inverted);
  --divide-color-bg: var(--ui-bg);

  --outline-color-default: var(--ui-border);
  --outline-color-inverted: var(--ui-border-inverted);

  --stroke-default: var(--ui-border);
  --stroke-inverted: var(--ui-border-inverted);

  --fill-default: var(--ui-border);
  --fill-inverted: var(--ui-border-inverted);

  --radius-xs: calc(var(--ui-radius) * 0.5);
  --radius-sm: var(--ui-radius);
  --radius-md: calc(var(--ui-radius) * 1.5);
  --radius-lg: calc(var(--ui-radius) * 2);
  --radius-xl: calc(var(--ui-radius) * 3);
  --radius-2xl: calc(var(--ui-radius) * 4);
  --radius-3xl: calc(var(--ui-radius) * 6);
  --radius-4xl: calc(var(--ui-radius) * 8);

  --font-display: var(--font-sans);
  --container-8xl: 90rem;
}\n`;

  if (!options.tailwind?.cssVariables) return cssVariables;
  const sanitazedColors =
    options?.ui?.colors ??
    defineColors(options?.tailwind?.baseColor, options?.theme?.colors);
  return `${cssVariables}\n${generateColors(sanitazedColors)}`;
}

function generateDirectives(name: string, values: string[]) {
  return values.map((value) => `@${name} '${value}';`).join("\n");
}

function generateInlines(inlines: string[]) {
  return inlines.map((value) => `@source inline(${JSON.stringify(value)});\n`);
}
