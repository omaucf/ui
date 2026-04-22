/** biome-ignore-all lint/complexity/noVoid: safe_to_set */
import { onDestroy } from "svelte";

import { useEnvironment } from "#build/ui/imports";
import type { MaybeAccessor } from "#build/ui/types";

import {
  createHotkeyRecorder,
  type HotkeyRecorderOptions,
  type HotkeyRecorderState,
} from "@zag-js/hotkeys";
import { useSyncExternalStore } from "@zag-js/svelte";

import { runIfFn } from "$lib/utils/fn";

export interface UseHotkeyRecorderProps
  extends Omit<HotkeyRecorderOptions, "target"> {}

export interface UseHotkeyRecorderReturn {
  cancel: () => void;
  clear: () => void;
  start: () => void;
  state: () => HotkeyRecorderState;
  stop: () => void;
}

export function useHotkeyRecorder(
  props: MaybeAccessor<UseHotkeyRecorderProps> = {}
): UseHotkeyRecorderReturn {
  const { getRootNode } = useEnvironment();
  const recorder = createHotkeyRecorder();

  $effect(() => {
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
  });

  onDestroy(() => {
    recorder.destroy();
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
}
