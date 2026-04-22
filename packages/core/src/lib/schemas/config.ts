import { z } from "zod";

import { dtsSchema } from "./dts.js";
import { featureSchema } from "./features.js";
import { frameworkSchema } from "./framework.js";
import { routerKeys, runtimeKeys } from "./keys.js";
import { registrySchema } from "./registry.js";
import { styleSchema } from "./style.js";
import { themeSchema } from "./theme.js";
import { uiSchema } from "./ui.js";

const coreSchema = featureSchema
  .extend({
    router: z.union([routerKeys, z.boolean()]).optional(),
    target: runtimeKeys.optional(),
  })
  .strict();

export const configSchema = coreSchema
  .extend({
    dts: dtsSchema.optional(),
    registry: registrySchema.optional(),
    style: styleSchema.optional(),
    theme: themeSchema.optional(),
    ui: uiSchema.optional(),
  })
  .strict();

export const rawSchema = z
  .object({
    $schema: z.string().optional(),
    dts: dtsSchema.optional(),
    framework: frameworkSchema,
    registry: registrySchema.optional(),
    style: styleSchema.optional(),
    theme: themeSchema.optional(),
    ui: uiSchema.optional(),
  })
  .strict();
