import { render, screen } from "@solidjs/testing-library";
import user from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Factory from "./factory.js";

const ComponentUnderTest = () => (
  <Factory.div
    asChild={(props) => (
      <Factory.span
        {...props({ class: "child", id: "child", style: { color: "blue" } })}
        data-part="child"
        data-testid="child"
      >
        Child
      </Factory.span>
    )}
    class="parent"
    data-part="parent"
    data-testid="parent"
    id="parent"
    style={{ background: "red" }}
  >
    Parent
  </Factory.div>
);

describe("Factory", () => {
  it("renders only the child element", () => {
    render(() => <ComponentUnderTest />);

    expect(screen.queryByTestId("parent")).toBeNull();
    const child = screen.getByTestId("child");

    expect(child).not.toBeNull();
    expect(child.textContent).toBe("Child");
  });

  it("keeps the child's props", () => {
    render(() => <ComponentUnderTest />);

    const child = screen.getByTestId("child");

    expect(child.id).toBe("child");
    expect(child.getAttribute("data-part")).toBe("child");
  });

  it("merges inline styles", () => {
    render(() => <ComponentUnderTest />);

    const child = screen.getByTestId("child") as HTMLElement;

    expect(child.style.background).toBe("red");
    expect(child.style.color).toBe("blue");
  });

  it("renders the text", () => {
    render(() => <ComponentUnderTest />);

    expect(screen.getByText("Child").textContent).toBe("Child");
  });

  it("should merge events", async () => {
    const onClickParent = vi.fn();
    const onClickChild = vi.fn();

    render(() => (
      <Factory.div
        asChild={(props) => (
          <Factory.span
            {...props({ onClick: onClickChild })}
            data-testid="child"
          />
        )}
        data-testid="parent"
        onClick={onClickParent}
      >
        Parent
      </Factory.div>
    ));
    await user.click(screen.getByTestId("child"));

    expect(onClickParent).toHaveBeenCalled();
    expect(onClickChild).toHaveBeenCalled();
  });

  it("should stop propagate asChild", () => {
    render(() => (
      <Factory.div
        asChild={(props) => (
          <Factory.span {...props()}>
            <Factory.span>Child</Factory.span>
          </Factory.span>
        )}
        data-testid="parent"
      >
        Parent
      </Factory.div>
    ));

    const element = screen.getByText("Child");
    expect(element.hasAttribute("data-testid")).toBe(false);
  });
});
