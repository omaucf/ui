import type { Snippet } from "svelte";

import type { ColorModeValue } from "../color-mode/index.js";
import type { EnvironmentValue } from "../environment/index.js";
import type { LocaleValue } from "../locale/index.js";

export interface AppProviderProps {
  children?: Snippet;
  colorMode?: ColorModeValue;
  environment?: EnvironmentValue;
  locale?: LocaleValue;
}
