import { readdirSync } from "node:fs";

import { getConfig, getUnoConfigPath } from "@veehance/core/config";
import { CORE_ANATOMY, VUE_ANATOMY } from "@veehance/core/constants";
import { resolveConfig } from "@veehance/core/functions";
import { mergeConfigs, parsePkg } from "@veehance/core/helpers";
import { getTemplates } from "@veehance/core/template";
import type { Config, ConfigInput } from "@veehance/core/types";
import {
  createColorScript,
  resolveColorScript,
} from "@veehance/core/utils/script";

import {
  addComponent,
  addImportsDir,
  addImportsSources,
  addPluginTemplate,
  addTemplate,
  addTypeTemplate,
  createResolver,
  defineNuxtModule,
  extendViteConfig,
  getLayerDirectories,
  hasNuxtModule,
} from "@nuxt/kit";
import { defu } from "defu";
import { capitalize, isObject, pascal, pick, sift } from "radashi";

import { name as scope, version } from "../package.json" with { type: "json" };

export interface ModuleOptions
  extends Omit<ConfigInput, "dts" | "router" | "target" | "ui"> {
  detection?: boolean;
  detectionPatterns?: string[];
  prefix?: string;
  prefixNamespaces?: boolean;
  workspace?: boolean;
}

const UNPREFIXED_NAMESPACES = new Set(["Prose"]);

export default defineNuxtModule<ModuleOptions>({
  meta: {
    compatibility: { nuxt: ">=4" },
    configKey: "ui",
    name: scope,
    version,
  },
  moduleDependencies(nuxt: any) {
    const { image, style, prose } = nuxt.options.ui || {};
    return {
      ...(hasNuxtModule("@nuxt/fonts") &&
        style?.engine !== "unocss" && {
          "@nuxt/fonts": {
            defaults: {
              defaults: { weights: [400, 500, 600, 700] },
            },
          },
        }),
      ...(hasNuxtModule("@nuxt/image") && {
        "@nuxt/image": {
          defaults:
            isObject(image) && "provider" in image
              ? { provider: image.provider === "none" ? "ipx" : image.provider }
              : {},
          version: ">=2",
        },
      }),
      ...((hasNuxtModule("@nuxt/content") || hasNuxtModule("@nuxtjs/mdc")) && {
        "@nuxtjs/mdc": {
          defaults: {
            components: { map: { icon: "ProseIcon" } },
            headings:
              isObject(prose) && "headings" in prose
                ? prose.headings
                : undefined,
          },
          version: ">=0.23",
        },
      }),
    };
  },
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>safe_to_set
  setup(
    {
      detection,
      detectionPatterns,
      prefix,
      prefixNamespaces,
      workspace,
      ...opts
    }: ModuleOptions,
    nuxt: any
  ) {
    const { resolve } = createResolver(import.meta.url);
    const unoConfigPath = getUnoConfigPath(nuxt.options.rootDir);

    // 0. CONFIGURATION
    const options = resolveConfig(
      {
        fonts: hasNuxtModule("@nuxt/fonts"),
        image: hasNuxtModule("@nuxt/image"),
        locale:
          hasNuxtModule("@nuxtjs/i18n") || hasNuxtModule("nuxt-micro-i18n"),
        prose: hasNuxtModule("@nuxt/content") || hasNuxtModule("@nuxtjs/mdc"),
        registry: {
          imports: [
            {
              from: "nuxt/app",
              names: ["useAppConfig", "useHead", "useNuxtApp", "useRoute"],
            },
          ],
        },
        style: { engine: unoConfigPath ? "unocss" : "tailwind" },
      },
      getConfig(process.cwd()),
      {
        dts: {
          detection,
          detectionPatterns,
          prefix,
          prefixNamespaces,
          workspace,
        },
      },
      { ...opts, router: "nuxt", target: "vue" }
    );

    nuxt.options.appConfig = defu(nuxt.options.appConfig || {}, {
      colorMode: options.colorMode ? options.colorMode : undefined,
      icons: options.icons
        ? pick(options.icons, ["mode", "prefix"])
        : {
            mode: "svg",
            prefix: options.style?.engine === "unocss" ? "i-" : "iconify",
          },
      image: options.image ? { provider: "ipx" } : undefined,
      locale: options.locale ? options.locale : { dir: "ltr", locale: "en-US" },
      prose: options.prose ? options.prose : undefined,
      ui: options.ui,
      uno: options.style?.engine === "unocss" ? true : undefined,
    });

    nuxt.options.ui = mergeConfigs<ModuleOptions>([
      nuxt.options.ui || {},
      pick(options, ["fonts", "icons", "image", "locale", "style", "prose"]),
    ]);

    // 1. ENGINE
    if (options.style?.engine === "unocss") {
      addPluginTemplate({
        filename: "unocss.mjs",
        getContents: () =>
          [
            "import 'virtual:uno.css'",
            "import { defineNuxtPlugin } from '#imports'",
            "",
            "export default defineNuxtPlugin(() => {})",
          ].join("\n"),
      });

      extendViteConfig(async (config) => {
        const { default: uno } = await import("unocss/vite");
        const { createConfig } = await import("@veehance/core/unocss");

        const uiConfig = pick(options, ["fonts", "icons", "style", "theme"]);

        config.plugins ??= [];
        config.plugins.unshift(
          // @ts-expect-error
          ...uno(unoConfigPath ? unoConfigPath : createConfig([], uiConfig))
        );
      });

      if (nuxt.options.builder !== "@nuxt/vite-builder") {
        nuxt.options.postcss.plugins["@unocss/postcss"] = {
          content: [`${nuxt.options.srcDir}/**/*.{html,js,ts,jsx,tsx,vue}`],
        };
      }

      if (nuxt.options.dev) {
        // @ts-expect-error safe_to_set
        nuxt.hook("devtools:customTabs", (tabs) => {
          tabs.push({
            icon: "/__unocss/favicon.svg",
            name: "unocss",
            title: "UnoCSS",
            view: { src: "/__unocss/", type: "iframe" },
          });
        });
      }
    } else {
      extendViteConfig(async (config) => {
        const { default: tw } = await import("@tailwindcss/vite");
        config.plugins ??= [];
        config.plugins.unshift(...tw());
      });

      if (nuxt.options.builder !== "@nuxt/vite-builder") {
        nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};
      }
    }

    nuxt.options.app.rootAttrs ??= {};
    nuxt.options.app.rootAttrs.class = sift([
      nuxt.options.app.rootAttrs.class,
      `${options.style?.prefix}isolate`,
    ]).join(" ");

    const appClasses = sift([
      nuxt.options.app?.rootAttrs?.class,
      nuxt.options.app?.head?.htmlAttrs?.class,
      nuxt.options.app?.head?.bodyAttrs?.class,
    ]).join(" ");

    const layers = getLayerDirectories(nuxt).map((layer) => layer.app);

    options.style?.safelist?.push(appClasses);
    options.style?.sources?.push(
      ...layers.map((layer) => `${layer}**/*.{js,mjs,ts,vue}`)
    );

    // 2. COMPONENTS
    const imageSrc = options.image ? "./base/elements/nuxt" : "./lib/elements";
    addComponents([
      ...[{ enabled: !!options.prose, namespace: "prose" }].flatMap(
        ({ enabled, namespace }) =>
          enabled
            ? fromNamespace(pascal(namespace), `./lib/components/${namespace}`)
            : []
      ),
      ...fromDirectory("./lib/components/ui"),
      ...fromDirectory("./lib/elements", (n) => ["icon"].includes(n)),
      ...fromDirectory(imageSrc, (n) => ["image"].includes(n)),
      ...fromDirectory("./base/elements/nuxt", (n) => ["link"].includes(n)),
      ...fromDirectory("./lib/providers", (n) =>
        ["app", "color-mode", "environment", "locale"].includes(n)
      ),
    ]);

    // 3. COMPOSABLES
    addImportsDir(resolve("./lib/composables"));
    addImportsSources([
      {
        from: parsePkg("core", "functions/color"),
        imports: ["defineColors", "extendColors"],
      },
      {
        from: parsePkg("core", "functions/locale"),
        imports: ["defineLocale", "extendLocale"],
      },
      {
        from: resolve("./lib/providers/interaction"),
        imports: ["useFocusVisible", "useInteractionModality"],
      },
      {
        from: resolve("./lib/providers/keyboard"),
        imports: [
          "useFormatHotkey",
          "useHotkey",
          "useHotkeyRecorder",
          "useHotkeyRegistrations",
          "useHotkeyStore",
          "useHotkeys",
          "useIsKeyPressed",
          "usePlatform",
          "usePressedKeys",
        ],
      },
      {
        from: resolve("./lib/providers/locale"),
        imports: ["useCollator", "useDateFormatter", "useFilter"],
      },
    ]);

    // 4. PLUGINS
    const colorModeScript = createColorScript(
      resolveColorScript(undefined, nuxt.options.appConfig.colorMode)
    );

    addPluginTemplate({
      filename: "color-mode.mjs",
      getContents: () =>
        [
          "import { defineNuxtPlugin, useHead } from '#imports'",
          "",
          "export default defineNuxtPlugin(() => {",
          "  useHead({",
          "    script: [",
          "      {",
          `        innerHTML: ${JSON.stringify(colorModeScript)},`,
          "        tagPosition: 'head',",
          "      },",
          "    ],",
          "  })",
          "})",
        ].join("\n"),
    });

    // 5. REGISTRY
    options.registry = defu(options.registry || {}, {
      components: sift([
        fromNode("nuxt/dist/app/components/nuxt-link", "NuxtLink"),
        !!options.image &&
          fromNode(
            "@nuxt/image/dist/runtime/components/NuxtImg.vue",
            "NuxtImg"
          ),
      ]),
    });

    // 6. TEMPLATES
    const templates = getTemplates(
      { ...options, ui: nuxt.options.appConfig.ui as Config["ui"] },
      true,
      nuxt.options.rootDir
    );

    for (const template of templates) {
      if (template.filename.endsWith(".d.ts")) {
        addTypeTemplate(template as any);
      } else {
        addTemplate(template);
      }
    }

    nuxt.hook("prepare:types", ({ references }: { references: any[] }) => {
      references.push({ path: resolve("./lib/types/nuxt.d.ts") });
    });

    // 7. OPTIMIZATION
    extendViteConfig((config) => {
      config.optimizeDeps ??= {};
      config.optimizeDeps.include ??= [];
      config.optimizeDeps.include.push(
        ...CORE_ANATOMY.COMMON,
        ...VUE_ANATOMY.COMMON,
        ...VUE_ANATOMY.META,
        ...(options.image === false ? VUE_ANATOMY.IMAGE : [])
      );
    });

    // 8. UTILITIES
    function addComponents(
      components: Array<{ export?: string; name: string; path: string }>
    ) {
      for (const c of components) {
        addComponent({ export: c.export, filePath: c.path, name: c.name });
      }
    }

    function fromDirectory(dir: string, filter?: (name: string) => boolean) {
      return readdirSync(resolve(dir))
        .filter(filter ?? (() => true))
        .map((name) => ({
          export: pascal(name),
          name: `${capitalize(options.dts?.prefix as string)}${pascal(name)}`,
          path: resolve(`${dir}/${name}`),
        }));
    }

    function fromNamespace(namespace: string, dir: string) {
      const shouldPrefix =
        options.dts?.prefixNamespaces && !UNPREFIXED_NAMESPACES.has(namespace);
      return readdirSync(resolve(dir), { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => {
          const name =
            entry.name === "layout"
              ? namespace
              : `${namespace}${pascal(entry.name)}`;
          return {
            export: name,
            name: shouldPrefix
              ? `${capitalize(options.dts?.prefix as string)}${name}`
              : name,
            path: resolve(`${dir}/${entry.name}`),
            priority: namespace === "Prose" ? 10 : undefined,
          };
        });
    }

    function fromNode(from: string, name: string) {
      return { export: "default", from: toRaw(from), name, prefix: false };
    }

    function toRaw(path: string) {
      return `${nuxt.options.rootDir}/node_modules/${path}`;
    }
  },
});

declare module "@nuxt/schema" {
  interface AppConfig {
    colorMode?: Record<string, any>;
    icons: Record<string, any>;
    image: Record<string, any>;
    locale?: Record<string, any>;
    prose?: Record<string, any>;
    ui: Record<string, any>;
  }

  interface NuxtOptions {
    appConfig: AppConfig;
    ui: ModuleOptions;
  }
}
