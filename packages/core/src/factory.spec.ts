import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { existsSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { createAliases, createTemplates } from "./factory.js";
import type { Template } from "./lib/types/index.js";

const ROOT = join(tmpdir(), "veehance-test");
const OUTPUT = ".veehance";

function createTemplate(
  filename: string,
  contents: string,
  write = true
): Template {
  return { filename, write, getContents: () => contents } as Template;
}

beforeEach(() => {
  rmSync(ROOT, { recursive: true, force: true });
});

afterEach(() => {
  rmSync(ROOT, { recursive: true, force: true });
});

describe("#createAliases", () => {
  it("creates alias map for writable templates", () => {
    const templates = [
      createTemplate("ui/icons.ts", "icons"),
      createTemplate("ui/button.ts", "button"),
    ];

    const aliases = createAliases(ROOT, templates, OUTPUT);
    expect(aliases).toEqual({
      "#build/ui/icons.ts": join(ROOT, ".veehance/ui/icons.ts"),
      "#build/ui/button.ts": join(ROOT, ".veehance/ui/button.ts"),
    });
  });

  it("skips templates without write flag", () => {
    const templates = [createTemplate("ui/icons.ts", "icons", false)];

    const aliases = createAliases(ROOT, templates, OUTPUT);
    expect(aliases).toEqual({});
  });

  it("skips templates without filename", () => {
    const templates = [{ write: true, getContents: () => "x" } as any];

    const aliases = createAliases(ROOT, templates, OUTPUT);
    expect(aliases).toEqual({});
  });
});

describe("#createTemplates", () => {
  it("writes template files to disk", () => {
    const templates = [
      createTemplate("ui/icons.ts", "export const icons = {};"),
    ];

    createTemplates(ROOT, templates, OUTPUT);

    const filePath = join(ROOT, ".veehance/ui/icons.ts");
    expect(existsSync(filePath)).toBe(true);
    expect(readFileSync(filePath, "utf8")).toBe("export const icons = {};");
  });

  it("creates nested directories automatically", () => {
    const templates = [createTemplate("a/b/c/file.ts", "nested")];

    createTemplates(ROOT, templates, OUTPUT);

    const filePath = join(ROOT, ".veehance/a/b/c/file.ts");
    expect(existsSync(filePath)).toBe(true);
  });

  it("skips templates without write flag", () => {
    const templates = [createTemplate("ui/icons.ts", "icons", false)];

    createTemplates(ROOT, templates, OUTPUT);

    const filePath = join(ROOT, ".veehance/ui/icons.ts");
    expect(existsSync(filePath)).toBe(false);
  });

  it("skips templates without filename", () => {
    const templates = [{ write: true, getContents: () => "x" } as any];

    expect(() => createTemplates(ROOT, templates, OUTPUT)).not.toThrow();
  });

  it("overwrites existing files", () => {
    const templates = [createTemplate("ui/icons.ts", "first")];

    createTemplates(ROOT, templates, OUTPUT);
    createTemplates(ROOT, [createTemplate("ui/icons.ts", "second")], OUTPUT);

    const filePath = join(ROOT, ".veehance/ui/icons.ts");
    expect(readFileSync(filePath, "utf8")).toBe("second");
  });
});
