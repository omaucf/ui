import type { Options } from "../types/ui.js";

export function generateAppConfig(options: Options = {}) {
  return `export default ${JSON.stringify({ colorMode: !!options?.colorMode, ui: options?.ui }, null, 2)}\n`;
}
