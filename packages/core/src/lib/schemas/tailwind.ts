import { z } from "zod";

import { neutralKeys, strategyKeys } from "./keys.js";

export const tailwindSchema = z.object({
  baseColor: neutralKeys.optional(),
  css: z.string().optional(),
  cssVariables: z.boolean().optional(),
  inlines: z.array(z.string()).optional(),
  plugins: z.array(z.string()).optional(),
  sources: z.array(z.string()).optional(),
  strategy: strategyKeys.optional(),
});
