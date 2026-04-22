import { readFile } from "node:fs/promises";

import { globby } from "globby";
import { camel, isArray, pascal, sift } from "radashi";

import type { NamespaceOptions } from "@/types/registry.js";
import type { Config } from "@/types/schema.js";

const cache = new Map<string, Promise<string[]>>();

export function detectComponents(candidates: string[], config: Config) {
  if (!config.dts?.detection) return Promise.resolve(candidates);

  const key = createCacheKey(candidates, config);
  let promise = cache.get(key);

  if (!promise) {
    promise = runDetection(candidates, config);
    cache.set(key, promise);
  }

  return promise;
}

export async function detectThemeEntries(
  source: Record<string, unknown>,
  detected: Promise<string[]>,
  options: NamespaceOptions = {}
) {
  const names = new Set((await detected).map(camel));
  return Object.keys(source).filter(
    (entry) =>
      names.has(camel(resolveComponentName(entry, options))) ||
      names.has(
        camel(
          resolveComponentName(entry, { ...options, prefixNamespaces: false })
        )
      )
  );
}

export function resolveComponentName(
  component: string,
  options: NamespaceOptions = {}
) {
  return sift([
    options.namespace && options.prefixNamespaces
      ? pascal(options.prefix ?? "")
      : "",
    options.namespace
      ? pascal(options.namespace)
      : pascal(options.prefix ?? ""),
    pascal(component),
  ]).join("");
}

function createExpressions(
  component: string,
  options: ReturnType<typeof getDetectionOptions>
) {
  const name = resolveComponentName(component, { prefix: options.prefix });
  switch (options.target) {
    default:
      return [new RegExp(`<${name}(\\s|>|/)`), new RegExp(`</${name}>`)];
  }
}

function createCacheKey(candidates: string[], config: Config): string {
  return JSON.stringify({
    candidates,
    detection: config.dts?.detection,
    detectionPatterns: config.dts?.detectionPatterns,
    prefix: config.dts?.prefix,
    prefixNamespaces: config.dts?.prefixNamespaces,
    target: config.target,
  });
}

function getDetectionOptions(config: Config) {
  return {
    patterns: getPatterns(config),
    prefix: config.dts?.prefix ?? "",
    prefixNamespaces: config.dts?.prefixNamespaces ?? false,
    target: config.target,
  };
}

function getPatterns(config: Config): string[] {
  const patterns = config.dts?.detectionPatterns?.length
    ? config.dts.detectionPatterns
    : ["src/components"];
  switch (config.target) {
    case "react":
    case "solid":
      return patterns.map((directory) => `${directory}/**/*.tsx`);
    case "svelte":
      return patterns.map((directory) => `${directory}/**/*.svelte`);
    default:
      return patterns.map((directory) => `${directory}/**/*.vue`);
  }
}

async function runDetection(candidates: string[], config: Config) {
  const options = getDetectionOptions(config);

  const files = await globby(options.patterns);
  const detected = new Set<string>([
    "Factory",
    "Icon",
    "Image",
    "Link",
    "LinkBase",
  ]);

  const matchers = candidates.map((component) => ({
    component,
    expressions: createExpressions(component, options),
  }));

  await Promise.all(
    files.map(async (file) => {
      const content = await readFile(file, "utf8");

      for (const matcher of matchers) {
        if (
          matcher.expressions.some((expression) => expression.test(content))
        ) {
          detected.add(matcher.component);
        }
      }
    })
  );

  if (isArray(config.dts?.detection)) {
    for (const component of config.dts.detection) {
      detected.add(component);
    }
  }

  return candidates.filter((component) => detected.has(component));
}
