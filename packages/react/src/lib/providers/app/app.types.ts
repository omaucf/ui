import type { ColorModeValue } from "../color-mode/index.js";
import type { EnvironmentValue } from "../environment/index.js";
import type { LocaleValue } from "../locale/index.js";

export interface AppProviderProps {
  children?: React.ReactNode;
  colorMode?: ColorModeValue;
  environment?: EnvironmentValue;
  locale?: LocaleValue;
}
