import { isString } from "radashi";

import {
  dedupeComponents,
  resolveComponents,
  resolvePrefix,
} from "@/functions/component.js";
import { resolveWorkspace } from "@/functions/workspace.js";
import type { Registry, Resolver } from "@/types/registry.js";
import type { Config } from "@/types/schema.js";

export async function generateComponentsFile(
  { registry, ...config }: Config,
  detected?: Promise<string[]>,
  resolve?: Resolver
) {
  const entries = dedupeComponents([
    ...resolveComponents(config),
    ...(registry?.components ?? []),
  ]);

  const used = detected && new Set(await detected);
  const filtered = used
    ? entries.filter((entry) => {
        if ("raw" in entry) return true;
        if (!entry.from.startsWith("@veehance/")) return true;
        return used.has(entry.name);
      })
    : entries;

  return renderComponentsFile(
    resolve ? await resolveWorkspace(filtered, resolve) : filtered,
    config.dts?.prefix
  );
}

export function renderComponentsFile(
  entries: Registry["components"],
  prefix?: string
) {
  const lines = entries.map((entry) => {
    if ("raw" in entry) return entry.raw;

    const resolvedPrefix = resolvePrefix(entry, prefix);
    const exposed = resolvedPrefix
      ? `${resolvedPrefix}${entry.name}`
      : entry.name;

    if (entry.export === "default")
      return `export { default as ${exposed} } from '${entry.from}'`;

    const original = entry.export ?? entry.name;
    if (original === exposed)
      return `export { ${original} } from '${entry.from}'`;

    if (!!entry.static !== true)
      return `export { ${original} as ${exposed} } from '${entry.from}'`;
    return `export { ${isString(entry.static) ? entry.static : original}, ${original} as ${exposed} } from '${entry.from}'`;
  });

  return lines.join("\n");
}
