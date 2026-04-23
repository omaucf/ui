import { describe, expect, it } from "vitest";

import { extractUI, resolveUI } from "./ui.js";

describe("extractUI", () => {
  it("extracts color and icon unions", () => {
    const [colorUnion, iconUnion] = extractUI(["primary", "secondary"], {
      check: "",
      close: "",
    });

    expect(colorUnion).toContain('"primary" | "secondary"');
    expect(iconUnion).toContain('"check" | "close"');
  });
});

describe("#resolveUI", () => {
  it("returns resolved UI object with defaults", () => {
    const result = resolveUI();

    expect(result).toHaveProperty("colors");
    expect(result).toHaveProperty("tw");
  });
});
