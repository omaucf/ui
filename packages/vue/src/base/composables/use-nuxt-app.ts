import { createHooks } from "hookable";

const hooks = createHooks();

export const useNuxtApp = () => ({
  $i18n: { localeCodes: { value: [] } },
  $localePath: () => "",
  hook: hooks.hook,
  hooks,
  isHydrating: true,
  payload: { serverRendered: import.meta.env.SSR },
});
