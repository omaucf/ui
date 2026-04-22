import { type Component, splitProps } from "solid-js";

import { Factory } from "#build/ui/components";
import { cx } from "#build/ui/utils";

import type { MainProps } from "./main.types";

const Main: Component<MainProps> = (props) => {
  const [{ children, ui }, attrs] = splitProps(props, ["children", "ui"]);
  return (
    <Factory.main
      {...attrs}
      class={cx(ui?.base, attrs.class)}
      data-scope="main"
    >
      {children}
    </Factory.main>
  );
};

export default Main;
