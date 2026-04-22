import { createRequire } from "node:module";

import type { UnpluginOptions } from "unplugin";

const require = createRequire(import.meta.url);

export default function enginePlugin() {
  try {
    const { default: tw } = require("@tailwindcss/vite");
    return [tw()] as UnpluginOptions[];
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
