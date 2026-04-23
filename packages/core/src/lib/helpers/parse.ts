import { featureSchema } from "../schemas/framework.js";
import type { Schema, Token } from "../types/schema.js";
import { isString } from "../utils/assertion.js";

type Framework = [Token["runtime"], Token["adapter"]];

export function parseFramework(value: Schema["framework"]) {
  const [name, userFeatures] = isString(value) ? [value, undefined] : value;
  const [runtime, adapter] = name.split(":") as Framework;
  const features = featureSchema.parse(userFeatures ?? {});
  return { runtime, adapter, features };
}

export function parseOutput(value: Token["adapter"], defaultValue?: string) {
  if (value === "kit" || value === "next") return "generated";
  if (value === "nuxt") return ".nuxt";
  return defaultValue;
}

export function parseRouter(value: Token["adapter"]) {
  switch (value) {
    case "core":
      return false;
    case "inertia":
      return "inertia" as const;
    case "router":
      return true;
    case "start":
      return "start" as const;
    default:
      return null;
  }
}
