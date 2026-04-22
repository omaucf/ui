import { EnvironmentProvider } from "@veehance/react/environment";

import Frame from "react-frame-component";

export default () => {
  return (
    <Frame title="IFrame Context">
      <EnvironmentProvider>{/* Your App */}</EnvironmentProvider>
    </Frame>
  );
};
