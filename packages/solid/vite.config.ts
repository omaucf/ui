import { defineConfig } from "vitest/config";

import solid from "vite-plugin-solid";

import ui from "./src/vite.js";

export default defineConfig({
  plugins: [solid(), ui()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/vitest.ts"],
  },
});
