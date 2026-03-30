import { isObject } from "radash";

import { default as colors } from "../colors.js";
import { SHADE_KEYS } from "../constants/color.js";
import { defineColors } from "../helpers/color.js";
import type { ColorScale, ColorShade } from "../types/color.js";
import type { Options } from "../types/ui.js";

export function generateColors(options?: Options) {
  const { neutral, ...accents } =
    options?.ui?.colors ??
    defineColors(options?.ui?.colors?.neutral, options?.theme?.colors);

  const shadeBlock = indent(
    Object.entries({ ...accents, neutral })
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => generateShades(key, value as string | ColorShade))
      .join("\n\n")
  );

  const validKeys = Object.entries(accents)
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key);

  const lightBlock = indent(validKeys.map((key) => generateColor(key, 500)));
  const darkBlock = indent(validKeys.map((key) => generateColor(key, 400)));

  return `@layer theme {
  :root, :host {
${shadeBlock}
  }

  :root[data-theme="light"],
  :host[data-theme="light"] {
${lightBlock}
  }

  :root[data-theme="dark"],
  :host[data-theme="dark"] {
${darkBlock}
  }
}\n`;
}

function generateColor(key: string, shade: number) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}

function generateShades(key: string, value: string | ColorShade) {
  return SHADE_KEYS.map((shade) => {
    if (isObject(value)) return `--ui-color-${key}-${shade}: ${value[shade]};`;
    const name = value === "neutral" ? "old-neutral" : value;
    return `--ui-color-${key}-${shade}: var(--color-${name}-${shade}, ${getColor(value as keyof typeof colors, shade)});`;
  }).join("\n");
}

function getColor(color: keyof typeof colors, scale: ColorScale) {
  if (color in colors && isObject(colors[color]) && scale in colors[color])
    return colors[color][scale];
  return "currentcolor";
}

function indent(lines: string | string[], spaces = 4) {
  const text = Array.isArray(lines) ? lines.join("\n") : lines;
  return text.replace(/^/gm, " ".repeat(spaces));
}
