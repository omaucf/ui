import en from "@veehance/core/locale/en";
import { LocaleProvider } from "@veehance/react/locale";

export default () => {
  return <LocaleProvider value={en}>{/* Your App */}</LocaleProvider>;
};
