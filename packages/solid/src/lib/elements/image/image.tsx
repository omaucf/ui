import { type Component, splitProps } from "solid-js";

import { cx } from "#build/ui/utils";

import { Image as RawImage } from "@unpic/solid";

import { Factory } from "@/elements/factory";

import type { ImageProps } from "./image.types";

const Image: Component<ImageProps> = (props) => {
  const [
    { asChild, alt = "", src, layout = "constrained", raw, ui, ...rootProps },
    attrs,
  ] = splitProps(props, [
    "alt",
    "asChild",
    "aspectRatio",
    "crossOrigin",
    "height",
    "layout",
    "objectFit",
    "operations",
    "options",
    "priority",
    "raw",
    "src",
    "ui",
    "width",
  ]);

  if (src && !asChild && !raw)
    return (
      // @ts-expect-error
      <RawImage
        {...attrs}
        alt={alt}
        aspectRatio={rootProps.aspectRatio as number}
        class={cx(ui?.base, attrs.class)}
        crossOrigin={rootProps.crossOrigin}
        data-scope="image"
        height={rootProps.height as number}
        layout={layout}
        objectFit={rootProps.objectFit}
        operations={rootProps.operations}
        options={rootProps.options}
        priority={rootProps.priority}
        src={src}
        width={rootProps.width! as number}
      />
    );

  return (
    // biome-ignore lint/performance/noImgElement: safe_to_set
    <Factory.img
      {...attrs}
      alt={alt}
      asChild={asChild}
      class={cx(ui?.base, attrs.class)}
      crossOrigin={rootProps.crossOrigin}
      data-scope="image"
      height={rootProps.height}
      src={src}
      width={rootProps.width}
    />
  );
};

export default Image;
