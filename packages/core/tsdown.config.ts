import { defineConfig } from "tsdown";

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css", "src/keyframes.css", "src/tailwind.css"],
  deps: {
    neverBundle: [...Object.keys(pkg.peerDependencies || {}), "#build"].map(
      (name) => new RegExp(`^${name}(/.*)?`)
    ),
  },
  dts: true,
  entry: ["src/**/*.ts", "!src/**/*.spec.ts"],
  exports: {
    customExports: () => ({
      ".": "./dist/index.js",
      "./colors": "./dist/lib/colors.js",
      "./config": "./dist/config.js",
      "./constants": "./dist/lib/constants/index.js",
      "./constants/*": "./dist/lib/constants/*.js",
      "./create": "./dist/create.js",
      "./defaults": "./dist/lib/defaults.js",
      "./detection": "./dist/detection.js",
      "./dev": "./dist/dev.js",
      "./functions": "./dist/lib/functions/index.js",
      "./functions/*": "./dist/lib/functions/*.js",
      "./helpers": "./dist/lib/helpers/index.js",
      "./helpers/*": "./dist/lib/helpers/*.js",
      "./iconset": "./dist/iconset/index.js",
      "./iconset/*": "./dist/iconset/*.js",
      "./keyframes.css": "./dist/keyframes.css",
      "./locale": "./dist/locale/index.js",
      "./locale/*": "./dist/locale/*.js",
      "./package.json": "./package.json",
      "./preset": "./dist/preset/index.js",
      "./preset/*": "./dist/preset/*.js",
      "./schemas": "./dist/lib/schemas/index.js",
      "./schemas/*": "./dist/lib/schemas/*.js",
      "./tailwind.css": "./dist/tailwind.css",
      "./template": "./dist/template.js",
      "./templates": "./dist/lib/templates/index.js",
      "./templates/*": "./dist/lib/templates/*.js",
      "./theme": "./dist/theme/index.js",
      "./theme/prose": "./dist/theme/prose/index.js",
      "./theme/prose/*": "./dist/theme/prose/*.js",
      "./theme/ui": "./dist/theme/ui/index.js",
      "./theme/ui/*": "./dist/theme/ui/*.js",
      "./types": "./dist/lib/types/index.js",
      "./types/*": "./dist/lib/types/*.js",
      "./ui.css": "./dist/index.css",
      "./unocss": "./dist/unocss.js",
      "./unplugin": "./dist/unplugin.js",
      "./utils": "./dist/lib/utils/index.js",
      "./utils/*": "./dist/lib/utils/*.js",
    }),
  },
  hooks: {
    "build:before": () => {
      const appConfig = {
        icons: { mode: "auto", prefix: "i-" },
        ui: { strategy: { merge: true, options: { prefix: "" } } },
      };
      writeFile(
        resolve("./node_modules/.veehance/app.config.ts"),
        `export default ${JSON.stringify(appConfig, null, 2)}\n`
      );
      writeFile(
        resolve("./node_modules/.veehance/ui/icons.ts"),
        `import lucide from '@iconify-json/lucide/icons.json' with { type: 'json' };\n\nexport default { lucide };\n`
      );
    },
  },
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
  unbundle: true,
});

function writeFile(path: string, content: string) {
  if (existsSync(path)) return;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
}
