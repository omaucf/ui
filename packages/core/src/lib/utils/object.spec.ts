import { describe, expect, it } from "vitest";

import { sortObject, splitProps } from "./object.js";

describe("#sortObject", () => {
  it("sort only top-level keys alphabetically", () => {
    const input = { b: { z: 1, a: 2 }, a: { d: 4, c: 3 }, c: 123 };
    const result = sortObject(input);

    expect(Object.keys(result)).toEqual(["a", "b", "c"]);
  });

  it("not sort nested objects", () => {
    const input = { b: { z: 1, a: 2 }, a: { d: 4, c: 3 } };
    const result = sortObject(input);

    expect(result.a).toEqual({ d: 4, c: 3 });
    expect(result.b).toEqual({ z: 1, a: 2 });
  });

  it("preserve values as-is", () => {
    const input = { b: "test", a: 42, c: [3, 2, 1] };
    const result = sortObject(input);

    expect(result).toEqual({ a: 42, b: "test", c: [3, 2, 1] });
  });

  it("handle empty object", () => {
    const result = sortObject({});

    expect(result).toEqual({});
  });
});

describe("#splitProps", () => {
  it("split props", () => {
    const props = { a: 1, b: 2, c: 3 };
    const [result, rest] = splitProps(props, ["a", "c"]);

    expect(result).toEqual({ a: 1, c: 3 });
    expect(rest).toEqual({ b: 2 });
  });

  it("handle missing keys gracefully", () => {
    const props = { a: 1 };
    const [result, rest] = splitProps(props, ["b" as keyof typeof props]);

    expect(result).toEqual({});
    expect(rest).toEqual({ a: 1 });
  });

  it("perserve symbol keys", () => {
    const symA = Symbol("a");
    const symB = Symbol("b");

    const props = { [symA]: 1, [symB]: 2, c: 3 };
    const [result, rest] = splitProps(props, [symA, "c"]);

    expect(result).toEqual({ [symA]: 1, c: 3 });
    expect(rest).toEqual({ [symB]: 2 });
  });
});
