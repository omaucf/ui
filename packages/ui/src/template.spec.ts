import { describe, expect, it } from "vitest";

import { getTemplates } from "./template.js";

function filenames(templates: ReturnType<typeof getTemplates>) {
  return templates.map((t) => t.filename);
}

describe("#getTemplates", () => {
  it("generates only ui files by default", () => {
    const result = getTemplates({} as any);

    const files = filenames(result);
    const index = "theme/index.ts";

    expect(files).toContain(index);
    expect(files).toContain("ui.css");
    expect(files.some((f) => f.startsWith("theme/") && f !== index)).toBe(true);
    expect(files.some((f) => f.startsWith("theme/content/"))).toBe(false);
    expect(files.some((f) => f.startsWith("theme/prose/"))).toBe(false);
  });

  it("generates content templates when enabled", () => {
    const result = getTemplates({ content: true } as any);
    const files = filenames(result);

    expect(files.some((f) => f.startsWith("theme/content/"))).toBe(true);
    expect(files).toContain("theme/content/index.ts");
  });

  it("generates prose when content or prose is enabled", () => {
    const result = getTemplates({ prose: true } as any);
    const files = filenames(result);

    expect(files.some((f) => f.startsWith("theme/prose/"))).toBe(true);
    expect(files).toContain("theme/prose/index.ts");
  });

  it("generates css file", () => {
    const result = getTemplates({} as any);
    const css = result.find((t) => t.filename === "ui.css");

    expect(css).toBeDefined();
    expect(typeof css?.getContents()).toBe("string");
  });
});
