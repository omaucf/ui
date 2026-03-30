import { getConfig } from "@veehance/ui/config";
import { resolveColors, resolveOptions, resolveUI } from "@veehance/ui/helpers";
import type { Options } from "@veehance/ui/types";

import tailwindPlugin from "@tailwindcss/vite";
import { createUnplugin, type UnpluginOptions } from "unplugin";
import fontsPlugin from "vite-plugin-webfont-dl";

import templatesPlugin from "./integration/templates.js";

export default createUnplugin<Options | undefined>((opts = {}) => {
  const options = resolveOptions(getConfig(process.cwd()), opts);

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
    templatesPlugin(options, ui),
    options?.fonts && fontsPlugin(),
    tailwindPlugin(),
  ]
    .filter(Boolean)
    .flat(1) as UnpluginOptions[];
});
