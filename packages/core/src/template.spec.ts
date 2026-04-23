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

    expect(files).toContain("app.config.ts");
    expect(files).toContain("ui.css");
    expect(files).toContain(index);
    expect(files.some((f) => f.startsWith("theme/") && f !== index)).toBe(true);
  });

  it("generates app.config file", () => {
    const result = getTemplates({} as any);
    const appConfig = result.find((t) => t.filename === "app.config.ts");

    expect(appConfig).toBeDefined();
    expect(typeof appConfig?.getContents()).toBe("string");
  });

  it("generates css file", () => {
    const result = getTemplates({} as any);
    const css = result.find((t) => t.filename === "ui.css");

    expect(css).toBeDefined();
    expect(typeof css?.getContents()).toBe("string");
  });
});
