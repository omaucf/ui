import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "@/types/html.js";

export type LinkBaseProps = import("@/elements/link/index.js").LinkBaseProps;

export interface LinkProps
  extends Omit<LinkBaseProps, "isExternal">,
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
  inactiveClass?: string;
  noRel?: boolean;
  to?: string;
  ui?: Partial<LinkTheme["slots"]>;
}

export type LinkPropsKeys = import("@/elements/link/index.js").LinkPropsKeys;

export type LinkSlots = import("@/elements/link/index.js").LinkSlots;

export type LinkTheme = import("@/elements/link/index.js").LinkTheme;
