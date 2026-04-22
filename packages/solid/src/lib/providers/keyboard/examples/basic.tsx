import { createSignal } from "solid-js";

import { useFormatHotkey, useHotkey } from "@veehance/solid/keyboard";

export default () => {
  const [count, setCount] = createSignal(0);
  const formatHotkey = useFormatHotkey();

  useHotkey({ action: () => setCount((value) => value + 1), hotkey: "mod+K" });

  return (
    <div class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-accented text-sm shadow-sm">
      <p class="flex flex-wrap items-center gap-2 text-muted leading-[1.6]">
        Press{" "}
        <kbd class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-accented text-xs">
          {formatHotkey("mod+K")}
        </kbd>{" "}
        anywhere on this page
      </p>

      <div class="flex items-baseline gap-2 border-default border-t pt-3.5">
        <span class="font-bold text-[1.75rem] text-accented tabular-nums leading-none">
          {count()}
        </span>
        <span class="text-muted">{count() === 1 ? "time" : "times"}</span>
      </div>
    </div>
  );
};
