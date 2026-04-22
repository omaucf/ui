import { type ComponentProps, splitProps } from "solid-js";

import { ui as theme } from "@iueev/core/theme";
import { cv } from "@iueev/core/utils";

import type { MainTheme } from "./main.types";

export interface MainProps extends ComponentProps<"main"> {
  ui?: MainTheme["slots"];
}

function Main(props: MainProps) {
  const [{ children, ui: overrides }, attrs] = splitProps(props, [
    "children",
    "ui",
  ]);
  const ui = cv(theme.main);
  return (
    <main
      class={ui({ className: [overrides?.base, props.class] })}
      data-scope="main"
      {...attrs}
    >
      {children}
    </main>
  );
}

export default Main;
