import { z } from "zod";

import { FILE_TYPE_KEYS, ITEM_TYPE_KEYS } from "../constants/ui.js";

const _fileSchema = z.object({
  type: z.enum(FILE_TYPE_KEYS).optional(),
  name: z.string(),
});

const fileSchema = z.union([
  _fileSchema.extend({ name: z.string().optional(), path: z.string() }),
  _fileSchema.extend({ raw: z.string() }),
]);

const itemSchema = _fileSchema.extend({
  type: z.enum(ITEM_TYPE_KEYS),
  title: z.string().optional(),
  description: z.string().optional(),
  files: z.array(fileSchema),
});

export const registrySchema = z.object({
  items: z.array(z.union([z.string(), itemSchema])).optional(),
});
