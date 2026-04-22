import { defineConfig } from "vite";

import ui from "@veehance/svelte/vite";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { router } from "sv-router/vite-plugin";

export default defineConfig({
  plugins: [
    svelte(),
    router(),
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
