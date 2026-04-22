import type { ImgHTMLAttributes } from "$lib/types/html.js";
import type { ImageBaseProps } from "$lib/types/ui.js";

export interface ColorModeImageBaseProps extends Omit<ImageBaseProps, "src"> {
  dark: string;
  light: string;
}

export interface ColorModeImageProps
  extends ColorModeImageBaseProps,
    Omit<ImgHTMLAttributes, "src"> {
  ui?: { base: string };
}
