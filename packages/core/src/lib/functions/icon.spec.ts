import { describe, expect, it } from "vitest";

import { default as defaults } from "../defaults.js";
import { detectIcons, generateIcons } from "./icon.js";

describe("#detectIcons", () => {
  it("returns 'lucide' when icons is undefined", () => {
    expect(detectIcons()).toEqual([defaults.theme.iconset]);
  });

  it("extracts unique collections from valid icon references", () => {
    expect(
      detectIcons({ dark: "lucide:moon", github: "simple-icons:github" })
    ).toEqual(["lucide", "simple-icons"]);
  });

  it("deduplicates repeated collections", () => {
    expect(
      detectIcons({
        a: "lucide:moon",
        b: "lucide:sun",
        c: "lucide:user",
      })
    ).toEqual(["lucide"]);
  });

  it("ignores values without ':' separator", () => {
    expect(detectIcons({ a: "lucide:moon", b: "invalid", c: "" })).toEqual([
      "lucide",
    ]);
  });

  it("falls back to 'lucide' if no valid icon references exist", () => {
    expect(detectIcons({ a: "invalid", b: "" })).toEqual([
      defaults.theme.iconset,
    ]);
  });
});

describe("#generateIcons", () => {
  it("defaults to lucide when no argument is provided", () => {
    const result = generateIcons();

    expect(result).toContain("@iconify-json/lucide/icons.json");
    expect(result).toContain("{ lucide }");
  });

  it("generates multiple icon imports when provided", () => {
    const result = generateIcons({
      ui: { icons: { dark: "lucide:moon", github: "mdi:github" } },
    });

    expect(result).toContain("@iconify-json/lucide/icons.json");
    expect(result).toContain("@iconify-json/mdi/icons.json");
    expect(result).toContain("{ lucide, mdi }");
  });
});
