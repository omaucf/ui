import { SVELTE_ANATOMY } from "../../lib/constants/anatomy.js";
import type { ImportResolver } from "../../lib/types/template.js";

export const svelteBase: ImportResolver = () => [
  {
    from: `${SVELTE_ANATOMY.NAME}/use-app-config`,
    names: ["useAppConfig"],
  },
  {
    from: `${SVELTE_ANATOMY.NAME}/use-color-mode`,
    names: ["useColorMode"],
  },
  {
    from: `${SVELTE_ANATOMY.NAME}/use-environment`,
    names: ["useEnvironment"],
  },
  {
    from: `${SVELTE_ANATOMY.NAME}/use-head`,
    names: ["useHead"],
  },
];
