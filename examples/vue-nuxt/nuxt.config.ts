export default defineNuxtConfig({
  compatibilityDate: "2026-01-05",
  css: ["~/styles.css"],
  devtools: { enabled: false },
  future: { compatibilityVersion: 4 },
  modules: ["@nuxt/image", "@veehance/vue/nuxt"],
  srcDir: "./src",
  ui: {
    fonts: {
      family: {
        mono: "Geist Mono:400,500,600,700",
        sans: "Geist:400,500,600,700",
      },
    },
  },
});
