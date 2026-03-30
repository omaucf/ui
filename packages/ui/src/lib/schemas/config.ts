import { z } from "zod";

import { dtsSchema } from "./dts.js";
import { featuresSchema, frameworkSchema } from "./framework.js";
import { routerKeys } from "./keys.js";
import { registrySchema } from "./registry.js";
import { tailwindSchema } from "./tailwind.js";
import { themeSchema } from "./theme.js";
import { uiSchema } from "./ui.js";

export const rawConfigSchema = z.object({
  $schema: z.string().optional(),
  dts: dtsSchema.optional(),
  framework: frameworkSchema,
  registry: registrySchema.optional(),
  tailwind: tailwindSchema.optional(),
  theme: themeSchema.optional(),
  ui: uiSchema.pick(["colors", "components", "icons"]).optional(),
});

const routerSchema = z.union([routerKeys, z.union([z.boolean(), z.null()])]);

export const configSchema = featuresSchema.extend({
  dts: dtsSchema.optional(),
  registry: registrySchema.optional(),
  router: routerSchema.optional(),
  tailwind: tailwindSchema.optional(),
  theme: themeSchema.optional(),
  ui: uiSchema.optional(),
});
