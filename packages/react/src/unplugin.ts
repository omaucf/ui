import { createPlugin } from "@veehance/core/unplugin";

import tailwind from "@tailwindcss/vite";
import fonts from "vite-plugin-webfont-dl";

import { getTemplates as template } from "./template.js";

export default createPlugin({
  target: "react",
  fonts,
  tailwind,
  template,
});
