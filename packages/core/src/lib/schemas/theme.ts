import { z } from "zod";

import { colorKeys, iconsetKeys, presetKeys, sizeKeys } from "./keys.js";

const defaultVariantsSchema = z.object({
  color: z.union([colorKeys, z.string()]).optional(),
  size: z.union([sizeKeys, z.string()]).optional(),
});

export const themeSchema = z.object({
  defaultVariants: defaultVariantsSchema.optional(),
  colors: z.array(z.string()).optional(),
  iconset: iconsetKeys.optional(),
  preset: presetKeys.optional(),
  transitions: z.boolean().optional(),
});
