import { sift } from "radashi";
import {
  createUnplugin,
  type UnpluginContextMeta,
  type UnpluginInstance,
  type UnpluginOptions,
} from "unplugin";

import { resolveConfig } from "@/functions/config.js";
import { parsePkg } from "@/helpers/parse.js";
import type { Template } from "@/types/registry.js";
import type { Config } from "@/types/schema.js";
import type { PluginOptions, Target } from "@/types/ui.js";

import { getConfig, getUnoConfigPath } from "./config.js";
import anatomy from "./plugin/anatomy.js";
import autoImport from "./plugin/auto-import.js";
import engine from "./plugin/engine.js";
import template from "./plugin/template.js";
import { getTemplates } from "./template.js";

export interface PluginConfig {
  component?: (config: Config, meta: UnpluginContextMeta) => UnpluginOptions;
  plugin?: (config: Config, meta: UnpluginContextMeta) => UnpluginOptions;
  target?: Target;
  templates?: (config: Config, meta: boolean, cwd: string) => Template[];
}

export function createPlugin<T extends PluginOptions>(
  { component, plugin, target, templates = getTemplates }: PluginConfig,
  cwd = process.cwd()
): UnpluginInstance<T | undefined, boolean> {
  return createUnplugin<T | undefined>((options, meta) => {
    const config = resolveConfig(
      {
        registry: {
          types: [{ from: parsePkg(target, "types"), names: ["*"] }],
        },
      },
      { style: { engine: getUnoConfigPath(cwd) ? "unocss" : "tailwind" } },
      getConfig(cwd),
      { ...options, target }
    );

    return sift([
      anatomy(config),
      config.dts?.autoImport && autoImport(config, meta),
      config.dts?.components && component?.(config, meta),
      ...engine(config, cwd),
      template(config, templates(config, true, cwd)),
      plugin?.(config, meta),
    ]).flat(1) as UnpluginOptions[];
  });
}
