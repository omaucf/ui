import { defineConfig } from "vitest/config";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import ui from "./src/vite.js";

export default defineConfig({
  plugins: [vue(), vueJsx(), ui()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/vitest.ts"],
  },
});
