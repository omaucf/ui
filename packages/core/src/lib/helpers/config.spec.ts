import { describe, expect, it } from "vitest";

import { resolveOptions } from "./config.js";

describe("#resolveOptions", () => {
  it("applies defaults when no arguments are provided", () => {
    const options = resolveOptions();

    expect(options.colorMode).toBe(true);
    expect(options.locale).toBe(false);
  });

  it("applies adapter options on top of defaults", () => {
    const options = resolveOptions({ locale: true });

    expect(options.colorMode).toBe(true);
    expect(options.locale).toBe(true);
  });

  it("applies user options on top of adapter options", () => {
    const options = resolveOptions({ locale: true }, { colorMode: false });

    expect(options.colorMode).toBe(false);
    expect(options.locale).toBe(true);
  });
});
