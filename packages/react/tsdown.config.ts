import { defineConfig } from "tsdown";

import { setupUI } from "@veehance/core/dev";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  deps: {
    neverBundle: [...Object.keys(pkg.peerDependencies || {}), "#build"].map(
      (name) => new RegExp(`^${name}(/.*)?`)
    ),
  },
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
      "./app": "./dist/lib/providers/app/index.js",
      "./color-mode": "./dist/lib/providers/color-mode/index.js",
      "./color-mode/image": "./dist/lib/components/color-mode/image/index.js",
      "./container": "./dist/lib/components/ui/container/index.js",
      "./environment": "./dist/lib/providers/environment/index.js",
      "./factory": "./dist/lib/elements/factory/index.js",
      "./icon": "./dist/lib/elements/icon/index.js",
      "./image": "./dist/lib/elements/image/index.js",
      "./image/next": "./dist/base/next/image/index.js",
      "./interaction": "./dist/lib/providers/interaction/index.js",
      "./keyboard": "./dist/lib/providers/keyboard/index.js",
      "./link": "./dist/lib/elements/link/index.js",
      "./link/inertia": "./dist/base/inertia/link/index.js",
      "./link/next": "./dist/base/next/link/index.js",
      "./link/router": "./dist/base/router/link/index.js",
      "./link/start": "./dist/base/start/link/index.js",
      "./locale": "./dist/lib/providers/locale/index.js",
      "./main": "./dist/lib/components/ui/main/index.js",
      "./next": "./dist/next.js",
      "./package.json": "./package.json",
      "./placeholder": "./dist/lib/elements/placeholder/index.js",
      "./prose/h1": "./dist/lib/components/prose/h1/index.js",
      "./prose/h2": "./dist/lib/components/prose/h2/index.js",
      "./prose/h3": "./dist/lib/components/prose/h3/index.js",
      "./prose/h4": "./dist/lib/components/prose/h4/index.js",
      "./prose/icon": "./dist/lib/components/prose/icon/index.js",
      "./types": "./dist/lib/types/index.js",
      "./types/*": "./dist/lib/types/*.js",
      "./ui.css": "./dist/index.css",
      "./unplugin": "./dist/unplugin.js",
      "./use-app-config": "./dist/lib/composables/use-app-config.js",
      "./use-color-mode": "./dist/lib/composables/use-color-mode.js",
      "./use-composed-refs": "./dist/lib/composables/use-composed-refs.js",
      "./use-controllable-state":
        "./dist/lib/composables/use-controllable-state.js",
      "./use-debounce": "./dist/lib/composables/use-debounce.js",
      "./use-effect-once": "./dist/lib/composables/use-effect-once.js",
      "./use-environment": "./dist/lib/composables/use-environment.js",
      "./use-event": "./dist/lib/composables/use-event.js",
      "./use-icon": "./dist/lib/composables/use-icon.js",
      "./use-locale": "./dist/lib/composables/use-locale.js",
      "./use-safe-layout-effect":
        "./dist/lib/composables/use-safe-layout-effect.js",
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
  unbundle: true,
});
