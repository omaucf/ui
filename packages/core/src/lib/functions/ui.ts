import { defu } from "defu";
import { omit } from "radashi";

import { CONFIG_DEFAULTS } from "@/defaults.js";
import { uiSchema } from "@/schemas/ui.js";
import type { Config } from "@/types/schema.js";

import { defineColors } from "./color.js";
import { defineComponents } from "./component.js";
import { defineIcons } from "./icon.js";

export function resolveUI({
  icons,
  style,
  theme,
  ui,
}: Pick<Config, "icons" | "style" | "theme" | "ui">) {
  return uiSchema.parse(
    defu(
      omit({ ...ui }, ["components", "icons"]),
      { strategy: { options: { prefix: style?.prefix } } },
      {
        colors: defineColors(style?.baseColor, theme?.colors),
        components: defineComponents(
          style?.prefix,
          theme?.colors,
          theme?.preset,
          theme?.transitions,
          ui?.components
        ),
        icons: defineIcons(
          icons === false ? undefined : icons?.prefix,
          style?.engine,
          theme?.iconset,
          ui?.icons
        ),
        strategy: CONFIG_DEFAULTS.ui.strategy,
      }
    )
  );
}
