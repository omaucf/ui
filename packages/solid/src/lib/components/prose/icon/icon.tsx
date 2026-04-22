import { type Component, splitProps } from "solid-js";

import { Icon } from "#build/ui/components";
import { cx } from "#build/ui/utils";

import type { ProseIconProps } from "./icon.types";

const ProseIcon: Component<ProseIconProps> = (props) => {
  const [{ name, raw, ui }, attrs] = splitProps(props, ["name", "raw", "ui"]);
  return (
    <Icon {...attrs} class={cx(ui?.base, attrs.class)} name={name} raw={raw} />
  );
};

export default ProseIcon;
