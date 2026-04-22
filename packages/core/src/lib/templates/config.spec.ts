import { describe, expect, it } from "vitest";

import { generateAppFile } from "./config.js";

describe("generateAppFile", () => {
  it("generates a default export with colorMode and ui", () => {
    const result = generateAppFile({
      colorMode: { fallback: "light" as const },
      ui: { components: { container: { base: "" } } },
    });

    expect(result).toContain("export default");
    expect(result).toContain("colorMode");
    expect(result).toContain("ui");
    expect(result).toContain("container");
  });
});
