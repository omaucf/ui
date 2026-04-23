import { defu } from "defu";

import { default as defaults } from "../defaults.js";
import { configSchema } from "../schemas/config.js";
import type { Config, Raw } from "../types/schema.js";
import { omit } from "../utils/object.js";
import { parseFramework, parseOutput, parseRouter } from "./parse.js";

export function resolveConfig(config: Raw | null) {
  if (!config) return null;
  const {
    runtime: target,
    adapter,
    features,
  } = parseFramework(config.framework);
  return configSchema.parse({
    ...features,
    dts: { ...config.dts, output: parseOutput(adapter, config.dts?.output) },
    router: parseRouter(adapter),
    target,
    ...omit(config, ["framework", "dts"]),
  });
}

export function resolveOptions(...layers: (Config | null | undefined)[]) {
  return configSchema.parse(
    layers
      .filter((layer): layer is Config => layer != null)
      .reduce<Config>((acc, layer) => defu(layer, acc), omit(defaults, ["ui"]))
  );
}
