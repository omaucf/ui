import { describe, expect, it } from "vitest";

import { en } from "../../locale/index.js";
import { buildTranslator } from "./locale.js";

describe("#buildTranslator", () => {
  const t = buildTranslator(en);

  it("translates a nested message", () => {
    expect(t("colorMode.dark")).toBe("Dark");
  });

  it("translates another nested message", () => {
    expect(t("error.clear")).toBe("Back to home");
  });

  it("returns path when message does not exist", () => {
    expect(t("missing.key")).toBe("missing.key");
  });

  it("interpolates variables", () => {
    const t = buildTranslator({
      ...en,
      messages: {
        greeting: "Hello {name}",
      },
    });

    expect(t("greeting", { name: "World" })).toBe("Hello World");
  });

  it("supports numeric interpolation", () => {
    const t = buildTranslator({
      ...en,
      messages: {
        count: "You have {count} messages",
      },
    });

    expect(t("count", { count: 5 })).toBe("You have 5 messages");
  });

  it("keeps placeholder when variable is missing", () => {
    const t = buildTranslator({
      ...en,
      messages: {
        greeting: "Hello {name}",
      },
    });

    expect(t("greeting")).toBe("Hello {name}");
  });
});
