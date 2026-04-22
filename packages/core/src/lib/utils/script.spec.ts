import { describe, expect, it, vi } from "vitest";

import { FEATURE_DEFAULTS } from "@/defaults.js";

import {
  getStoredPreference,
  getSystemTheme,
  normalizePreference,
  resolveColorScript,
  resolveMode,
  savePreference,
  subscribeSystemTheme,
} from "./script.js";

describe("#resolveColorScript", () => {
  it("uses defaults when no options are provided", () => {
    expect(resolveColorScript()).toMatchObject(FEATURE_DEFAULTS.colorMode);
  });

  it("uses app config over defaults", () => {
    const config = resolveColorScript({
      enableSystem: false,
      fallback: "dark",
      preference: "dark",
    });

    expect(config).toMatchObject({
      enableSystem: false,
      fallback: "dark",
      preference: "dark",
    });
  });

  it("uses provider value over app config", () => {
    const config = resolveColorScript(
      { enableSystem: true, preference: "light" },
      { enableSystem: false, preference: "dark" }
    );

    expect(config.preference).toBe("light");
    expect(config.enableSystem).toBe(true);
  });
});

describe("#normalizePreference", () => {
  const options = {
    enableSystem: true,
    fallback: "light" as const,
  };

  it("accepts light", () => {
    expect(normalizePreference("light", options)).toBe("light");
  });

  it("accepts dark", () => {
    expect(normalizePreference("dark", options)).toBe("dark");
  });

  it("accepts system when system mode is enabled", () => {
    expect(normalizePreference("system", options)).toBe("system");
  });

  it("falls back when system mode is disabled", () => {
    expect(
      normalizePreference("system", {
        enableSystem: false,
        fallback: "dark",
      })
    ).toBe("dark");
  });

  it("falls back for invalid values", () => {
    expect(normalizePreference("invalid", options)).toBe("light");
    expect(normalizePreference(null, options)).toBe("light");
    expect(normalizePreference(undefined, options)).toBe("light");
  });
});

describe("#resolveMode", () => {
  it("resolves light directly", () => {
    expect(resolveMode("light", "dark")).toBe("light");
  });

  it("resolves dark directly", () => {
    expect(resolveMode("dark", "light")).toBe("dark");
  });

  it("resolves system using the system theme", () => {
    expect(resolveMode("system", "dark")).toBe("dark");
    expect(resolveMode("system", "light")).toBe("light");
  });
});

describe("#getSystemTheme", () => {
  it("returns dark when the media query matches", () => {
    const window = {
      matchMedia: vi.fn(() => ({ matches: true })),
    } as unknown as Window;

    expect(getSystemTheme(window)).toBe("dark");
  });

  it("returns light when the media query does not match", () => {
    const window = {
      matchMedia: vi.fn(() => ({ matches: false })),
    } as unknown as Window;

    expect(getSystemTheme(window)).toBe("light");
  });
});

describe("#getStoredPreference", () => {
  const options = {
    enableSystem: true,
    fallback: "light" as const,
  };

  it("returns the stored preference", () => {
    const window = {
      localStorage: {
        getItem: vi.fn(() => "dark"),
      },
    } as unknown as Window;

    expect(getStoredPreference(window, "ui-theme", "light", options)).toBe(
      "dark"
    );
  });

  it("uses the configured preference when nothing is stored", () => {
    const window = {
      localStorage: {
        getItem: vi.fn(() => null),
      },
    } as unknown as Window;

    expect(getStoredPreference(window, "ui-theme", "system", options)).toBe(
      "system"
    );
  });

  it("normalizes an invalid stored preference", () => {
    const window = {
      localStorage: {
        getItem: vi.fn(() => "invalid"),
      },
    } as unknown as Window;

    expect(getStoredPreference(window, "ui-theme", "system", options)).toBe(
      "light"
    );
  });

  it("falls back when storage is unavailable", () => {
    const window = {
      localStorage: {
        getItem: vi.fn(() => {
          throw new Error("Storage unavailable");
        }),
      },
    } as unknown as Window;

    expect(getStoredPreference(window, "ui-theme", "dark", options)).toBe(
      "dark"
    );
  });
});

describe("#savePreference", () => {
  it("stores the preference", () => {
    const setItem = vi.fn();

    const window = {
      localStorage: {
        setItem,
      },
    } as unknown as Window;

    savePreference(window, "ui-theme", "dark");

    expect(setItem).toHaveBeenCalledWith("ui-theme", "dark");
  });

  it("ignores storage failures", () => {
    const window = {
      localStorage: {
        setItem: vi.fn(() => {
          throw new Error("Storage unavailable");
        }),
      },
    } as unknown as Window;

    expect(() => {
      savePreference(window, "ui-theme", "dark");
    }).not.toThrow();
  });
});

// describe("#applyColorMode", () => {
//   it("applies the theme class", () => {
//     document.documentElement.className = "foo light bar";

//     applyColorMode(document, "dark", true);

//     expect(document.documentElement.classList.contains("light")).toBe(false);
//     expect(document.documentElement.classList.contains("dark")).toBe(true);
//   });

//   it("sets color-scheme when enabled", () => {
//     applyColorMode(document, "dark", true);

//     expect(document.documentElement.style.colorScheme).toBe("dark");
//   });

//   it("removes color-scheme when disabled", () => {
//     document.documentElement.style.colorScheme = "dark";

//     applyColorMode(document, "light", false);

//     expect(document.documentElement.style.colorScheme).toBe("");
//   });
// });

// describe("#handleStorageChange", () => {
//   const options = {
//     enableSystem: true,
//     fallback: "light" as const,
//   };

//   it("ignores unrelated storage keys", () => {
//     const onChange = vi.fn();

//     handleStorageChange(
//       new StorageEvent("storage", {
//         key: "other-key",
//         newValue: "dark",
//       }),
//       "ui-theme",
//       "light",
//       options,
//       onChange
//     );

//     expect(onChange).not.toHaveBeenCalled();
//   });

//   it("handles changes to the color mode key", () => {
//     const onChange = vi.fn();

//     handleStorageChange(
//       new StorageEvent("storage", {
//         key: "ui-theme",
//         newValue: "dark",
//       }),
//       "ui-theme",
//       "light",
//       options,
//       onChange
//     );

//     expect(onChange).toHaveBeenCalledWith("dark");
//   });

//   it("handles storage removal", () => {
//     const onChange = vi.fn();

//     handleStorageChange(
//       new StorageEvent("storage", {
//         key: "ui-theme",
//         newValue: null,
//       }),
//       "ui-theme",
//       "dark",
//       options,
//       onChange
//     );

//     expect(onChange).toHaveBeenCalledWith("dark");
//   });

//   it("handles localStorage.clear()", () => {
//     const onChange = vi.fn();

//     handleStorageChange(
//       new StorageEvent("storage", {
//         key: null,
//         newValue: null,
//       }),
//       "ui-theme",
//       "dark",
//       options,
//       onChange
//     );

//     expect(onChange).toHaveBeenCalledWith("dark");
//   });

//   it("normalizes system when system mode is disabled", () => {
//     const onChange = vi.fn();

//     handleStorageChange(
//       new StorageEvent("storage", {
//         key: "ui-theme",
//         newValue: "system",
//       }),
//       "ui-theme",
//       "light",
//       {
//         enableSystem: false,
//         fallback: "dark",
//       },
//       onChange
//     );

//     expect(onChange).toHaveBeenCalledWith("dark");
//   });
// });

describe("#subscribeSystemTheme", () => {
  it("subscribes and unsubscribes from system changes", () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();

    const window = {
      matchMedia: vi.fn(() => ({
        addEventListener,
        removeEventListener,
      })),
    } as unknown as Window;

    const onChange = vi.fn();
    const unsubscribe = subscribeSystemTheme(window, onChange);

    expect(addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );

    unsubscribe();

    expect(removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });
});
