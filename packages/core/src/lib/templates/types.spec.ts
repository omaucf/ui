import { describe, expect, it } from "vitest";

import { generateTypesFile, renderTypesFile } from "./types.js";

describe("#generateTypesFile", () => {
  it("merges defaults with overrides", async () => {
    const result = await generateTypesFile({
      registry: { types: [{ from: "@veehance/vue", names: ["*"] }] },
      router: true,
      target: "vue",
    });

    expect(result).toContain("@veehance/vue");
    expect(result).toContain("*");
  });
});

describe("#renderTypesFile", () => {
  it("renders types statements", () => {
    const input = [{ from: "a", names: ["Foo", "Bar"] }];

    const result = renderTypesFile(input);
    expect(result).toBe("export type { Foo, Bar } from 'a'");
  });

  it("renders multiple lines", () => {
    const input = [
      { from: "a", names: ["Foo"] },
      { from: "b", names: ["Bar"] },
    ];

    const result = renderTypesFile(input);
    expect(result).toBe(
      "export type { Foo } from 'a'\nexport type { Bar } from 'b'"
    );
  });
});
