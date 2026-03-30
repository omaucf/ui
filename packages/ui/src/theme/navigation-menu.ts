import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "relative flex gap-1.5 [&>div]:min-w-0",
      list: "isolate min-w-0",
      label:
        "flex w-full items-center gap-1.5 px-2.5 py-1.5 font-semibold text-highlighted text-xs/5",
      item: "min-w-0",
      link: "group relative flex w-full items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-inset dark:focus-visible:outline-none",
      linkLeadingIcon: "size-5 shrink-0",
      linkLeadingAvatar: "shrink-0",
      linkLeadingAvatarSize: "2xs",
      linkLeadingChipSize: "sm",
      linkTrailing: "group ms-auto inline-flex items-center gap-1.5",
      linkTrailingBadge: "shrink-0",
      linkTrailingBadgeSize: "sm",
      linkTrailingIcon:
        "size-5 shrink-0 transform transition-transform duration-200 group-data-[state=open]:rotate-180",
      linkLabel: "truncate",
      linkLabelExternalIcon: "inline-block size-3 align-top text-dimmed",
      childList: "isolate",
      childLabel: "text-highlighted text-xs",
      childItem: "",
      childLink:
        "group relative flex size-full items-start text-start text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-inset dark:focus-visible:outline-none",
      childLinkWrapper: "min-w-0",
      childLinkIcon: "size-5 shrink-0",
      childLinkLabel: "truncate",
      childLinkLabelExternalIcon: "inline-block size-3 align-top text-dimmed",
      childLinkDescription: "text-muted",
      separator: "h-px bg-border px-2",
      viewportWrapper: "absolute top-full left-0 flex w-full",
      viewport:
        "relative z-1 h-(--reka-navigation-menu-viewport-height) w-full origin-[top_center] overflow-hidden rounded-md bg-default shadow-lg ring ring-default transition-[width,height,left,right] duration-200 data-[state=closed]:animate-[scale-out_100ms_ease-in] data-[state=open]:animate-[scale-in_100ms_ease-out]",
      content: "",
      indicator:
        "absolute bottom-0 left-0 z-2 flex h-2.5 w-(--reka-navigation-menu-indicator-size) translate-x-(--reka-navigation-menu-indicator-position) items-end justify-center overflow-hidden transition-[translate,width] duration-200 data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:opacity-0",
      arrow:
        "relative top-[50%] z-1 size-2.5 rotate-45 rounded-xs border border-default bg-default",
    },
    variants: {
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [
            color,
            {
              link: `focus-visible:before:ring-${color}`,
              childLink: `focus-visible:before:ring-${color}`,
            },
          ])
        ),
        neutral: {
          link: "focus-visible:before:ring-inverted",
          childLink: "focus-visible:before:ring-inverted",
        },
      },
      highlightColor: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [color, ""])
        ),
        neutral: "",
      },
      variant: {
        pill: "",
        link: "",
      },
      orientation: {
        horizontal: {
          root: "items-center justify-between",
          list: "flex items-center",
          item: "py-2",
          link: "px-2.5 py-1.5 before:inset-x-px before:inset-y-0",
          childList: "grid p-2",
          childLink: "gap-2 px-3 py-2 before:inset-x-px before:inset-y-0",
          childLinkLabel: "font-medium",
          content: "absolute top-0 left-0 max-h-[70vh] w-full overflow-y-auto",
        },
        vertical: {
          root: "flex-col",
          link: "flex-row px-2.5 py-1.5 before:inset-x-0 before:inset-y-px",
          childLabel: "px-1.5 py-0.5",
          childLink: "gap-1.5 p-1.5 before:inset-x-0 before:inset-y-px",
        },
      },
      contentOrientation: {
        horizontal: {
          viewportWrapper: "justify-center",
          content:
            "data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease]",
        },
        vertical: {
          viewport:
            "left-(--reka-navigation-menu-viewport-left) sm:w-(--reka-navigation-menu-viewport-width) rtl:right-[calc(100%-var(--reka-navigation-menu-viewport-left)-var(--reka-navigation-menu-viewport-width))] rtl:left-auto",
        },
      },
      active: {
        true: {
          childLink: "text-highlighted before:bg-elevated",
          childLinkIcon: "text-default",
        },
        false: {
          link: "text-muted",
          linkLeadingIcon: "text-dimmed",
          childLink: [
            "text-default hover:text-highlighted hover:before:bg-elevated/50",
            options.theme?.transitions &&
              "transition-colors before:transition-colors",
          ],
          childLinkIcon: [
            "text-dimmed group-hover:text-default",
            options.theme?.transitions && "transition-colors",
          ],
        },
      },
      disabled: {
        true: {
          link: "cursor-not-allowed opacity-75",
        },
      },
      highlight: {
        true: "",
      },
      level: {
        true: "",
      },
      collapsed: {
        true: "",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        contentOrientation: "horizontal",
        class: {
          childList: "grid-cols-2 gap-2",
        },
      },
      {
        orientation: "horizontal",
        contentOrientation: "vertical",
        class: {
          childList: "gap-1",
          content: "w-60",
        },
      },
      {
        orientation: "vertical",
        collapsed: false,
        class: {
          childList: "ms-5 border-default border-s",
          childItem: "-ms-px ps-1.5",
          content:
            "overflow-hidden data-[state=closed]:animate-[collapsible-up_200ms_ease-out] data-[state=open]:animate-[collapsible-down_200ms_ease-out]",
        },
      },
      {
        orientation: "vertical",
        collapsed: true,
        class: {
          link: "px-1.5",
          linkLabel: "hidden",
          linkTrailing: "hidden",
          content: "min-h-6 rounded-sm p-1 shadow-sm",
        },
      },
      {
        orientation: "horizontal",
        highlight: true,
        class: {
          link: [
            "after:absolute after:inset-x-2.5 after:-bottom-2 after:block after:h-px after:rounded-full",
            options.theme?.transitions && "after:transition-colors",
          ],
        },
      },
      {
        orientation: "vertical",
        highlight: true,
        level: true,
        class: {
          link: [
            "after:absolute after:inset-y-0.5 after:-start-1.5 after:block after:w-px after:rounded-full",
            options.theme?.transitions && "after:transition-colors",
          ],
        },
      },
      {
        disabled: false,
        active: false,
        variant: "pill",
        class: {
          link: [
            "hover:text-highlighted hover:before:bg-elevated/50",
            options.theme?.transitions &&
              "transition-colors before:transition-colors",
          ],
          linkLeadingIcon: [
            "group-hover:text-default",
            options.theme?.transitions && "transition-colors",
          ],
        },
      },
      {
        disabled: false,
        active: false,
        variant: "pill",
        orientation: "horizontal",
        class: {
          link: "data-[state=open]:text-highlighted",
          linkLeadingIcon: "group-data-[state=open]:text-default",
        },
      },
      {
        disabled: false,
        variant: "pill",
        highlight: true,
        orientation: "horizontal",
        class: {
          link: "data-[state=open]:before:bg-elevated/50",
        },
      },
      {
        disabled: false,
        variant: "pill",
        highlight: false,
        active: false,
        orientation: "horizontal",
        class: {
          link: "data-[state=open]:before:bg-elevated/50",
        },
      },
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "pill",
        active: true,
        class: {
          link: `text-${color}`,
          linkLeadingIcon: `text-${color} group-data-[state=open]:text-${color}`,
        },
      })),
      {
        color: "neutral",
        variant: "pill",
        active: true,
        class: {
          link: "text-highlighted",
          linkLeadingIcon:
            "text-highlighted group-data-[state=open]:text-highlighted",
        },
      },
      {
        variant: "pill",
        active: true,
        highlight: false,
        class: {
          link: "before:bg-elevated",
        },
      },
      {
        variant: "pill",
        active: true,
        highlight: true,
        disabled: false,
        class: {
          link: [
            "hover:before:bg-elevated/50",
            options.theme?.transitions && "before:transition-colors",
          ],
        },
      },
      {
        disabled: false,
        active: false,
        variant: "link",
        class: {
          link: [
            "hover:text-highlighted",
            options.theme?.transitions && "transition-colors",
          ],
          linkLeadingIcon: [
            "group-hover:text-default",
            options.theme?.transitions && "transition-colors",
          ],
        },
      },
      {
        disabled: false,
        active: false,
        variant: "link",
        orientation: "horizontal",
        class: {
          link: "data-[state=open]:text-highlighted",
          linkLeadingIcon: "group-data-[state=open]:text-default",
        },
      },
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "link",
        active: true,
        class: {
          link: `text-${color}`,
          linkLeadingIcon: `text-${color} group-data-[state=open]:text-${color}`,
        },
      })),
      {
        color: "neutral",
        variant: "link",
        active: true,
        class: {
          link: "text-highlighted",
          linkLeadingIcon:
            "text-highlighted group-data-[state=open]:text-highlighted",
        },
      },
      ...(options.theme?.colors || []).map((highlightColor: string) => ({
        highlightColor,
        highlight: true,
        level: true,
        active: true,
        class: {
          link: `after:bg-${highlightColor}`,
        },
      })),
      {
        highlightColor: "neutral",
        highlight: true,
        level: true,
        active: true,
        class: {
          link: "after:bg-inverted",
        },
      },
    ],
    defaultVariants: {
      color: "primary",
      highlightColor: "primary",
      variant: "pill",
    },
  });
