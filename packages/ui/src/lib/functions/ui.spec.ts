import { describe, expect, it } from "vitest";

import { extractUI } from "./ui.js";

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
