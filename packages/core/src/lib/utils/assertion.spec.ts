import { describe, expect, it } from "vitest";

import {
  hasProp,
  isArray,
  isBoolean,
  isDefined,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isObjectLike,
  isString,
} from "./assertion.js";

describe("#hasProp", () => {
  it("checks if object has property", () => {
    const obj = { foo: 1 };
    const inherited = Object.create({ foo: 1 });

    expect(hasProp(obj, "foo")).toBe(true);
    expect(hasProp(obj, "bar")).toBe(false);
    expect(hasProp(inherited, "foo")).toBe(false);
  });
});

describe("#isArray", () => {
  it("detects arrays correctly", () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
    expect(isArray(null)).toBe(false);
  });
});

describe("#isBoolean", () => {
  it("detects booleans correctly", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean("true")).toBe(false);
  });
});

describe("#isDefined", () => {
  it("detects values correctly", () => {
    expect(isDefined(0)).toBe(true);
    expect(isDefined("")).toBe(true);
    expect(isDefined(false)).toBe(true);
    expect(isDefined({})).toBe(true);
    expect(isDefined([])).toBe(true);
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });
});

describe("#isFunction", () => {
  it("detects functions correctly", () => {
    expect(isFunction(() => undefined)).toBe(true);
    expect(isFunction({})).toBe(false);
  });
});

describe("#isNull", () => {
  it("detects null and undefined", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(true);
    expect(isNull(0)).toBe(false);
  });
});

describe("#isNumber", () => {
  it("detects valid numbers", () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(Number.NaN)).toBe(false);
    expect(isNumber("123")).toBe(false);
  });
});

describe("#isObject", () => {
  it("detects plain objects only", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
  });
});

describe("#isObjectLike", () => {
  it("detects object-like values", () => {
    expect(isObjectLike({})).toBe(true);
    expect(isObjectLike([])).toBe(true);
    expect(isObjectLike(null)).toBe(false);
  });
});

describe("#isString", () => {
  it("detects strings correctly", () => {
    expect(isString("hello")).toBe(true);
    expect(isString(123)).toBe(false);
  });
});
