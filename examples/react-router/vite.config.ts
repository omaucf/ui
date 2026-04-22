import { defineConfig } from "vite";

import ui from "@veehance/react/vite";

import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [
    reactRouter(),
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
