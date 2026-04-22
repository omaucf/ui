import type { CoreImageAttributes, UnpicImageProps } from "@unpic/core";

import type { PolymorphicProps } from "@/types/element.js";
import type { ImgHTMLAttributes } from "@/types/html.js";

export interface ImageBaseProps extends Omit<PolymorphicProps, "children"> {
  raw?: boolean;
  src?: string;
}

export interface ImageProps
  extends ImageBaseProps,
    Omit<ImgHTMLAttributes, "src"> {
  aspectRatio?: number;
  background?: string;
  cdn?: UnpicImageProps<CoreImageAttributes<unknown>>["cdn"];
  layout?: "constrained" | "fixed" | "fullWidth";
  objectFit?:
    | "contain"
    | "cover"
    | "fill"
    | "none"
    | "scale-down"
    | "inherit"
    | "initial";
  operations?: UnpicImageProps<CoreImageAttributes<unknown>>["operations"];
  options?: UnpicImageProps<CoreImageAttributes<unknown>>["options"];
  priority?: boolean;
  ui?: Partial<ImageTheme["slots"]>;
}

export type ImageTheme = import("@/elements/image/index.js").ImageTheme;
