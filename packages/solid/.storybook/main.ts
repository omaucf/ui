import type { StorybookConfig } from "storybook-solidjs-vite";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export default {
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-themes"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],
  core: { disableTelemetry: true },
  framework: "storybook-solidjs-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
} as StorybookConfig;

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
