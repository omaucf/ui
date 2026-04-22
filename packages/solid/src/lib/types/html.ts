import type { JSX } from "solid-js";

export type AnchorHTMLAttributes = Pick<
  Partial<JSX.AnchorHTMLAttributes<HTMLAnchorElement>>,
  "href" | "ping" | "rel" | "target" | "type" | "referrerPolicy"
>;

export type ButtonHTMLAttributes = Pick<
  Partial<HTMLButtonElement>,
  | "autofocus"
  | "disabled"
  | "form"
  | "formAction"
  | "formEnctype"
  | "formMethod"
  | "formNoValidate"
  | "formTarget"
  | "name"
  | "type"
>;

export type ImgHTMLAttributes = Pick<
  Partial<HTMLImageElement>,
  | "alt"
  | "decoding"
  | "height"
  | "loading"
  | "referrerPolicy"
  | "sizes"
  | "src"
  | "srcset"
  | "useMap"
  | "width"
> & {
  crossOrigin?: JSX.HTMLCrossorigin;
  referrerPolicy?: JSX.HTMLReferrerPolicy;
};
