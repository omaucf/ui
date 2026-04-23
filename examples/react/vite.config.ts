import ui from "@veehance/react/vite";

import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    devtools(),
    nitro(),
    tanstackStart({ router: { routesDirectory: "app" }, srcDirectory: "src" }),
    react(),
    ui(),
  ],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});
