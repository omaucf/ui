import { z } from "zod";

import { iconsetKeys, presetKeys } from "./keys.js";

export const themeSchema = z
  .object({
    colors: z.array(z.string()),
    iconset: iconsetKeys,
    preset: presetKeys,
    transitions: z.boolean(),
    unstyled: z.boolean(),
  })
  .partial();
