import { z } from "zod";

import { accentKeys, iconKeys, neutralKeys, shadeKeys } from "./keys.js";

const colorSchema = z
  .object({ neutral: z.union([neutralKeys, z.record(shadeKeys, z.string())]) })
  .partial()
  .catchall(z.union([accentKeys, z.record(shadeKeys, z.string())]));

const iconSchema = z
  .object(
    Object.fromEntries(
      iconKeys.options.map((key) => [key, z.string()])
    ) as Record<z.infer<typeof iconKeys>, z.ZodString>
  )
  .partial()
  .catchall(z.string());

const strategySchema = z
  .object({
    merge: z.boolean(),
    options: z.object({ prefix: z.string().optional() }).catchall(z.any()),
  })
  .partial();

export const uiSchema = z
  .object({
    colors: colorSchema,
    components: z.custom<Record<string, any>>(),
    icons: iconSchema,
    strategy: strategySchema,
  })
  .partial();
