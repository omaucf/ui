import type { View } from "react-native";

import { ui as theme } from "@iueev/core/theme";
import { cv } from "@iueev/core/utils";

import { Factory } from "../../../elements/factory";
import type { MainTheme } from "./main.types";

export interface MainProps extends React.ComponentProps<typeof View> {
  className?: any;
  ui?: MainTheme["slots"];
}

function Main({
  className,
  ui: overrides,
  ...props
}: MainProps & React.RefAttributes<View>) {
  const ui = cv(theme.main);
  return (
    <Factory.View
      className={ui({ className: [overrides?.base, className] })}
      data-scope="main"
      {...props}
    />
  );
}

export default Main;
