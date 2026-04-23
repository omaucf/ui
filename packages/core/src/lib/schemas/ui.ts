import { z } from "zod";

import {
  accentKeys,
  iconKeys,
  neutralKeys,
  routerKeys,
  shadeKeys,
} from "./keys.js";

const colorSchema = z
  .object({
    neutral: z
      .union([neutralKeys, z.string(), z.record(shadeKeys, z.string())])
      .optional(),
  })
  .catchall(z.union([accentKeys, z.string(), z.record(shadeKeys, z.string())]));

const componentSchema = z
  .object({
    icon: z
      .object({
        dynamic: z.boolean().optional(),
        size: z.number().optional(),
      })
      .optional(),
  })
  .catchall(z.any());

const iconSchema = z
  .object(
    Object.fromEntries(
      iconKeys.options.map((key) => [key, z.string().optional()])
    ) as Record<z.infer<typeof iconKeys>, z.ZodOptional<z.ZodString>>
  )
  .catchall(z.string());

const twSchema = z.object({
  merge: z.boolean().optional(),
  options: z
    .object({ prefix: z.string().optional() })
    .catchall(z.any())
    .optional(),
});

export const routerSchema = z.union([routerKeys, z.boolean(), z.null()]);

export const uiSchema = z.object({
  colors: colorSchema.optional(),
  components: componentSchema.optional(),
  icons: iconSchema.optional(),
  tw: twSchema.optional(),
});
