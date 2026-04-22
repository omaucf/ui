import type { ImageProvider } from "#build/ui/types";

import type { ImgHTMLAttributes } from "@/types/html.js";

export type ImageBaseProps = import("@/elements/image/index.js").ImageBaseProps;

export interface ImageProps
  extends ImageBaseProps,
    /* @vue-ignore */ Omit<ImgHTMLAttributes, "sizes"> {
  background?: string;
  densities?: string;
  fit?: string;
  format?: string;
  modifiers?: Record<string, any>;
  nonce?: string;
  placeholder?:
    | boolean
    | string
    | number
    | [w: number, h: number, q?: number, b?: number];
  placeholderClass?: string;
  preload?: boolean | { fetchPriority: "auto" | "high" | "low" };
  preset?: string;
  provider?: ImageProvider;
  quality?: string | number;
  raw?: boolean;
  sizes?: string | Record<string, any>;
  ui?: Partial<ImageTheme["slots"]>;
}

export type ImageTheme = import("@/elements/image/index.js").ImageTheme;
