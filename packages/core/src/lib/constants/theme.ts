import {
  heroicons_outline,
  heroicons_solid,
  hugeicons,
  iconoir,
  lucide,
  material_symbols,
  mdi,
  mingcute,
  ph,
  tabler,
} from "../../iconset/index.js";
import {
  luma,
  lyra,
  maia,
  mira,
  nova,
  rhea,
  sera,
  vega,
} from "../../preset/index.js";
import { prose, ui } from "../../theme/index.js";

export const ICONSET_KEYS = [
  "heroicons-outline",
  "heroicons-solid",
  "hugeicons",
  "iconoir",
  "lucide",
  "material-symbols",
  "mdi",
  "mingcute",
  "ph",
  "tabler",
] as const;

export const ICONSET_MAP = {
  "heroicons-outline": heroicons_outline,
  "heroicons-solid": heroicons_solid,
  hugeicons,
  iconoir,
  lucide,
  "material-symbols": material_symbols,
  mdi,
  mingcute,
  ph,
  tabler,
} as const;

export const PRESET_KEYS = [
  "luma",
  "lyra",
  "maia",
  "mira",
  "nova",
  "rhea",
  "sera",
  "vega",
] as const;

export const PRESET_MAP = {
  luma,
  lyra,
  maia,
  mira,
  nova,
  rhea,
  sera,
  vega,
} as const;

export const THEME_KEYS = ["prose"] as const;

export const THEME_MAP = {
  prose,
  ui,
} as const;
