/** biome-ignore-all assist/source/useSortedKeys: aafe_to_set */
import { defineConfig } from "tsdown";

import solid from "unplugin-solid/rolldown";

import pkg from "./package.json" with { type: "json" };

const neverBundle = [...Object.keys(pkg.peerDependencies ?? {})].map(
  (name) => new RegExp(`^${name}(/.*)?`)
);

export default defineConfig([
  {
    deps: { neverBundle },
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
        "./container": sld("lib/components/ui/container/index"),
        "./main": sld("lib/components/ui/main/index"),
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
    plugins: [solid({ solid: { generate: "dom" } })],
    unbundle: true,
  },
  {
    deps: { neverBundle },
    dts: false,
    entry: [
      "src/**/*.tsx",
      "src/lib/components/**/index.ts",
      "!src/**/*.{spec,test}.tsx",
    ],
    inputOptions: { transform: { jsx: "preserve" } },
    outExtensions: ({ format }) => {
      if (format === "es") return { js: ".jsx" };
      return {};
    },
    unbundle: true,
  },
]);

function sld(path: string) {
  return {
    solid: `./dist/${path}.jsx`.replace("/components/ui/", "/"),
    import: {
      types: `./dist/${path}.d.ts`,
      default: `./dist/${path}.js`,
    },
  };
}
