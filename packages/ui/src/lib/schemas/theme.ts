import { z } from "zod";

import {
  colorKeys,
  iconKeys,
  iconsetKeys,
  presetKeys,
  sizeKeys,
} from "./keys.js";

const defaultVariantsSchema = z.object({
  color: z.union([colorKeys, z.string()]).optional(),
  size: z.union([sizeKeys, z.string()]).optional(),
});

export const _iconsetSchema = z
  .object(
    Object.fromEntries(
      iconKeys.options.map((key) => [key, z.string().optional()])
    ) as Record<z.infer<typeof iconKeys>, z.ZodOptional<z.ZodString>>
  )
  .catchall(z.string());

export const iconsetSchema = z.union([
  iconsetKeys,
  z.tuple([iconsetKeys, _iconsetSchema.partial()]),
]);

export const _presetSchema = z
  .object({
    icon: z
      .object({ dynamic: z.boolean().optional(), size: z.number().optional() })
      .optional(),
  })
  .catchall(z.any());

export const presetSchema = z.union([
  presetKeys,
  z.tuple([presetKeys, _presetSchema.partial()]),
]);

export const themeSchema = z.object({
  colors: z.array(z.string()).optional(),
  defaultVariants: defaultVariantsSchema.optional(),
  iconset: iconsetSchema.optional(),
  preset: presetSchema.optional(),
  transitions: z.boolean().optional(),
});
