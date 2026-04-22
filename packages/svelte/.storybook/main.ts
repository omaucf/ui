import type { StorybookConfig } from "@storybook/svelte-vite";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export default {
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-svelte-csf"),
    getAbsolutePath("@storybook/addon-themes"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],
  core: { disableTelemetry: true },
  framework: getAbsolutePath("@storybook/svelte-vite"),
  stories: ["../src/**/*.stories.@(ts|svelte)"],
} as StorybookConfig;

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
