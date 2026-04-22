import { describe, expect, it } from "vitest";

import { encodeWebFonts } from "./webfont.js";

describe("#encodeWebFonts", () => {
  it("returns an empty array when fonts are disabled", () => {
    expect(encodeWebFonts({ fonts: false })).toEqual([]);
  });

  it("returns an empty array when fonts are not configured", () => {
    expect(encodeWebFonts({})).toEqual([]);
  });

  it("encodes a string family using the configured provider", () => {
    expect(
      encodeWebFonts({
        fonts: {
          family: { sans: "Inter" },
          provider: "google",
        },
      })
    ).toEqual([
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    ]);
  });

  it("uses default weights for a string family", () => {
    expect(
      encodeWebFonts({
        fonts: {
          family: { sans: "Inter" },
          provider: "google",
        },
      })
    ).toEqual([
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    ]);
  });

  it("encodes weights from a string family", () => {
    expect(
      encodeWebFonts({
        fonts: {
          family: { sans: "Inter:300,400,700" },
          provider: "google",
        },
      })
    ).toEqual([
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap",
    ]);
  });

  it("encodes weights from an array family", () => {
    expect(
      encodeWebFonts({
        fonts: {
          family: { sans: ["Inter", "300", "400", "700"] },
          provider: "google",
        },
      })
    ).toEqual([
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap",
    ]);
  });

  it("uses default weights for an array family without weights", () => {
    expect(
      encodeWebFonts({
        fonts: {
          family: { sans: ["Inter"] },
          provider: "google",
        },
      })
    ).toEqual([
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    ]);
  });

  it("normalizes numeric weights", () => {
    expect(
      encodeWebFonts({
        fonts: {
          family: { sans: { name: "Inter", weights: [300, 400, 700] } },
          provider: "google",
        },
      })
    ).toEqual([
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap",
    ]);
  });

  it("supports object family definitions", () => {
    expect(
      encodeWebFonts({
        fonts: {
          family: { sans: { name: "Inter", weights: ["300", "600"] } },
          provider: "google",
        },
      })
    ).toEqual([
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;600&display=swap",
    ]);
  });

  it("allows an object family to override the global provider", () => {
    expect(
      encodeWebFonts({
        fonts: {
          family: {
            sans: { name: "Inter", provider: "bunny", weights: ["400", "700"] },
          },
          provider: "google",
        },
      })
    ).toEqual([
      "https://fonts.bunny.net/css?family=inter:400,700&display=swap",
    ]);
  });

  it("uses the global provider when the family does not define one", () => {
    expect(
      encodeWebFonts({
        fonts: {
          family: { sans: { name: "Inter", weights: ["400", "700"] } },
          provider: "bunny",
        },
      })
    ).toEqual([
      "https://fonts.bunny.net/css?family=inter:400,700&display=swap",
    ]);
  });

  it("serializes Google weights with semicolons", () => {
    expect(
      encodeWebFonts({
        fonts: {
          family: { sans: { name: "Inter", weights: ["300", "400", "700"] } },
          provider: "google",
        },
      })
    ).toEqual([
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap",
    ]);
  });

  it("serializes Bunny weights with commas", () => {
    expect(
      encodeWebFonts({
        fonts: {
          family: { sans: { name: "Inter", weights: ["300", "400", "700"] } },
          provider: "bunny",
        },
      })
    ).toEqual([
      "https://fonts.bunny.net/css?family=inter:300,400,700&display=swap",
    ]);
  });

  it("encodes multiple font families", () => {
    const result = encodeWebFonts({
      fonts: {
        family: {
          mono: { name: "JetBrains Mono", weights: ["400", "700"] },
          sans: "Inter",
        },
        provider: "google",
      },
    });

    expect(result).toHaveLength(2);

    expect(result).toEqual(
      expect.arrayContaining([
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap",
      ])
    );
  });
});
