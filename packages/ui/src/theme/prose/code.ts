import type { Options } from "../../lib/types/ui.js";
import { cc } from "../../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    base: "inline-block rounded-md px-1.5 py-0.5 font-medium font-mono text-sm",
    variants: {
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [
            color,
            `border border-${color}/25 bg-${color}/10 text-${color}`,
          ])
        ),
        neutral: "border border-muted bg-muted text-highlighted",
      },
    },
    defaultVariants: {
      color: "neutral",
    },
  });
