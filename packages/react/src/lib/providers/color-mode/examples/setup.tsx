import { ColorModeProvider } from "@veehance/react/color-mode";
import { EnvironmentProvider } from "@veehance/react/environment";

import Frame from "react-frame-component";

export default () => {
  return (
    <Frame title="IFrame Context">
      <EnvironmentProvider>
        <ColorModeProvider>{/* Your App */}</ColorModeProvider>
      </EnvironmentProvider>
    </Frame>
  );
};
