import { defineLocale } from "@/functions/locale.js";
import type { Messages } from "@/types/locale.js";

// biome-ignore assist/source/useSortedKeys: safe_to_set
export default defineLocale<Messages>({
  code: "en-US",
  name: "English",
  messages: {
    colorMode: {
      dark: "Dark",
      light: "Light",
      switchToDark: "Switch to dark mode",
      switchToLight: "Switch to light mode",
      system: "System",
    },
    error: {
      clear: "Back to home",
    },
    header: {
      close: "Close menu",
      open: "Open menu",
    },
  },
});
