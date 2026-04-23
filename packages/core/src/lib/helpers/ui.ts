import { defu } from "defu";

import { default as defaults } from "../defaults.js";
import { uiSchema } from "../schemas/ui.js";
import type { Dict } from "../types/abstract.js";
import type { Config } from "../types/schema.js";
import { sortObject } from "../utils/object.js";
import { defineColors } from "./color.js";
import { defineComponents } from "./component.js";
import { defineIcons } from "./icon.js";

export function extractUI(colors?: string[], icons?: Dict<string, string>) {
  const colorUnion = colors?.length
    ? colors.map((c) => JSON.stringify(c)).join(" | ")
    : "string";

  const iconKeys = Object.keys(icons || {});
  const iconUnion = iconKeys.length
    ? iconKeys.map((i) => JSON.stringify(i)).join(" | ")
    : "string";

  return [colorUnion, iconUnion];
}

export function resolveUI({
  tailwind,
  theme,
  ui,
}: Pick<Config, "tailwind" | "theme" | "ui"> = {}) {
  return uiSchema.parse(
    defu(
      { ...ui, components: {}, icons: {} },
      {
        colors: defineColors(tailwind?.baseColor, theme?.colors),
        components: sortObject(
          defineComponents(tailwind?.strategy, theme?.preset, ui?.components)
        ),
        icons: sortObject(defineIcons(theme?.iconset, ui?.icons)),
        tw: defaults.ui.tw,
      }
    )
  );
}
