import type { Dict } from "../types/abstract.js";

export function createSplitProps<T extends Dict<string | symbol>>(
  keys: (keyof T)[]
) {
  return <Props extends T>(props: Props) =>
    splitProps(props, keys) as [T, Omit<Props, keyof T>];
}

export function omit<T extends Dict<string | symbol>>(obj: T, keys: string[]) {
  return createSplitProps(keys)(obj)[1];
}

export function pick<T extends Dict<string | symbol>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const filtered: Partial<T> = {};

  for (const key of keys) {
    const value = obj[key];
    if (value !== undefined) {
      filtered[key] = value;
    }
  }

  return filtered as any;
}

export function sortObject<T extends Dict<string, any>>(obj: T) {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key as keyof T] = obj[key];
      return acc;
    }, {} as T);
}

export function splitProps<T extends Dict<string | symbol>>(
  props: T,
  keys: (keyof T)[]
) {
  const rest: Dict<string | symbol> = {};
  const result: Dict<string | symbol> = {};

  const keySet = new Set(keys);
  const ownKeys = Reflect.ownKeys(props);

  for (const key of ownKeys) {
    if (keySet.has(key)) {
      result[key] = props[key];
    } else {
      rest[key] = props[key];
    }
  }

  return [result, rest];
}
