import { z } from "zod";

import { ACCENT_KEYS, NEUTRAL_KEYS, SHADE_KEYS } from "@/constants/color.js";
import {
  COLOR_MODE_FALLBACK_KEYS,
  COLOR_MODE_PREFERENCE_KEYS,
  FONT_PROVIDER_KEYS,
  ICON_MODE_KEYS,
  IMAGE_PROVIDER_KEYS,
  LOCALE_DIR_KEYS,
  PROSE_HEADING_KEYS,
} from "@/constants/feature.js";
import {
  ADAPTER_KEYS,
  ROUTER_KEYS,
  RUNTIME_KEYS,
} from "@/constants/framework.js";
import { ENGINE_KEYS } from "@/constants/style.js";
import { ICONSET_KEYS, PRESET_KEYS } from "@/constants/theme.js";
import { COLOR_KEYS, ICON_KEYS } from "@/constants/ui.js";

export const accentKeys = z.enum(ACCENT_KEYS);
export const adapterKeys = z.enum(ADAPTER_KEYS);
export const colorKeys = z.enum(COLOR_KEYS);
export const colorModeFallbackKeys = z.enum(COLOR_MODE_FALLBACK_KEYS);
export const colorModePreferenceKeys = z.enum(COLOR_MODE_PREFERENCE_KEYS);
export const engineKeys = z.enum(ENGINE_KEYS);
export const fontProviderKeys = z.enum(FONT_PROVIDER_KEYS);
export const iconKeys = z.enum(ICON_KEYS);
export const iconModeKeys = z.enum(ICON_MODE_KEYS);
export const iconsetKeys = z.enum(ICONSET_KEYS);
export const imageProviderKeys = z.enum(IMAGE_PROVIDER_KEYS);
export const localeDirKeys = z.enum(LOCALE_DIR_KEYS);
export const neutralKeys = z.enum(NEUTRAL_KEYS);
export const presetKeys = z.enum(PRESET_KEYS);
export const proseHeadingKeys = z.enum(PROSE_HEADING_KEYS);
export const routerKeys = z.enum(ROUTER_KEYS);
export const runtimeKeys = z.enum(RUNTIME_KEYS);
export const shadeKeys = z.enum(SHADE_KEYS);
