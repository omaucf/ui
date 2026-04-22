import type theme from "#build/theme/prose/h2";
import type { ComponentApi } from "#build/ui/types";

import type {
  HTMLProps,
  PolymorphicProps,
  RefAttribute,
} from "$lib/types/element.js";

export interface ProseH2BaseProps extends PolymorphicProps<"h2">, RefAttribute {
  anchor?: boolean;
}

export interface ProseH2Props extends ProseH2BaseProps, HTMLProps<"h2"> {
  ui?: Partial<ProseH2Theme["slots"]>;
}

export type ProseH2Theme = ComponentApi<typeof theme, "h2", "ui:prose">;
