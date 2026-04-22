import type { Plugin } from "vue";

import { isFunction } from "radashi";

export default {
  install(app, options) {
    if (options?.router && isFunction(options.router)) {
      app.provide("ui:router", options.router);
    }
  },
} satisfies Plugin;
