import { defineLocale } from "../lib/helpers/locale.js";
import type { Messages } from "../lib/types/locale.js";

export default defineLocale<Messages>({
  name: "English",
  code: "en",
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
  },
});
