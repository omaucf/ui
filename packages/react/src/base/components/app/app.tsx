import type { RootNode } from "@veehance/core/types";

import {
  ColorMode,
  type ColorModeProps,
} from "../../../base/plugins/color-mode.js";
import { Head, type HeadProps } from "../../../lib/plugins/head.js";
import { EnvironmentProvider } from "../../../lib/providers/environment/index.js";

export interface AppProps {
  children?: React.ReactNode;
  environment?: RootNode | (() => RootNode) | undefined;
  head?: HeadProps["value"];
  theme?: ColorModeProps["value"];
}

function App({ children, theme, head, environment }: AppProps) {
  return (
    <EnvironmentProvider value={environment}>
      <Head value={head}>
        <ColorMode value={theme}>{children}</ColorMode>
      </Head>
    </EnvironmentProvider>
  );
}

export default App;
