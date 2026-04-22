import { useLocale } from "@veehance/solid/use-locale";

export default () => {
  const { code } = useLocale();
  return <pre>{JSON.stringify(code(), null, 2)}</pre>;
};
