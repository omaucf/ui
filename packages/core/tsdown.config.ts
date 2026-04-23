import { defineConfig } from "tsdown";

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { createExports, createHelpers } from "./bundler.js";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  entry: ["src/**/*.ts", "!src/**/*.spec.ts"],
  unbundle: true,
  dts: true,
  exports: {
    customExports: () => {
      const core = createHelpers((p) => `./dist/${p}.js`);
      return {
        ".": {
          types: "./dist/index.d.ts",
          style: "./dist/index.css",
          import: "./dist/index.js",
        },
        ...createExports(core, {
          dirs: ["iconset", "locale", "preset", "theme"],
          dirsNoIndex: ["plugin"],
          lib: [
            "constants",
            "functions",
            "helpers",
            "schemas",
            "types",
            "utils",
          ],
          files: ["config", "factory", "template", "unplugin"],
          custom: {
            ...core.file("colors", "lib/colors"),
            ...core.file("defaults", "lib/defaults"),
          },
        }),
        "./package.json": "./package.json",
        "./bundler": "./bundler.js",
      };
    },
  },
  deps: {
    neverBundle: [
      ...Object.keys(pkg.peerDependencies || {}),
      "node:fs",
      "node:path",
      "#build",
    ].map((name) => new RegExp(`^${name}(/.*)?`)),
  },
  hooks: {
    "build:before": () => {
      const ui = {
        components: { icon: { dynamic: false, size: 24 } },
        tw: { merge: true, options: { prefix: "" } },
      };
      writeFile(
        resolve("generated/app.config.ts"),
        `export default ${JSON.stringify({ ui }, null, 2)}\n`
      );
      writeFile(
        resolve("generated/ui/icons.ts"),
        `import lucide from '@iconify-json/lucide/icons.json' with { type: 'json' };\n\nexport default { lucide };\n`
      );
    },
  },
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
});

function writeFile(path: string, content: string) {
  if (existsSync(path)) return;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
}
