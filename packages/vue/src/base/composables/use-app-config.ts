import { reactive } from "vue";

import appConfig from "#build/app.config";

export const useAppConfig = /* @__PURE__ */ () => reactive(appConfig);
