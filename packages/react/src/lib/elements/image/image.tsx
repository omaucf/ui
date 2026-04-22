import { forwardRef } from "react";

import { cx } from "#build/ui/utils";

import { Image as RawImage } from "@unpic/react/base";

import { Factory } from "@/elements/factory";

import type { ImageProps } from "./image.types";

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      alt = "",
      asChild,
      aspectRatio,
      className,
      crossOrigin,
      height,
      layout = "constrained",
      objectFit,
      operations,
      options,
      priority,
      raw = false,
      src,
      ui,
      width,
      ...attrs
    },
    ref
  ) => {
    if (src && !asChild && !raw)
      return (
        // @ts-expect-error
        <RawImage
          {...attrs}
          alt={alt}
          aspectRatio={aspectRatio as number}
          className={cx(ui?.base, className)}
          crossOrigin={crossOrigin}
          data-scope="image"
          height={height as number}
          layout={layout}
          objectFit={objectFit}
          operations={operations}
          options={options}
          priority={priority}
          src={src}
          width={width as number}
        />
      );

    return (
      // biome-ignore lint/performance/noImgElement: safe_to_set
      <Factory.img
        {...attrs}
        alt={alt}
        asChild={asChild}
        className={cx(ui?.base, className)}
        crossOrigin={crossOrigin}
        data-scope="image"
        height={height}
        ref={ref}
        src={src}
        width={width}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
