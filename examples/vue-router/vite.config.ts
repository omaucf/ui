import ui from "@veehance/vue/vite";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [ui(), vue()],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});
