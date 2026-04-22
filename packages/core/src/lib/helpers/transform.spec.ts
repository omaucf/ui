import { describe, expect, it } from "vitest";

import {
  applyArbitraryVars,
  applyPrefixToObject,
  applyUnstyled,
} from "./transform.js";

describe("#applyArbitraryVars", () => {
  it("transforms basic CSS variable arbitrary values", () => {
    const output = applyArbitraryVars({ base: "max-w-(--ui-container)" });

    expect(output.base).toBe("max-w-[var(--ui-container)]");
  });

  it("transforms multiple arbitrary values in one string", () => {
    const output = applyArbitraryVars({ base: "max-w-(--ui) p-(--space)" });

    expect(output.base).toBe("max-w-[var(--ui)] p-[var(--space)]");
  });

  it("supports variant prefixes (hover:, sm:, etc.)", () => {
    const output = applyArbitraryVars({
      base: "hover:max-w-(--ui) sm:p-(--space)",
    });

    expect(output.base).toBe("hover:max-w-[var(--ui)] sm:p-[var(--space)]");
  });

  it("handles deeply nested objects", () => {
    const output = applyArbitraryVars({
      slots: { base: "max-w-(--ui)", icon: { inner: "p-(--space)" } },
    });

    expect(output.slots.base).toBe("max-w-[var(--ui)]");
    expect(output.slots.icon.inner).toBe("p-[var(--space)]");
  });

  it("handles arrays of class strings", () => {
    const output = applyArbitraryVars(["max-w-(--ui)", "p-(--space)"]);

    expect(output).toEqual(["max-w-[var(--ui)]", "p-[var(--space)]"]);
  });

  it("does not modify normal class strings", () => {
    const output = applyArbitraryVars({
      base: "flex items-center justify-between",
    });

    expect(output.base).toBe("flex items-center justify-between");
  });

  it("ignores already transformed var() syntax", () => {
    const output = applyArbitraryVars({ base: "max-w-[var(--ui-container)]" });

    expect(output.base).toBe("max-w-[var(--ui-container)]");
  });

  it("handles mixed valid and invalid patterns", () => {
    const output = applyArbitraryVars({
      base: "flex max-w-(--ui) something-else p-(--space)",
    });

    expect(output.base).toBe(
      "flex max-w-[var(--ui)] something-else p-[var(--space)]"
    );
  });

  it("returns primitives unchanged", () => {
    expect(applyArbitraryVars(null)).toBe(null);
    expect(applyArbitraryVars(undefined)).toBe(undefined);
    expect(applyArbitraryVars(123)).toBe(123);
  });
});

describe("#applyPrefixToObject", () => {
  it("prefixes a simple class string", () => {
    const output = applyPrefixToObject("flex items-center", "tw-");

    expect(output).toBe("tw-flex tw-items-center");
  });

  it("prefixes nested object values", () => {
    const output = applyPrefixToObject(
      { base: "flex", slots: { icon: "w-4 h-4" } },
      "tw-"
    );

    expect(output).toEqual({
      base: "tw-flex",
      slots: { icon: "tw-w-4 tw-h-4" },
    });
  });

  it("handles arrays", () => {
    const output = applyPrefixToObject(["flex", "items-center"], "tw-");

    expect(output).toEqual(["tw-flex", "tw-items-center"]);
  });

  it("does not prefix inside defaultVariants", () => {
    const output = applyPrefixToObject(
      { defaultVariants: { color: "red" } },
      "tw-"
    );

    expect(output.defaultVariants.color).toBe("red");
  });

  it("does not prefix compoundVariants (except class key)", () => {
    const output = applyPrefixToObject(
      { compoundVariants: [{ class: "flex", color: "red" }] },
      "tw-"
    );

    expect(output.compoundVariants[0].color).toBe("red");
    expect(output.compoundVariants[0].class).toBe("tw-flex");
  });

  it("does not prefix size values like sm, md, lg", () => {
    const output = applyPrefixToObject({ buttonSize: "sm" }, "tw-");

    expect(output.buttonSize).toBe("sm");
  });
});

describe("#applyUnstyled", () => {
  it("clears slot classes", () => {
    const output = applyUnstyled({ slots: { base: "flex", icon: "w-4" } });

    expect(output.slots).toEqual({ base: "", icon: "" });
  });

  it("clears variant classes", () => {
    const output = applyUnstyled({
      variants: {
        color: { primary: "bg-blue", secondary: { base: "bg-gray" } },
      },
    });

    expect(output.variants).toEqual({
      color: { primary: "", secondary: { base: "" } },
    });
  });

  it("clears compound variant class but preserves selectors", () => {
    const output = applyUnstyled({
      compoundVariants: [
        { class: "flex items-center", color: "primary", size: "lg" },
      ],
    });

    expect(output.compoundVariants).toEqual([
      { class: "", color: "primary", size: "lg" },
    ]);
  });
});
