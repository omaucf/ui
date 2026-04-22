import { describe, expect, it } from "vitest";

import { generateComponentsFile, renderComponentsFile } from "./component.js";

describe("#generateComponentsFile", () => {
  it("merges defaults with registry components", async () => {
    const result = await generateComponentsFile({
      registry: {
        components: [{ from: "@custom/lib", name: "Custom" }],
      },
      router: true,
      target: "vue",
    });

    expect(result).toContain("Container");
    expect(result).toContain("Main");
    expect(result).toContain("Custom");
  });

  it("applies prefix to exposed names", async () => {
    const result = await generateComponentsFile({
      dts: { prefix: "U" },
      registry: {
        components: [{ from: "@custom/lib", name: "Button" }],
      },
      router: true,
      target: "vue",
    });

    expect(result).toContain("UContainer");
    expect(result).toContain("UMain");
    expect(result).toContain("UButton");
  });

  it("respects custom export names", async () => {
    const result = await generateComponentsFile({
      registry: {
        components: [{ export: "RootCard", from: "@custom/lib", name: "Card" }],
      },
      target: "vue",
    });

    expect(result).toContain("RootCard as Card");
  });

  it("allows per-component prefix override", async () => {
    const result = await generateComponentsFile({
      dts: { prefix: "U" },
      registry: {
        components: [
          { from: "a", name: "Foo" },
          { from: "b", name: "Bar", prefix: false },
          { from: "c", name: "Baz", prefix: "X" },
          { from: "d", name: "Qux", prefix: true },
        ],
      },
    });

    expect(result).toContain("export { Foo as UFoo } from 'a'");
    expect(result).toContain("export { Bar } from 'b'");
    expect(result).toContain("export { Baz as XBaz } from 'c'");
    expect(result).toContain("export { Qux as UQux } from 'd'");
  });
});

describe("#renderComponentsFile", () => {
  it("renders simple export", () => {
    const input = [{ from: "a", name: "Foo" }];

    const result = renderComponentsFile(input);
    expect(result).toContain("export { Foo } from 'a'");
  });

  it("renders aliased export when prefixed", () => {
    const input = [{ from: "a", name: "Foo" }];

    const result = renderComponentsFile(input, "U");

    expect(result).toContain("export { Foo as UFoo } from 'a'");
  });

  it("renders custom export alias", () => {
    const input = [{ export: "Bar", from: "a", name: "Foo" }];

    const result = renderComponentsFile(input);
    expect(result).toContain("export { Bar as Foo } from 'a'");
  });

  it("renders multiple lines", () => {
    const input = [
      { from: "a", name: "Foo" },
      { from: "b", name: "Bar" },
    ];

    const result = renderComponentsFile(input);
    expect(result).toContain(
      "export { Foo } from 'a'\nexport { Bar } from 'b'"
    );
  });
});
