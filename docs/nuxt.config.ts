export default defineNuxtConfig({
  compatibilityDate: "2026-01-05",
  css: ["~/styles.css"],
  devtools: { enabled: false },
  future: { compatibilityVersion: 4 },
  modules: ["@nuxt/fonts", "@nuxt/image", "@veehance/vue/nuxt"],
  srcDir: "./app",
});
