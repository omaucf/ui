import { z } from "zod";

import { dtsSchema } from "./dts.js";
import { featureSchema, frameworkSchema } from "./framework.js";
import { runtimeKeys as targetSchema } from "./keys.js";
import { tailwindSchema } from "./tailwind.js";
import { themeSchema } from "./theme.js";
import { routerSchema, uiSchema } from "./ui.js";

const coreSchema = featureSchema.extend({
  router: routerSchema.optional(),
  target: targetSchema.optional(),
});

export const configSchema = coreSchema.extend({
  dts: dtsSchema.optional(),
  tailwind: tailwindSchema.optional(),
  theme: themeSchema.optional(),
  ui: uiSchema.optional(),
});

export const rawSchema = z.object({
  $schema: z.string().optional(),
  framework: frameworkSchema,
  dts: dtsSchema.optional(),
  tailwind: tailwindSchema.optional(),
  theme: themeSchema.optional(),
  ui: uiSchema.optional(),
});
