import type { Plugin } from "vue";

import { createHead } from "@unhead/vue/client";

export default {
  install(app) {
    if (app._context.provides.usehead) return;
    const head = createHead();
    app.use(head);
  },
} satisfies Plugin;
