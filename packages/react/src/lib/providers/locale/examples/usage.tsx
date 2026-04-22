import { useLocale } from "@veehance/react/use-locale";

export default () => {
  const locale = useLocale();
  return <pre>{JSON.stringify(locale.code, null, 2)}</pre>;
};
