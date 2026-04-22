import { ColorModeProvider } from "@veehance/react/color-mode";
import { EnvironmentProvider } from "@veehance/react/environment";

import Usage from "./usage.js";

export default () => (
  <EnvironmentProvider>
    <ColorModeProvider>
      <Usage />
    </ColorModeProvider>
  </EnvironmentProvider>
);
