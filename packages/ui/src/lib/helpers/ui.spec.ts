import { describe, expect, it } from "vitest";

import { resolveOptions, resolveUI } from "./ui.js";

const adapterOptions = {
  dts: { prefix: "V" },
  tailwind: { strategy: "join" as const },
};

const userOptions = {
  dts: { prefix: "U" },
  tailwind: { cssVariables: false },
};

describe("#resolveOptions", () => {
  it("applies defaults when no arguments are provided", () => {
    const options = resolveOptions();

    expect(options.dts?.prefix).toBe("U");
    expect(options.tailwind?.cssVariables).toBe(true);
  });

  it("applies adapter options on top of defaults", () => {
    const options = resolveOptions(adapterOptions);

    expect(options.dts?.prefix).toBe("V");
    expect(options.tailwind?.strategy).toBe("join");
  });

  it("applies user options on top of adapter options", () => {
    const options = resolveOptions(adapterOptions, userOptions);

    expect(options.dts?.prefix).toBe("U");
    expect(options.tailwind?.strategy).toBe("join");
    expect(options.tailwind?.cssVariables).toBe(false);
  });

  it("preserves typing of nested options", () => {
    const options = resolveOptions({ theme: { preset: "luna" } });
    expect(options.theme?.preset).toBe("luna");
  });
});

describe("#resolveUI", () => {
  it("returns resolved UI object with defaults", () => {
    const result = resolveUI({});

    expect(result).toHaveProperty("colors");
    expect(result).toHaveProperty("components");
    expect(result).toHaveProperty("icons");
    expect(result).toHaveProperty("tw");
    expect(result.tw).toEqual({ merge: true, options: { prefix: "" } });
  });

  it("passes through custom tailwind options", () => {
    const result = resolveUI({
      tailwind: { strategy: ["join", { prefix: "tw" }] },
    });
    expect(result.tw).toEqual({ merge: false, options: { prefix: "tw" } });
  });
});
