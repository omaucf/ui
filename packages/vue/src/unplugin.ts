import type { PluginOptions as BaseOptions } from "@veehance/core/types";
import { createPlugin } from "@veehance/core/unplugin";

import type {} from "unplugin";

import component from "./plugin/component.js";
import plugin from "./plugin/plugin.js";

export interface PluginOptions extends Omit<BaseOptions, "router"> {
  router?: boolean | "inertia" | "start";
}

export default createPlugin<PluginOptions>({
  component,
  plugin,
  target: "vue",
});
