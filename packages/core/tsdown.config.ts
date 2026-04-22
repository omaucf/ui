import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css", "src/tailwind.css"],

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
      "./plugins/*": "./dist/plugins/*.js",
      "./tailwind.css": "./dist/tailwind.css",
      "./theme": "./dist/theme/index.js",
      "./theme/prose": "./dist/theme/prose/index.js",
      "./theme/prose/*": "./dist/theme/prose/*.js",
      "./theme/ui": "./dist/theme/ui/index.js",
      "./theme/ui/*": "./dist/theme/ui/*.js",
      "./ui.css": "./dist/index.css",
      "./unplugin": "./dist/unplugin.js",
      "./utils": "./dist/lib/utils/index.js",
      "./utils/*": "./dist/lib/utils/*.js",
    }),
  },
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
  unbundle: true,
});
