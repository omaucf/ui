/** biome-ignore-all lint/complexity/noVoid: safe_to_Set */
"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import {
  useEnvironment,
  useEvent,
  useSafeLayoutEffect,
} from "#build/ui/imports";

import {
  createHotkeyRecorder,
  type HotkeyRecorderOptions,
  type RecordedHotkey,
} from "@zag-js/hotkeys";

export interface UseHotkeyRecorderProps
  extends Omit<HotkeyRecorderOptions, "target"> {}

export interface UseHotkeyRecorderReturn {
  cancel: () => void;
  clear: () => void;
  recording: boolean;
  start: () => void;
  stop: () => void;
  value: RecordedHotkey | null;
}

export const useHotkeyRecorder = (
  props: UseHotkeyRecorderProps = {}
): UseHotkeyRecorderReturn => {
  const { formatOptions, sequenceTimeoutMs } = props;

  const { getRootNode } = useEnvironment();
  const [recorder] = useState(() => createHotkeyRecorder());

  const onRecord = useEvent(props.onRecord);
  const onCancel = useEvent(props.onCancel);
  const onClear = useEvent(props.onClear);

  useSafeLayoutEffect(() => {
    recorder.init(getRootNode() as Document);
    recorder.setOptions({ onCancel, onClear, onRecord });
    return () => {
      recorder.destroy();
    };
  }, [recorder, getRootNode, onRecord, onCancel, onClear]);

  const formatRef = useRef(formatOptions);
  formatRef.current = formatOptions;

  const formatKey = formatOptions ? JSON.stringify(formatOptions) : "";

  useSafeLayoutEffect(() => {
    recorder.setOptions({
      ...(formatRef.current && { formatOptions: formatRef.current }),
      ...(sequenceTimeoutMs !== undefined && { sequenceTimeoutMs }),
    });
  }, [recorder, formatKey, sequenceTimeoutMs]);

  const subscribe = useCallback(
    (onChange: () => void) => recorder.subscribe(onChange),
    [recorder]
  );
  const getSnapshot = useCallback(() => recorder.getState(), [recorder]);

  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return useMemo(
    () => ({
      cancel: () => void recorder.cancel(),
      clear: () => void recorder.clear(),
      recording: state.recording,
      start: () => void recorder.start(),
      stop: () => void recorder.stop(),
      value: state.value,
    }),
    [state, recorder]
  );
};
