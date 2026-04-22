import { z } from "zod";

import { engineKeys, neutralKeys } from "./keys.js";

export const styleSchema = z
  .object({
    baseColor: neutralKeys,
    css: z.string(),
    cssVariables: z.boolean(),
    engine: engineKeys,
    prefix: z.string(),
    safelist: z.array(z.string()),
    sources: z.array(z.string()),
  })
  .partial();
