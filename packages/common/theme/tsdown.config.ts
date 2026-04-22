import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  deps: {
    neverBundle: [...Object.keys(pkg.peerDependencies || {})].map(
      (name) => new RegExp(`^${name}(/.*)?`)
    ),
  },
  dts: true,
  entry: ["src/**/*.ts", "!src/**/*.spec.ts"],
  exports: {
    customExports: () => ({
      ".": "./dist/index.js",
      "./package.json": "./package.json",
      "./prose": "./dist/prose/index.js",
      "./prose/*": "./dist/prose/*.js",
      "./ui": "./dist/ui/index.js",
      "./ui/*": "./dist/ui/*.js",
    }),
  },
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
  unbundle: true,
});
