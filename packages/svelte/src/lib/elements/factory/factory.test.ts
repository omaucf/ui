import { render, screen } from "@testing-library/svelte";
import user from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import ComponentUnderTest from "./examples/base.svelte";

describe("Factory", () => {
  it("should render only the child element", () => {
    render(ComponentUnderTest);

    expect(screen.queryByTestId("parent")).toBeNull();
    const child = screen.getByTestId("child");

    expect(child).not.toBeNull();
    expect(child.textContent).toBe("Child");
  });

  it("keeps the child's props", () => {
    render(ComponentUnderTest);

    const child = screen.getByTestId("child");

    expect(child.id).toBe("child");
    expect(child.getAttribute("data-slot")).toBe("child");
  });

  it("merges inline styles", () => {
    render(ComponentUnderTest);

    const child = screen.getByTestId("child") as HTMLElement;

    expect(child.style.background).toBe("red");
    expect(child.style.color).toBe("blue");
  });

  it("renders the text", () => {
    render(ComponentUnderTest);

    expect(screen.getByText("Child").textContent).toBe("Child");
  });

  it("merges click handlers", async () => {
    const onClickParent = vi.fn();
    const onClickChild = vi.fn();
    render(ComponentUnderTest, { onClickChild, onClickParent });
    await user.click(screen.getByTestId("child"));

    expect(onClickParent).toHaveBeenCalled();
    expect(onClickChild).toHaveBeenCalled();
  });
});
