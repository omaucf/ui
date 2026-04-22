import { describe, expect, it } from "vitest";

import { setupExclude } from "./dev.js";

function matchesAny(regexes: RegExp[], path: string) {
  return regexes.some((r) => r.test(path));
}

describe("#setupExclude", () => {
  it("excludes node_modules except .pnpm", () => {
    const rules = setupExclude();

    expect(matchesAny(rules, "/node_modules/vue/index.js")).toBe(true);
    expect(matchesAny(rules, "/node_modules/.pnpm/pkg/index.js")).toBe(false);
  });

  it("does not exclude allowed packages", () => {
    const rules = setupExclude();

    expect(matchesAny(rules, "/node_modules/@veehance/core/index.js")).toBe(
      false
    );
  });

  it("excludes .git and .veehance folders", () => {
    const rules = setupExclude();

    expect(matchesAny(rules, "/project/.git/config")).toBe(true);
    expect(matchesAny(rules, "/project/.veehance/cache")).toBe(true);
  });

  it("supports extra patterns", () => {
    // biome-ignore lint/performance/useTopLevelRegex: safe_to_set
    const rules = setupExclude({ extra: [/[\\/]\.custom[\\/]/] });

    expect(matchesAny(rules, "/foo/.custom/file.js")).toBe(true);
  });

  it("does not exclude normal project files", () => {
    const rules = setupExclude();

    expect(matchesAny(rules, "/src/components/Button.tsx")).toBe(false);
  });
});
