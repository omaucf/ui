import { sveltekit } from "@sveltejs/kit/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    sveltekit(),
    svelteTesting({ resolveBrowser: true, autoCleanup: true }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/vitest.ts"],
  },
});
