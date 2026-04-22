import { ui as theme } from "@iueev/core/theme";
import { cv } from "@iueev/core/utils";

import type { ContainerTheme } from "./container.types";

export interface ContainerProps extends React.ComponentProps<"div"> {
  ui?: ContainerTheme["slots"];
}

function Container({ className, ui: overrides, ...props }: ContainerProps) {
  const ui = cv(theme.container);
  return (
    <div
      className={ui({ className: [overrides?.base, className] })}
      data-scope="container"
      {...props}
    />
  );
}

export default Container;
