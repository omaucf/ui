import { render, screen, waitFor } from "@testing-library/svelte";
import user from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import BasicExample from "./examples/basic.svelte";
import ConflictsExample from "./examples/conflicts.svelte";
import FormFieldsExample from "./examples/form-fields.svelte";
import KeyStateExample from "./examples/key-state.svelte";
import MultipleExample from "./examples/multiple.svelte";
import RecorderExample from "./examples/recorder.svelte";
import ScopesExample from "./examples/scopes.svelte";
import SequenceExample from "./examples/sequence.svelte";

describe("useHotkey", () => {
  it("should invoke the action when the hotkey is pressed", async () => {
    const session = user.setup();

    render(BasicExample);

    await session.keyboard("{Meta>}k{/Meta}");
    await session.keyboard("{Control>}k{/Control}");

    // biome-ignore lint/performance/useTopLevelRegex: safe to set
    await waitFor(() => expect(screen.getByText(/^[12]$/)).toBeTruthy());
  });

  it("should stop firing after unmount", async () => {
    const session = user.setup();
    const { unmount } = render(BasicExample);

    unmount();

    await session.keyboard("{Meta>}k{/Meta}");

    expect(screen.queryByText("1")).toBeNull();
  });
});

describe("useHotkeys", () => {
  it("should register multiple hotkeys", async () => {
    const session = user.setup();

    render(MultipleExample);

    await session.keyboard("{Control>}z{/Control}");
    await session.keyboard("{Meta>}z{/Meta}");

    await screen.findByText("Undo");
  });

  it("should support sequences", async () => {
    const session = user.setup();

    render(SequenceExample);

    await session.keyboard("g");
    await session.keyboard("s");

    await screen.findByText("Settings");
  });
});

describe("key state", () => {
  it("should track pressed keys and modifiers", async () => {
    const session = user.setup();

    render(KeyStateExample);

    expect(screen.getByText("nothing")).toBeTruthy();

    await session.keyboard("{Shift>}");
    await screen.findByText("Precision mode");
    await session.keyboard("{/Shift}");

    await waitFor(() => {
      expect(screen.getByText("nothing")).toBeTruthy();
    });
  });
});

describe("scopes", () => {
  it("should only fire commands within the active scope", async () => {
    const session = user.setup();

    render(ScopesExample);

    await session.keyboard("{Meta>}p{/Meta}");
    await session.keyboard("{Control>}p{/Control}");

    expect(document.querySelector("li[data-fired]")).toBeNull();

    await session.keyboard("{Meta>}b{/Meta}");
    await session.keyboard("{Control>}b{/Control}");

    await screen.findByText("Bold");
  });
});

describe("enableOnFormTags", () => {
  it("should ignore a single key while typing but still fire modifiers and opt-ins", async () => {
    const session = user.setup();

    render(FormFieldsExample);

    const input = screen.getByLabelText("Note");

    await session.click(input);
    await session.keyboard("s");

    expect(input).toHaveProperty("value", "s");
    expect(screen.getByText("nothing yet")).toBeTruthy();

    await session.keyboard("{Control>}s{/Control}");
    await screen.findByText("Save (modifier)");
    await session.keyboard("p");
    await screen.findByText("Preview (opted in)");
  });
});

describe("conflictBehavior", () => {
  it("should keep both registrations by default", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    try {
      render(ConflictsExample);

      await screen.findByText("First");
      expect(screen.getByText("Second")).toBeTruthy();
    } finally {
      warn.mockRestore();
    }
  });
});

describe("recorder", () => {
  it("should record, clear and cancel", async () => {
    const session = user.setup();

    render(RecorderExample);

    await session.click(screen.getByRole("button"));
    await session.keyboard("{Control>}k{/Control}");

    await screen.findByText("recorded");

    await session.click(screen.getByRole("button"));
    await session.keyboard("{Backspace}");

    await screen.findByText("cleared");

    await session.click(screen.getByRole("button"));
    await session.keyboard("{Escape}");

    await screen.findByText("cancelled");
  });
});
