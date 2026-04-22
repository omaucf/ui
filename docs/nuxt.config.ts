import ui from "@iueev/vue/vite";

export default defineNuxtConfig({
  compatibilityDate: "2026-01-05",
  css: ["~/styles.css"],
  devtools: { enabled: false },
  future: { compatibilityVersion: 4 },
  srcDir: "./app",
  vite: { plugins: [ui()] },
});
