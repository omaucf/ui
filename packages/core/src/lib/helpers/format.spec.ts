import { describe, expect, it } from "vitest";

import { formatIconName, isFormattedIcon } from "./format.js";

describe("#formatIconName", () => {
  it("formats an icon name without a prefix", () => {
    expect(formatIconName("lucide:user", "i", false)).toBe("i-lucide:user");
  });

  it("formats an icon name with a transform prefix", () => {
    expect(formatIconName("lucide:user", "iconify", true)).toBe(
      "iconify lucide--user"
    );
  });

  it("normalizes leading and trailing dashes from the prefix", () => {
    expect(formatIconName("user", "--i--", false)).toBe("i-user");
    expect(formatIconName("user", "--iconify--", true)).toBe("iconify user");
  });

  it("uses the default Iconify weights unchanged", () => {
    expect(formatIconName("lucide:arrow-right", "i-", false)).toBe(
      "i-lucide:arrow-right"
    );
  });
});

describe("#isFormattedIcon", () => {
  it("recognizes a Tailwind icon name", () => {
    expect(isFormattedIcon("i-lucide:user", "i", false)).toBe(true);
  });

  it("recognizes a transform icon name", () => {
    expect(isFormattedIcon("iconify lucide--user", "iconify", true)).toBe(true);
  });

  it("does not recognize an unformatted Tailwind icon", () => {
    expect(isFormattedIcon("lucide:user", "i", false)).toBe(false);
  });

  it("does not recognize an unformatted transform icon", () => {
    expect(isFormattedIcon("iconify-lucide:user", "iconify", true)).toBe(false);
  });

  it("normalizes the prefix when checking", () => {
    expect(isFormattedIcon("i-lucide:user", "--i--", false)).toBe(true);
    expect(isFormattedIcon("iconify lucide--user", "--iconify--", true)).toBe(
      true
    );
  });
});
