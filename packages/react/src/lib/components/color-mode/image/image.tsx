import { forwardRef } from "react";

import { Image } from "#build/ui/components";
import { cc, cx } from "#build/ui/utils";

import type { ColorModeImageProps } from "./image.types";

const ColorModeImage = forwardRef<HTMLImageElement, ColorModeImageProps>(
  ({ className, dark, light, ui, ...attrs }, ref) => (
    <>
      <Image
        {...attrs}
        className={cx(cc("dark:hidden"), ui?.base, className)}
        ref={ref}
        src={light}
      />
      <Image
        {...attrs}
        className={cx(cc(["hidden dark:inline-block"]), ui?.base, className)}
        ref={ref}
        src={dark}
      />
    </>
  )
);

ColorModeImage.displayName = "ColorModeImage";

export default ColorModeImage;
