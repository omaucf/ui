import type { AnyFunction, Dict } from "../types/abstract.js";

export const hasProp = <T extends string>(obj: any, prop: T): obj is Dict<T> =>
  Object.hasOwn(obj, prop);

export const isArray = (v: any): v is any[] => Array.isArray(v);

export const isBoolean = (v: any): v is boolean => v === true || v === false;

export const isDefined = <T>(v: T | null | undefined): v is T =>
  v !== null && v !== undefined;

export const isDev = () => process.env.NODE_ENV !== "production";

export const isFunction = (v: any): v is AnyFunction => typeof v === "function";

export const isNull = (v: any): v is null | undefined =>
  v === null || v === undefined;

export const isNumber = (v: any): v is number =>
  typeof v === "number" && !Number.isNaN(v);

export const isObjectLike = (v: any): v is Dict<string> =>
  v != null && typeof v === "object";

export const isObject = (v: any): v is Dict<string> =>
  isObjectLike(v) && !isArray(v);

export const isString = (v: any): v is string => typeof v === "string";
