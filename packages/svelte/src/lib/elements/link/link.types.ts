import type { Snippet } from "svelte";

import type theme from "#build/theme/link";
import type { ComponentApi, MaybePromise, MaybeString } from "#build/ui/types";

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
  to?: string;
  ui?: Partial<LinkTheme["slots"]>;
}

export type LinkPropsKeys =
  | "active"
  | "activeClass"
  | "ariaCurrentValue"
  | "download"
  | "exact"
  | "exactHash"
  | "exactQuery"
  | "external"
  | "href"
  | "hrefLang"
  | "inactiveClass"
  | "noRel"
  | "media"
  | "ping"
  | "referrerpolicy"
  | "rel"
  | "target"
  | "to";

export type LinkTheme = ComponentApi<typeof theme, "link">;
