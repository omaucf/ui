import { render, screen, waitFor } from "@solidjs/testing-library";
import user from "@testing-library/user-event";

import { createSignal, For, Show } from "solid-js";

import { createHotkeyStore } from "@zag-js/hotkeys";

import { useFormatHotkey } from "./use-format-hotkey.js";
import { useHotkey } from "./use-hotkey.js";
import { useHotkeyRegistrations } from "./use-hotkey-registrations.js";
import { useHotkeyStore } from "./use-hotkey-store.js";
import { useHotkeys } from "./use-hotkeys.js";
import { useIsKeyPressed } from "./use-is-key-pressed.js";
import { usePlatform } from "./use-platform.js";
import { usePressedKeys } from "./use-pressed-keys.js";

describe("useHotkey", () => {
  it("should invoke the action when the hotkey is pressed", async () => {
    const onAction = vi.fn();
    const Comp = () => {
      useHotkey({ action: onAction, hotkey: "ctrl+k" });
      return <div>ready</div>;
    };

    render(() => <Comp />);
    await user.keyboard("{Control>}k{/Control}");

    await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1));
  });

  it("should not invoke the action after unmount", async () => {
    const onAction = vi.fn();
    const Comp = () => {
      useHotkey({ action: onAction, hotkey: "ctrl+k" });
      return <div>ready</div>;
    };

    const { unmount } = render(() => <Comp />);
    unmount();

    await user.keyboard("{Control>}k{/Control}");

    expect(onAction).not.toHaveBeenCalled();
  });

  it("should read the latest reactive value in the action", async () => {
    const calls: number[] = [];
    const [value, setValue] = createSignal(1);

    const Comp = () => {
      useHotkey({ action: () => calls.push(value()), hotkey: "ctrl+k" });
      return <div>{value()}</div>;
    };

    render(() => <Comp />);
    setValue(2);

    await user.keyboard("{Control>}k{/Control}");

    await waitFor(() => expect(calls).toEqual([2]));
  });

  it("should respect a reactive enabled option", async () => {
    const onAction = vi.fn();
    const [enabled, setEnabled] = createSignal(false);

    const Comp = () => {
      useHotkey(() => ({
        action: onAction,
        enabled: enabled(),
        hotkey: "ctrl+k",
      }));
      return <div>ready</div>;
    };

    render(() => <Comp />);

    await user.keyboard("{Control>}k{/Control}");
    expect(onAction).not.toHaveBeenCalled();

    setEnabled(true);

    await user.keyboard("{Control>}k{/Control}");
    await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1));
  });
});

describe("useHotkeys", () => {
  it("should register multiple hotkeys", async () => {
    const onSave = vi.fn();
    const onUndo = vi.fn();

    const Comp = () => {
      useHotkeys({
        commands: [
          { action: onSave, hotkey: "ctrl+s", id: "save" },
          { action: onUndo, hotkey: "ctrl+z", id: "undo" },
        ],
      });

      return <div>ready</div>;
    };

    render(() => <Comp />);

    await user.keyboard("{Control>}s{/Control}");
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));

    await user.keyboard("{Control>}z{/Control}");
    await waitFor(() => expect(onUndo).toHaveBeenCalledTimes(1));
  });

  it("should react to an accessor of commands", async () => {
    const [extra, setExtra] = createSignal(false);

    const Comp = () => {
      useHotkeys(() => ({
        commands: [
          { action: vi.fn(), hotkey: "ctrl+s", id: "save" },
          ...(extra()
            ? [{ action: vi.fn(), hotkey: "ctrl+z", id: "undo" }]
            : []),
        ],
      }));

      const commands = useHotkeyRegistrations();

      return <span data-testid="count">{commands().length}</span>;
    };

    render(() => <Comp />);

    await waitFor(() =>
      expect(screen.getByTestId("count").textContent).toBe("1")
    );
    setExtra(true);

    await waitFor(() =>
      expect(screen.getByTestId("count").textContent).toBe("2")
    );

    setExtra(false);
    await waitFor(() =>
      expect(screen.getByTestId("count").textContent).toBe("1")
    );
  });
});

describe("useHotkeyRegistrations", () => {
  it("should expose registered commands with their metadata", async () => {
    const Comp = () => {
      useHotkeys({
        commands: [
          {
            action: vi.fn(),
            category: "File",
            hotkey: "ctrl+s",
            id: "save",
            label: "Save file",
          },
          {
            action: vi.fn(),
            category: "Edit",
            hotkey: "ctrl+z",
            id: "undo",
            label: "Undo",
          },
        ],
      });

      const commands = useHotkeyRegistrations();

      return (
        <ul>
          <For each={commands()}>
            {(command) => (
              <li>{`${command.label} — ${command.hotkey} (${command.category})`}</li>
            )}
          </For>
        </ul>
      );
    };

    render(() => <Comp />);

    expect(await screen.findByText("Save file — ctrl+s (File)")).toBeTruthy();
    expect(await screen.findByText("Undo — ctrl+z (Edit)")).toBeTruthy();
  });

  it("should update when a command unregisters", async () => {
    const [show, setShow] = createSignal(true);

    const Child = () => {
      useHotkey({ action: vi.fn(), hotkey: "ctrl+s", label: "Save file" });
      return null;
    };

    const Comp = () => {
      const commands = useHotkeyRegistrations();

      return (
        <div>
          <Show when={show()}>
            <Child />
          </Show>
          <span data-testid="count">{commands().length}</span>
        </div>
      );
    };

    render(() => <Comp />);

    await waitFor(() =>
      expect(screen.getByTestId("count").textContent).toBe("1")
    );

    setShow(false);

    await waitFor(() =>
      expect(screen.getByTestId("count").textContent).toBe("0")
    );
  });
});

describe("key state", () => {
  it("should track whether a key is pressed", async () => {
    const Comp = () => {
      useHotkey({ action: vi.fn(), hotkey: "ctrl+k" });
      const shift = useIsKeyPressed({ hotkey: "shift" });

      return <span data-testid="shift">{String(shift())}</span>;
    };

    render(() => <Comp />);

    expect(screen.getByTestId("shift").textContent).toBe("false");

    const session = user.setup();

    await session.keyboard("{Shift>}");
    await waitFor(() =>
      expect(screen.getByTestId("shift").textContent).toBe("true")
    );

    await session.keyboard("{/Shift}");
    await waitFor(() =>
      expect(screen.getByTestId("shift").textContent).toBe("false")
    );
  });

  it("should expose currently pressed keys", async () => {
    const Comp = () => {
      useHotkey({ action: vi.fn(), hotkey: "ctrl+k" });
      const keys = usePressedKeys();

      return <span data-testid="keys">{keys().join("+") || "none"}</span>;
    };

    render(() => <Comp />);

    expect(screen.getByTestId("keys").textContent).toBe("none");

    const session = user.setup();

    await session.keyboard("{Shift>}");
    await waitFor(() =>
      expect(screen.getByTestId("keys").textContent).toBe("Shift")
    );

    await session.keyboard("{/Shift}");
    await waitFor(() =>
      expect(screen.getByTestId("keys").textContent).toBe("none")
    );
  });
});

describe("scopes", () => {
  it("should only fire commands within an active scope", async () => {
    const onEditor = vi.fn();
    const onGlobal = vi.fn();

    const store = createHotkeyStore({ activeScopes: ["reader"] });

    const Comp = () => {
      useHotkeys({
        commands: [
          {
            action: onEditor,
            hotkey: "ctrl+b",
            id: "editor",
            scopes: ["editor"],
          },
          { action: onGlobal, hotkey: "ctrl+g", id: "global" },
        ],
        store,
      });

      return <div>ready</div>;
    };

    render(() => <Comp />);

    await user.keyboard("{Control>}b{/Control}");

    expect(onEditor).not.toHaveBeenCalled();

    await user.keyboard("{Control>}g{/Control}");
    await waitFor(() => expect(onGlobal).toHaveBeenCalledTimes(1));
  });
});

describe("platform", () => {
  it("should format hotkeys for the detected platform", async () => {
    const Comp = () => {
      const formatHotkey = useFormatHotkey();
      const platform = usePlatform();

      return (
        <span data-testid="out">{`${platform()}:${formatHotkey("mod+K")}`}</span>
      );
    };

    render(() => <Comp />);

    await waitFor(() => {
      const text = screen.getByTestId("out").textContent ?? "";
      const [platform, formatted] = text.split(":");

      // biome-ignore lint/performance/useTopLevelRegex: safe_to_set
      expect(platform).toMatch(/^(mac|windows|linux)$/);
      expect(formatted).toContain("K");
    });
  });
});

describe("registration reconciliation", () => {
  it("should not re-register commands that did not change", async () => {
    const [label, setLabel] = createSignal("Undo");

    let store!: ReturnType<typeof useHotkeyStore>;

    const Comp = () => {
      store = useHotkeyStore();

      useHotkeys(() => ({
        commands: [
          { action: vi.fn(), hotkey: "ctrl+s", id: "save", label: "Save" },
          { action: vi.fn(), hotkey: "ctrl+z", id: "undo", label: label() },
        ],
      }));

      const commands = useHotkeyRegistrations();
      return <span data-testid="count">{commands().length}</span>;
    };

    render(() => <Comp />);

    await waitFor(() =>
      expect(screen.getByTestId("count").textContent).toBe("2")
    );

    const order = (id: string) =>
      store.getState().commands.get(id)?._registrationOrder;

    const beforeSave = order("save");
    const beforeUndo = order("undo");

    setLabel("Undo edit");

    await waitFor(() =>
      expect(store.getState().commands.get("undo")?.label).toBe("Undo edit")
    );

    expect(order("save")).toBe(beforeSave);
    expect(order("undo")).not.toBe(beforeUndo);
  });

  it("should treat equivalent hotkey spellings as unchanged", async () => {
    const [hotkey, setHotkey] = createSignal("ctrl+k");

    let store!: ReturnType<typeof useHotkeyStore>;

    const Comp = () => {
      store = useHotkeyStore();

      useHotkeys(() => ({
        commands: [{ action: vi.fn(), hotkey: hotkey(), id: "save" }],
      }));

      return <span data-testid="hotkey">{hotkey()}</span>;
    };

    render(() => <Comp />);

    await waitFor(() =>
      expect(screen.getByTestId("hotkey").textContent).toBe("ctrl+k")
    );

    const before = store.getState().commands.get("save")?._registrationOrder;

    setHotkey("Control+K");

    await waitFor(() =>
      expect(screen.getByTestId("hotkey").textContent).toBe("Control+K")
    );
    expect(store.getState().commands.get("save")?._registrationOrder).toBe(
      before
    );
  });
});
