import { describe, expect, it } from "vitest";

import { generateAppConfig } from "./app-config.js";

describe("generateAppConfig", () => {
  it("generates a default export with colorMode and ui", () => {
    const result = generateAppConfig({
      colorMode: true,
      ui: { components: { container: { base: "" } } },
    });

    expect(result).toContain("export default");
    expect(result).toContain('"colorMode":');
    expect(result).toContain('"ui":');
    expect(result).toContain('"container"');
  });
});
