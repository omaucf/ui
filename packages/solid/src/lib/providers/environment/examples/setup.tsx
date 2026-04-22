import { EnvironmentProvider } from "@veehance/solid/environment";

export default () => {
  return (
    <iframe title="IFrame Context">
      <EnvironmentProvider>{/* Your App */}</EnvironmentProvider>
    </iframe>
  );
};
