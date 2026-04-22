import type { UnpluginOptions } from "unplugin";

import { CORE_ANATOMY } from "@/constants/anatomy.js";
import { parseAnatomy } from "@/helpers/parse.js";
import type { Config } from "@/types/schema.js";

export default function anatomyPlugin(config: Config) {
  const FRAMEWORK = parseAnatomy(config.target);

  function pickDeps(router?: Config["router"]) {
    if (config.target === "solid") return [];

    switch (router) {
      case "inertia":
        return FRAMEWORK.INERTIA;
      case "start":
        return FRAMEWORK.START;
      case true:
        return FRAMEWORK.ROUTER;
      default:
        return [];
    }
  }

  return {
    enforce: "pre",
    name: "ui:anatomy",
    vite: {
      config() {
        return {
          optimizeDeps: {
            exclude: [
              CORE_ANATOMY.NAME,
              FRAMEWORK.NAME,
              "#build/app.config",
              "#build/ui/components",
              "#build/ui/icons",
              "#build/ui/imports",
              "#build/ui/utils",
              "#build/ui/types",
            ],
            include: [
              ...CORE_ANATOMY.COMMON,
              ...(config.target === "solid" ? [] : FRAMEWORK.COMMON),
              ...(config.target === "solid" ? [] : FRAMEWORK.IMAGE),
              ...pickDeps(config.router),
            ],
          },
          resolve: { tsconfigPaths: true },
          test: {
            server: { deps: { inline: [CORE_ANATOMY.NAME, FRAMEWORK.NAME] } },
          },
        };
      },
      configResolved(viteConfig) {
        const pluginList = viteConfig.plugins || [];
        for (const name of [...CORE_ANATOMY.PLUGIN, ...FRAMEWORK.PLUGIN]) {
          const matches = pluginList.filter((p) => p.name === name);
          if (matches.length > 1)
            throw new Error(
              `[VeeUI] Multiple instances of \`${name}\` detected. VeeUI already includes this plugin.`
            );
        }
      },
    },
  } satisfies UnpluginOptions;
}
