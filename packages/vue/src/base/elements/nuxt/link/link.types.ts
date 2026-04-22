import type { RouteLocationRaw } from "vue-router";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "@/types/html.js";

export type LinkBaseProps = import("@/elements/link/index.js").LinkBaseProps;

export interface LinkProps
  extends Omit<LinkBaseProps, "href" | "isExternal">,
    /* @vue-ignore */ Omit<ButtonHTMLAttributes, "type" | "disabled">,
    /** @vue-ignore */ Omit<
      AnchorHTMLAttributes,
      "href" | "target" | "rel" | "type"
    > {
  activeClass?: string;
  ariaCurrentValue?:
    | "page"
    | "time"
    | "step"
    | "true"
    | "false"
    | "location"
    | "date"
    | undefined;
  custom?: boolean;
  exact?: boolean;
  exactHash?: boolean;
  exactQuery?: boolean | "partial";
  external?: boolean;
  href?: RouteLocationRaw;
  inactiveClass?: string;
  locale?: boolean | string;
  noPrefetch?: boolean;
  noRel?: boolean;
  prefetch?: boolean;
  prefetchedClass?: string;
  prefetchOn?:
    | "visibility"
    | "interaction"
    | Partial<{ visibility: boolean; interaction: boolean }>;
  to?: RouteLocationRaw;
  trailingSlash?: "append" | "remove";
  ui?: LinkTheme["slots"];
}

export type LinkPropsKeys = import("@/elements/link/index.js").LinkPropsKeys;

export type LinkSlots = import("@/elements/link/index.js").LinkSlots;

export type LinkTheme = import("@/elements/link/index.js").LinkTheme;
