import type { Options } from "@/types/ui.js";

export default (options: Options) => /*ui*/ ({
  compoundVariants: [
    ...(options.theme?.colors || []).map((color: string) => ({
      class: `border-transparent bg-${color} text-inverted hover:bg-${color}/90 active:bg-${color}/90 aria-disabled:bg-${color} disabled:bg-${color} focus-visible:border-${color}/50 focus-visible:ring-${color}/30`,
      color,
      variant: "solid",
    })),
    ...(options.theme?.colors || []).map((color: string) => ({
      class: `border-${color}/30 bg-background text-${color} hover:bg-${color}/10 active:bg-${color}/10 aria-disabled:bg-background",disabled:bg-background",focus-visible:border-${color}/50 focus-visible:ring-${color}/20`,
      color,
      variant: "outline",
    })),
    ...(options.theme?.colors || []).map((color: string) => ({
      class: `border-transparent bg-${color}/10 text-${color} hover:bg-${color}/15 active:bg-${color}/15 aria-disabled:bg-${color}/10 disabled:bg-${color}/10 focus-visible:border-${color}/30 focus-visible:ring-${color}/20`,
      color,
      variant: "soft",
    })),
    ...(options.theme?.colors || []).map((color: string) => ({
      class: `border-${color}/20 bg-${color}/10 text-${color} hover:bg-${color}/15 active:bg-${color}/15 aria-disabled:bg-${color}/10 disabled:bg-${color}/10 focus-visible:border-${color}/40 focus-visible:ring-${color}/20`,
      color,
      variant: "subtle",
    })),
    ...(options.theme?.colors || []).map((color: string) => ({
      class: `border-transparent text-${color} hover:bg-${color}/10 active:bg-${color}/10 disabled:bg-transparent aria-disabled:bg-transparent focus-visible:border-${color}/20 focus-visible:ring-${color}/20`,
      color,
      variant: "ghost",
    })),
    ...(options.theme?.colors || []).map((color: string) => ({
      class: `h-auto rounded-none border-transparent px-0 py-0 text-${color} underline-offset-4 hover:text-${color}/75 hover:underline active:text-${color}/75 disabled:text-${color} aria-disabled:text-${color} focus-visible:ring-${color}/30`,
      color,
      variant: "link",
    })),
    {
      class:
        "border-transparent bg-inverted text-inverted hover:bg-inverted/90 focus-visible:border-inverted/50 focus-visible:ring-inverted/30 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted",
      color: "neutral",
      variant: "solid",
    },
    {
      class:
        "border-default bg-background text-default hover:bg-elevated focus-visible:border-inverted/40 focus-visible:ring-inverted/20 active:bg-elevated disabled:bg-background aria-disabled:bg-background",
      color: "neutral",
      variant: "outline",
    },
    {
      class:
        "border-transparent bg-elevated text-default hover:bg-muted focus-visible:border-default focus-visible:ring-inverted/20 disabled:bg-elevated aria-disabled:bg-elevated",
      color: "neutral",
      variant: "soft",
    },
    {
      class:
        "border-default bg-elevated text-default hover:bg-muted focus-visible:border-inverted/40 focus-visible:ring-inverted/20 active:bg-muted disabled:bg-elevated aria-disabled:bg-elevated",
      color: "neutral",
      variant: "subtle",
    },
    {
      class:
        "border-transparent text-default hover:bg-elevated focus-visible:border-default focus-visible:ring-inverted/20 active:bg-elevated disabled:bg-transparent aria-disabled:bg-transparent",
      color: "neutral",
      variant: "ghost",
    },
    {
      class:
        "h-auto rounded-none border-transparent px-0 py-0 text-muted underline-offset-4 hover:text-default hover:underline focus-visible:ring-inverted/20 active:text-default disabled:text-muted aria-disabled:text-muted",
      color: "neutral",
      variant: "link",
    },
    {
      class: {
        base: "gap-0",
        leadingIcon: [
          "max-w-0 -translate-x-1 overflow-hidden opacity-0 group-hover:mr-1 group-hover:max-w-6 group-hover:translate-x-0 group-hover:opacity-100",
          options.theme?.transitions && "transition-all duration-200",
        ],
      },
      leading: true,
      reveal: true,
    },
    {
      class: {
        base: "gap-0",
        trailingIcon: [
          "max-w-0 translate-x-1 overflow-hidden opacity-0 group-hover:ml-1 group-hover:max-w-6 group-hover:translate-x-0 group-hover:opacity-100",
          options.theme?.transitions && "transition-all duration-200",
        ],
      },
      reveal: true,
      trailing: true,
    },
    {
      class: { leadingIcon: "-ml-0.5" },
      leading: true,
      reveal: false,
      square: false,
    },
    {
      class: { trailingIcon: "-mr-0.5" },
      reveal: false,
      square: false,
      trailing: true,
    },
    {
      class: {
        leadingIcon: "max-w-none translate-x-0 animate-spin opacity-100",
      },
      leading: true,
      loading: true,
    },
    {
      class: {
        trailingIcon: "max-w-none translate-x-0 animate-spin opacity-100",
      },
      leading: false,
      loading: true,
      trailing: true,
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    variant: "solid",
  },
  slots: {
    base: [
      "group relative isolate inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap border border-transparent bg-clip-padding font-medium text-sm outline-none focus-visible:ring-3 active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      options.theme?.transitions && "transition-all",
    ],
    label: "relative z-1 truncate",
    leadingAvatar: "shrink-0",
    leadingAvatarSize: "",
    leadingIcon: "relative z-1 shrink-0 align-middle",
    trailingIcon: "relative z-1 shrink-0 align-middle",
  },
  variants: {
    active: { false: { base: "" }, true: { base: "" } },
    block: {
      true: {
        base: "w-full flex-stretch justify-center",
        trailingIcon: "ms-auto",
      },
    },
    color: {
      ...Object.fromEntries(
        (options.theme?.colors || []).map((color: string) => [color, ""])
      ),
      neutral: "",
    },
    leading: { true: "" },
    loading: { true: "" },
    reveal: { true: "" },
    size: {
      lg: {
        leadingAvatarSize: "2xs",
        leadingIcon: "size-4.5",
        trailingIcon: "size-4.5",
      },
      md: {
        leadingAvatarSize: "2xs",
        leadingIcon: "size-4",
        trailingIcon: "size-4",
      },
      sm: {
        leadingAvatarSize: "3xs",
        leadingIcon: "size-3.5",
        trailingIcon: "size-3.5",
      },
      xl: {
        leadingAvatarSize: "xs",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
      },
      xs: {
        leadingAvatarSize: "3xs",
        leadingIcon: "size-3",
        trailingIcon: "size-3",
      },
    },
    square: { true: "" },
    trailing: { true: "" },
    variant: {
      ghost: "",
      link: "",
      outline: "",
      soft: "",
      solid: "",
      subtle: "",
    },
  },
});
