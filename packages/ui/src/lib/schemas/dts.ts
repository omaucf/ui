import { titleCase } from "scule";
import { z } from "zod";

const autoImportSchema = z
  .object({ dirs: z.array(z.string()).optional() })
  .catchall(z.any());

const componentsSchema = z
  .object({ dirs: z.array(z.string()).optional() })
  .catchall(z.any());

export const dtsSchema = z.object({
  autoImport: parseSchema(autoImportSchema, { dirs: [] }),
  components: parseSchema(componentsSchema, { dirs: [] }),
  output: z.string().optional(),
  prefix: z.string().transform(titleCase).optional(),
});

function parseSchema<T extends z.ZodTypeAny>(schema: T, defaults: z.infer<T>) {
  return z
    .union([z.boolean(), schema])
    .optional()
    .transform((value): false | z.infer<T> => {
      if (value === false) return false;
      if (value === true || value === undefined) return defaults;
      return { ...(defaults as typeof value), ...value };
    });
}
