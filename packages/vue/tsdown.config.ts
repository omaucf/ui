import { defineConfig } from "tsdown";

import { setupUI } from "@veehance/core/dev";

import vue from "unplugin-vue/rolldown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  deps: {
    neverBundle: [...Object.keys(pkg.peerDependencies || {}), "#build"].map(
      (name) => new RegExp(`^${name}(/.*)?`)
    ),
  },
  dts: { vue: true },
  entry: [
    "src/**/*.{ts,vue}",
    "!src/**/examples/*.{ts,vue}",
    "!src/**/*.stories.{ts,vue}",
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
      "./image/nuxt": "./dist/base/elements/nuxt/image/index.js",
      "./interaction": "./dist/lib/providers/interaction/index.js",
      "./keyboard": "./dist/lib/providers/keyboard/index.js",
      "./link": "./dist/lib/elements/link/index.js",
      "./link/inertia": "./dist/base/elements/inertia/link/index.js",
      "./link/nuxt": "./dist/base/elements/nuxt/link/index.js",
      "./link/router": "./dist/base/elements/router/link/index.js",
      "./link/start": "./dist/base/elements/start/link/index.js",
      "./locale": "./dist/lib/providers/locale/index.js",
      "./main": "./dist/lib/components/ui/main/index.js",
      "./nuxt": "./dist/nuxt.js",
      "./package.json": "./package.json",
      "./placeholder": "./dist/lib/elements/placeholder/index.js",
      "./plugin": "./plugin.d.ts",
      "./prose/h1": "./dist/lib/components/prose/h1/index.js",
      "./prose/h2": "./dist/lib/components/prose/h2/index.js",
      "./prose/h3": "./dist/lib/components/prose/h3/index.js",
      "./prose/h4": "./dist/lib/components/prose/h4/index.js",
      "./prose/icon": "./dist/lib/components/prose/icon/index.js",
      "./types": "./dist/lib/types/index.js",
      "./types/*": "./dist/lib/types/*.js",
      "./ui.css": "./dist/index.css",
      "./unplugin": "./dist/unplugin.js",
      "./use-app-config": "./dist/base/composables/use-app-config.js",
      "./use-color-mode": "./dist/lib/composables/use-color-mode.js",
      "./use-emit-as-props": "./dist/lib/composables/use-emit-as-props.js",
      "./use-environment": "./dist/lib/composables/use-environment.js",
      "./use-forward-expose": "./dist/lib/composables/use-forward-expose.js",
      "./use-forward-props": "./dist/lib/composables/use-forward-props.js",
      "./use-forward-props-emits":
        "./dist/lib/composables/use-forward-props-emits.js",
      "./use-icon": "./dist/lib/composables/use-icon.js",
      "./use-locale": "./dist/lib/composables/use-locale.js",
      "./use-nuxt-app": "./dist/base/composables/use-nuxt-app.js",
      "./use-route": "./dist/base/composables/use-route.js",
      "./use-route/inertia": "./dist/base/composables/inertia/use-route.js",
      "./use-scope-id": "./dist/lib/composables/use-scope-id.js",
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
  plugins: [vue({ isProduction: true })],
  unbundle: true,
});
