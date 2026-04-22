import { defineConfig } from "vite";

import ui from "@veehance/svelte/kit";

import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [
    sveltekit(),
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
