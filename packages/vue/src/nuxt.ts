import { readdirSync } from "node:fs";

import { getConfig } from "@veehance/core/config";
import { CORE_ANATOMY, VUE_ANATOMY } from "@veehance/core/constants";
import {
  resolveColors,
  resolveOptions,
  resolveUI,
} from "@veehance/core/helpers";
import type { Dict, Prettify, Options } from "@veehance/core/types";

import {
  addPlugin,
  addImportsDir,
  addComponent,
  createResolver,
  defineNuxtModule,
  extendViteConfig,
  hasNuxtModule,
  getLayerDirectories,
} from "@nuxt/kit";
import { defu } from "defu";
import type { ModuleDependencies } from "nuxt/schema";
import { pascalCase, titleCase } from "scule";

import { name, version } from "../package.json" with { type: "json" };
import { addTemplates } from "./template.js";

export type ModuleOptions = Prettify<
  { prefix?: string } & Omit<Options, "dts" | "router" | "ui">
>;

const features = {
  colorMode: { classSuffix: "", disableTransition: true },
  fonts: { defaults: { weights: [400, 500, 600, 700] } },
};

export default defineNuxtModule<ModuleOptions>({
  meta: { name, version, configKey: "ui", compatibility: { nuxt: ">=4" } },
  moduleDependencies(nuxt): ModuleDependencies {
    const options = nuxt.options.ui || {};
    return {
      ...(options.colorMode !== false && {
        "@nuxtjs/color-mode": { version: ">=4", defaults: features.colorMode },
      }),
      ...(options.fonts !== false && {
        "@nuxt/fonts": { version: ">=0.14", defaults: features.fonts },
      }),
      ...(options.image !== false && {
        "@nuxt/image": { version: ">=2" },
      }),
    };
  },
  setup({ prefix, ...opts }, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // 0. CONFIGURATION
    const options = resolveOptions(
      {
        dts: { prefix },
        colorMode: hasNuxtModule("@nuxtjs/color-mode"),
        fonts: hasNuxtModule("@nuxt/fonts"),
        image: hasNuxtModule("@nuxt/image"),
        tailwind: { cssVariables: false },
      },
      getConfig(process.cwd()),
      { ...opts, router: null, target: "vue" }
    );

    options.theme ??= {};
    options.theme.colors = resolveColors(options.theme.colors);

    nuxt.options.appConfig.ui = defu(
      nuxt.options.appConfig.ui || {},
      resolveUI({
        tailwind: options.tailwind,
        theme: options.theme,
        ui: options.ui,
      })
    );

    nuxt.options.ui = defu(nuxt.options.ui || {}, {
      colorMode: !!options.colorMode,
      fonts: !!options.fonts,
      image: !!options.image,
    });

    // 1. TAILWINDCSS
    nuxt.hook("vite:extend", async ({ config }) => {
      const plugin = await import("@tailwindcss/vite").then((r) => r.default);
      config.plugins ||= [];
      config.plugins.push(plugin() as any);
    });

    if (nuxt.options.builder !== "@nuxt/vite-builder") {
      nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};
    }

    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {};
    nuxt.options.app.rootAttrs.class = [
      nuxt.options.app.rootAttrs.class,
      `${nuxt.options.appConfig.ui?.tw?.options?.prefix ?? ""}isolate`,
    ]
      .filter(Boolean)
      .join(" ");

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

    // 2. COMPONENTS
    const components = resolve("./lib/components");
    for (const name of readdirSync(components)) {
      addComponent({
        export: pascalCase(name),
        name: `${titleCase(options.dts?.prefix as string)}${pascalCase(name)}`,
        filePath: resolve(`./lib/components/${name}`),
      });
    }

    // 3. COMPOSABLES
    addImportsDir(resolve("./lib/composables"));
    if (!options.colorMode) {
      addImportsDir(resolve("./lib/composables/color-mode"));
    }

    // 4. PLUGINS
    if (!options.tailwind?.cssVariables) {
      addPlugin({ src: resolve("./lib/plugins/color") });
    }

    // 5. TEMPLATES
    addTemplates(options, nuxt, resolve);

    // 6. OPTIMIZATION
    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {};
      config.optimizeDeps.include = config.optimizeDeps.include || [];
      config.optimizeDeps.include.push(
        ...[CORE_ANATOMY.NAME, VUE_ANATOMY.NAME],
        ...CORE_ANATOMY.SHARED,
        ...VUE_ANATOMY.SHARED
      );
    });
  },
});

declare module "@nuxt/schema" {
  interface AppConfig {
    colorMode: boolean;
    ui: Dict<string>;
  }

  interface NuxtOptions {
    appConfig: { ui: AppConfig["ui"] };
    ui: ModuleOptions;
  }
}
