import { defu } from "defu";

import {
  heroicons_outline,
  heroicons_solid,
  hugeicons,
  lucide,
  phosphor,
  tabler,
} from "../../iconset/index.js";
import { default as defaults } from "../defaults.js";
import type { Icons } from "../types/icon.js";
import type { Token } from "../types/schema.js";

export const ICONSET_MAP = {
  "heroicons-outline": heroicons_outline,
  "heroicons-solid": heroicons_solid,
  hugeicons,
  lucide,
  phosphor,
  tabler,
} as const;

export function defineIcons(
  iconset: Token["iconset"] = defaults.theme.iconset,
  icons: Icons<any> = {}
) {
  return defu(icons, ICONSET_MAP[iconset]);
}
