import { defineConfig } from "tsdown";

import { rmSync } from "node:fs";

import { setupUI } from "@veehance/core/dev";

import { globbySync } from "globby";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  clean: false,
  copy: ["src/index.css"],
  deps: {
    neverBundle: [...Object.keys(pkg.peerDependencies || {}), "#build"].map(
      (name) => new RegExp(`^${name}(/.*)?`)
    ),
  },
  dts: true,
  entry: [
    "src/**/*.ts",
    "!src/lib/**/*.{ts,svelte}",
    "!src/**/examples/*.{ts,svelte}",
    "!src/**/*.stories.{ts,svelte}",
    "!src/**/*.{spec,test}.ts",
    "!src/vitest-axe.d.ts",
    "!src/vitest.ts",
  ],
  exports: {
    customExports: () => ({
      ".": "./dist/index.js",
      "./app": sv("providers/app"),
      "./color-mode": sv("providers/color-mode"),
      "./color-mode/image": sv("components/color-mode/image"),
      "./container": sv("components/ui/container"),
      "./environment": sv("providers/environment"),
      "./factory": sv("elements/factory"),
      "./icon": sv("elements/icon"),
      "./image": sv("elements/image"),
      "./interaction": sv("providers/interaction"),
      "./keyboard": sv("providers/keyboard"),
      "./kit": "./dist/kit.js",
      "./link": sv("elements/link"),
      "./link/inertia": sv("base/inertia/link"),
      "./locale": sv("providers/locale"),
      "./main": sv("components/ui/main"),
      "./package.json": "./package.json",
      "./placeholder": sv("elements/placeholder"),
      "./prose/h1": sv("components/prose/h1"),
      "./prose/h2": sv("components/prose/h2"),
      "./prose/h3": sv("components/prose/h3"),
      "./prose/h4": sv("components/prose/h4"),
      "./prose/icon": sv("components/prose/icon"),
      "./types": "./dist/types/index.js",
      "./types/*": "./dist/types/*.js",
      "./ui.css": "./dist/index.css",
      "./unplugin": "./dist/unplugin.js",
      "./use-app-config": "./dist/composables/use-app-config.js",
      "./use-color-mode": "./dist/composables/use-color-mode.js",
      "./use-environment": "./dist/composables/use-environment.js",
      "./use-icon": "./dist/composables/use-icon.js",
      "./use-locale": "./dist/composables/use-locale.js",
      "./utils": "./dist/utils/index.js",
      "./utils/*": "./dist/utils/*.js",
      "./vite": "./dist/vite.js",
    }),
  },
  hooks: {
    "build:before": () => setupUI(),
    "build:done": () => cleanUI(),
  },
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
  unbundle: true,
});

function cleanUI() {
  for (const dir of globbySync(["dist/**/examples"], {
    onlyDirectories: true,
  })) {
    rmSync(dir, { force: true, recursive: true });
  }

  for (const file of globbySync(["dist/**/*.{spec,stories,test}.*"])) {
    rmSync(file);
  }
}

function sv(path: string) {
  // biome-ignore assist/source/useSortedKeys: safe_to_set
  return {
    types: fmt(path).replace(".js", ".d.ts"),
    import: fmt(path),
    svelte: fmt(path),
  };
}

function fmt(path: string) {
  return `./dist/${path}/index.js`;
}
