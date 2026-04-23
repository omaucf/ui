import type { z } from "zod";

import type { configSchema, rawSchema } from "../schemas/config.js";
import type { dtsSchema } from "../schemas/dts.js";
import type { frameworkSchema } from "../schemas/framework.js";
import type {
  accentKeys,
  adapterKeys,
  colorKeys,
  iconKeys,
  iconsetKeys,
  neutralKeys,
  presetKeys,
  routerKeys,
  runtimeKeys,
  shadeKeys,
  sizeKeys,
  strategyKeys,
} from "../schemas/keys.js";
import type { tailwindSchema } from "../schemas/tailwind.js";
import type { themeSchema } from "../schemas/theme.js";
import type { uiSchema } from "../schemas/ui.js";
import type { Prettify } from "./abstract.js";

export type Config = z.infer<typeof configSchema>;

export type Raw = z.infer<typeof rawSchema>;

export type Schema = Prettify<{
  dts: z.infer<typeof dtsSchema>;
  framework: z.infer<typeof frameworkSchema>;
  tailwind: z.infer<typeof tailwindSchema>;
  theme: z.infer<typeof themeSchema>;
  ui: z.infer<typeof uiSchema>;
}>;

export type Token = Prettify<{
  accent: z.infer<typeof accentKeys>;
  adapter: z.infer<typeof adapterKeys>;
  color: z.infer<typeof colorKeys>;
  icon: z.infer<typeof iconKeys>;
  iconset: z.infer<typeof iconsetKeys>;
  neutral: z.infer<typeof neutralKeys>;
  preset: z.infer<typeof presetKeys>;
  router: z.infer<typeof routerKeys>;
  runtime: z.infer<typeof runtimeKeys>;
  shade: z.infer<typeof shadeKeys>;
  size: z.infer<typeof sizeKeys>;
  strategy: z.infer<typeof strategyKeys>;
}>;
