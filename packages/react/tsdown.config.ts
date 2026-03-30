import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  entry: [
    "src/**/*.ts",
    "!src/**/*.recipe.ts",
    "!src/**/*.spec.ts",
    "!src/**/*.stories.tsx",
  ],
  unbundle: true,
  dts: true,
  exports: {
    customExports: () => ({
      ".": {
        types: "./dist/index.d.ts",
        style: "./dist/index.css",
        import: "./dist/index.js",
      },
      "./next": "./dist/next.js",
      "./template": "./dist/template.js",
      "./unplugin": "./dist/unplugin.js",
      "./vite": "./dist/vite.js",
      "./package.json": "./package.json",
    }),
  },
  deps: {
    neverBundle: [
      ...Object.keys(pkg.peerDependencies || {}),
      "node:fs",
      "node:path",
      "#build",
      "#imports",
    ].map((name) => new RegExp(`^${name}(/.*)?`)),
  },
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
});
