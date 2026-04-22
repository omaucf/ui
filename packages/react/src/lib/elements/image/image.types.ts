import type theme from "#build/theme/image";
import type { ComponentApi } from "#build/ui/types";

import type {
  CoreImageAttributes,
  Operations,
  UnpicBaseImageProps,
} from "@unpic/core/base";

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
  layout?: "constrained" | "fixed" | "fullWidth";
  objectFit?:
    | "contain"
    | "cover"
    | "fill"
    | "none"
    | "scale-down"
    | "inherit"
    | "initial";
  operations?: UnpicBaseImageProps<
    Operations,
    any,
    CoreImageAttributes<unknown>
  >["operations"];
  options?: UnpicBaseImageProps<
    Operations,
    any,
    CoreImageAttributes<unknown>
  >["options"];
  priority?: boolean;
  ui?: Partial<ImageTheme["slots"]>;
}

export type ImageTheme = ComponentApi<typeof theme, "image">;
