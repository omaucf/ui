import {
  useHotkey,
  useIsKeyPressed,
  usePressedKeys,
} from "@veehance/react/keyboard";

export default () => {
  useHotkey({ action: () => {}, hotkey: "mod+K" });

  const pressedKeys = usePressedKeys();
  const isShiftPressed = useIsKeyPressed({ hotkey: "shift" });

  return (
    <div className="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-highlighted text-sm shadow-sm">
      <p className="flex flex-wrap items-center gap-2 text-muted leading-[1.6]">
        Hold any key to see it tracked live
      </p>

      <div className="flex flex-col items-start gap-2 border-default border-t pt-3.5">
        <span className="font-semibold text-[0.6875rem] text-muted uppercase tracking-[0.04em]">
          Currently pressed
        </span>
        <div className="flex min-h-7 flex-wrap items-center gap-1.5">
          {pressedKeys.length === 0 ? (
            <span className="text-highlighted italic">nothing</span>
          ) : (
            pressedKeys.map((key: string) => (
              <kbd
                className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-highlighted text-xs data-[active]:border-muted data-[active]:bg-elevated data-[active]:text-primary"
                data-active=""
                key={key}
              >
                {key}
              </kbd>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 border-default border-t pt-3.5">
        <span className="font-semibold text-[0.6875rem] text-muted uppercase tracking-[0.04em]">
          Shift
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] font-semibold text-muted text-xs data-[state=active]:bg-elevated data-[state=active]:text-primary"
          data-state={isShiftPressed ? "active" : undefined}
        >
          <span
            className="size-[0.4375rem] rounded-full bg-current data-[pulse]:motion-safe:animate-[hotkeys-pulse_1.2s_ease-in-out_infinite]"
            data-pulse={isShiftPressed ? "" : undefined}
          />
          {isShiftPressed ? "Precision mode" : "Hold Shift for precision"}
        </span>
      </div>
    </div>
  );
};
