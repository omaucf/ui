import { describe, expect, it } from "vitest";

import type { Config } from "@/types/schema.js";

import { generateThemeFile } from "./theme.js";

const plainObjectComponent = {
  defaultVariants: {
    variant: "outline",
  },
  slots: {
    body: "p-4 sm:px-6",
    footer: "p-4 sm:px-6",
    header: "p-4 sm:px-6",
    root: "rounded-lg",
  },
  variants: {
    variant: {
      outline: {
        root: "divide-y divide-default bg-default ring ring-default",
      },
      soft: {
        root: "divide-y divide-default bg-elevated/50",
      },
      solid: {
        root: "bg-inverted text-inverted",
      },
      subtle: {
        root: "divide-y divide-default bg-elevated/50 ring ring-default",
      },
    },
  },
};

function functionComponent(config: Config) {
  return {
    base: [
      "inline font-medium underline-offset-[6px] hover:decoration-current",
      config.theme?.transitions && "transition-colors",
    ],
    defaultVariants: {
      variant: "ghost",
    },
    variants: {
      active: {
        false: "",
        true: "",
      },
      color: {
        ...Object.fromEntries(
          (config.theme?.colors || []).map((color: string) => [color, ""])
        ),
        neutral: "",
      },
      disabled: {
        false: "",
        true: "cursor-not-allowed opacity-75",
      },
      variant: {
        ghost: "no-underline hover:underline",
        solid: "underline",
        subtle: "no-underline",
      },
    },
  };
}

const defaultTheme = {
  colors: undefined,
  transitions: true,
};

describe("#generateThemeFile", () => {
  it("generates template from plain object", () => {
    const output = generateThemeFile(
      { component: plainObjectComponent },
      "component",
      {}
    );

    expect(output).toContain("export default");
    expect(output).toContain('"slots"');
    expect(output).toContain("const variant =");
    expect(output).toContain('"outline"');
  });

  it("generates template from function", () => {
    const output = generateThemeFile(
      { component: functionComponent },
      "component",
      {
        theme: defaultTheme,
      }
    );

    expect(output).toContain("export default");
    expect(output).toContain('"variants"');
    expect(output).toContain("const variant =");
    expect(output).toContain('"ghost"');
  });

  it("respects theme transitions in function component", () => {
    const output = generateThemeFile(
      { component: functionComponent },
      "component",
      {
        theme: { ...defaultTheme, transitions: false },
      }
    );

    expect(output).not.toContain("transition-colors");
  });
});
