import { REACT_ANATOMY } from "../../lib/constants/anatomy.js";
import type { ImportResolver } from "../../lib/types/template.js";

export const reactBase: ImportResolver = () => [
  {
    from: `${REACT_ANATOMY.NAME}/use-app-config`,
    names: ["useAppConfig"],
  },
  {
    from: `${REACT_ANATOMY.NAME}/use-environment`,
    names: ["useEnvironment"],
  },
  {
    from: `${REACT_ANATOMY.NAME}/use-head`,
    names: ["useHead"],
  },
];

export const reactColorMode: ImportResolver = (options) => [
  {
    from:
      options.router === false
        ? `${REACT_ANATOMY.NAME}/use-color-mode/base`
        : `${REACT_ANATOMY.NAME}/use-color-mode`,
    names: ["useColorMode"],
  },
];
