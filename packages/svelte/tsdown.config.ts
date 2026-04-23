import { defineConfig } from "tsdown";

import { rmSync } from "node:fs";

import { createExports, createHelpers } from "@veehance/core/bundler";
import { writeTemplates } from "@veehance/core/factory";

import { globSync } from "glob";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  clean: false,
  copy: ["src/index.css"],
  entry: [
    "src/**/*.ts",
    "!src/lib/**/*.{ts,svelte}",
    "!src/**/*.{spec,test}.ts",
    "!src/vitest.ts",
  ],
  unbundle: true,
  dts: true,
  exports: {
    customExports: () => {
      const core = createHelpers(
        (p) => ({
          types: `./dist/${p}.d.ts`,
          svelte: `./dist/${p}.js`,
          import: `./dist/${p}.js`,
        }),
        { lib: "" }
      );
      return {
        ".": {
          types: "./dist/index.d.ts",
          style: "./dist/index.css",
          svelte: "./dist/index.js",
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
          files: ["kit", "template", "unplugin", "vite"],
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
        target: "svelte" as const,
      });
    },
    "build:done": () => {
      for (const file of globSync("dist/**/*.{test,spec}.*")) {
        rmSync(file);
      }
    },
  },
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
});
