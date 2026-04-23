export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: "./src",
  css: ["~/styles.css"],
  modules: ["@nuxt/fonts", "@nuxtjs/color-mode", "@veehance/vue/nuxt"],
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2026-01-13",
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
