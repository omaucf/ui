import { describe, expect, it } from "vitest";

import { compileThemeCSS, emitThemeCSS } from "./css.js";

const buttonSlots = {
  base: "inline-flex",
  label: "",
  leadingIcon: "",
  trailingIcon: "",
} as const;

const cardSlots = {
  body: "",
  footer: "",
  header: "",
  root: "flex flex-col",
  title: "",
} as const;

describe("#compileThemeCSS", () => {
  describe("base", () => {
    it("compiles base utilities on the scope selector", () => {
      const rules = compileThemeCSS(
        { base: "mx-auto w-full text-sm" },
        "container"
      );

      expect(rules).toEqual([
        { selector: '[data-scope="container"]', utilities: ["mx-auto"] },
        { selector: '[data-scope="container"]', utilities: ["w-full"] },
        { selector: '[data-scope="container"]', utilities: ["text-sm"] },
      ]);
    });
  });

  describe("slots", () => {
    it("compiles slot utilities on data-part selectors", () => {
      const rules = compileThemeCSS(
        { slots: { footer: "flex justify-end", header: "flex items-center" } },
        "card"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="card"][data-part="footer"]',
          utilities: ["flex"],
        },
        {
          selector: '[data-scope="card"][data-part="footer"]',
          utilities: ["justify-end"],
        },
        {
          selector: '[data-scope="card"][data-part="header"]',
          utilities: ["flex"],
        },
        {
          selector: '[data-scope="card"][data-part="header"]',
          utilities: ["items-center"],
        },
      ]);
    });

    it("supports arbitrary selectors on slots", () => {
      const rules = compileThemeCSS(
        { slots: { header: "[.border-t]:pb-6" } },
        "card"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="card"][data-part="header"].border-t',
          utilities: ["pb-6"],
        },
      ]);
    });
  });

  describe("variants", () => {
    describe("non-slotted components", () => {
      it("uses presence selectors for true boolean variants", () => {
        const rules = compileThemeCSS(
          { variants: { active: { true: "text-primary" } } },
          "link"
        );

        expect(rules).toEqual([
          {
            selector: '[data-scope="link"][data-active]',
            utilities: ["text-primary"],
          },
        ]);
      });

      it("uses absence selectors for false boolean variants", () => {
        const rules = compileThemeCSS(
          { variants: { active: { false: "text-muted" } } },
          "link"
        );

        expect(rules).toEqual([
          {
            selector: '[data-scope="link"]:not([data-active])',
            utilities: ["text-muted"],
          },
        ]);
      });

      it("resolves intrinsic disabled variants", () => {
        const rules = compileThemeCSS(
          {
            variants: {
              disabled: { false: "opacity-100", true: "opacity-75" },
            },
          },
          "button"
        );

        expect(rules).toEqual([
          {
            selector:
              '[data-scope="button"]:not(:is(:disabled, [aria-disabled="true"]))',
            utilities: ["opacity-100"],
          },
          {
            selector:
              '[data-scope="button"]:is(:disabled, [aria-disabled="true"])',
            utilities: ["opacity-75"],
          },
        ]);
      });

      it("supports string variant values on the scope selector", () => {
        const rules = compileThemeCSS(
          { variants: { size: { md: "text-base", sm: "text-sm" } } },
          "button"
        );

        expect(rules).toEqual([
          {
            selector: '[data-scope="button"][data-size="md"]',
            utilities: ["text-base"],
          },
          {
            selector: '[data-scope="button"][data-size="sm"]',
            utilities: ["text-sm"],
          },
        ]);
      });
    });

    describe("slotted components", () => {
      it("skips empty variant values", () => {
        const rules = compileThemeCSS(
          {
            slots: { base: "inline-flex" },
            variants: { variant: { ghost: "", solid: "bg-primary" } },
          },
          "button"
        );

        expect(rules).toEqual([
          {
            selector: '[data-scope="button"][data-part="base"]',
            utilities: ["inline-flex"],
          },
          {
            selector:
              '[data-scope="button"][data-variant="solid"][data-part="base"]',
            utilities: ["bg-primary"],
          },
        ]);
      });

      it("compiles slot map variant values", () => {
        const rules = compileThemeCSS(
          {
            slots: cardSlots,
            variants: {
              size: {
                md: {
                  body: "px-6",
                  footer: "[.border-t]:pt-6",
                  root: "gap-6 py-6",
                },
              },
              variant: {
                solid: {
                  root: "bg-inverted text-inverted",
                  title: "text-inverted",
                },
              },
            },
          },
          "card"
        );

        expect(rules).toEqual([
          {
            selector: '[data-scope="card"][data-part="root"]',
            utilities: ["flex"],
          },
          {
            selector: '[data-scope="card"][data-part="root"]',
            utilities: ["flex-col"],
          },
          {
            selector:
              '[data-scope="card"][data-size="md"] [data-scope="card"][data-part="body"]',
            utilities: ["px-6"],
          },
          {
            selector:
              '[data-scope="card"][data-size="md"] [data-scope="card"][data-part="footer"].border-t',
            utilities: ["pt-6"],
          },
          {
            selector: '[data-scope="card"][data-size="md"][data-part="root"]',
            utilities: ["gap-6"],
          },
          {
            selector: '[data-scope="card"][data-size="md"][data-part="root"]',
            utilities: ["py-6"],
          },
          {
            selector:
              '[data-scope="card"][data-variant="solid"][data-part="root"]',
            utilities: ["bg-inverted"],
          },
          {
            selector:
              '[data-scope="card"][data-variant="solid"][data-part="root"]',
            utilities: ["text-inverted"],
          },
          {
            selector:
              '[data-scope="card"][data-variant="solid"] [data-scope="card"][data-part="title"]',
            utilities: ["text-inverted"],
          },
        ]);
      });

      it("compiles boolean slot map variant values on the default part", () => {
        const rules = compileThemeCSS(
          {
            slots: { base: "inline-flex", trailingIcon: "" },
            variants: {
              block: {
                true: {
                  base: "w-full justify-center",
                  trailingIcon: "ms-auto",
                },
              },
            },
          },
          "button"
        );

        expect(rules).toEqual([
          {
            selector: '[data-scope="button"][data-part="base"]',
            utilities: ["inline-flex"],
          },
          {
            selector: '[data-scope="button"][data-block][data-part="base"]',
            utilities: ["w-full"],
          },
          {
            selector: '[data-scope="button"][data-block][data-part="base"]',
            utilities: ["justify-center"],
          },
          {
            selector:
              '[data-scope="button"][data-block] [data-scope="button"][data-part="trailingIcon"]',
            utilities: ["ms-auto"],
          },
        ]);
      });
    });
  });

  describe("compoundVariants", () => {
    it("combines multiple boolean conditions on the scope selector", () => {
      const rules = compileThemeCSS(
        {
          compoundVariants: [
            { active: false, class: "transition-colors", disabled: false },
          ],
        },
        "link"
      );

      expect(rules).toEqual([
        {
          selector:
            '[data-scope="link"]:not([data-active]):not(:is(:disabled, [aria-disabled="true"]))',
          utilities: ["transition-colors"],
        },
      ]);
    });

    it("supports string variant conditions without slots", () => {
      const rules = compileThemeCSS(
        {
          compoundVariants: [
            { class: "border", size: "sm", variant: "outline" },
          ],
        },
        "button"
      );

      expect(rules).toEqual([
        {
          selector:
            '[data-scope="button"][data-size="sm"][data-variant="outline"]',
          utilities: ["border"],
        },
      ]);
    });

    it("targets the default slot for string classes on slotted components", () => {
      const rules = compileThemeCSS(
        {
          compoundVariants: [
            {
              class: "border-transparent bg-primary",
              color: "primary",
              variant: "solid",
            },
          ],
          slots: buttonSlots,
        },
        "button"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="button"][data-part="base"]',
          utilities: ["inline-flex"],
        },
        {
          selector:
            '[data-scope="button"][data-color="primary"][data-variant="solid"][data-part="base"]',
          utilities: ["border-transparent"],
        },
        {
          selector:
            '[data-scope="button"][data-color="primary"][data-variant="solid"][data-part="base"]',
          utilities: ["bg-primary"],
        },
      ]);
    });

    it("compiles slot map compound variants", () => {
      const rules = compileThemeCSS(
        {
          compoundVariants: [
            {
              class: {
                base: "gap-0",
                leadingIcon: "max-w-0 opacity-0",
              },
              leading: true,
              reveal: true,
            },
          ],
          slots: { base: "inline-flex", leadingIcon: "" },
        },
        "button"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="button"][data-part="base"]',
          utilities: ["inline-flex"],
        },
        {
          selector:
            '[data-scope="button"][data-leading][data-reveal][data-part="base"]',
          utilities: ["gap-0"],
        },
        {
          selector:
            '[data-scope="button"][data-leading][data-reveal] [data-scope="button"][data-part="leadingIcon"]',
          utilities: ["max-w-0"],
        },
        {
          selector:
            '[data-scope="button"][data-leading][data-reveal] [data-scope="button"][data-part="leadingIcon"]',
          utilities: ["opacity-0"],
        },
      ]);
    });

    it("supports false boolean conditions", () => {
      const rules = compileThemeCSS(
        {
          compoundVariants: [
            {
              class: { leadingIcon: "-ml-0.5" },
              leading: true,
              reveal: false,
              square: false,
            },
          ],
          slots: { base: "inline-flex", leadingIcon: "" },
        },
        "button"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="button"][data-part="base"]',
          utilities: ["inline-flex"],
        },
        {
          selector:
            '[data-scope="button"][data-leading]:not([data-reveal]):not([data-square]) [data-scope="button"][data-part="leadingIcon"]',
          utilities: ["-ml-0.5"],
        },
      ]);
    });
  });

  describe("utility modifiers", () => {
    it("compiles pseudo modifiers", () => {
      const rules = compileThemeCSS(
        { base: "hover:text-red-500 focus-visible:outline-2" },
        "button"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="button"]:hover',
          utilities: ["text-red-500"],
        },
        {
          selector: '[data-scope="button"]:focus-visible',
          utilities: ["outline-2"],
        },
      ]);
    });

    it("combines multiple pseudo modifiers", () => {
      const rules = compileThemeCSS(
        { base: "hover:focus:text-red-500" },
        "button"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="button"]:hover:focus',
          utilities: ["text-red-500"],
        },
      ]);
    });

    it("compiles responsive modifiers", () => {
      const rules = compileThemeCSS({ base: "sm:px-6 lg:px-8" }, "container");

      expect(rules).toEqual([
        {
          atRules: ["@media (min-width: 640px)"],
          selector: '[data-scope="container"]',
          utilities: ["px-6"],
        },
        {
          atRules: ["@media (min-width: 1024px)"],
          selector: '[data-scope="container"]',
          utilities: ["px-8"],
        },
      ]);
    });

    it("compiles arbitrary selectors", () => {
      const rules = compileThemeCSS(
        { base: "[&>img:first-child]:pt-0" },
        "card"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="card"]>img:first-child',
          utilities: ["pt-0"],
        },
      ]);
    });

    it("supports arbitrary descendant selectors", () => {
      const rules = compileThemeCSS(
        { base: "[&_svg]:stroke-inverted/10" },
        "placeholder"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="placeholder"] svg',
          utilities: ["stroke-inverted/10"],
        },
      ]);
    });

    it("supports arbitrary direct child selectors", () => {
      const rules = compileThemeCSS(
        { base: "[&>svg]:stroke-inverted/10" },
        "placeholder"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="placeholder"]>svg',
          utilities: ["stroke-inverted/10"],
        },
      ]);
    });

    it("supports arbitrary class selectors", () => {
      const rules = compileThemeCSS({ base: "[.border-t]:pt-6" }, "card");

      expect(rules).toEqual([
        { selector: '[data-scope="card"].border-t', utilities: ["pt-6"] },
      ]);
    });

    it("supports universal child selectors", () => {
      const rules = compileThemeCSS({ base: "*:rounded-t-xl" }, "card");

      expect(rules).toEqual([
        { selector: '[data-scope="card"] > *', utilities: ["rounded-t-xl"] },
      ]);
    });

    it("supports element shorthand selectors", () => {
      const rules = compileThemeCSS(
        { base: "svg:stroke-inverted/10" },
        "placeholder"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="placeholder"] svg',
          utilities: ["stroke-inverted/10"],
        },
      ]);
    });

    it("supports multiple selector modifiers", () => {
      const rules = compileThemeCSS(
        { base: "hover:svg:stroke-inverted/10" },
        "placeholder"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="placeholder"]:hover svg',
          utilities: ["stroke-inverted/10"],
        },
      ]);
    });

    it("combines pseudo modifiers with arbitrary selectors", () => {
      const rules = compileThemeCSS(
        { base: "hover:[&_svg]:stroke-inverted/10" },
        "placeholder"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="placeholder"]:hover svg',
          utilities: ["stroke-inverted/10"],
        },
      ]);
    });

    it("combines responsive modifiers with selectors", () => {
      const rules = compileThemeCSS(
        { base: "md:svg:stroke-inverted/10" },
        "placeholder"
      );

      expect(rules).toEqual([
        {
          atRules: ["@media (min-width: 768px)"],
          selector: '[data-scope="placeholder"] svg',
          utilities: ["stroke-inverted/10"],
        },
      ]);
    });

    it("supports nested arbitrary selectors", () => {
      const rules = compileThemeCSS(
        { base: "[&_[data-part=icon]]:size-4" },
        "button"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="button"] [data-part=icon]',
          utilities: ["size-4"],
        },
      ]);
    });

    it("combines a universal child selector with an arbitrary child selector", () => {
      const rules = compileThemeCSS(
        { base: "*:[img:first-child]:rounded-t-xl" },
        "card"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="card"] > img:first-child',
          utilities: ["rounded-t-xl"],
        },
      ]);
    });

    it("combines a universal child selector with an arbitrary last-child selector", () => {
      const rules = compileThemeCSS(
        { base: "*:[img:last-child]:rounded-b-xl" },
        "card"
      );

      expect(rules).toEqual([
        {
          selector: '[data-scope="card"] > img:last-child',
          utilities: ["rounded-b-xl"],
        },
      ]);
    });
  });
});

describe("#emitThemeCSS", () => {
  it.each([
    {
      engine: "tailwind",
      expected: `@layer components {
  [data-scope="link"] {
    @apply outline-primary/25;
  }

  [data-scope="link"]:focus-visible {
    @apply outline-3;
  }
}`,
    },
    {
      engine: "unocss",
      expected: `@layer components {
  [data-scope="link"] {
    --at-apply: 'outline-primary/25';
  }

  [data-scope="link"]:focus-visible {
    --at-apply: 'outline-3';
  }
}`,
    },
  ] as const)("emits $engine CSS", ({ engine, expected }) => {
    const rules = compileThemeCSS(
      { base: "outline-primary/25 focus-visible:outline-3" },
      "link"
    );

    expect(emitThemeCSS(rules, { engine })).toBe(expected);
  });

  it("emits responsive rules", () => {
    const rules = compileThemeCSS({ base: "px-4 sm:px-6" }, "container");

    expect(emitThemeCSS(rules, { engine: "tailwind" })).toBe(
      `@layer components {
  [data-scope="container"] {
    @apply px-4;
  }

  @media (min-width: 640px) {
    [data-scope="container"] {
      @apply px-6;
    }
  }
}`
    );
  });

  it("emits descendant selectors", () => {
    const rules = compileThemeCSS(
      { base: "svg:stroke-inverted/10" },
      "placeholder"
    );

    expect(emitThemeCSS(rules, { engine: "tailwind" })).toBe(
      `@layer components {
  [data-scope="placeholder"] svg {
    @apply stroke-inverted/10;
  }
}`
    );
  });

  it("emits direct child selectors", () => {
    const rules = compileThemeCSS(
      { base: "[&>svg]:stroke-inverted/10" },
      "placeholder"
    );

    expect(emitThemeCSS(rules, { engine: "tailwind" })).toBe(
      `@layer components {
  [data-scope="placeholder"]>svg {
    @apply stroke-inverted/10;
  }
}`
    );
  });
});
