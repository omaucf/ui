import type theme from "#build/theme/icon";
import type { ComponentApi, Icon } from "#build/ui/types";

import type { PolymorphicProps } from "@/types/element.js";

export interface IconBaseProps extends PolymorphicProps {
  name: Icon;
  raw?: boolean;
}

export interface IconProps extends IconBaseProps {
  ui?: IconTheme["slots"];
}

export type IconTheme = ComponentApi<typeof theme, "icon">;
