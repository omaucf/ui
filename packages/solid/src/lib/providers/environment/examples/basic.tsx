import { EnvironmentProvider } from "@veehance/solid/environment";

import Usage from "./usage.js";

export default () => (
  <EnvironmentProvider>
    <Usage />
  </EnvironmentProvider>
);
