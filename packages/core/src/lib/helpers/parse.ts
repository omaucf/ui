import { isArray, isString } from "radashi";

import {
  CORE_ANATOMY,
  REACT_ANATOMY,
  SOLID_ANATOMY,
  SVELTE_ANATOMY,
  VUE_ANATOMY,
} from "@/constants/anatomy.js";
import { featureSchema } from "@/schemas/features.js";
import type { Schema, Token } from "@/types/schema.js";

type Framework = [Token["runtime"], Token["adapter"]];
type Router = boolean | Token["adapter"] | undefined;

export function parseAnatomy(runtime?: Token["runtime"]) {
  if (runtime === "react") return REACT_ANATOMY;
  if (runtime === "solid") return SOLID_ANATOMY;
  if (runtime === "svelte") return SVELTE_ANATOMY;
  return VUE_ANATOMY;
}

export function parseAppConfig(router: Router, fallback?: boolean | string) {
  if (!fallback || router === "nuxt") return false;
  if (fallback === true) return "src/app.config.ts";
  return fallback;
}

export function parseFramework(framework: Schema["framework"]) {
  const [name, userFeatures] = isString(framework)
    ? [framework, undefined]
    : framework;
  const [runtime, adapter] = name.split(":") as Framework;
  const features = featureSchema.parse(userFeatures ?? {});
  return { adapter, features, runtime };
}

export function parseLocalDir(
  dir: boolean | string | string[] | undefined,
  fallback: string | string[]
): false | string[] {
  if (dir === true) return isArray(fallback) ? fallback : [fallback];
  if (isArray(dir)) return dir;
  if (isString(dir)) return [dir];
  return false;
}

export function parseOutput(router: Router, fallback?: string) {
  if (!fallback && (router === "kit" || router === "next")) return ".veehance";
  if (router === "nuxt") return ".nuxt";
  return fallback;
}

export function parseRouter(router: Router) {
  if (!router || router === "core") return false;
  if (router === true || router === "router") return true;
  return router;
}

export function parsePkg(target?: string, path?: string, scope?: string) {
  return parseExport(parseLib(target), path, scope);
}

function parseLib(target?: string) {
  if (!target || target === "core") return CORE_ANATOMY.NAME;
  if (
    target === "react" ||
    target === "solid" ||
    target === "svelte" ||
    target === "vue"
  )
    return parseAnatomy(target).NAME;
  return target;
}

function parseExport(target: string, ...segments: (string | undefined)[]) {
  return [target, ...segments.filter(Boolean)].join("/");
}
