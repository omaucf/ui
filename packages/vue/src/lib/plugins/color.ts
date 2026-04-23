import { computed } from "vue";

import { generateColors } from "@veehance/core/functions";

import type { UseHeadInput } from "@unhead/vue/types";

import {
  defineNuxtPlugin,
  useAppConfig,
  useHead,
  useNuxtApp,
} from "#build/ui/imports";

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig();
  const nuxtApp = useNuxtApp();

  const root = computed(() => generateColors(appConfig.ui.colors));

  const headData: UseHeadInput = {
    style: [{ innerHTML: () => root.value, tagPriority: -2, id: "ui-color" }],
  };

  if (
    import.meta.client &&
    nuxtApp.isHydrating &&
    !nuxtApp.payload.serverRendered
  ) {
    const style = document.createElement("style");

    style.innerHTML = root.value;
    style.setAttribute("data-ui-color", "");
    document.head.appendChild(style);

    headData.script = [
      {
        innerHTML:
          "document.head.removeChild(document.querySelector('data-ui-color]'))",
      },
    ];
  }

  useHead(headData);
});
