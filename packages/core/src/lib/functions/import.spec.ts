import { describe, expect, it } from "vitest";

import { renderImportsFile } from "./import.js";

describe("#renderImportsFile", () => {
  it("renders a single export", () => {
    const result = renderImportsFile([
      {
        from: "@veehance/react/use-app-config",
        names: ["useAppConfig"],
      },
    ]);

    expect(result).toBe(
      "export { useAppConfig } from '@veehance/react/use-app-config'"
    );
  });

  it("renders multiple exports", () => {
    const result = renderImportsFile([
      {
        from: "@veehance/react/use-app-config",
        names: ["useAppConfig"],
      },
      {
        from: "@veehance/react/use-color-mode",
        names: ["useColorMode"],
      },
    ]);

    expect(result).toBe(
      [
        "export { useAppConfig } from '@veehance/react/use-app-config'",
        "export { useColorMode } from '@veehance/react/use-color-mode'",
      ].join("\n")
    );
  });

  it("renders grouped names from the same source", () => {
    const result = renderImportsFile([
      {
        from: "@veehance/react/use-router",
        names: ["useRoute", "useRouter"],
      },
    ]);

    expect(result).toBe(
      "export { useRoute, useRouter } from '@veehance/react/use-router'"
    );
  });

  it("returns empty string for empty entries", () => {
    expect(renderImportsFile([])).toBe("");
  });
});
