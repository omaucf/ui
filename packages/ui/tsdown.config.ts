import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.spec.ts"],
  unbundle: true,
  dts: true,
  exports: {
    customExports: () => ({
      ".": {
        types: "./dist/index.d.ts",
        style: "./dist/index.css",
        import: "./dist/index.js",
      },
      "./iconset": "./dist/iconset/index.js",
      "./locale": "./dist/locale/index.js",
      "./preset": "./dist/preset/index.js",
      "./theme/content": "./dist/theme/content/index.js",
      "./theme/prose": "./dist/theme/prose/index.js",
      "./theme": "./dist/theme/index.js",
      "./constants": "./dist/lib/constants/index.js",
      "./functions": "./dist/lib/functions/index.js",
      "./helpers": "./dist/lib/helpers/index.js",
      "./schemas": "./dist/lib/schemas/index.js",
      "./types": "./dist/lib/types/index.js",
      "./utils": "./dist/lib/utils/index.js",
      "./colors": "./dist/lib/colors.js",
      "./defaults": "./dist/lib/defaults.js",
      "./config": "./dist/config.js",
      "./template": "./dist/template.js",
      "./package.json": "./package.json",
    }),
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
        resolve("generated/ui/icons/index.ts"),
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
