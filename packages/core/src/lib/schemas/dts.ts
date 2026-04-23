import { titleCase } from "scule";
import { z } from "zod";

const autoImportSchema = z
  .object({ dirs: z.array(z.string()).optional() })
  .catchall(z.any());

const componentsSchema = z
  .object({ dirs: z.array(z.string()).optional() })
  .catchall(z.any());

export const dtsSchema = z.object({
  autoImport: z.union([z.boolean(), autoImportSchema]).optional(),
  components: z.union([z.boolean(), componentsSchema]).optional(),
  output: z.string().optional(),
  prefix: z.string().transform(titleCase).optional(),
});
