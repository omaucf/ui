import { svelteTesting } from "@testing-library/svelte/vite";
import { defineConfig } from "vitest/config";

import { svelte } from "@sveltejs/vite-plugin-svelte";

import ui from "./src/vite.js";

export default defineConfig({
  plugins: [
    svelte(),
    svelteTesting({ autoCleanup: true, resolveBrowser: true }),
    ui(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["./src/**/*.{test,spec}.ts"],
    server: { deps: { inline: ["mode-watcher", "runed"] } },
    setupFiles: ["./src/vitest.ts"],
  },
});
