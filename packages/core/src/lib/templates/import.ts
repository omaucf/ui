import {
  dedupeImports,
  resolveImports,
  resolveUtils,
} from "@/functions/import.js";
import { resolveWorkspace } from "@/functions/workspace.js";
import type { Registry, Resolver } from "@/types/registry.js";
import type { Config } from "@/types/schema.js";

export async function generateImportsFile(
  { registry, ...config }: Config,
  resolve?: Resolver
) {
  const entries = dedupeImports([
    ...resolveImports(config),
    ...(registry?.imports ?? []),
  ]);
  return renderImportsFile(
    resolve ? await resolveWorkspace(entries, resolve) : entries
  );
}

export async function generateUtilsFile(
  { registry, ...config }: Config,
  resolve?: Resolver
) {
  const entries = dedupeImports([
    ...resolveUtils(config),
    ...(registry?.utils ?? []),
  ]);
  return renderImportsFile(
    resolve ? await resolveWorkspace(entries, resolve) : entries
  );
}

export function renderImportsFile(entries: Registry["imports"]) {
  return entries
    .map((e) => {
      if ("raw" in e) return e.raw;
      return `export { ${e.names.join(", ")} } from '${e.from}'`;
    })
    .join("\n");
}
