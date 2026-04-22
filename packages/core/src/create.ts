import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { isNullish, isObject } from "radashi";

import { CONFIG_DEFAULTS } from "@/defaults.js";
import {
  dedupeComponents,
  resolveComponents,
  resolvePrefix,
} from "@/functions/component.js";
import { dedupeImports, resolveImports } from "@/functions/import.js";
import type { Template } from "@/types/registry.js";
import type { Config } from "@/types/schema.js";

export function createAliases(
  templates: Template[],
  root = process.cwd(),
  output?: string
) {
  const dir = join(root, output ?? CONFIG_DEFAULTS.dts.output);
  const map: Record<string, string> = {};

  for (const template of templates) {
    if (!(template.write && template.filename)) continue;
    const filePath = join(dir, template.filename);
    map[`#build/${template.filename}`] = filePath;
  }

  return map;
}

export function createComponents(options: Config) {
  const defaults = options?.dts?.components;
  const entries = dedupeComponents([
    ...resolveComponents(options),
    ...(options.registry?.components ?? []),
    ...(defaults && isObject(defaults) ? (defaults.items ?? []) : []),
  ]).filter((e): e is Exclude<typeof e, { raw: string }> => !isRaw(e));

  return entries.map((e) => {
    const prefix = resolvePrefix(e, options.dts?.prefix);
    const exposed = prefix ? `${prefix}${e.name}` : e.name;

    if (e.export === "default")
      return {
        as: exposed,
        from: String(e.from),
        isDefault: true,
        name: "default",
      };
    return {
      as: exposed,
      from: String(e.from),
      isDefault: false,
      name: e.export ?? e.name,
    };
  });
}

export function createImports({ registry, ...config }: Config) {
  const defaults = config.dts?.autoImport;

  const entries = dedupeImports([
    ...resolveImports(config),
    ...(registry?.imports ?? []),
    ...(defaults && isObject(defaults) ? (defaults.items ?? []) : []),
  ]).filter((e): e is Exclude<typeof e, { raw: string }> => !isRaw(e));

  return entries.map((e) => ({ from: e.from, imports: e.names }));
}

const templateHashCache = new Map<string, string>();

export async function createTemplates(
  templates: Template[],
  root = process.cwd(),
  output?: string
) {
  const dir = join(root, output ?? CONFIG_DEFAULTS.dts.output);

  await Promise.all(
    templates.map(async (template) => {
      if (!(template.write && template.filename)) return;

      const filePath = join(dir, template.filename);

      const nextContent = await template.getContents();
      const nextHash = hash(nextContent);

      const cachedHash = templateHashCache.get(filePath);
      if (cachedHash === nextHash) return;

      if (!cachedHash && existsSync(filePath)) {
        const prevContent = readFileSync(filePath, "utf8");

        if (hash(prevContent) === nextHash) {
          templateHashCache.set(filePath, nextHash);
          return;
        }
      }

      mkdirSync(dirname(filePath), { recursive: true });

      writeFileSync(filePath, nextContent);
      templateHashCache.set(filePath, nextHash);
    })
  );
}

function hash(content: string): string {
  return createHash("sha1").update(content).digest("hex");
}

function isRaw(entry: unknown): entry is { raw: string } {
  return isObject(entry) && !isNullish(entry) && "raw" in entry;
}
