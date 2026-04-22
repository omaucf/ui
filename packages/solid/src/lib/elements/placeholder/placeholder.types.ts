import type theme from "#build/theme/placeholder";
import type { ComponentApi } from "#build/ui/types";

import type { HTMLProps, PolymorphicProps } from "@/types/element.js";

export interface PlaceholderBaseProps extends PolymorphicProps<"div"> {}

export interface PlaceholderProps
  extends PlaceholderBaseProps,
    HTMLProps<"div"> {
  ui?: Partial<PlaceholderTheme["slots"]>;
}

export type PlaceholderTheme = ComponentApi<typeof theme, "placeholder">;
