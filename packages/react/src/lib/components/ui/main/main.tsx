import { ui as theme } from "@iueev/core/theme";
import { cv } from "@iueev/core/utils";

import type { MainTheme } from "./main.types";

export interface MainProps extends React.ComponentProps<"main"> {
  ui?: MainTheme["slots"];
}

function Main({ className, ui: overrides, ...props }: MainProps) {
  const ui = cv(theme.main);
  return (
    <main
      className={ui({ className: [overrides?.base, className] })}
      data-scope="main"
      {...props}
    />
  );
}

export default Main;
