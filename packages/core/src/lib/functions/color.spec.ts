import { describe, expect, it } from "vitest";

import { SHADE_KEYS } from "@/constants/color.js";
import { CONFIG_DEFAULTS } from "@/defaults.js";

import { defineColors, extendColors, resolveColors } from "./color.js";

describe("#defineColors", () => {
  it("resolves the default palette with neutral color", () => {
    expect(defineColors()).toEqual({
      ...CONFIG_DEFAULTS.ui.colors,
      neutral: "zinc",
    });
  });

  it("uses the provided baseColor for neutral", () => {
    expect(defineColors("slate")).toMatchObject({ neutral: "slate" });
  });

  it("only returns requested colors plus neutral", () => {
    expect(defineColors("zinc", ["primary", "warning"])).toEqual({
      neutral: "zinc",
      primary: "emerald",
      warning: "yellow",
    });
  });
});

describe("#extendColors", () => {
  it("generates a theme layer with root, light and dark blocks", () => {
    const css = extendColors({ primary: "blue", secondary: "red" });

    expect(css).toContain("@layer theme");
    expect(css).toContain(":root, :host");
    expect(css).toContain(":root, :host, .light");
    expect(css).toContain(".dark");
  });

  it("generates color shade variables with palette fallback", () => {
    const css = extendColors({ primary: "blue" });

    for (const shade of SHADE_KEYS) {
      expect(css).toContain(`--ui-color-primary-${shade}:`);
      expect(css).toContain(`var(--color-blue-${shade},`);
    }
  });

  it("uses old-neutral fallback when value is 'neutral'", () => {
    const css = extendColors({ neutral: "neutral" });

    for (const shade of SHADE_KEYS) {
      expect(css).toContain(
        `--ui-color-neutral-${shade}: var(--color-old-neutral-${shade},`
      );
    }
  });

  it("generates light theme variables using shade 500", () => {
    const css = extendColors({ primary: "green", secondary: "purple" });

    expect(css).toContain("--ui-primary: var(--ui-color-primary-500);");
    expect(css).toContain("--ui-secondary: var(--ui-color-secondary-500);");
  });

  it("generates dark theme variables using shade 400", () => {
    const css = extendColors({ primary: "green", secondary: "purple" });

    expect(css).toContain("--ui-primary: var(--ui-color-primary-400);");
    expect(css).toContain("--ui-secondary: var(--ui-color-secondary-400);");
  });

  it("ignores undefined or falsy accent entries", () => {
    const css = extendColors({ primary: "blue", secondary: undefined });

    expect(css).toContain("--ui-color-primary-");
    expect(css).not.toContain("--ui-color-secondary-");
  });

  it("supports raw shade scale objects", () => {
    const css = extendColors({
      primary: {
        50: "rgb(1 1 1)",
        100: "rgb(2 2 2)",
        200: "rgb(3 3 3)",
        300: "rgb(4 4 4)",
        400: "rgb(5 5 5)",
        500: "rgb(6 6 6)",
        600: "rgb(7 7 7)",
        700: "rgb(8 8 8)",
        800: "rgb(9 9 9)",
        900: "rgb(10 10 10)",
        950: "rgb(11 11 11)",
      },
    });

    expect(css).toContain("--ui-color-primary-50: rgb(1 1 1)");
    expect(css).toContain("--ui-color-primary-500: rgb(6 6 6)");
    expect(css).toContain("--ui-color-primary-950: rgb(11 11 11)");
  });

  it("does not throw when an unknown palette color is used", () => {
    expect(() => extendColors({ primary: "not-a-real-color" })).not.toThrow();
  });
});

describe("#resolveColors", () => {
  it(`prepends "primary" and removes duplicates when custom colors are provided`, () => {
    expect(resolveColors(["success", "warning", "success"])).toEqual([
      "primary",
      "success",
      "warning",
    ]);
  });
});
