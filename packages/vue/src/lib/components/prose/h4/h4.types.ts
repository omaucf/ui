import type theme from "#build/theme/prose/h4";
import type { ComponentApi } from "#build/ui/types";

import type { HTMLProps, PolymorphicProps } from "@/types/element.js";

export interface ProseH4BaseProps extends PolymorphicProps {
  anchor?: boolean;
}

export interface ProseH4Props
  extends ProseH4BaseProps,
    /* @vue-ignore */ HTMLProps<"h4"> {
  ui?: ProseH4Theme["slots"];
}

export type ProseH4Theme = ComponentApi<typeof theme, "h4", "ui:prose">;
