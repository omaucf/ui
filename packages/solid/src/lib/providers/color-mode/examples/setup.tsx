import { ColorModeProvider } from "@veehance/solid/color-mode";
import { EnvironmentProvider } from "@veehance/solid/environment";

export default () => {
  return (
    <iframe title="IFrame Context">
      <EnvironmentProvider>
        <ColorModeProvider>{/* Your App */}</ColorModeProvider>
      </EnvironmentProvider>
    </iframe>
  );
};
