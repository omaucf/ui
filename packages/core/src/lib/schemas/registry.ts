import { z } from "zod";

const componentsSchema = z.union([
  z
    .object({
      export: z.string().optional(),
      from: z.string(),
      name: z.string(),
      prefix: z.union([z.string(), z.boolean()]).optional(),
      static: z.union([z.string(), z.boolean()]).optional(),
    })
    .strict(),
  z
    .object({
      raw: z.string(),
    })
    .strict(),
]);

const iconsSchema = z.union([
  z
    .object({
      from: z.string().optional(),
      name: z.string(),
    })
    .strict(),
  z
    .object({
      name: z.string(),
      raw: z.record(z.string(), z.string()),
    })
    .strict(),
]);

const importsSchema = z.union([
  z
    .object({
      from: z.string(),
      names: z.array(z.string()).min(1),
    })
    .strict(),
  z
    .object({
      raw: z.string(),
    })
    .strict(),
]);

export const registrySchema = z
  .object({
    components: z.array(componentsSchema),
    icons: z.array(iconsSchema),
    imports: z.array(importsSchema),
    types: z.array(importsSchema),
    utils: z.array(importsSchema),
  })
  .partial();
