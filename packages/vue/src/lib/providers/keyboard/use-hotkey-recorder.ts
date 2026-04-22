/** biome-ignore-all lint/complexity/noVoid: safe_to_set */
import { type MaybeRef, onMounted, onUnmounted, type Ref, toValue } from "vue";

import { useEnvironment } from "#build/ui/imports";

import {
  createHotkeyRecorder,
  type HotkeyRecorderOptions,
  type HotkeyRecorderState,
} from "@zag-js/hotkeys";
import { useSyncExternalStore } from "@zag-js/vue";

export interface UseHotkeyRecorderProps
  extends Omit<HotkeyRecorderOptions, "target"> {}

export interface UseHotkeyRecorderReturn {
  cancel: () => void;
  clear: () => void;
  start: () => void;
  state: Readonly<Ref<HotkeyRecorderState>>;
  stop: () => void;
}

export const useHotkeyRecorder = (
  props: MaybeRef<UseHotkeyRecorderProps> = {}
): UseHotkeyRecorderReturn => {
  const { getRootNode } = useEnvironment();
  const recorder = createHotkeyRecorder();

  onMounted(() => {
    const options = toValue(props);

    recorder.init(getRootNode() as Document);
    recorder.setOptions({
      onCancel: () => toValue(props).onCancel?.(),
      onClear: () => toValue(props).onClear?.(),
      onRecord: (hotkey) => toValue(props).onRecord?.(hotkey),
      ...(options.formatOptions && { formatOptions: options.formatOptions }),
      ...(options.sequenceTimeoutMs !== undefined && {
        sequenceTimeoutMs: options.sequenceTimeoutMs,
      }),
    });
  });

  onUnmounted(() => {
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
};
