import type { Options } from "../../lib/types/ui.js";
import { cc } from "../../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    base: [
      "border-transparent border-b font-medium text-primary hover:border-primary focus-visible:outline-primary focus-visible:has-[>code]:outline-0 [&>code]:border-dashed hover:[&>code]:border-primary hover:[&>code]:text-primary focus-visible:[&>code]:border-primary focus-visible:[&>code]:text-primary",
      options.theme?.transitions &&
        "transition-colors [&>code]:transition-colors",
    ],
  });
