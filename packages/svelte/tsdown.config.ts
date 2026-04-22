/** biome-ignore-all assist/source/useSortedKeys: aafe_to_set */
import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  clean: false,
  deps: {
    neverBundle: [...Object.keys(pkg.peerDependencies || {})].map(
      (name) => new RegExp(`^${name}(/.*)?`)
    ),
  },
  dts: true,
  entry: [
    "src/**/*.ts",
    "!src/lib/**/*.{ts,svelte}",
    "!src/**/*.{spec,test}.ts",
    "!src/vitest-axe.d.ts",
    "!src/vitest.ts",
  ],
  exports: {
    customExports: () => ({
      ".": "./dist/index.js",
      "./container": sv("components/ui/container/index"),
      "./main": sv("components/ui/main/index"),
      "./package.json": "./package.json",
      "./types": "./dist/types/index.js",
      "./types/*": "./dist/types/*.js",
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

function sv(path: string) {
  return {
    types: `./dist/${path}.d.ts`,
    import: `./dist/${path}.js`,
    svelte: `./dist/${path}.js`,
  };
}
