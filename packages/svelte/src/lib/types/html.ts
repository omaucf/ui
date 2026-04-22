import type { SvelteHTMLElements } from "svelte/elements";

export type AnchorHTMLAttributes = Pick<
  SvelteHTMLElements["a"],
  | "download"
  | "href"
  | "hreflang"
  | "media"
  | "ping"
  | "rel"
  | "target"
  | "type"
  | "referrerpolicy"
>;

export type ButtonHTMLAttributes = Pick<
  SvelteHTMLElements["button"],
  | "autofocus"
  | "disabled"
  | "form"
  | "formaction"
  | "formenctype"
  | "formmethod"
  | "formnovalidate"
  | "formtarget"
  | "name"
  | "type"
>;

export type ImgHTMLAttributes = Pick<
  SvelteHTMLElements["img"],
  | "alt"
  | "crossorigin"
  | "decoding"
  | "height"
  | "loading"
  | "referrerpolicy"
  | "onerror"
  | "sizes"
  | "src"
  | "srcset"
  | "usemap"
  | "width"
>;
