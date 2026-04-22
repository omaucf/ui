import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";

import { createHotkeyStore, type HotkeyStore } from "@zag-js/hotkeys";

import { useHotkey } from "./use-hotkey.js";
import { useHotkeyRecorder } from "./use-hotkey-recorder.js";
import { useHotkeyRegistrations } from "./use-hotkey-registrations.js";
import { useHotkeys } from "./use-hotkeys.js";

describe("enableOnFormTags", () => {
  const Form = ({
    onPlain,
    onModifier,
    onOptIn,
  }: Record<string, () => void>) => {
    useHotkeys({
      commands: [
        { action: onPlain, hotkey: "s", id: "plain" },
        { action: onModifier, hotkey: "ctrl+s", id: "modifier" },
        {
          action: onOptIn,
          hotkey: "p",
          id: "optin",
          options: { enableOnFormTags: true },
        },
      ],
    });
    return <input aria-label="note" />;
  };

  it("should ignore a single-key hotkey while typing in an input", async () => {
    const onPlain = vi.fn();

    render(<Form onModifier={vi.fn()} onOptIn={vi.fn()} onPlain={onPlain} />);

    await user.click(screen.getByLabelText("note"));
    await user.keyboard("s");

    expect((screen.getByLabelText("note") as HTMLInputElement).value).toBe("s");
    expect(onPlain).not.toHaveBeenCalled();
  });

  it("should still fire a modifier hotkey while typing in an input", async () => {
    const onModifier = vi.fn();

    render(
      <Form onModifier={onModifier} onOptIn={vi.fn()} onPlain={vi.fn()} />
    );

    await user.click(screen.getByLabelText("note"));
    await user.keyboard("{Control>}s{/Control}");

    await waitFor(() => expect(onModifier).toHaveBeenCalledTimes(1));
  });

  it("should fire a single-key hotkey in an input when opted in", async () => {
    const onOptIn = vi.fn();

    render(<Form onModifier={vi.fn()} onOptIn={onOptIn} onPlain={vi.fn()} />);

    await user.click(screen.getByLabelText("note"));
    await user.keyboard("p");

    await waitFor(() => expect(onOptIn).toHaveBeenCalledTimes(1));
  });

  it("should fire a single-key hotkey oujside a form field", async () => {
    const onPlain = vi.fn();

    render(<Form onModifier={vi.fn()} onOptIn={vi.fn()} onPlain={onPlain} />);

    await user.keyboard("s");

    await waitFor(() => expect(onPlain).toHaveBeenCalledTimes(1));
  });
});

describe("sequenceTimeoutMs", () => {
  const Comp = ({
    onFire,
    store,
  }: {
    onFire: () => void;
    store: HotkeyStore;
  }) => {
    useHotkey({ action: onFire, hotkey: "G > H", store });
    return <div>ready</div>;
  };

  it("should fire when the steps land inside the window", async () => {
    const onFire = vi.fn();

    render(
      <Comp
        onFire={onFire}
        store={createHotkeyStore({ sequenceTimeoutMs: 300 })}
      />
    );

    await user.keyboard("g");
    await user.keyboard("h");

    await waitFor(() => expect(onFire).toHaveBeenCalledTimes(1));
  });

  it("should not fire when the second step arrives after the window", async () => {
    const onFire = vi.fn();

    render(
      <Comp
        onFire={onFire}
        store={createHotkeyStore({ sequenceTimeoutMs: 120 })}
      />
    );

    await user.keyboard("g");
    await new Promise((resolve) => setTimeout(resolve, 300));
    await user.keyboard("h");

    expect(onFire).not.toHaveBeenCalled();
  });
});

describe("conflictBehavior", () => {
  const Two = ({ store }: { store: HotkeyStore }) => {
    useHotkeys({
      commands: [
        { action: vi.fn(), hotkey: "ctrl+k", id: "first", label: "First" },
        { action: vi.fn(), hotkey: "ctrl+k", id: "second", label: "Second" },
      ],
      store,
    });
    const commands = useHotkeyRegistrations({ store });
    return (
      <span data-testid="ids">
        {commands.map((command) => command.id).join(",") || "none"}
      </span>
    );
  };

  it("should keep both registrations when allowed", async () => {
    render(<Two store={createHotkeyStore({ conflictBehavior: "allow" })} />);

    await waitFor(() =>
      expect(screen.getByTestId("ids").textContent).toBe("first,second")
    );
  });

  it("should drop the earlier registration when replacing", async () => {
    render(<Two store={createHotkeyStore({ conflictBehavior: "replace" })} />);

    await waitFor(() =>
      expect(screen.getByTestId("ids").textContent).toBe("second")
    );
    expect(screen.getByTestId("ids").textContent).not.toBe("first");
  });

  it("should warn but keep both by default", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(<Two store={createHotkeyStore()} />);

    await waitFor(() =>
      expect(screen.getByTestId("ids").textContent).toBe("first,second")
    );
    expect(warn).toHaveBeenCalled();

    warn.mockRestore();
  });
});

describe("recorder cancel and clear", () => {
  const Comp = ({
    onCancel,
    onClear,
  }: {
    onCancel?: () => void;
    onClear?: () => void;
  }) => {
    const recorder = useHotkeyRecorder({ onCancel, onClear });
    return (
      <div>
        <button onClick={() => recorder.start()} type="button">
          record
        </button>
        <span data-testid="state">
          {recorder.recording ? "recording" : "idle"}
        </span>
        <span data-testid="value">{recorder.value?.display ?? "empty"}</span>
      </div>
    );
  };

  it("should cancel recording on Escape", async () => {
    const onCancel = vi.fn();
    const session = user.setup();

    render(<Comp onCancel={onCancel} />);

    await session.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(screen.getByTestId("state").textContent).toBe("recording")
    );

    await session.keyboard("{Escape}");

    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));
    expect(screen.getByTestId("state").textContent).toBe("idle");
  });

  it("should clear the recorded value on Backspace", async () => {
    const onClear = vi.fn();
    const session = user.setup();

    render(<Comp onClear={onClear} />);

    await session.click(screen.getByRole("button"));
    await session.keyboard("{Control>}k{/Control}");
    await waitFor(() =>
      expect(screen.getByTestId("value").textContent).not.toBe("empty")
    );

    await session.keyboard("{Backspace}");

    await waitFor(() => expect(onClear).toHaveBeenCalledTimes(1));
    expect(screen.getByTestId("value").textContent).toBe("empty");
  });
});
