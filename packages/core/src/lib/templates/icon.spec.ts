import { describe, expect, it } from "vitest";

import { generateIconsFile } from "./icon.js";

describe("#generateIconsFile", () => {
  it("generates multiple external icon imports from ui.icons", () => {
    const result = generateIconsFile({
      ui: { icons: { dark: "i-lucide:moon", github: "i-mdi:github" } },
    });

    expect(result).toContain("@iconify-json/lucide/icons.json");
    expect(result).toContain("@iconify-json/mdi/icons.json");
  });

  it("supports registry external icon sets", () => {
    const result = generateIconsFile({
      registry: { icons: [{ name: "mdi" }] },
    });

    expect(result).toContain("@iconify-json/mdi/icons.json");
    expect(result).toContain("mdi");
  });

  it("supports custom import source for external sets", () => {
    const result = generateIconsFile({
      registry: {
        icons: [{ from: "custom-icons/mdi.json", name: "mdi" }],
      },
    });

    expect(result).toContain("from 'custom-icons/mdi.json'");
  });

  it("supports inline icon sets", () => {
    const result = generateIconsFile({
      registry: {
        icons: [
          {
            name: "custom",
            raw: { logo: "<svg><path d='M0 0h24v24z' /></svg>" },
          },
        ],
      },
    });

    expect(result).toContain("custom");
    expect(result).not.toContain("logo");
    expect(result).not.toContain("<path");
  });

  it("merges ui.icons with registry.icons", () => {
    const result = generateIconsFile({
      registry: { icons: [{ name: "mdi" }] },
      ui: { icons: { dark: "lucide:moon" } },
    });

    expect(result).toContain("@iconify-json/lucide/icons.json");
    expect(result).toContain("@iconify-json/mdi/icons.json");
  });

  it("deduplicates external icon sets", () => {
    const result = generateIconsFile({
      registry: { icons: [{ name: "mdi" }] },
      ui: { icons: { a: "mdi:home" } },
    });

    const matches = result.match(/@iconify-json\/mdi\/icons\.json/g) ?? [];
    expect(matches.length).toBe(1);
  });
});
