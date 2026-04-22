import { useEnvironment } from "@veehance/react/use-environment";

export default () => {
  const { getRootNode } = useEnvironment();
  return <pre>{JSON.stringify(getRootNode().nodeName, null, 2)}</pre>;
};
