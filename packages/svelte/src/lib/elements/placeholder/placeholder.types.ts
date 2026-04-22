import type theme from "#build/theme/placeholder";
import type { ComponentApi } from "#build/ui/types";

import type {
  HTMLProps,
  PolymorphicProps,
  RefAttribute,
} from "$lib/types/element.js";

export interface PlaceholderBaseProps
  extends PolymorphicProps<"div">,
    RefAttribute {}

export interface PlaceholderProps
  extends PlaceholderBaseProps,
    HTMLProps<"div"> {
  ui?: Partial<PlaceholderTheme["slots"]>;
}

export type PlaceholderTheme = ComponentApi<typeof theme, "placeholder">;
