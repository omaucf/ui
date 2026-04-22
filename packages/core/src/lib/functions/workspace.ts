import { fileURLToPath } from "node:url";

import { createResolve } from "mlly";

import type { Resolver } from "@/types/registry.js";
import type { Config } from "@/types/schema.js";

export function deriveWorkspaces(
  baseURL: string,
  { dts, router, target }: Config
): Resolver {
  const resolve = createResolve({
    conditions:
      target === "solid" && router === "start" ? ["solid"] : undefined,
    url: baseURL,
  });
  const cache = new Map<string, Promise<string>>();

  const resolveSpecifier = (specifier: string) => {
    const key = `${baseURL}:${specifier}`;

    let result = cache.get(key);

    if (!result) {
      result = resolve(specifier).then((entries) =>
        entries.startsWith("file://") ? fileURLToPath(entries) : entries
      );

      cache.set(key, result);
    }

    return result;
  };

  // biome-ignore lint/suspicious/useAwait: safe_to_set
  return async (specifier) => {
    const isLocal = specifier.startsWith("./");
    const isWorkspace = specifier.startsWith("@veehance/");

    if (isLocal) return resolveSpecifier(specifier);
    if (isWorkspace)
      return dts?.workspace ? resolveSpecifier(specifier) : specifier;

    return specifier;
  };
}

// biome-ignore lint/suspicious/useAwait:safe_to_set
export async function resolveWorkspace<
  T extends { raw: string } | { from: string },
>(entries: readonly T[], resolve: Resolver): Promise<T[]> {
  return Promise.all(
    entries.map(async (entry) => {
      if ("raw" in entry) return entry;
      return { ...entry, from: await resolve(entry.from) };
    })
  );
}
