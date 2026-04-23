import { createPlugin } from "@veehance/core/unplugin";

import tailwind from "@tailwindcss/vite";
import fonts from "vite-plugin-webfont-dl";

import { getTemplates as template } from "./template";

export default createPlugin({
  target: "svelte",
  fonts,
  tailwind,
  template,
});
