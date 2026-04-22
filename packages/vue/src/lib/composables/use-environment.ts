import { useEnvironmentContext } from "@/providers/environment/index.js";

export const useEnvironment = () => {
  const { getDocument, getRootNode, getWindow } = useEnvironmentContext().value;

  return {
    getDocument,
    getRootNode,
    getWindow,
  };
};
