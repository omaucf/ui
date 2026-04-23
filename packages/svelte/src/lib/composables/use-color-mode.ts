import { userPrefersMode, mode, setMode } from "mode-watcher";

import appConfig from "#build/app.config";

export const useColorMode = () => {
  if (!appConfig.colorMode) return { forced: true as const };

  return {
    forced: false as const,
    get preference() {
      return userPrefersMode.current ?? "system";
    },
    set preference(value: "light" | "dark" | "system") {
      setMode(value);
    },
    get value() {
      return mode.current;
    },
  };
};
