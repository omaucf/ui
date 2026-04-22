import type theme from "#build/theme/image";
import type { ComponentApi } from "#build/ui/types";

import type { UnpicImageProps } from "@unpic/core";

import type { PolymorphicProps, RefAttribute } from "$lib/types/element.js";
import type { ImgHTMLAttributes } from "$lib/types/html.js";

export interface ImageBaseProps
  extends Omit<PolymorphicProps<"img">, "children">,
    RefAttribute {
  raw?: boolean;
  src?: string;
}

export interface ImageProps
  extends ImageBaseProps,
    Omit<ImgHTMLAttributes, "src"> {
  aspectRatio?: number;
  background?: string;
  cdn?: string;
  layout?: "constrained" | "fixed" | "fullWidth";
  objectFit?:
    | "contain"
    | "cover"
    | "fill"
    | "none"
    | "scale-down"
    | "inherit"
    | "initial";
  operations?: UnpicImageProps<ImgHTMLAttributes>["operations"];
  options?: UnpicImageProps<ImgHTMLAttributes>["options"];
  priority?: boolean;
  ui?: ImageTheme["slots"];
}

export type ImageTheme = ComponentApi<typeof theme, "image">;
