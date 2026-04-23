import { createUnplugin, type UnpluginOptions } from "unplugin";

import { getConfig } from "./config.js";
import {
  resolveColors,
  resolveOptions,
  resolveUI,
} from "./lib/helpers/index.js";
import type {
  AnyFunction,
  Options,
  Target,
  Template,
} from "./lib/types/index.js";
import { anatomyPlugin } from "./plugin/anatomy.js";
import { templatePlugin } from "./plugin/template.js";

interface PluginOptions {
  environment?: AnyFunction;
  fonts?: AnyFunction;
  tailwind?: AnyFunction;
  target: Target;
  template: (options: Options) => Template[];
}

export function createPlugin({
  environment,
  fonts,
  tailwind,
  target,
  template,
}: PluginOptions) {
  return createUnplugin<Options | undefined>((opts = {}) => {
    const options = resolveOptions(getConfig(process.cwd()), {
      ...opts,
      target,
    });

    options.theme ??= {};
    options.theme.colors = resolveColors(options.theme.colors);

    const ui = resolveUI({
      tailwind: options.tailwind,
      theme: options.theme,
      ui: options.ui,
    });

    options.tailwind?.inlines?.push(`${ui?.tw?.options?.prefix ?? ""}isolate`);
    options.tailwind?.sources?.push("./app.config.ts");
    options.tailwind?.sources?.push("./theme");

    return [
      environment?.({ ...options, ui }),
      anatomyPlugin(options.target, options.router, { image: options.image }),
      templatePlugin(template({ ...options, ui }), options.dts?.output),
      options?.fonts && fonts?.(),
      tailwind?.(),
    ]
      .filter(Boolean)
      .flat(1) as UnpluginOptions[];
  });
}
