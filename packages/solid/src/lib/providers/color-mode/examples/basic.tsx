import { ColorModeProvider } from "@veehance/solid/color-mode";
import { EnvironmentProvider } from "@veehance/solid/environment";

import Usage from "./usage.js";

export default () => (
  <EnvironmentProvider>
    <ColorModeProvider>
      <Usage />
    </ColorModeProvider>
  </EnvironmentProvider>
);
