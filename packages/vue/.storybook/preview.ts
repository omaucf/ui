import { withThemeByClassName } from "@storybook/addon-themes";
import { type Decorator, type Preview, setup } from "@storybook/vue3-vite";
import { themes } from "storybook/theming";

import ui from "@veehance/vue/plugin";

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

setup((app) => {
  app.use(ui);
});

function withLocalStorageSync(
  Story: Parameters<Decorator>[0],
  context: Parameters<Decorator>[1]
) {
  const currentTheme = context.globals.theme || "light";

  localStorage.setItem("ui-theme", currentTheme);
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "ui-theme",
      newValue: currentTheme,
    })
  );

  return {
    components: { Story },
    template: "<story />",
  };
}
