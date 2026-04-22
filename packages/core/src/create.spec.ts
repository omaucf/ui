import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { existsSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import type { Template } from "@/types/registry.js";

import { createAliases, createTemplates } from "./create.js";

const ROOT = join(tmpdir(), "veehance-test");
const OUTPUT = ".veehance";

function createTemplate(
  filename: string,
  getContents: Template["getContents"],
  write = true
): Template {
  return { filename, getContents, write };
}

beforeEach(() => {
  rmSync(ROOT, { force: true, recursive: true });
});

afterEach(() => {
  rmSync(ROOT, { force: true, recursive: true });
});

describe("#createAliases", () => {
  it("creates alias map for writable templates", () => {
    const templates = [
      createTemplate("ui.ts", () => ""),
      createTemplate("imports.ts", () => ""),
    ];

    expect(createAliases(templates, ROOT, OUTPUT)).toEqual({
      "#build/imports.ts": join(ROOT, ".veehance/imports.ts"),
      "#build/ui.ts": join(ROOT, ".veehance/ui.ts"),
    });
  });

  it("skips templates without write flag", () => {
    const templates = [createTemplate("ui.ts", () => "", false)];

    expect(createAliases(templates, ROOT, OUTPUT)).toEqual({});
  });

  it("skips templates without filename", () => {
    const templates = [{ getContents: () => "x", write: true } as any];

    expect(createAliases(templates, ROOT, OUTPUT)).toEqual({});
  });
});

describe("#createTemplates", () => {
  it("writes template files to disk", async () => {
    const templates = [createTemplate("ui.ts", () => "export default {};")];

    await createTemplates(templates, ROOT, OUTPUT);
    const filePath = join(ROOT, ".veehance/ui.ts");

    expect(existsSync(filePath)).toBe(true);
    expect(readFileSync(filePath, "utf8")).toBe("export default {};");
  });

  it("supports async template contents", async () => {
    const templates = [
      createTemplate("async.ts", async () => "export const asyncValue = true;"),
    ];

    await createTemplates(templates, ROOT, OUTPUT);
    const filePath = join(ROOT, ".veehance/async.ts");

    expect(existsSync(filePath)).toBe(true);
    expect(readFileSync(filePath, "utf8")).toBe(
      "export const asyncValue = true;"
    );
  });

  it("creates nested directories automatically", async () => {
    const templates = [createTemplate("a/b/c/file.ts", () => "nested")];

    await createTemplates(templates, ROOT, OUTPUT);

    expect(existsSync(join(ROOT, ".veehance/a/b/c/file.ts"))).toBe(true);
  });

  it("skips templates without write flag", async () => {
    const templates = [createTemplate("ui.ts", () => "", false)];

    await createTemplates(templates, ROOT, OUTPUT);

    expect(existsSync(join(ROOT, ".veehance/ui.ts"))).toBe(false);
  });

  it("skips templates without filename", async () => {
    const templates = [{ getContents: () => "x", write: true } as any];

    await expect(
      createTemplates(templates, ROOT, OUTPUT)
    ).resolves.toBeUndefined();
  });

  it("overwrites existing files", async () => {
    await createTemplates(
      [createTemplate("ui.ts", () => "first")],
      ROOT,
      OUTPUT
    );
    await createTemplates(
      [createTemplate("ui.ts", () => "second")],
      ROOT,
      OUTPUT
    );

    expect(readFileSync(join(ROOT, ".veehance/ui.ts"), "utf8")).toBe("second");
  });

  it("supports mixed sync and async templates", async () => {
    const templates = [
      createTemplate("sync.ts", () => "sync"),
      createTemplate("async.ts", async () => "async"),
    ];

    await createTemplates(templates, ROOT, OUTPUT);

    expect(readFileSync(join(ROOT, ".veehance/sync.ts"), "utf8")).toBe("sync");
    expect(readFileSync(join(ROOT, ".veehance/async.ts"), "utf8")).toBe(
      "async"
    );
  });
});
