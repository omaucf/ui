import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

import ui from "./src/vite.js";

export default defineConfig({
  plugins: [react(), ui()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/vitest.ts"],
  },
});
