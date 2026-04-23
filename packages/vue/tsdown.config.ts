import { defineConfig } from "tsdown";

import { createExports, createHelpers } from "@veehance/core/bundler";
import { writeTemplates } from "@veehance/core/factory";

import vue from "unplugin-vue/rolldown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  entry: ["src/**/*.{ts,vue}", "!src/**/*.{spec,test}.ts", "!src/vitest.ts"],
  unbundle: true,
  dts: { vue: true },
  plugins: [vue({ isProduction: true })],
  exports: {
    customExports: () => {
      const base = createHelpers((p) => `./dist/${p}.js`, { lib: "base" });
      const core = createHelpers((p) => `./dist/${p}.js`);
      return {
        ".": {
          types: "./dist/index.d.ts",
          style: "./dist/index.css",
          import: "./dist/index.js",
        },
        ...createExports(core, {
          components: ["app", "container", "main"],
          composables: ["use-environment", "use-forward-expose"],
          providers: ["environment"],
          lib: ["utils"],
          files: ["nuxt", "template", "unplugin", "vite"],
          custom: {
            ...base.composable("define-nuxt-plugin"),
            ...base.composable("use-app-config"),
            ...base.composable("use-color-mode"),
            ...core.file(
              "use-color-mode/nuxt",
              "lib/composables/color-mode/use-color-mode"
            ),
            ...base.composable("use-head"),
            ...base.composable("use-nuxt-app"),
          },
        }),
        "./package.json": "./package.json",
        "./plugin": "./plugin.d.ts",
      };
    },
  },
  deps: {
    neverBundle: [
      ...Object.keys(pkg.peerDependencies || {}),
      "node:fs",
      "node:path",
      "#build",
    ].map((name) => new RegExp(`^${name}(/.*)?`)),
  },
  hooks: {
    "build:before": () => {
      writeTemplates(".", {
        dts: { output: "./generated" },
        target: "vue" as const,
      });
    },
  },
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
});
