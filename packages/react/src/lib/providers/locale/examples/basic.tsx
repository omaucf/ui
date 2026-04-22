import en from "@veehance/core/locale/en";
import { LocaleProvider } from "@veehance/react/locale";

import Usage from "./usage.js";

export default () => (
  <LocaleProvider value={en}>
    <Usage />
  </LocaleProvider>
);
