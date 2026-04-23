import { defineConfig } from "tsdown";

import { createExports, createHelpers } from "@veehance/core/bundler";
import { writeTemplates } from "@veehance/core/factory";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  entry: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.{spec,test}.{ts,tsx}",
    "!src/vitest.ts",
  ],
  unbundle: true,
  dts: true,
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
          composables: [
            "use-app-config",
            "use-color-mode",
            "use-environment",
            "use-head",
          ],
          providers: ["environment"],
          lib: ["utils"],
          files: ["next", "template", "unplugin", "vite"],
          custom: {
            ...base.component("app", true),
            ...base.composable("use-color-mode", true),
          },
        }),
        "./package.json": "./package.json",
      };
    },
  },
  deps: {
    neverBundle: [
      ...Object.keys(pkg.peerDependencies || {}),
      "node:fs",
      "node:path",
    ].map((name) => new RegExp(`^${name}(/.*)?`)),
  },
  hooks: {
    "build:before": () => {
      writeTemplates(".", {
        dts: { output: "./generated" },
        target: "react" as const,
      });
    },
  },
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
});
