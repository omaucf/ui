import type theme from "#build/theme/prose/icon";
import type { ComponentApi } from "#build/ui/types";

import type { IconBaseProps } from "@/types/ui.js";

export interface ProseIconBaseProps extends IconBaseProps {}

export interface ProseIconProps extends ProseIconBaseProps {
  ui?: ProseIconTheme["slots"];
}

export type ProseIconTheme = ComponentApi<typeof theme, "icon", "ui:prose">;
