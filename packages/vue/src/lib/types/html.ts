import type {
  AnchorHTMLAttributes as VueAnchorHTMLAttributes,
  ButtonHTMLAttributes as VueButtonHTMLAttributes,
  ImgHTMLAttributes as VueImgHTMLAttributes,
} from "vue";

export type AnchorHTMLAttributes = Pick<
  VueAnchorHTMLAttributes,
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
  VueButtonHTMLAttributes,
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
  VueImgHTMLAttributes,
  | "alt"
  | "crossorigin"
  | "decoding"
  | "height"
  | "loading"
  | "referrerpolicy"
  | "sizes"
  | "src"
  | "srcset"
  | "usemap"
  | "width"
>;
