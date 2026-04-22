import type theme from "#build/theme/prose/h3";
import type { ComponentApi } from "#build/ui/types";

import type { HTMLProps, PolymorphicProps } from "@/types/element.js";

export interface ProseH3BaseProps extends PolymorphicProps {
  anchor?: boolean;
}

export interface ProseH3Props
  extends ProseH3BaseProps,
    /* @vue-ignore */ HTMLProps<"h3"> {
  ui?: ProseH3Theme["slots"];
}

export type ProseH3Theme = ComponentApi<typeof theme, "h3", "ui:prose">;
