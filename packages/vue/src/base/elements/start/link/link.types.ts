import type { MaybePromise, MaybeString } from "#build/ui/types";

import type { PolymorphicProps } from "@/types/element.js";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "@/types/html.js";

export interface LinkBaseProps extends PolymorphicProps {
  active?: boolean;
  disabled?: boolean;
  href?: string | null;
  isExternal?: boolean;
  onClick?:
    | ((e: MouseEvent) => MaybePromise<void>)
    | Array<(e: MouseEvent) => MaybePromise<void>>;
  raw?: boolean;
  rel?: MaybeString<
    "noopener" | "noreferrer" | "nofollow" | "sponsored" | "ugc"
  > | null;
  target?: MaybeString<"_blank" | "_parent" | "_self" | "_top"> | null;
  type?: "button" | "reset" | "submit";
}

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
