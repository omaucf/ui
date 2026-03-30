import { REACT_PKG_ANATOMY, UI_PKG_ANATOMY } from "@veehance/ui/constants";

import { defu } from "defu";
import type { NextConfig } from "next";

export default (nextConfig: NextConfig = {}) => {
  return defu(nextConfig, {
    experimental: {
      optimizePackageImports: [REACT_PKG_ANATOMY.NAME, UI_PKG_ANATOMY.NAME],
    },
  });
};
