import { useEnvironmentContext } from "@/providers/environment/index.js";

export const useEnvironment = () => {
  const { getDocument, getRootNode, getWindow } = useEnvironmentContext();

  return {
    getDocument,
    getRootNode,
    getWindow,
  };
};
