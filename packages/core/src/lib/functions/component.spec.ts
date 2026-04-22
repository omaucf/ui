import { describe, expect, it } from "vitest";

import { PRESET_MAP } from "@/constants/theme.js";

import { defineComponents } from "./component.js";

describe("#defineComponents", () => {
  it("uses vega preset by default", () => {
    const result = defineComponents();

    expect(result).toMatchObject({ ...PRESET_MAP.vega });
  });

  it.each(["luma", "lyra", "maia", "mira", "nova", "rhea", "sera"] as const)(
    "resolves %s preset when specified",
    (preset) => {
      const result = defineComponents(undefined, undefined, preset);

      expect(result).toMatchObject({ ...PRESET_MAP[preset] });
    }
  );
});
