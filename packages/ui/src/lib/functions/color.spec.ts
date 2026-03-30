import { describe, expect, it } from "vitest";

import { SHADE_KEYS } from "../constants/color.js";
import { generateColors } from "./color.js";

describe("#generateColors", () => {
  it("generates a theme layer with root, light and dark blocks", () => {
    const css = generateColors({
      ui: { colors: { primary: "blue", secondary: "red" } },
    });

    expect(css).toContain("@layer theme");
    expect(css).toContain(":root, :host {");
    expect(css).toContain(':root[data-theme="light"]');
    expect(css).toContain(':root[data-theme="dark"]');
  });

  it("generates color shade variables with palette fallback", () => {
    const css = generateColors({
      ui: { colors: { primary: "blue" } },
    });

    for (const shade of SHADE_KEYS) {
      expect(css).toContain(`--ui-color-primary-${shade}:`);
      expect(css).toContain(`var(--color-blue-${shade},`);
    }
  });

  it("uses old-neutral fallback when value is 'neutral'", () => {
    const css = generateColors({
      ui: { colors: { neutral: "neutral" } },
    });

    for (const shade of SHADE_KEYS) {
      expect(css).toContain(
        `--ui-color-neutral-${shade}: var(--color-old-neutral-${shade},`
      );
    }
  });

  it("generates light theme variables using shade 500", () => {
    const css = generateColors({
      ui: { colors: { primary: "green", secondary: "purple" } },
    });

    expect(css).toContain("--ui-primary: var(--ui-color-primary-500);");
    expect(css).toContain("--ui-secondary: var(--ui-color-secondary-500);");
  });

  it("generates dark theme variables using shade 400", () => {
    const css = generateColors({
      ui: { colors: { primary: "green", secondary: "purple" } },
    });

    expect(css).toContain("--ui-primary: var(--ui-color-primary-400);");
    expect(css).toContain("--ui-secondary: var(--ui-color-secondary-400);");
  });

  it("ignores undefined or falsy accent entries", () => {
    const css = generateColors({
      ui: { colors: { primary: "blue", secondary: undefined } },
    });

    expect(css).toContain("--ui-color-primary-");
    expect(css).not.toContain("--ui-color-secondary-");
  });

  it("supports raw shade scale objects", () => {
    const css = generateColors({
      ui: {
        colors: {
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
        },
      },
    });

    expect(css).toContain("--ui-color-primary-50: rgb(1 1 1)");
    expect(css).toContain("--ui-color-primary-500: rgb(6 6 6)");
    expect(css).toContain("--ui-color-primary-950: rgb(11 11 11)");
  });

  it("does not throw when an unknown palette color is used", () => {
    expect(() =>
      generateColors({ ui: { colors: { primary: "not-a-real-color" } } })
    ).not.toThrow();
  });
});
