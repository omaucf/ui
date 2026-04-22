import { beforeEach, describe, expect, it, vi } from "vitest";

import { existsSync, readFileSync } from "node:fs";

import { getConfig } from "./config.js";

vi.mock("node:fs", () => ({ existsSync: vi.fn(), readFileSync: vi.fn() }));

const mockedExistsSync = vi.mocked(existsSync);
const mockedReadFileSync = vi.mocked(readFileSync);

describe("#getConfig", () => {
  const cwd = "/project";

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns null when no config exists", () => {
    mockedExistsSync.mockReturnValue(false);

    expect(getConfig(cwd)).toBeNull();
  });

  it("loads ui.json", () => {
    const jsonPath = "/project/ui.json";

    mockedExistsSync.mockImplementation((p) => p === jsonPath);
    mockedReadFileSync.mockImplementation((p) => {
      if (p === jsonPath) return JSON.stringify({ framework: "vue:core" });
      throw new Error("ENOENT");
    });

    const result = getConfig(cwd);

    expect(result).toBeDefined();
  });

  it("loads ui.jsonc with comments", () => {
    const jsoncPath = "/project/ui.jsonc";

    mockedExistsSync.mockImplementation((p) => p === jsoncPath);
    mockedReadFileSync.mockImplementation((p) => {
      if (p === jsoncPath)
        return `{\n        // framework configuration\n        "framework": "vue:core"\n      }`;
      throw new Error("ENOENT");
    });

    const result = getConfig(cwd);
    expect(result).toBeDefined();
  });

  it("throws on invalid JSON", () => {
    const jsonPath = "/project/ui.json";

    mockedExistsSync.mockImplementation((p) => p === jsonPath);
    mockedReadFileSync.mockImplementation(() => "{ invalid json");

    expect(() => getConfig(cwd)).toThrow();
  });

  it("validates config schema", () => {
    const jsonPath = "/project/ui.json";

    mockedExistsSync.mockImplementation((p) => p === jsonPath);
    mockedReadFileSync.mockImplementation(() =>
      JSON.stringify({ invalidShape: true })
    );

    expect(() => getConfig(cwd)).toThrow();
  });
});
