import { defineConfig } from "tsdown";

import vue from "unplugin-vue/rolldown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  deps: {
    neverBundle: [...Object.keys(pkg.peerDependencies || {})].map(
      (name) => new RegExp(`^${name}(/.*)?`)
    ),
  },
  dts: { vue: true },

  entry: [
    "src/**/*.{ts,vue}",
    "!src/**/*.{spec,test}.{ts,vue}",
    "!src/vitest-axe.d.ts",
    "!src/vitest.ts",
  ],
  exports: {
    customExports: () => ({
      ".": "./dist/index.js",
      "./container": "./dist/lib/components/ui/container/index.js",
      "./main": "./dist/lib/components/ui/main/index.js",
      "./package.json": "./package.json",
      "./types": "./dist/lib/types/index.js",
      "./types/*": "./dist/lib/types/*.js",
      "./unplugin": "./dist/unplugin.js",
      "./vite": "./dist/vite.js",
    }),
  },
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
  plugins: [vue({ isProduction: true })],
  unbundle: true,
});
