/** biome-ignore-all lint/performance/useTopLevelRegex: safe_to_set */
import { CORE_ANATOMY } from "@/constants/anatomy.js";
import { resolveConfig } from "@/functions/config.js";
import type { ComponentEntry } from "@/types/registry.js";
import type { Options } from "@/types/ui.js";

import { getConfig } from "./config.js";
import { createTemplates } from "./create.js";
import { getTemplates } from "./template.js";

export function setupExclude(options?: { extra?: RegExp[] }) {
  const packagesRegex = [CORE_ANATOMY.NAME]
    .map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  return [
    new RegExp(`[\\\\/]node_modules[\\\\/](?!\\.pnpm|${packagesRegex})`),
    /[\\/]\.git[\\/]/,
    /[\\/]\.veehance[\\/]/,
    ...(options?.extra ?? []),
  ];
}

export function setupReact(entries: ComponentEntry[]) {
  const map = new Map<string, any>();

  for (const e of entries) {
    map.set(e.as, {
      from: e.from,
      name: e.as,
      originalName: e.isDefault ? "default" : e.name,
      type: e.isDefault ? "ExportDefault" : "Export",
    });
  }

  const all = Array.from(map.values());
  return ((name?: string) => {
    if (!name) return all;
    return map.get(name);
  }) as any;
}

export function setupSvelte(entries: ComponentEntry[]) {
  const map = new Map<string, string[]>();

  for (const e of entries) {
    const alias = e.as === e.name ? e.name : `${e.name} as ${e.as}`;
    if (!map.has(e.from)) map.set(e.from, []);
    map.get(e.from)?.push(alias);
  }

  return Array.from(map.entries()).map(([from, names]) => ({
    defaultImport: false,
    from,
    names,
  }));
}

export function setupVue(entries: ComponentEntry[], prefix?: string) {
  const map = new Map<string, { from: string; name: string }>();

  for (const e of entries) {
    const keys = new Set([e.as, resolveName(e.as), e.as.toLowerCase()]);

    if (prefix) {
      keys.add(e.name);
      keys.add(resolveName(e.name));
      keys.add(e.name.toLowerCase());
    }

    for (const key of keys) {
      map.set(key, { from: e.from, name: e.name });
    }
  }

  return (name: string) =>
    map.get(name) || map.get(resolveName(name)) || map.get(name.toLowerCase());
}

export function setupUI(
  options: Options = {},
  meta = false,
  cwd = process.cwd()
) {
  const config = resolveConfig(getConfig(cwd), options);
  const templates = getTemplates(config, meta, cwd);
  createTemplates(templates, cwd, config.dts?.output);
}

function resolveName(name: string) {
  return name
    .toLowerCase()
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^./, (c) => c.toUpperCase());
}
