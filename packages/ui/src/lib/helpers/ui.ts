import { defu } from "defu";
import { isString, omit } from "radash";

import { default as defaults } from "../defaults.js";
import { configSchema } from "../schemas/config.js";
import { uiSchema } from "../schemas/ui.js";
import type { Config, Macro, Raw } from "../types/schema.js";
import { defineColors } from "./color.js";
import { defineComponents } from "./component.js";
import { defineIcons } from "./icon.js";

export function resolveOptions(
  ...layers: (Config<"input"> | null | undefined)[]
) {
  return configSchema.parse(
    layers
      .filter((l): l is Config<"input"> => l != null)
      .reduce<Config<"input">>(
        (acc, layer) => defu(layer, acc),
        omit(defaults, ["ui"])
      )
  );
}

export function resolveConfig(config: Raw | null) {
  if (!config) return null;
  return configSchema.parse({
    ...config.framework.features,
    dts: {
      autoImport: config.dts?.autoImport,
      components: config.dts?.components,
      output: parseOutput(config.framework.adapter, config.dts?.output),
      prefix: config.dts?.prefix,
    },
    router: parseRouter(config.framework.adapter),
    tailwind: config.tailwind,
    theme: config.theme,
    ui: config.ui,
  });
}

export function resolveUI({
  tailwind,
  theme,
  ui,
}: Pick<Config, "tailwind" | "theme" | "ui">) {
  return uiSchema.parse(
    defu(ui, {
      colors: defineColors(ui?.colors?.neutral, theme?.colors),
      components: defineComponents(theme?.preset),
      icons: defineIcons(theme?.iconset),
      tw: defineTW(tailwind?.strategy),
    })
  );
}

function defineTW(strategy?: Macro["strategy"]) {
  const { merge, options } = parseStrategy(strategy);
  return defu({ merge, options }, { options: { prefix: "" } });
}

function parseOutput(adapter: Raw["framework"]["adapter"], output?: string) {
  if (adapter === "nuxt") return ".nuxt";
  return output;
}

function parseRouter(adapter: Raw["framework"]["adapter"]) {
  return {
    core: false,
    inertia: "inertia" as const,
    next: null,
    nuxt: null,
    router: true,
    start: "start" as const,
  }[adapter];
}

function parseStrategy(
  strategy: Macro["strategy"] = defaults.tailwind.strategy
) {
  const merge = (isString(strategy) ? strategy : strategy[0]) === "merge";
  return { merge, options: isString(strategy) ? {} : strategy[1] };
}
