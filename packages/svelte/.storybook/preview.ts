import { withThemeByClassName } from "@storybook/addon-themes";
import type { Decorator, Preview } from "@storybook/svelte-vite";
import { themes } from "storybook/theming";

import "./styles.css";
import LocalStorageSync from "./local-storage-sync.svelte";

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
  return {
    Component: LocalStorageSync,
    props: {
      children: Story,
      theme: context.globals.theme || "light",
    },
  };
}
