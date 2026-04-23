import { createHooks } from "hookable";

const hooks = createHooks();

export const useNuxtApp = () => ({
  isHydrating: true,
  payload: { serverRendered: import.meta.env.SSR },
  hooks,
  hook: hooks.hook,
});
