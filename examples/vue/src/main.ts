import "./styles.css";

import { createApp, h } from "vue";

import ui from "@veehance/vue/plugin";

import { createRouter, RouterProvider } from "@tanstack/vue-router";

import reportWebVitals from "./reportWebVitals";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  context: {},
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  defaultStructuralSharing: true,
  routeTree,
  scrollRestoration: true,
});

declare module "@tanstack/vue-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const app = createApp({
    setup() {
      return () => h(RouterProvider, { router });
    },
  });

  app.use(ui);
  app.mount("#app");
}

reportWebVitals();
