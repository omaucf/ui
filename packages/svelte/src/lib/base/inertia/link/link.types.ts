import type { Snippet } from "svelte";

import type { MaybePromise, MaybeString } from "#build/ui/types";

import type { PolymorphicProps, RefAttribute } from "$lib/types/element.js";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "$lib/types/html.js";

export interface LinkBaseProps extends PolymorphicProps<"a">, RefAttribute {
  active?: boolean;
  disabled?: boolean;
  href?: string | null;
  isExternal?: boolean;
  onclick?: (e: MouseEvent) => MaybePromise<void>;
  raw?: boolean;
  rel?: MaybeString<
    "noopener" | "noreferrer" | "nofollow" | "sponsored" | "ugc"
  > | null;
  target?: MaybeString<"_blank" | "_parent" | "_self" | "_top"> | null;
  type?: "button" | "reset" | "submit";
  [x: `data-${string}`]: string | undefined;
}

export interface LinkProps
  extends Omit<LinkBaseProps, "children" | "isExternal">,
    Omit<ButtonHTMLAttributes, "type" | "disabled">,
    Omit<AnchorHTMLAttributes, "href" | "target" | "rel" | "type"> {
  active?: boolean;
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
  children?: Snippet<[{ active: boolean }]>;
  custom?: Snippet<[LinkBaseProps]>;
  exact?: boolean;
  exactHash?: boolean;
  exactQuery?: boolean | "partial";
  external?: boolean;
  inactiveClass?: string;
  noRel?: boolean;
  ref?: Element | null;
  to?: string;
  ui?: LinkTheme["slots"];
}

export type LinkPropsKeys = import("$lib/elements/link/index.js").LinkPropsKeys;

export type LinkTheme = import("$lib/elements/link/index.js").LinkTheme;
