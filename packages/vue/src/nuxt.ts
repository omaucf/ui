import { getConfig } from "@veehance/ui/config";
import { VUE_PKG_ANATOMY, UI_PKG_ANATOMY } from "@veehance/ui/constants";
import { resolveColors, resolveOptions, resolveUI } from "@veehance/ui/helpers";
import type { Options, Prettify } from "@veehance/ui/types";

import {
  createResolver,
  defineNuxtModule,
  extendViteConfig,
  getLayerDirectories,
  hasNuxtModule,
} from "@nuxt/kit";
import { defu } from "defu";

import { name, version } from "../package.json" with { type: "json" };
import { addTemplates } from "./template";

export type ModuleOptions = Prettify<
  { prefix?: string } & Omit<Options, "dts" | "registry" | "router" | "ui">
>;

export default defineNuxtModule<ModuleOptions>({
  meta: { name, version, configKey: "ui", compatibility: { nuxt: ">=4" } },
  moduleDependencies: {
    "@nuxt/fonts": { version: ">=0.12", optional: true },
    "@nuxt/image": { version: ">=2", optional: true },
    "@nuxtjs/color-mode": { version: ">=4", optional: true },
    "@nuxtjs/mdc": { version: ">=0.21", optional: true },
  },
  setup({ prefix, ...opts }, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // 0. CONFIGURATION
    const options = resolveOptions(
      getConfig(process.cwd()),
      {
        colorMode: hasNuxtModule("@nuxtjs/color-mode"),
        content: hasNuxtModule("@nuxt/content"),
        fonts: hasNuxtModule("@nuxt/fonts"),
        image: hasNuxtModule("@nuxt/image"),
        locale:
          hasNuxtModule("@nuxtjs/i18n") || hasNuxtModule("nuxt-i18n-micro"),
        prose: hasNuxtModule("@nuxtjs/mdc"),
      },
      {
        dts: { output: ".nuxt", prefix },
        tailwind: { cssVariables: false },
      },
      { ...opts }
    );

    options.theme ??= {};
    options.theme.colors = resolveColors(options.theme.colors);

    nuxt.options.appConfig.ui = defu<any, [any]>(
      nuxt.options.appConfig.ui || {},
      resolveUI({
        tailwind: options.tailwind,
        theme: options.theme,
        ui: options.ui,
      })
    );

    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {};
    nuxt.options.app.rootAttrs.class = [
      nuxt.options.app.rootAttrs.class,
      `${nuxt.options.appConfig.ui?.tw?.options?.prefix ?? ""}isolate`,
    ]
      .filter(Boolean)
      .join(" ");

    // 1. TAILWINDCSS
    nuxt.hook("vite:extend", async ({ config }) => {
      const plugin = await import("@tailwindcss/vite").then((r) => r.default);
      config.plugins ||= [];
      config.plugins.push(plugin() as any);
    });

    if (nuxt.options.builder !== "@nuxt/vite-builder") {
      nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};
    }

    const appClasses = [
      nuxt.options.app?.rootAttrs?.class,
      nuxt.options.app?.head?.htmlAttrs?.class,
      nuxt.options.app?.head?.bodyAttrs?.class,
    ]
      .filter(Boolean)
      .join(" ");

    options.tailwind?.inlines?.push(appClasses);
    options.tailwind?.sources?.push("./app.config.mjs");
    options.tailwind?.sources?.push("./theme");

    const layers = getLayerDirectories(nuxt).map((layer) => layer.app);
    for (const layer of layers) {
      options.tailwind?.sources?.push(`${layer}**/*.{js,mjs,ts,vue}`);
    }

    // 2. FEATURES
    if (options.colorMode) {
      nuxt.options.colorMode = defu(nuxt.options.colorMode || {}, {
        classSuffix: "",
        dataValue: "data-theme",
        disableTransition: true,
      });
    }

    if (options.fonts) {
      nuxt.options.fonts = defu(nuxt.options.fonts || {}, {
        weights: [400, 500, 600, 700],
      });
    }

    if (options.image) {
      nuxt.options.image = defu(nuxt.options.image || {}, {
        provider: "auto",
      });
    }

    if (options.prose) {
      nuxt.options.mdc = defu(nuxt.options.mdc || {}, {
        highlight: {
          theme: {
            light: "material-theme-lighter",
            default: "material-theme",
            dark: "material-theme-palenight",
          },
        },
      });
    }

    // 3. TEMPLATES
    addTemplates(options, nuxt, resolve);

    // 4. OPTIMIZATION
    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {};
      config.optimizeDeps.include = config.optimizeDeps.include || [];
      config.optimizeDeps.include.push(
        ...[VUE_PKG_ANATOMY.NAME, UI_PKG_ANATOMY.NAME]
      );
    });
  },
});
