import { type ComponentProps, splitProps } from "solid-js";

import { ui as theme } from "@iueev/core/theme";
import { cv } from "@iueev/core/utils";

import type { ContainerTheme } from "./container.types";

export interface ContainerProps extends ComponentProps<"div"> {
  ui?: ContainerTheme["slots"];
}

function Container(props: ContainerProps) {
  const [{ children, ui: overrides }, attrs] = splitProps(props, [
    "children",
    "ui",
  ]);
  const ui = cv(theme.container);
  return (
    <div
      class={ui({ className: [overrides?.base, props.class] })}
      data-scope="container"
      {...attrs}
    >
      {children}
    </div>
  );
}

export default Container;
