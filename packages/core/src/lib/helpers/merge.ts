import { createDefu } from "defu";
import { isArray, isNullish, isObject, isString } from "radashi";
import { cn } from "tailwind-variants";

import type { DeepPartial } from "@/types/abstract.js";

export const mergeConfigs = <T>(
  layers: (DeepPartial<T> | false | null | undefined)[],
  defaults: DeepPartial<T> = {}
) =>
  layers
    .filter((layer): layer is DeepPartial<T> => !!layer)
    .reduce(
      (acc, layer) =>
        createDefu((obj, key, value) => {
          if (isArray(obj[key]) && isArray(value)) {
            (obj as Record<PropertyKey, unknown>)[key] = [
              ...obj[key],
              ...value,
            ];
            return true;
          }
        })(layer, acc),
      defaults
    ) as T;

export function mergeThemes<T extends Record<string, any>>(...themes: any[]) {
  const result: Record<string, any> = {};

  for (const theme of themes) {
    if (!theme) continue;

    for (const key of Object.keys(theme)) {
      result[key] = mergeValue(result[key], theme[key]);
    }
  }

  return result as T;
}

function mergeValue(prev: any, next: any) {
  if (next === undefined) return prev;
  if (prev === undefined) return next;

  if (!next || next === null) return prev;
  if (isClassValue(prev) && isClassValue(next)) return cn(prev, next);
  if (isObjectLike(prev) && isObjectLike(next)) return mergeThemes(prev, next);

  return next;
}

function isClassValue(value: unknown): value is string | string[] {
  return isString(value) || isArray(value);
}

function isObjectLike(value: any): value is Record<string, any> {
  return !isNullish(value) && isObject(value);
}
