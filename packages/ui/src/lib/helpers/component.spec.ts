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
  it("uses luna style by default", () => {
    const result = defineComponents();

    expect(result).toMatchObject({
      ...PRESET_MAP.luna,
      ...defaultComponents,
    });
  });

  it.each([
    ["lyra"],
    ["maia"],
    ["mira"],
    ["nova"],
  ] as const)("resolves %s style when specified", (style) => {
    const result = defineComponents(style);
    expect(result).toMatchObject({
      ...PRESET_MAP[style],
      ...defaultComponents,
    });
  });

  it("merges overrides over preset defaults", () => {
    const result = defineComponents(["luna", { icon: { dynamic: true } }]);
    expect(result?.icon?.dynamic).toBe(true);
  });

  it("injects icon.dynamic=false when not provided", () => {
    const result = defineComponents("vega");
    expect(result?.icon?.dynamic).toBe(false);
  });

  it("handles undefined style safely", () => {
    const result = defineComponents(undefined as any);
    expect(result).toMatchObject({
      ...PRESET_MAP.luna,
      ...defaultComponents,
    });
  });
});
