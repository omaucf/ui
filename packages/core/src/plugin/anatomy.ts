import type { UnpluginOptions } from "unplugin";

import {
  CORE_ANATOMY,
  REACT_ANATOMY,
  SVELTE_ANATOMY,
  VUE_ANATOMY,
} from "../lib/constants/index.js";
import type { Router, Target } from "../lib/types/index.js";

export function anatomyPlugin(
  target?: Target,
  router?: Router,
  features?: { image?: boolean }
): UnpluginOptions {
  const FRAMEWORK = parseAnatomy(target);

  function pickDeps(router?: Router) {
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
    name: "ui:anatomy",
    enforce: "pre",
    vite: {
      config() {
        return {
          optimizeDeps: {
            exclude: [CORE_ANATOMY.NAME, FRAMEWORK.NAME],
            include: [
              ...CORE_ANATOMY.SHARED,
              ...FRAMEWORK.OPTIMIZE,
              ...FRAMEWORK.SHARED,
              ...FRAMEWORK.VITE,
              ...pickDeps(router),
              ...(features?.image ? FRAMEWORK.VITE_IMAGE : []),
            ],
          },
          resolve: { tsconfigPaths: true },
          test: {
            server: { deps: { inline: [CORE_ANATOMY.NAME, FRAMEWORK.NAME] } },
          },
        };
      },
      configResolved(config) {
        const pluginList = config.plugins || [];
        for (const name of [...CORE_ANATOMY.PLUGIN, ...FRAMEWORK.PLUGIN]) {
          const matches = pluginList.filter((p) => p.name === name);
          if (matches.length > 1)
            throw new Error(
              `[VeeUI] Multiple instances of \`${name}\` detected. VeeUI already includes this plugin.`
            );
        }
      },
    },
  };
}

function parseAnatomy(value?: Target) {
  if (value === "react") return REACT_ANATOMY;
  if (value === "svelte") return SVELTE_ANATOMY;
  return VUE_ANATOMY;
}
