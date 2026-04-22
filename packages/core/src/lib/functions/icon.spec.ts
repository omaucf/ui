import { describe, expect, it } from "vitest";

import { CONFIG_DEFAULTS, FEATURE_DEFAULTS } from "@/defaults.js";

import { defineIcons, extractIcons } from "./icon.js";

describe("#defineIcons", () => {
  it("resolves icons using tailwind formatting by default", () => {
    expect(defineIcons()).toMatchObject({
      loading: `${FEATURE_DEFAULTS.icons.prefix} lucide--loader-circle`,
      user: `${FEATURE_DEFAULTS.icons.prefix} lucide--user`,
    });
  });

  it("uses the selected iconset", () => {
    expect(
      defineIcons(
        FEATURE_DEFAULTS.icons.prefix,
        CONFIG_DEFAULTS.style.engine,
        "tabler"
      )
    ).toMatchObject({
      loading: `${FEATURE_DEFAULTS.icons.prefix} tabler--loader-2`,
      user: `${FEATURE_DEFAULTS.icons.prefix} tabler--user`,
    });
  });

  it("uses a custom prefix", () => {
    expect(defineIcons("custom")).toMatchObject({
      user: "custom lucide--user",
    });
  });

  it("does not duplicate already formatted overrides", () => {
    expect(
      defineIcons(
        "custom",
        CONFIG_DEFAULTS.style.engine,
        CONFIG_DEFAULTS.theme.iconset,
        {
          user: "custom lucide--user",
        }
      )
    ).toMatchObject({ user: "custom lucide--user" });
  });

  it("uses standard icon syntax outside tailwind", () => {
    expect(defineIcons("i-", "unocss")).toMatchObject({
      user: "i-lucide:user",
    });
  });

  it("transforms icon overrides using the active formatter", () => {
    expect(
      defineIcons(
        FEATURE_DEFAULTS.icons.prefix,
        CONFIG_DEFAULTS.style.engine,
        CONFIG_DEFAULTS.theme.iconset,
        { user: "custom:user" }
      )
    ).toMatchObject({ user: `${FEATURE_DEFAULTS.icons.prefix} custom--user` });
  });

  it("preserves already formatted non-tailwind values", () => {
    expect(
      defineIcons("i-", "unocss", CONFIG_DEFAULTS.theme.iconset, {
        user: "i-custom:user",
      })
    ).toMatchObject({ user: "i-custom:user" });
  });
});

describe("#extractIcons", () => {
  const lucideUno = "i-lucide:moon";
  const lucideTw = "iconify lucide--moon";
  const githubUno = "i-simple-icons:github";
  const githubTw = "iconify simple-icons--github";

  it("returns default iconset when icons is undefined", () => {
    expect(extractIcons()).toEqual([CONFIG_DEFAULTS.theme.iconset]);
  });

  it("falls back when no valid icon references exist", () => {
    expect(extractIcons({ a: "invalid", b: "" })).toEqual([
      CONFIG_DEFAULTS.theme.iconset,
    ]);
  });

  it("extracts collections from UnoCSS format", () => {
    expect(extractIcons({ dark: lucideUno, github: githubUno })).toEqual([
      "lucide",
      "simple-icons",
    ]);
  });

  it("extracts collections from Tailwind format", () => {
    expect(extractIcons({ dark: lucideTw, github: githubTw })).toEqual([
      "lucide",
      "simple-icons",
    ]);
  });

  it("extracts collections from mixed formats", () => {
    expect(extractIcons({ a: lucideUno, b: githubTw })).toEqual([
      "lucide",
      "simple-icons",
    ]);
  });

  it("deduplicates repeated collections across formats", () => {
    expect(extractIcons({ a: lucideUno, b: lucideTw, c: lucideUno })).toEqual([
      "lucide",
    ]);
  });

  it("ignores invalid values while keeping valid ones", () => {
    expect(extractIcons({ a: lucideUno, b: "invalid", c: "" })).toEqual([
      "lucide",
    ]);
  });
});
