import { describe, expect, it } from "vitest";

import { generateImportsFile, renderImportsFile } from "./import.js";

describe("#generateImportsFile", () => {
  it("merges defaults with overrides", async () => {
    const result = await generateImportsFile({
      registry: {
        imports: [
          { from: "@custom/lib", names: ["useCustom"] },
          { from: "@veehance/vue/use-icon", names: ["useIconExtra"] },
        ],
      },
      router: true,
      target: "vue",
    });

    expect(result).toContain("useCustom");
    expect(result).toContain("useIcon");
    expect(result).toContain("useIconExtra");
  });
});

describe("#renderImportsFile", () => {
  it("renders import statements", () => {
    const input = [{ from: "a", names: ["foo", "bar"] }];

    const result = renderImportsFile(input);
    expect(result).toBe("export { foo, bar } from 'a'");
  });

  it("renders multiple lines", () => {
    const input = [
      { from: "a", names: ["foo"] },
      { from: "b", names: ["bar"] },
    ];

    const result = renderImportsFile(input);
    expect(result).toBe("export { foo } from 'a'\nexport { bar } from 'b'");
  });
});
