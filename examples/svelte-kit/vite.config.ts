import ui from "@veehance/svelte/kit";

import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit(), ui()],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});
