import { createRequire } from "node:module";

import type { UnpluginOptions } from "unplugin";

import { encodeWebFonts } from "@/helpers/webfont.js";
import type { Config } from "@/types/schema.js";

const require = createRequire(import.meta.url);

export default function enginePlugin(config: Config, cwd = process.cwd()) {
  try {
    if (config.style?.engine === "tailwind") {
      const { default: tw } = require("@tailwindcss/vite");
      const { viteWebfontDownload: fonts } = require("vite-plugin-webfont-dl");
      return [
        config.fonts && fonts(encodeWebFonts(config)),
        tw(),
      ] as UnpluginOptions[];
    }

    if (config.style?.engine === "unocss") {
      const { default: uno } = require("unocss/vite");

      const { getUnoConfigPath } = require("../config.js");
      const { createConfig } = require("../unocss.js");

      const unoConfigPath = getUnoConfigPath(cwd);
      return [
        uno(unoConfigPath ? unoConfigPath : createConfig([], config)),
      ] as UnpluginOptions[];
    }

    return [];
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "MODULE_NOT_FOUND"
    )
      return [];
    throw error;
  }
}
