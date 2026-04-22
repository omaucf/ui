import type { View } from "react-native";

import { ui as theme } from "@iueev/core/theme";
import { cv } from "@iueev/core/utils";

import { Factory } from "../../../elements/factory";
import type { ContainerTheme } from "./container.types";

export interface ContainerProps extends React.ComponentProps<typeof View> {
  className?: any;
  ui?: ContainerTheme["slots"];
}

function Container({
  className,
  ui: overrides,
  ...props
}: ContainerProps & React.RefAttributes<View>) {
  const ui = cv(theme.container);
  return (
    <Factory.View
      className={ui({ className: [overrides?.base, className] })}
      data-scope="container"
      {...props}
    />
  );
}

export default Container;
