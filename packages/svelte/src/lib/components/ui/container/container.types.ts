import type theme from "#build/theme/container";
import type { ComponentApi } from "#build/ui/types";

import type {
  HTMLProps,
  PolymorphicProps,
  RefAttribute,
} from "$lib/types/element.js";

export interface ContainerBaseProps
  extends PolymorphicProps<"div">,
    RefAttribute {}

export interface ContainerProps extends ContainerBaseProps, HTMLProps<"div"> {
  ui?: Partial<ContainerTheme["slots"]>;
}

export type ContainerTheme = ComponentApi<typeof theme, "container">;
