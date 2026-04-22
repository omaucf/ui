import { describe, expect, it, vi } from "vitest";

import { toSVG } from "./icon.js";

vi.mock("@iconify/utils", () => ({
  iconToSVG: vi.fn(() => ({
    attributes: { height: 24, width: 24 },
    body: "<path />",
  })),
  replaceIDs: vi.fn((body) => body),
}));

vi.mock("#build/ui/icons", () => ({
  default: {
    lucide: { height: 24, icons: { moon: { body: "<path />" } }, width: 24 },
    simpleIcons: {
      height: 24,
      icons: { github: { body: "<path />" } },
      width: 24,
    },
  },
}));

describe("#toSVG", () => {
  it("renders icon from default collection", () => {
    const result = toSVG("i-lucide:moon")!;

    expect(result).not.toBeNull();
    expect(result.attributes.width).toBe(24);
    expect(result.body).toBe("<path />");
  });

  it("supports dashed collections via camelCase", () => {
    const result = toSVG("i-simple-icons:github")!;

    expect(result).not.toBeNull();
    expect(result.body).toBe("<path />");
  });

  it("returns null if collection does not exist", () => {
    const result = toSVG("unknown:moon");

    expect(result).toBeNull();
  });

  it("returns null if icon does not exist", () => {
    const result = toSVG("i-lucide:sun");

    expect(result).toBeNull();
  });

  it("returns null for invalid format", () => {
    const result = toSVG("invalid-format");

    expect(result).toBeNull();
  });
});
