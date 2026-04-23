import { useColorMode as useColorModeVueUse } from "@vueuse/core";

import appConfig from "#build/app.config";

export const useColorMode = /* @__PURE__ */ () => {
  if (!appConfig.colorMode) return { forced: true };

  const { store, system } = useColorModeVueUse();

  return {
    get preference() {
      return store.value === "auto" ? "system" : store.value;
    },
    set preference(value) {
      store.value = value === "system" ? "auto" : value;
    },
    get value() {
      return store.value === "auto" ? system.value : store.value;
    },
    forced: false,
  };
};
