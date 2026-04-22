import type theme from "#build/theme/main";
import type { ComponentApi } from "#build/ui/types";

import type { HTMLProps, PolymorphicProps } from "@/types/element.js";

export interface MainBaseProps extends PolymorphicProps<"main"> {}

export interface MainProps extends MainBaseProps, HTMLProps<"main"> {
  ui?: Partial<MainTheme["slots"]>;
}

export type MainTheme = ComponentApi<typeof theme, "main">;
