import type theme from "#build/theme/prose/h1";
import type { ComponentApi } from "#build/ui/types";

import type { HTMLProps, PolymorphicProps } from "@/types/element.js";

export interface ProseH1BaseProps extends PolymorphicProps {
  anchor?: boolean;
}

export interface ProseH1Props extends ProseH1BaseProps, HTMLProps<"h1"> {
  ui?: Partial<ProseH1Theme["slots"]>;
}

export type ProseH1Theme = ComponentApi<typeof theme, "h1", "ui:prose">;
