import { dedupeImports, resolveTypes } from "@/functions/import.js";
import { resolveWorkspace } from "@/functions/workspace.js";
import { parsePkg as pkg } from "@/helpers/parse.js";
import type { Registry, Resolver } from "@/types/registry.js";
import type { Config } from "@/types/schema.js";

export async function generateTypesFile(
  { registry, ...config }: Config,
  resolve?: Resolver
) {
  const entries = dedupeImports([
    ...resolveTypes(config),
    ...(registry?.types ?? []),
  ]);
  return renderTypesFile(
    resolve ? await resolveWorkspace(entries, resolve) : entries
  );
}

export function renderTypesFile(entries: Registry["imports"]) {
  return entries
    .map((e) => {
      if ("raw" in e) return e.raw;
      if (e.names[0] === "*") return `export type * from '${e.from}'`;
      return `export type { ${e.names.join(", ")} } from '${e.from}'`;
    })
    .join("\n");
}

export function generateTypesNuxt({ theme, ui }: Config) {
  const imports = [
    `import type { Feature, UI } from '${pkg("core", "types")}'`,
    `import type * as theme from '#build/theme/index'`,
  ];

  const colorUnion = theme?.colors?.length
    ? theme.colors.map((v) => JSON.stringify(v)).join(" | ")
    : "string";

  const iconKeys = Object.keys(ui?.icons || {});
  const iconUnion = iconKeys.length
    ? iconKeys.map((v) => JSON.stringify(v)).join(" | ")
    : "string";

  const schema = [
    "declare module '@nuxt/schema' {",
    "  interface AppConfigInput {",
    "    colorMode?: Feature['colorMode']",
    "    icons?: Feature['icons']",
    "    image?: Feature['image']",
    "    locale?: Feature['locale']",
    "    prose?: Feature['prose']",
    "    ui?: UI<",
    "      typeof theme,",
    `      ${colorUnion},`,
    `      ${iconUnion}`,
    "    >",
    "  }",
    "}",
  ];

  return [...imports, "", ...schema].join("\n");
}
