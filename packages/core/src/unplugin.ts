import { sift } from "radashi";
import {
  createUnplugin,
  type UnpluginInstance,
  type UnpluginOptions,
} from "unplugin";

import engine from "./plugin/engine.js";

export interface PluginConfig {
  target?: "react" | "rn" | "solid" | "svelte" | "vue";
}

export function createPlugin<T>(
  _config: PluginConfig
): UnpluginInstance<T | undefined, boolean> {
  return createUnplugin<T | undefined>(
    () => sift([...engine()]).flat(1) as UnpluginOptions[]
  );
}
