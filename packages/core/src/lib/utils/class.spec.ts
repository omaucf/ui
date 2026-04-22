import { describe, expect, it } from "vitest";

import { cn, cv, cx } from "./class.js";

describe("#cn", () => {
  it("merges multiple class strings", () => {
    expect(cn("p-4", "m-2")).toBe("p-4 m-2");
  });

  it("handles conditional classes via objects", () => {
    expect(cn({ hidden: false, "text-red-500": true }, "p-4")).toBe(
      "text-red-500 p-4"
    );
  });

  it("handles arrays of classes", () => {
    expect(cn(["bg-blue-500", null, "text-white"])).toBe(
      "bg-blue-500 text-white"
    );
  });

  it("merges conflicting classes correctly", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });
});

describe("#cv", () => {
  it("returns base styles by default", () => {
    const ui = cv({ base: "flex" });
    expect(ui()).toBe("flex");
  });

  it("applies variant classes", () => {
    const ui = cv({
      base: "flex",
      defaultVariants: { direction: "row" },
      variants: { direction: { col: "flex-col", row: "flex-row" } },
    });

    expect(ui()).toBe("flex flex-row");
    expect(ui({ direction: "col" })).toBe("flex flex-col");
  });

  it("respects defaultvariants", () => {
    const ui = cv({
      base: "flex",
      defaultVariants: { size: "sm" },
      variants: { size: { lg: "text-lg", sm: "text-sm" } },
    });

    expect(ui()).toBe("flex text-sm");
  });

  it("applies compoundVariants", () => {
    const ui = cv({
      base: "flex",
      compoundVariants: [{ class: "font-bold", color: "red", size: "lg" }],
      variants: {
        color: { blue: "text-blue-500", red: "text-red-500" },
        size: { lg: "text-lg", sm: "text-sm" },
      },
    });

    expect(ui({ color: "red", size: "sm" })).toBe("flex text-red-500 text-sm");
    expect(ui({ color: "red", size: "lg" })).toBe(
      "flex text-red-500 text-lg font-bold"
    );
  });

  it("merges extra className passed in", () => {
    const ui = cv({ base: "flex" });

    expect(ui({ class: "justify-center" })).toBe("flex justify-center");
  });
});

describe("#cx", () => {
  it("joins string classes", () => {
    expect(cx("flex", "items-center")).toBe("flex items-center");
  });

  it("ignores falsy values", () => {
    expect(cx("flex", false, null, undefined, "", "items-center")).toBe(
      "flex items-center"
    );
  });

  it("supports conditional objects", () => {
    expect(cx({ block: true, flex: true, hidden: false })).toBe("block flex");
  });

  it("supports arrays", () => {
    expect(cx(["flex", ["items-center", false], "justify-center"])).toBe(
      "flex items-center justify-center"
    );
  });

  it("supports mixed inputs", () => {
    expect(cx("flex", { block: true, hidden: false }, ["items-center"])).toBe(
      "flex block items-center"
    );
  });
});
