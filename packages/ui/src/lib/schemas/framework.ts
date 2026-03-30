import { isString } from "radash";
import { z } from "zod";

import { COMMON_ADAPTERS, CUSTOM_ADAPTERS } from "../constants/framework.js";
import { adapterKeys, runtimeKeys } from "./keys.js";

export const featuresSchema = z.object({
  colorMode: z.boolean().optional(),
  content: z.boolean().optional(),
  fonts: z.boolean().optional(),
  icon: z.boolean().optional(),
  image: z.boolean().optional(),
  locale: z.boolean().optional(),
  prose: z.boolean().optional(),
});

const frameworkNameSchema = z.custom<
  | `${"react" | "vue"}:${(typeof COMMON_ADAPTERS)[number]}`
  | `react:${(typeof CUSTOM_ADAPTERS.REACT)[number]}`
  | `vue:${(typeof CUSTOM_ADAPTERS.VUE)[number]}`
>((value) => {
  if (!(isString(value) && value.includes(":"))) return false;
  const [runtime, adapter] = value.split(":") as [string, string];

  const runtimeResult = runtimeKeys.safeParse(runtime);
  if (!runtimeResult.success) return false;
  const validPlatform = runtimeResult.data;

  const adapterResult = adapterKeys.safeParse(adapter);
  if (!adapterResult.success) return false;
  const validAdapter = adapterResult.data;

  const defaultAdapters = COMMON_ADAPTERS;
  if ((defaultAdapters as readonly string[]).includes(validAdapter))
    return true;

  const customAdapters = CUSTOM_ADAPTERS[upper(validPlatform)];
  if (!customAdapters) return false;
  return (customAdapters as readonly string[]).includes(validAdapter);
});

export const _frameworkSchema = z.object({
  runtime: runtimeKeys,
  adapter: adapterKeys,
  features: z.custom<z.output<typeof featuresSchema>>(),
});

export const frameworkSchema = z
  .union([
    frameworkNameSchema,
    z.tuple([frameworkNameSchema, featuresSchema.partial()]),
  ])
  .transform((value): z.infer<typeof _frameworkSchema> => {
    const [name, userFeatures] = isString(value) ? [value, undefined] : value;
    const [runtime, adapter] = name.split(":") as [
      z.infer<typeof runtimeKeys>,
      z.infer<typeof adapterKeys>,
    ];

    const features = featuresSchema.parse(userFeatures ?? {});
    return { runtime, adapter, features };
  })
  .pipe(_frameworkSchema);

function upper<T extends string>(v: T) {
  return v.toUpperCase() as Uppercase<T>;
}
