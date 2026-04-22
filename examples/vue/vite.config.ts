import { defineConfig } from "vite";

import ui from "@veehance/vue/vite";

import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackRouter({ autoCodeSplitting: true, target: "vue" }),
    ui({
      fonts: {
        family: { mono: "Geist Mono:400,500,600,700", sans: "Geist:400,500,600,700" },
      },
    }),
    vue(),
  ],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});
