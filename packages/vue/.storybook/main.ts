import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export default {
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-themes"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],
  core: { disableTelemetry: true },
  features: { experimentalDocgenServer: true },
  framework: getAbsolutePath("@storybook/vue3-vite"),
  stories: ["../src/**/*.stories.@(ts|vue)"],
} as StorybookConfig;

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
