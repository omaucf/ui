import { isArray, isObject, pick } from "radashi";

import { ACCENT_COLORS, NEUTRAL_COLORS } from "@/colors.js";
import { SHADE_KEYS } from "@/constants/color.js";
import { COLOR_KEYS } from "@/constants/ui.js";
import { CONFIG_DEFAULTS } from "@/defaults.js";
import type { Schema } from "@/types/schema.js";
import type { Color, ColorShade, Colors } from "@/types/ui.js";

export function defineColors(
  baseColor: Schema["style"]["baseColor"] = CONFIG_DEFAULTS.style.baseColor,
  colors = COLOR_KEYS as unknown as string[]
) {
  return pick(
    { ...CONFIG_DEFAULTS.ui.colors, neutral: baseColor } as Colors<any>,
    [...colors, "neutral"]
  );
}

const COLORS = { ...ACCENT_COLORS, ...NEUTRAL_COLORS };

export function extendColors<T extends Color = Color>({
  neutral,
  ...accents
}: Colors<T>) {
  const shadeBlock = indent(
    Object.entries({ ...accents, neutral })
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => setShades(key, value as string | ColorShade))
      .join("\n\n")
  );

  const validKeys = Object.entries(accents)
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key);

  const lightBlock = indent(validKeys.map((key) => setColor(key, 500)));
  const darkBlock = indent(validKeys.map((key) => setColor(key, 400)));

  return `@layer theme {
  :root, :host {
${shadeBlock}
  }

  :root, :host, .light {
${lightBlock}
  }

  .dark {
${darkBlock}
  }
}\n`;
}

export function resolveColors(colors: Schema["theme"]["colors"]) {
  return colors?.length
    ? [...new Set(["primary", ...colors])]
    : (COLOR_KEYS as unknown as string[]);
}

function getColor(color: keyof typeof COLORS, scale: keyof ColorShade) {
  if (color in COLORS && isObject(COLORS[color]) && scale in COLORS[color])
    return COLORS[color][scale];
  return "currentcolor";
}

function indent(lines: string | string[], spaces = 4) {
  return (isArray(lines) ? lines.join("\n") : lines).replace(
    /^/gm,
    " ".repeat(spaces)
  );
}

function setColor(key: string, shade: number) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}

function setShades(key: string, value: string | ColorShade) {
  return SHADE_KEYS.map((shade) => {
    if (isObject(value)) return `--ui-color-${key}-${shade}: ${value[shade]};`;
    const name = value === "neutral" ? "old-neutral" : value;
    return `--ui-color-${key}-${shade}: var(--color-${name}-${shade}, ${getColor(value as keyof typeof COLORS, shade)});`;
  }).join("\n");
}
