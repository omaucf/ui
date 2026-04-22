import type theme from "#build/theme/image";
import type { ComponentApi } from "#build/ui/types";

import type { UnpicImageProps } from "@unpic/core";

import type { PolymorphicProps } from "@/types/element.js";
import type { ImgHTMLAttributes } from "@/types/html.js";

export interface ImageBaseProps extends PolymorphicProps {
  raw?: boolean;
  src?: string;
}

export interface ImageProps
  extends ImageBaseProps,
    /* @vue-ignore */ ImgHTMLAttributes {
  aspectRatio?: number;
  background?: string;
  cdn?: string;
  layout?: "constrained" | "fixed" | "fullWidth";
  objectFit?:
    | "contain"
    | "cover"
    | "fill"
    | "inherit"
    | "initial"
    | "none"
    | "scale-down";
  operations?: UnpicImageProps<ImgHTMLAttributes>["operations"];
  options?: UnpicImageProps<ImgHTMLAttributes>["options"];
  priority?: boolean;
  ui?: ImageTheme["slots"];
}

export type ImageTheme = ComponentApi<typeof theme, "image">;
