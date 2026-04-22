import type { Text } from "react-native";

import { prose as theme } from "@iueev/core/theme";
import { cv } from "@iueev/core/utils";

import { Factory } from "../../../elements/factory";
import type { ProseH1Theme } from "./h1.types";

export interface ProseH1Props extends React.ComponentProps<typeof Text> {
  className?: any;
  ui?: ProseH1Theme["slots"];
}

function ProseH1({
  className,
  ui: overrides,
  ...props
}: ProseH1Props & React.RefAttributes<Text>) {
  const ui = cv(theme.h1);
  return (
    <Factory.Text
      className={ui({ className: [overrides?.base, className] })}
      data-scope="proseH1"
      {...props}
    />
  );
}

export default ProseH1;
