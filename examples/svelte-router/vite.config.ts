import ui from "@veehance/svelte/vite";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { router } from "sv-router/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [svelte(), router(), ui()],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});
