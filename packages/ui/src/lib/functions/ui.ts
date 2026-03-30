import type { Options, Router, Template } from "../types/ui.js";
import { generateIcons } from "./icon.js";

export function generateUI(options: Options, _router?: Router) {
  const templates: Template[] = [
    {
      filename: "ui/icons/index.ts",
      write: true,
      getContents: () => generateIcons(options),
    },
    {
      filename: "ui/index.ts",
      write: true,
      getContents: () => `export * from './icons/index.js'\n`,
    },
  ];

  return templates;
}

export function extractUI(colors?: string[], icons?: Record<string, string>) {
  const colorUnion = colors?.length
    ? colors.map((c) => JSON.stringify(c)).join(" | ")
    : "string";

  const iconKeys = Object.keys(icons || {});
  const iconUnion = iconKeys.length
    ? iconKeys.map((i) => JSON.stringify(i)).join(" | ")
    : "string";

  return [colorUnion, iconUnion];
}
