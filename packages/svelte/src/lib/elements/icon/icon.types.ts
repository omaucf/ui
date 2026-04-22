import type theme from "#build/theme/icon";
import type { ComponentApi, Icon } from "#build/ui/types";

import type { PolymorphicProps, RefAttribute } from "$lib/types/element.js";

export interface IconBaseProps
  extends Omit<PolymorphicProps<"span">, "children">,
    RefAttribute {
  name: Icon;
  raw?: boolean;
}

export interface IconProps extends IconBaseProps {
  ui?: IconTheme["slots"];
  [key: `aria-${string}`]: string | undefined;
}

export type IconTheme = ComponentApi<typeof theme, "icon">;
