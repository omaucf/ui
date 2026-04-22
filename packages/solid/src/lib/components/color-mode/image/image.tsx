import { type Component, splitProps } from "solid-js";

import { Image } from "#build/ui/components";
import { cc, cx } from "#build/ui/utils";

import type { ColorModeImageProps } from "./image.types";

const ColorModeImage: Component<ColorModeImageProps> = (props) => {
  const [{ dark, light, ui }, attrs] = splitProps(props, [
    "dark",
    "light",
    "ui",
  ]);
  return (
    <>
      <Image
        {...attrs}
        class={cx(cc("dark:hidden"), ui?.base, attrs.class)}
        src={light}
      />
      <Image
        {...attrs}
        class={cx(cc(["hidden dark:inline-block"]), ui?.base, attrs.class)}
        src={dark}
      />
    </>
  );
};

export default ColorModeImage;
