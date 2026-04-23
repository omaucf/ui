import { describe, expect, it } from "vitest";

import { mergeObject } from "./merge.js";

describe("#mergeObject", () => {
  it("override: keeps first class value (no twMerge)", () => {
    const result = mergeObject("override", { class: "p-2" }, { class: "p-4" });

    expect(result).toEqual({ class: "p-2" });
  });

  it("override: merges objects with defu", () => {
    const result = mergeObject("override", { a: 1 }, { b: 2 });

    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("merge: resolves conflicting classes with twMerge", () => {
    const result = mergeObject("merge", { class: "p-2" }, { class: "p-4" });

    expect(result).toEqual({ class: "p-4" });
  });

  it("merge: concatenates non-conflicting classes", () => {
    const result = mergeObject(
      "merge",
      { class: "p-2 text-sm" },
      { class: "bg-red-500" }
    );

    expect(result).toEqual({
      class: "p-2 text-sm bg-red-500",
    });
  });

  it("merge: last config wins for conflicts", () => {
    const result = mergeObject(
      "merge",
      { class: "p-2" },
      { class: "p-4" },
      { class: "p-6" }
    );

    expect(result).toEqual({ class: "p-6" });
  });

  it("merge: falls back to defu for non-strings", () => {
    const result = mergeObject("merge", { size: 10 }, { size: 20 });

    expect(result).toEqual({ size: 10 });
  });

  it("merge: ignores empty string values", () => {
    const result = mergeObject("merge", { class: "p-2" }, { class: "" });

    expect(result).toEqual({ class: "p-2" });
  });

  it("merge: ignores non-string values in merge logic", () => {
    const result = mergeObject(
      "merge",
      { class: "p-2" },
      { class: null as any }
    );

    expect(result).toEqual({ class: "p-2" });
  });
});
