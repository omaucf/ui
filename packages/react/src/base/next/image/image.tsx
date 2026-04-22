import { forwardRef } from "react";

import { cx } from "#build/ui/utils";

import { Image as RawImage } from "@unpic/react/nextjs";

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
      cdn,
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
        <RawImage
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
          ref={ref}
          src={src}
          width={width as number}
          {...attrs}
        />
      );

    return (
      // biome-ignore lint/performance/noImgElement: safe_to_set
      <Factory.img
        alt={alt}
        asChild={asChild}
        className={cx(ui?.base, className)}
        crossOrigin={crossOrigin}
        data-scope="image"
        height={height}
        ref={ref}
        src={src}
        width={width}
        {...attrs}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
