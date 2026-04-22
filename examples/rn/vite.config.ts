import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
import { uniwind } from "uniwind/vite";
import { rnw } from "vite-plugin-rnw";

export default defineConfig({
  plugins: [
    rnw(),
    tailwindcss(),
    uniwind({
      cssEntryFile: "./src/global.css",
      dtsFile: "./uniwind-types.d.ts",
    }),
  ],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});
