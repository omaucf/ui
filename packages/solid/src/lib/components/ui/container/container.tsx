import { type Component, splitProps } from "solid-js";

import { Factory } from "#build/ui/components";
import { cx } from "#build/ui/utils";

import type { ContainerProps } from "./container.types";

const Container: Component<ContainerProps> = (props) => {
  const [{ children, ui }, attrs] = splitProps(props, ["children", "ui"]);
  return (
    <Factory.div
      {...attrs}
      class={cx(ui?.base, attrs.class)}
      data-scope="container"
    >
      {children}
    </Factory.div>
  );
};

export default Container;
