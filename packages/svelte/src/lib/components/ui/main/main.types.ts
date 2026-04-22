import type theme from "#build/theme/main";
import type { ComponentApi } from "#build/ui/types";

import type {
  HTMLProps,
  PolymorphicProps,
  RefAttribute,
} from "$lib/types/element.js";

export interface MainBaseProps extends PolymorphicProps<"main">, RefAttribute {}

export interface MainProps extends MainBaseProps, HTMLProps<"main"> {
  ui?: Partial<MainTheme["slots"]>;
}

export type MainTheme = ComponentApi<typeof theme, "main">;
