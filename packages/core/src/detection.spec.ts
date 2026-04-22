import { beforeEach, describe, expect, it, vi } from "vitest";

import { readFile } from "node:fs/promises";

import { globby } from "globby";

import { detectComponents, resolveComponentName } from "./detection.js";

vi.mock("node:fs/promises");
vi.mock("globby");

const mockedGlobby = vi.mocked(globby);
const mockedReadFile = vi.mocked(readFile);

describe("#detectComponents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all candidates when detection is disabled", async () => {
    const result = await detectComponents(["Container", "Main"], {
      dts: { detection: false },
      target: "vue",
    });

    expect(result).toEqual(["Container", "Main"]);
  });

  it("detects used components from source files", async () => {
    mockedGlobby.mockResolvedValue(["app.vue"]);
    mockedReadFile.mockResolvedValue("<template><Container /></template>");

    const result = await detectComponents(["Container", "Main"], {
      dts: { detection: true },
      target: "vue",
    });

    expect(result).toEqual(["Container"]);
  });

  it("always includes Icon and Image when present in candidates", async () => {
    mockedGlobby.mockResolvedValue([]);

    const result = await detectComponents(["Icon", "Image", "Container"], {
      dts: { detection: true },
      target: "vue",
    });

    expect(result).toEqual(["Icon", "Image"]);
  });

  it("includes manually detected components", async () => {
    mockedGlobby.mockResolvedValue([]);

    const result = await detectComponents(["Container", "Main"], {
      dts: { detection: ["Main"] },
      target: "vue",
    });

    expect(result).toEqual(["Main"]);
  });

  it("supports prefixed component names", async () => {
    mockedGlobby.mockResolvedValue(["app.vue"]);
    mockedReadFile.mockResolvedValue("<template><UContainer /></template>");

    const result = await detectComponents(["Container", "Main"], {
      dts: { detection: true, prefix: "U" },
      target: "vue",
    });

    expect(result).toEqual(["Container"]);
  });
});

describe("#resolveComponentName", () => {
  it("resolves standard component names", () => {
    expect(resolveComponentName("container", { prefix: "u" })).toBe(
      "UContainer"
    );
  });

  it("resolves standard component names without prefix", () => {
    expect(resolveComponentName("container")).toBe("Container");
  });

  it("resolves colorMode namespace components", () => {
    expect(resolveComponentName("button", { namespace: "colorMode" })).toBe(
      "ColorModeButton"
    );
  });

  it("resolves prose namespace components", () => {
    expect(resolveComponentName("h1", { namespace: "prose" })).toBe("ProseH1");
  });

  it("supports prefixNamespaces", () => {
    expect(
      resolveComponentName("button", {
        namespace: "colorMode",
        prefix: "u",
        prefixNamespaces: true,
      })
    ).toBe("UColorModeButton");
  });
});
