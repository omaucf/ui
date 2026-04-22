import { getConfig, getUnoConfigPath } from "@veehance/core/config";
import { CORE_ANATOMY, REACT_ANATOMY } from "@veehance/core/constants";
import { createTemplates } from "@veehance/core/create";
import { resolveConfig } from "@veehance/core/functions";
import { parsePkg } from "@veehance/core/helpers";
import { getTemplates } from "@veehance/core/template";
import type { PluginOptions } from "@veehance/core/types";

import { defu } from "defu";
import type { NextConfig } from "next";

const initializedState: Record<string, boolean> = {};

export type ModuleOptions = Omit<PluginOptions, "router">;

export function withUI(options: ModuleOptions = {}) {
  const [command] = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
  const isDev = () => process.env.NODE_ENV !== "production";

  return (nextConfig: NextConfig = {}): NextConfig => {
    const shouldRun = command === "build" || (command === undefined && isDev());

    if (shouldRun) {
      const cwd = process.cwd();

      if (!initializedState[cwd]) {
        initializedState[cwd] = true;
        const unoConfigPath = getUnoConfigPath(cwd);

        const config = resolveConfig(
          {
            registry: {
              types: [
                { raw: `export type * from '${parsePkg("react", "types")}'` },
              ],
            },
          },
          { style: { engine: unoConfigPath ? "unocss" : "tailwind" } },
          getConfig(cwd),
          { ...options, router: "next", target: "react" }
        );

        const templates = getTemplates(config, true);
        createTemplates(templates, cwd, config.dts?.output);
      }
    }

    return defu(nextConfig, {
      experimental: {
        optimizePackageImports: [
          ...[CORE_ANATOMY.NAME, REACT_ANATOMY.NAME],
          ...CORE_ANATOMY.COMMON,
          ...REACT_ANATOMY.COMMON,
          ...REACT_ANATOMY.IMAGE,
          ...REACT_ANATOMY.META,
        ],
      },
    });
  };
}
