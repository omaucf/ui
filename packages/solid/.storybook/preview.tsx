import { withThemeByClassName } from "@storybook/addon-themes";
import { themes } from "storybook/theming";
import type { Decorator, Preview } from "storybook-solidjs-vite";

import "./styles.css";

export default {
  decorators: [
    withLocalStorageSync,
    withThemeByClassName({
      defaultTheme: "light",
      themes: { dark: "dark", light: "" },
    }),
  ],
  parameters: {
    actions: { disable: true },
    backgrounds: { disable: true },
    controls: { disable: true },
    darkMode: { dark: themes.dark, light: themes.normal, stylePreview: true },
    layout: "centered",
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Components", ["ColorMode", "UI"], "Providers", "Utilities"],
      },
    },
    viewport: { disable: true },
  },
} as Preview;

function withLocalStorageSync(
  Story: Parameters<Decorator>[0],
  context: Parameters<Decorator>[1]
) {
  const currentTheme = context.globals.theme || "light";

  localStorage.setItem("ui-theme", currentTheme);
  window.dispatchEvent(
    new StorageEvent("storage", { key: "ui-theme", newValue: currentTheme })
  );

  return Story();
}
