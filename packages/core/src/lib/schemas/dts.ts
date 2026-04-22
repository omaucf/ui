import { capitalize } from "radashi";
import { z } from "zod";

const autoImportSchema = z
  .object({
    from: z.string(),
    names: z.array(z.string()).min(1),
  })
  .strict();

const autoImportsSchema = z
  .object({
    items: z.array(autoImportSchema),
    local: z.union([z.boolean(), z.array(z.string()), z.string()]),
  })
  .partial();

const componentSchema = z
  .object({
    export: z.string().optional(),
    from: z.string(),
    name: z.string(),
  })
  .strict();

const componentsSchema = z
  .object({
    items: z.array(componentSchema),
    local: z.union([z.boolean(), z.array(z.string()), z.string()]),
  })
  .partial();

export const dtsSchema = z
  .object({
    app: z.union([z.boolean(), z.string()]),
    autoImport: booleanOrObject(autoImportsSchema, {
      items: undefined,
      local: false,
    }),
    components: booleanOrObject(componentsSchema, {
      items: undefined,
      local: false,
    }),
    detection: z.union([z.boolean(), z.array(z.string())]),
    detectionPatterns: z.array(z.string()),
    output: z.string(),
    prefix: z.string().transform(capitalize),
    prefixNamespaces: z.boolean(),
    workspace: z.boolean(),
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
