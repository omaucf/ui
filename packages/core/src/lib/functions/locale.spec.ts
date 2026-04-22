import { describe, expect, it } from "vitest";

import type { DeepPartial } from "@/types/abstract.js";
import type { Locale, Messages } from "@/types/locale.js";

import { defineLocale, extendLocale } from "./locale.js";

const baseMessages: DeepPartial<Messages> = {
  colorMode: {
    dark: "Dark",
    light: "Light",
    switchToDark: "Switch to dark",
    switchToLight: "Switch to light",
    system: "System",
  },
};

describe("#defineLocale", () => {
  it("creates a locale with explicit direction", () => {
    const locale = defineLocale({
      code: "en",
      dir: "ltr",
      messages: baseMessages,
      name: "English",
    });

    expect(locale).toEqual({
      code: "en",
      dir: "ltr",
      messages: baseMessages,
      name: "English",
    });
  });

  it("defaults dir to 'ltr' when not provided", () => {
    const locale = defineLocale({
      code: "en",
      messages: baseMessages,
      name: "English",
    });

    expect(locale.dir).toBe("ltr");
  });

  it("preserves message typing", () => {
    const locale = defineLocale<DeepPartial<Messages>>({
      code: "en",
      messages: baseMessages,
      name: "English",
    });

    expect(locale.messages.colorMode?.dark).toBe("Dark");
  });
});

describe("extendLocale", () => {
  const baseLocale: Locale<DeepPartial<Messages>> = defineLocale({
    code: "en",
    messages: baseMessages,
    name: "English",
  });

  it("overrides top-level properties", () => {
    const extended = extendLocale(baseLocale, {
      code: "en-US",
      name: "English (US)",
    });

    expect(extended.name).toBe("English (US)");
    expect(extended.code).toBe("en-US");
    expect(extended.dir).toBe("ltr");
  });
});
