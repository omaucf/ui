import type {
  AnchorHTMLAttributes as ReactAnchorHTMLAttributes,
  ButtonHTMLAttributes as ReactButtonHTMLAttributes,
  ImgHTMLAttributes as ReactImgHTMLAttributes,
} from "react";

export type AnchorHTMLAttributes = Pick<
  ReactAnchorHTMLAttributes<HTMLAnchorElement>,
  | "download"
  | "href"
  | "hrefLang"
  | "media"
  | "ping"
  | "rel"
  | "target"
  | "type"
  | "referrerPolicy"
>;

export type ButtonHTMLAttributes = Pick<
  ReactButtonHTMLAttributes<HTMLButtonElement>,
  | "autoFocus"
  | "disabled"
  | "form"
  | "formAction"
  | "formEncType"
  | "formMethod"
  | "formNoValidate"
  | "formTarget"
  | "name"
  | "type"
>;

export type ImgHTMLAttributes = Pick<
  ReactImgHTMLAttributes<HTMLImageElement>,
  | "alt"
  | "crossOrigin"
  | "decoding"
  | "height"
  | "loading"
  | "referrerPolicy"
  | "sizes"
  | "src"
  | "srcSet"
  | "useMap"
  | "width"
>;
