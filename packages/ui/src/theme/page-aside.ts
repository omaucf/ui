import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "hidden overflow-y-auto py-8 lg:sticky lg:top-(--ui-header-height) lg:-ms-4 lg:block lg:max-h-[calc(100vh-var(--ui-header-height))] lg:ps-4 lg:pe-6.5",
    container: "relative",
    top: "pointer-events-none sticky -top-8 z-1 -mt-8",
    topHeader: "-mx-4 h-8 bg-default px-4",
    topBody: "pointer-events-auto relative -mx-4 flex flex-col bg-default px-4",
    topFooter: "-mx-4 h-8 bg-linear-to-b from-default px-4",
  },
});
