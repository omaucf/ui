import { createSharedComposable } from "@vueuse/core";

import { useEnvironmentContext } from "../providers/environment/use-environment-context.js";

export const useEnvironment = createSharedComposable(useEnvironmentContext);
