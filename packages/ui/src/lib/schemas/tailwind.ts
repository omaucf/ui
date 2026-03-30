import { z } from "zod";

import { strategyKeys } from "./keys.js";

const twSchema = z.object({ prefix: z.string().optional() }).catchall(z.any());

export const _strategySchema = z.object({
  merge: z.boolean(),
  options: twSchema.optional(),
});

export const strategySchema = z.union([
  strategyKeys,
  z.tuple([strategyKeys, twSchema.optional()]),
]);

export const tailwindSchema = z.object({
  strategy: strategySchema.optional(),
  css: z.string().optional(),
  cssVariables: z.boolean().optional(),
  inlines: z.array(z.string()).optional(),
  plugins: z.array(z.string()).optional(),
  sources: z.array(z.string()).optional(),
});
