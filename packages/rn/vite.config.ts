import { defineConfig } from "vitest/config";

import { uniwind } from "uniwind/vite";
import { rnw } from "vite-plugin-rnw";

import ui from "./src/vite.js";

export default defineConfig({
  plugins: [
    rnw(),
    ui(),
    uniwind({
      cssEntryFile: "./src/global.css",
      dtsFile: "./uniwind-types.d.ts",
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/vitest.ts"],
  },
});
