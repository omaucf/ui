import type { ImgHTMLAttributes } from "@/types/html.js";
import type { ImageBaseProps } from "@/types/ui.js";

export interface ColorModeImageBaseProps extends Omit<ImageBaseProps, "src"> {
  dark: string;
  light: string;
}

export interface ColorModeImageProps
  extends ColorModeImageBaseProps,
    /* @vue-ignore */ Omit<ImgHTMLAttributes, "src"> {
  ui?: { base: string };
}
