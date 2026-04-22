import { defineConfig } from "vite";

import ui from "@veehance/solid/vite";

import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    tanstackStart({ router: { routesDirectory: "app" }, srcDirectory: "src" }),
    solid({ ssr: true }),
    ui({
      fonts: {
        family: { mono: "Geist Mono:400,500,600,700", sans: "Geist:400,500,600,700" },
      },
    }),
  ],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});
