import { z } from "zod";

import { FEATURE_DEFAULTS } from "@/defaults.js";
import type { MaybePromise } from "@/types/abstract.js";

import {
  colorModeFallbackKeys,
  colorModePreferenceKeys,
  fontProviderKeys,
  iconModeKeys,
  imageProviderKeys,
  localeDirKeys,
} from "./keys.js";

const colorModeSchema = z
  .object({
    enableColorScheme: z.boolean(),
    enableSystem: z.boolean(),
    fallback: z.union([colorModeFallbackKeys, z.string()]),
    preference: colorModePreferenceKeys,
    storageKey: z.string(),
  })
  .partial();

const fontFamilySchema = z.record(
  z.string(),
  z.union([
    z.string(),
    z.array(z.string()),
    z.object({
      name: z.string(),
      provider: fontProviderKeys.optional(),
      weights: z.array(z.union([z.number(), z.string()])).optional(),
    }),
  ])
);

const fontsSchema = z
  .object({
    family: fontFamilySchema,
    provider: fontProviderKeys,
  })
  .partial();

const collectionsSchema = z.record(
  z.string(),
  z.custom<
    | (() => MaybePromise<any>)
    | undefined
    | ((name: string) => MaybePromise<string | undefined>)
    | Record<string, string | (() => MaybePromise<string | undefined>)>
  >()
);

const iconsSchema = z
  .object({
    collections: collectionsSchema,
    collectionsNames: z.array(z.string()),
    mode: iconModeKeys,
    prefix: z.string(),
    scale: z.number(),
    unit: z.string(),
  })
  .partial();

const imageSchema = z
  .object({
    provider: imageProviderKeys,
  })
  .partial();

const headingsSchema = z
  .object({
    anchorLinks: z.object({
      h1: z.boolean().optional(),
      h2: z.boolean().optional(),
      h3: z.boolean().optional(),
      h4: z.boolean().optional(),
    }),
  })
  .partial();

const localeSchema = z
  .object({
    dir: localeDirKeys,
    lang: z.string(),
  })
  .partial();

const proseSchema = z
  .object({
    headings: headingsSchema,
  })
  .partial();

export const featureSchema = z
  .object({
    colorMode: booleanOrObject(colorModeSchema, FEATURE_DEFAULTS.colorMode),
    fonts: booleanOrObject(fontsSchema, FEATURE_DEFAULTS.fonts),
    icons: booleanOrObject(iconsSchema, FEATURE_DEFAULTS.icons),
    image: booleanOrObject(imageSchema, FEATURE_DEFAULTS.image),
    locale: booleanOrObject(localeSchema, FEATURE_DEFAULTS.locale),
    prose: booleanOrObject(proseSchema, FEATURE_DEFAULTS.prose),
  })
  .partial();

function booleanOrObject<
  TSchema extends z.ZodObject<any>,
  TDefaults extends z.infer<TSchema>,
>(schema: TSchema, defaults: TDefaults) {
  return z
    .union([z.boolean(), schema])
    .transform<false | z.infer<TSchema>>((value) => {
      if (value === false) return false as const;
      if (value === true) return structuredClone(defaults);
      return { ...structuredClone(defaults), ...value };
    });
}
