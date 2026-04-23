import { defu } from "defu";
import { twMerge } from "tailwind-merge";

import type { Dict } from "../types/abstract.js";
import type { Token } from "../types/schema.js";
import { isObjectLike, isString } from "../utils/assertion.js";

export function mergeObject<T extends Dict<string>>(
  strategy: Token["strategy"],
  ...configs: any[]
) {
  if (strategy === "override") return defu({}, ...configs) as T;

  return configs.reduce((acc, curr) => {
    for (const key in curr) {
      if (!Object.hasOwn(curr, key)) continue;

      const prev = acc[key];
      const next = curr[key];

      if (isString(prev) && isString(next)) {
        acc[key] = twMerge(prev, next);
      } else if (prev && isObjectLike(prev) && isObjectLike(next)) {
        acc[key] = mergeObject(strategy, prev, next);
      } else if (prev === undefined) {
        acc[key] = next;
      }
    }

    return acc;
  }, {}) as T;
}
