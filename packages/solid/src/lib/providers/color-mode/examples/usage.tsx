import { useColorMode } from "@veehance/solid/use-color-mode";

export default () => {
  const { mode } = useColorMode();

  return <pre>{JSON.stringify(mode(), null, 2)}</pre>;
};
