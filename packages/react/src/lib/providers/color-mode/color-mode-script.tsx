import { createColorScript, resolveColorScript } from "@veehance/core/utils/script";

import appConfig from "#build/app.config";

import type { ColorModeValue } from "./color-mode.types.js";

export function ColorModeScript({ ...value }: ColorModeValue) {
  const script = createColorScript(
    resolveColorScript(value, appConfig.colorMode)
  );

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: safe to set
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
