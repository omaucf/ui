/** biome-ignore-all lint/complexity/noVoid: safe_to_set */
import { onCleanup, onMount } from "solid-js";

import { useEnvironment } from "#build/ui/imports";
import type { Accessor, MaybeAccessor } from "#build/ui/types";

import {
  createHotkeyRecorder,
  type HotkeyRecorderOptions,
  type HotkeyRecorderState,
} from "@zag-js/hotkeys";
import { useSyncExternalStore } from "@zag-js/solid";

import { runIfFn } from "@/utils/fn";

export interface UseHotkeyRecorderProps
  extends Omit<HotkeyRecorderOptions, "target"> {}

export interface UseHotkeyRecorderReturn {
  cancel: () => void;
  clear: () => void;
  start: () => void;
  state: Accessor<HotkeyRecorderState>;
  stop: () => void;
}

export const useHotkeyRecorder = (
  props: MaybeAccessor<UseHotkeyRecorderProps> = {}
): UseHotkeyRecorderReturn => {
  const { getRootNode } = useEnvironment();
  const recorder = createHotkeyRecorder();

  onMount(() => {
    const options = runIfFn(props);

    recorder.init(getRootNode() as Document);
    recorder.setOptions({
      onCancel: () => runIfFn(props).onCancel?.(),
      onClear: () => runIfFn(props).onClear?.(),
      onRecord: (hotkey) => runIfFn(props).onRecord?.(hotkey),
      ...(options.formatOptions && { formatOptions: options.formatOptions }),
      ...(options.sequenceTimeoutMs !== undefined && {
        sequenceTimeoutMs: options.sequenceTimeoutMs,
      }),
    });

    onCleanup(() => recorder.destroy());
  });

  const state = useSyncExternalStore(
    (listener) => recorder.subscribe(listener),
    () => recorder.getState()
  );

  return {
    cancel: () => void recorder.cancel(),
    clear: () => void recorder.clear(),
    start: () => void recorder.start(),
    state,
    stop: () => void recorder.stop(),
  };
};
