import { EnvironmentProvider } from "@veehance/react/environment";

import Usage from "./usage.js";

export default () => (
  <EnvironmentProvider>
    <Usage />
  </EnvironmentProvider>
);
