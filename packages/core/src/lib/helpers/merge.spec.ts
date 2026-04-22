import { describe, expect, it } from "vitest";

import { mergeConfigs, mergeThemes } from "./merge.js";

describe("#mergeConfigs", () => {
  it("should deeply merge inputs", () => {
    const result = mergeConfigs<Record<"bar" | "foo", number>>([
      { foo: 1 },
      { foo: 2 },
      false,
      { bar: 3 },
    ]);

    expect(result).toEqual({ bar: 3, foo: 2 });
  });
});

describe("#mergeThemes", () => {
  it("resolves conflicting classes with twMerge", () => {
    const result = mergeThemes({ class: "p-2" }, { class: "p-4" });

    expect(result).toEqual({ class: "p-4" });
  });

  it("concatenates non-conflicting classes", () => {
    const result = mergeThemes(
      { class: "p-2 text-sm" },
      { class: "bg-red-500" }
    );

    expect(result).toEqual({ class: "p-2 text-sm bg-red-500" });
  });

  it("last config wins for conflicts", () => {
    const result = mergeThemes(
      { class: "p-2" },
      { class: "p-4" },
      { class: "p-6" }
    );

    expect(result).toEqual({ class: "p-6" });
  });

  it("ignores empty string values", () => {
    const result = mergeThemes({ class: "p-2" }, { class: "" });

    expect(result).toEqual({ class: "p-2" });
  });

  it("ignores non-string values in merge logic", () => {
    const result = mergeThemes({ class: "p-2" }, { class: null as any });

    expect(result).toEqual({ class: "p-2" });
  });
});
