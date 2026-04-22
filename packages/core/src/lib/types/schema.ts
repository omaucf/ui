import type { z } from "zod";

import type { configSchema, rawSchema } from "@/schemas/config.js";
import type { dtsSchema } from "@/schemas/dts.js";
import type { frameworkSchema } from "@/schemas/framework.js";
import type {
  accentKeys,
  adapterKeys,
  colorKeys,
  colorModeFallbackKeys,
  colorModePreferenceKeys,
  fontProviderKeys,
  iconKeys,
  iconModeKeys,
  iconsetKeys,
  imageProviderKeys,
  localeDirKeys,
  neutralKeys,
  proseHeadingKeys,
  routerKeys,
  runtimeKeys,
  shadeKeys,
} from "@/schemas/keys.js";
import type { registrySchema } from "@/schemas/registry.js";
import type { styleSchema } from "@/schemas/style.js";
import type { themeSchema } from "@/schemas/theme.js";
import type { uiSchema } from "@/schemas/ui.js";

import type { DeepPartial, Id } from "./abstract.js";

export type Config = z.infer<typeof configSchema>;
export type ConfigInput = z.input<typeof configSchema>;

export type Raw = z.infer<typeof rawSchema>;
export type RawInput = z.input<typeof rawSchema>;

export type ColorModeConfig = Id<{
  enableColorScheme: boolean;
  enableSystem: boolean;
  fallback: z.infer<typeof colorModeFallbackKeys>;
  preference: z.infer<typeof colorModePreferenceKeys>;
  storageKey: string;
}>;

export type FontsConfig = Id<{
  provider: z.infer<typeof fontProviderKeys>;
}>;

export type IconsConfig = Id<{
  mode: "svg" | z.infer<typeof iconModeKeys>;
  prefix: string;
}>;

export type ImageConfig = Id<{
  provider: z.infer<typeof imageProviderKeys>;
}>;

export type LocaleConfig = Id<{
  dir: z.infer<typeof localeDirKeys>;
  lang: string;
}>;

export type ProseConfig = Id<{
  headings: { anchorLinks: Record<z.infer<typeof proseHeadingKeys>, boolean> };
}>;

export type Feature = Id<{
  colorMode: Partial<ColorModeConfig>;
  fonts: Partial<FontsConfig>;
  icons: Partial<IconsConfig>;
  image: Partial<ImageConfig>;
  locale: Partial<LocaleConfig>;
  prose: DeepPartial<ProseConfig>;
}>;

export type Schema = Id<{
  dts: z.infer<typeof dtsSchema>;
  framework: z.infer<typeof frameworkSchema>;
  registry: z.infer<typeof registrySchema>;
  style: z.infer<typeof styleSchema>;
  theme: z.infer<typeof themeSchema>;
  ui: z.infer<typeof uiSchema>;
}>;

export type Token = Id<{
  accent: z.infer<typeof accentKeys>;
  adapter: z.infer<typeof adapterKeys>;
  color: z.infer<typeof colorKeys>;
  icon: z.infer<typeof iconKeys>;
  iconset: z.infer<typeof iconsetKeys>;
  neutral: z.infer<typeof neutralKeys>;
  router: z.infer<typeof routerKeys>;
  runtime: z.infer<typeof runtimeKeys>;
  shade: z.infer<typeof shadeKeys>;
}>;
