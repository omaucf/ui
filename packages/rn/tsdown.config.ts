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
    "!src/lib/**/*.{ts,tsx}",
    "!src/**/*.{spec,test}.{ts,tsx}",
    "!src/vitest-axe.d.ts",
    "!src/vitest.ts",
  ],
  exports: {
    customExports: () => ({
      ".": {
        types: "./dist/typescript/index.d.ts",
        import: "./dist/module/index.js",
        default: "./dist/module/index.js",
      },
      "./container": rn("lib/components/ui/container/index"),
      "./main": rn("lib/components/ui/main/index"),
      "./package.json": "./package.json",
      "./prose/h1": rn("lib/components/prose/h1/index"),
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

function rn(path: string) {
  return {
    types: `./dist/${path}.d.ts`.replace("lib", "typescript"),
    import: `./dist/${path}.js`.replace("lib", "module"),
  };
}
