import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  deps: {
    neverBundle: [...Object.keys(pkg.peerDependencies || {})].map(
      (name) => new RegExp(`^${name}(/.*)?`)
    ),
  },
  dts: true,
  entry: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.{spec,test}.{ts,tsx}",
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
  unbundle: true,
});
