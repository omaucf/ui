/** biome-ignore-all lint/performance/noDelete: safe_to_set */
import { omit, pick } from "radashi";

import { CONFIG_DEFAULTS } from "@/defaults.js";
import { mergeConfigs } from "@/helpers/merge.js";
import {
  parseAppConfig,
  parseFramework,
  parseOutput,
  parseRouter,
} from "@/helpers/parse.js";
import { configSchema } from "@/schemas/config.js";
import type { ConfigInput, Raw } from "@/types/schema.js";

import { resolveColors } from "./color.js";
import { resolveExternalIcons as resolveIcons } from "./icon.js";
import { resolveUI } from "./ui.js";

export function defineConfig(config: Raw | null) {
  if (!config) return null;
  const {
    runtime: target,
    adapter,
    features,
  } = parseFramework(config.framework);
  const app = parseAppConfig(adapter, config.dts?.app);
  const output = parseOutput(adapter, config.dts?.output);

  return configSchema.parse({
    ...features,
    dts: { ...config.dts, app, output },
    router: parseRouter(adapter),
    target,
    ...omit(config, ["dts", "framework"]),
  });
}

export function resolveConfig(...layers: (ConfigInput | null | undefined)[]) {
  const config = configSchema.parse(
    mergeConfigs<ConfigInput>(layers, omit(CONFIG_DEFAULTS, ["ui"]))
  );

  config.dts ??= {};
  config.registry ??= {};
  config.registry.icons ??= [];
  config.style ??= {};
  config.style.safelist ??= [];
  config.theme ??= {};
  config.theme.colors = resolveColors(config.theme.colors);
  config.ui ??= {};

  if (
    config.router === "kit" ||
    (config.target === "solid" && config.router === "start")
  ) {
    config.dts.workspace = true;
  }

  if (config.router !== "nuxt")
    config.style.safelist.push(`${config.style?.prefix}isolate`);
  if (config.colorMode) {
    config.style.safelist.push(
      `${config.style?.prefix}hidden ${config.style?.prefix}dark:block ${config.style?.prefix}dark:hidden ${config.style?.prefix}dark:inline-block`
    );
  }

  const ui = resolveUI(pick(config, ["icons", "style", "theme", "ui"]));
  if (config.icons) config.icons = resolveIcons({ ...config, ui });

  if (!config.locale) delete ui.components?.locale;
  if (!config.prose) delete ui.components?.prose;

  return { ...config, ui };
}
