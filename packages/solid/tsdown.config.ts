import { defineConfig } from "tsdown";

import { setupUI } from "@veehance/core/dev";

import solid from "unplugin-solid/rolldown";

import pkg from "./package.json" with { type: "json" };

const neverBundle = [...Object.keys(pkg.peerDependencies ?? {}), "#build"].map(
  (name) => new RegExp(`^${name}(/.*)?`)
);

export default defineConfig([
  {
    copy: ["src/index.css"],
    deps: { neverBundle },
    dts: true,
    entry: [
      "src/**/*.{ts,tsx}",
      "!src/**/examples/*.{ts,tsx}",
      "!src/**/*.stories.{ts,tsx}",
      "!src/**/*.{spec,test}.{ts,tsx}",
      "!src/vitest-axe.d.ts",
      "!src/vitest.ts",
    ],
    exports: {
      customExports: () => ({
        ".": "./dist/index.js",
        "./app": sld("providers/app/index"),
        "./color-mode": sld("providers/color-mode/index"),
        "./color-mode/image": sld("components/color-mode/image/index"),
        "./container": sld("components/ui/container/index"),
        "./environment": sld("providers/environment/index"),
        "./factory": sld("elements/factory/index"),
        "./icon": sld("elements/icon/index"),
        "./image": sld("elements/image/index"),
        "./interaction": sld("providers/interaction/index"),
        "./keyboard": sld("providers/keyboard/index"),
        "./link": sld("elements/link/index"),
        "./link/inertia": sld("inertia/link/index", "base"),
        "./link/start": sld("start/link/index", "base"),
        "./locale": sld("providers/locale/index"),
        "./main": sld("components/ui/main/index"),
        "./package.json": "./package.json",
        "./placeholder": sld("elements/placeholder/index"),
        "./prose/h1": sld("components/prose/h1/index"),
        "./prose/h2": sld("components/prose/h2/index"),
        "./prose/h3": sld("components/prose/h3/index"),
        "./prose/h4": sld("components/prose/h4/index"),
        "./prose/icon": sld("components/prose/icon/index"),
        "./types": "./dist/lib/types/index.js",
        "./types/*": "./dist/lib/types/*.js",
        "./ui.css": "./dist/index.css",
        "./unplugin": "./dist/unplugin.js",
        "./use-app-config": "./dist/lib/composables/use-app-config.js",
        "./use-color-mode": sld("composables/use-color-mode"),
        "./use-controllable-state":
          "./dist/lib/composables/use-controllable-state.js",
        "./use-environment": sld("composables/use-environment"),
        "./use-icon": "./dist/lib/composables/use-icon.js",
        "./use-locale": sld("composables/use-locale"),
        "./utils": "./dist/lib/utils/index.js",
        "./utils/*": "./dist/lib/utils/*.js",
        "./vite": "./dist/vite.js",
      }),
    },
    hooks: {
      "build:before": () => setupUI(),
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
      "src/base/{inertia,start}/**/index.ts",
      "src/lib/{components,elements,providers}/**/index.ts",
      "!src/**/examples/*.tsx",
      "!src/**/*.stories.tsx",
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

function sld(path: string, scope = "lib") {
  // biome-ignore assist/source/useSortedKeys: safe_to_set
  return {
    solid: `./dist/${scope}/${path}.jsx`,
    // biome-ignore assist/source/useSortedKeys: safe_to_set
    import: {
      types: `./dist/${scope}/${path}.d.ts`,
      default: `./dist/${scope}/${path}.js`,
    },
  };
}
