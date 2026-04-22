import { useEnvironmentContext } from "$lib/providers/environment/index.js";

export const useEnvironment = () => {
  const env = useEnvironmentContext();

  return {
    getDocument: env().getDocument,
    getRootNode: env().getRootNode,
    getWindow: env().getWindow,
  };
};
