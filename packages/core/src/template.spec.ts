import { describe, expect, it } from "vitest";

import { getTemplates } from "./template.js";

function filenames(templates: ReturnType<typeof getTemplates>) {
  return templates.map((t) => t.filename);
}

describe("#getTemplates", () => {
  it("generates default files", () => {
    const templates = getTemplates({});

    const files = filenames(templates);
    const index = "theme/index.ts";

    expect(files).toContain("app.config.ts");
    expect(files).toContain("ui.css");
    expect(files).toContain(index);
  });

  it("generates meta files", () => {
    const templates = getTemplates({}, true);

    const files = filenames(templates);

    expect(files).toContain("ui/components.ts");
    expect(files).toContain("ui/imports.ts");
  });
});
