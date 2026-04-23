import { createPlugin } from "@veehance/core/unplugin";

import tailwind from "@tailwindcss/vite";
import fonts from "vite-plugin-webfont-dl";

import { pluginPlugin as environment } from "./plugin/plugin.js";
import { getTemplates as template } from "./template.js";

export default createPlugin({
  target: "vue",
  environment,
  fonts,
  tailwind,
  template,
});
