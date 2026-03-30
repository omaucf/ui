import { z } from "zod";

import { ACCENT_KEYS, SHADE_KEYS } from "../constants/color.js";
import { baseColorKeys } from "./keys.js";
import { _strategySchema } from "./tailwind.js";
import { _iconsetSchema, _presetSchema } from "./theme.js";

const shadeSchema = z.object(
  Object.fromEntries(SHADE_KEYS.map((key) => [key, z.string()])) as Record<
    (typeof SHADE_KEYS)[number],
    z.ZodString
  >
);

const accentSchema = z.union([z.enum(ACCENT_KEYS), z.string(), shadeSchema]);

const colorSchema = z
  .object({ neutral: baseColorKeys.optional() })
  .catchall(accentSchema.optional());

export const uiSchema = z.object({
  colors: colorSchema.optional(),
  components: _presetSchema.optional(),
  icons: _iconsetSchema.optional(),
  tw: _strategySchema.optional(),
});
