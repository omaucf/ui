import { describe, expect, it } from "vitest";

import { ui } from "../../theme/index.js";
import { definePreflights, extractClasses, resolveTheme } from "./theme.js";

describe("definePreflights", () => {
  it("compiles component themes into a preflight", () => {
    const config = { style: { engine: "unocss" as const } };

    const [preflight] = definePreflights(config);
    expect(preflight.layer).toBe("components");

    const css = preflight.getCSS();
    expect(css).toContain('[data-scope="link"]');
    expect(css).toContain("--at-apply:");
  });
});

describe("#resolveTheme", () => {
  it("extracts classes from link component", () => {
    const link = resolveTheme(ui.link, {} as any);
    const classes = extractClasses(link);

    expect(classes).toContain("outline-primary/25");
    expect(classes).toContain("text-primary");
  });
});
