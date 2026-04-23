import { z } from "zod";

import { COMMON_ADAPTERS, CUSTOM_ADAPTERS } from "../constants/framework.js";
import { isString } from "../utils/assertion.js";
import { adapterKeys, runtimeKeys } from "./keys.js";

type Runtime = keyof typeof CUSTOM_ADAPTERS;
type Target = {
  [R in Runtime]:
    | `${R}:${(typeof COMMON_ADAPTERS)[number]}`
    | `${R}:${(typeof CUSTOM_ADAPTERS)[R][number]}`;
}[Runtime];

const targetSchema = z.custom<Target>((value) => {
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

  const customAdapters = CUSTOM_ADAPTERS[validPlatform];
  if (!customAdapters) return false;
  return (customAdapters as readonly string[]).includes(validAdapter);
});

export const featureSchema = z.object({
  colorMode: z.boolean().optional(),
  content: z.boolean().optional(),
  fonts: z.boolean().optional(),
  image: z.boolean().optional(),
  locale: z.boolean().optional(),
  prose: z.boolean().optional(),
});

export const frameworkSchema = z.union([
  targetSchema,
  z.tuple([targetSchema, featureSchema]),
]);
