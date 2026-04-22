import { describe, expect, it } from "vitest";

import { FEATURE_DEFAULTS } from "@/defaults.js";

import { resolveConfig } from "./config.js";

describe("#resolveConfig", () => {
  it("applies defaults when no arguments are provided", () => {
    const options = resolveConfig();

    expect(options.colorMode).toStrictEqual(FEATURE_DEFAULTS.colorMode);
    expect(options.locale).toBe(undefined);
  });

  it("applies adapter options on top of defaults", () => {
    const options = resolveConfig({ locale: true });

    expect(options.colorMode).toStrictEqual(FEATURE_DEFAULTS.colorMode);
    expect(options.locale).toStrictEqual(FEATURE_DEFAULTS.locale);
  });

  it("applies user options on top of adapter options", () => {
    const options = resolveConfig({ locale: true }, { colorMode: false });

    expect(options.colorMode).toBe(false);
    expect(options.locale).toStrictEqual(FEATURE_DEFAULTS.locale);
  });
});
