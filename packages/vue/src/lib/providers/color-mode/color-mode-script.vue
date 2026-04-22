<script lang="ts">
  import { computed, defineComponent, h, Teleport } from "vue";

  import {
    createColorScript,
    resolveColorScript,
  } from "@veehance/core/utils/script";

  import appConfig from "#build/app.config";

  import type { ColorModeValue } from "./color-mode.types.js";

  export default defineComponent({
    name: "ColorModeScript",

    props: {
      value: {
        default: undefined,
        type: Object as () => ColorModeValue,
      },
    },

    setup(props) {
      const scriptContent = computed(() =>
        createColorScript(resolveColorScript(props.value, appConfig.colorMode))
      );

      return () =>
        h(Teleport, { to: "head" }, [
          h("script", { innerHTML: scriptContent.value }),
        ]);
    },
  });
</script>
