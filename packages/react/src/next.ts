import { getConfig } from "@veehance/core/config";
import { CORE_ANATOMY, REACT_ANATOMY } from "@veehance/core/constants";
import { createTemplates } from "@veehance/core/factory";
import {
  resolveColors,
  resolveOptions,
  resolveUI,
} from "@veehance/core/helpers";
import type { Dict, Options } from "@veehance/core/types";
import { isDefined, isDev } from "@veehance/core/utils/assertion";

import { defu } from "defu";
import type { NextConfig } from "next";

import { getTemplates } from "./template.js";

const initializedState: Dict<string, boolean> = {};

export type ModuleOptions = Omit<Options, "router">;

export function withUI(userOptions: ModuleOptions = {}) {
  const [command] = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));

  return (nextConfig: NextConfig = {}): NextConfig => {
    const shouldRun = command === "build" || (!isDefined(command) && isDev());

    if (shouldRun) {
      const key = process.cwd();

      if (!initializedState[key]) {
        initializedState[key] = true;

        const options = resolveOptions(
          { dts: { output: "./generated" } },
          getConfig(process.cwd()),
          { ...userOptions, router: null, target: "react" }
        );

        options.theme ??= {};
        options.theme.colors = resolveColors(options.theme.colors);

        const ui = resolveUI({
          tailwind: options.tailwind,
          theme: options.theme,
          ui: options.ui,
        });

        options.tailwind?.inlines?.push(
          `${ui?.tw?.options?.prefix ?? ""}isolate`
        );
        options.tailwind?.sources?.push("./app.config.ts");
        options.tailwind?.sources?.push("./theme");

        const templates = getTemplates({ ...options, ui });
        createTemplates(process.cwd(), templates, options.dts?.output);
      }
    }

    return defu(nextConfig, {
      experimental: {
        optimizePackageImports: [
          ...[CORE_ANATOMY.NAME, REACT_ANATOMY.NAME],
          ...CORE_ANATOMY.SHARED,
          ...REACT_ANATOMY.SHARED,
          ...REACT_ANATOMY.META,
        ],
      },
    });
  };
}
