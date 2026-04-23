import { describe, expect, it } from "vitest";

import { defineComponents, PRESET_MAP } from "./component.js";

const defaultComponents = {
  container: {
    base: "opacity-100 starting:opacity-0 transition-opacity duration-750",
  },
  icon: {
    dynamic: false,
    size: 24,
  },
};

describe("#defineComponents", () => {
  it("uses vega preset by default", () => {
    const result = defineComponents();

    expect(result).toMatchObject({
      ...PRESET_MAP.vega,
      ...defaultComponents,
    });
  });

  it.each([
    ["luma"],
    ["lyra"],
    ["maia"],
    ["mira"],
    ["nova"],
    ["sera"],
  ] as const)("resolves %s preset when specified", (style) => {
    const result = defineComponents(style);
    expect(result).toMatchObject({
      ...PRESET_MAP[style],
      ...defaultComponents,
    });
  });

  it("handles undefined preset safely", () => {
    const result = defineComponents(undefined as any);
    expect(result).toMatchObject({
      ...PRESET_MAP.vega,
      ...defaultComponents,
    });
  });
});
