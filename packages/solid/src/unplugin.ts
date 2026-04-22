import type { PluginOptions as BaseOptions } from "@veehance/core/types";
import { createPlugin } from "@veehance/core/unplugin";

import type {} from "unplugin";

export interface PluginOptions extends Omit<BaseOptions, "router"> {
  router?: boolean | "inertia" | "start";
}

export default createPlugin<PluginOptions>({ target: "solid" });
