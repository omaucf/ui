import { cc } from "../../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "my-5",
    container: "flex items-center gap-3 font-mono text-sm",
    name: "font-semibold text-primary",
    wrapper: "flex flex-1 items-center gap-1.5 text-xs",
    required: "rounded-sm bg-error/10 px-1.5 py-0.5 text-error",
    type: "rounded-sm bg-elevated px-1.5 py-0.5 text-toned",
    description: "mt-3 text-muted text-sm [&_code]:text-xs/4",
  },
});
