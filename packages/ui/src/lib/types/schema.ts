import type { z } from "zod";

import type { configSchema, rawConfigSchema } from "../schemas/config.js";
import type { dtsSchema } from "../schemas/dts.js";
import type {
  _frameworkSchema,
  frameworkSchema,
} from "../schemas/framework.js";
import type {
  baseColorKeys,
  colorKeys,
  iconKeys,
  iconsetKeys,
  presetKeys,
  routerKeys,
  sizeKeys,
  strategyKeys,
} from "../schemas/keys.js";
import type { registrySchema } from "../schemas/registry.js";
import type {
  _strategySchema,
  strategySchema,
  tailwindSchema,
} from "../schemas/tailwind.js";
import type {
  _iconsetSchema,
  _presetSchema,
  iconsetSchema,
  presetSchema,
  themeSchema,
} from "../schemas/theme.js";
import type { uiSchema } from "../schemas/ui.js";
import type { Prettify } from "./abstract.js";

type Mode = "infer" | "input";

type Infer<T> = z.infer<T>;
type Input<T> = z.input<T>;

export type Config<M extends Mode = "infer"> = Prettify<
  M extends "input" ? Input<typeof configSchema> : Infer<typeof configSchema>
>;

export type Raw<M extends Mode = "infer"> = Prettify<
  M extends "input"
    ? Input<typeof rawConfigSchema>
    : Infer<typeof rawConfigSchema>
>;

export type Macro<M extends Mode = "input"> = Prettify<{
  framework: M extends "input"
    ? Input<typeof frameworkSchema>
    : Infer<typeof _frameworkSchema>;
  iconset: M extends "input"
    ? Input<typeof iconsetSchema>
    : Infer<typeof _iconsetSchema>;
  preset: M extends "input"
    ? Input<typeof presetSchema>
    : Infer<typeof _presetSchema>;
  strategy: M extends "input"
    ? Input<typeof strategySchema>
    : Infer<typeof _strategySchema>;
}>;

export type Schema = Prettify<{
  dts: Infer<typeof dtsSchema>;
  framework: Infer<typeof frameworkSchema>;
  registry: Infer<typeof registrySchema>;
  tailwind: Infer<typeof tailwindSchema>;
  theme: Infer<typeof themeSchema>;
  ui: Infer<typeof uiSchema>;
}>;

export type Token = Prettify<{
  baseColor: Infer<typeof baseColorKeys>;
  color: Infer<typeof colorKeys>;
  icon: Infer<typeof iconKeys>;
  iconset: Infer<typeof iconsetKeys>;
  preset: Infer<typeof presetKeys>;
  router: Infer<typeof routerKeys>;
  size: Infer<typeof sizeKeys>;
  strategy: Infer<typeof strategyKeys>;
}>;
