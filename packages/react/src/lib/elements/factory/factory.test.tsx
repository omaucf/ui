import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Factory from "./factory.js";

const ComponentUnderTest = () => (
  <Factory.div
    asChild
    className="parent"
    data-slot="parent"
    data-testid="parent"
    id="parent"
    style={{ background: "red" }}
  >
    <Factory.span
      className="child"
      data-slot="child"
      data-testid="child"
      id="child"
      style={{ color: "blue" }}
    >
      Child
    </Factory.span>
  </Factory.div>
);

describe("Factory", () => {
  it("renders only the child element", () => {
    render(<ComponentUnderTest />);

    expect(screen.queryByTestId("parent")).toBeNull();
    const child = screen.getByTestId("child");

    expect(child).not.toBeNull();
    expect(child.textContent).toBe("Child");
  });

  it("keeps the child's props", () => {
    render(<ComponentUnderTest />);

    const child = screen.getByTestId("child");

    expect(child.id).toBe("child");
    expect(child.getAttribute("data-slot")).toBe("child");
  });

  it("merges inline styles", () => {
    render(<ComponentUnderTest />);

    const child = screen.getByTestId("child") as HTMLElement;

    expect(child.style.background).toBe("red");
    expect(child.style.color).toBe("blue");
  });

  it("renders the text", () => {
    render(<ComponentUnderTest />);

    expect(screen.getByText("Child").textContent).toBe("Child");
  });

  it("merges click handlers", async () => {
    const parentClick = vi.fn();
    const childClick = vi.fn();

    const AsChildTest = () => (
      <Factory.div asChild onClick={parentClick}>
        <Factory.span data-testid="child" onClick={childClick} />
      </Factory.div>
    );

    render(<AsChildTest />);

    await user.click(screen.getByTestId("child"));
    expect(parentClick).toHaveBeenCalledTimes(1);
    expect(childClick).toHaveBeenCalledTimes(1);
  });

  it("propagates asChild", () => {
    const AsChildTest = () => (
      <Factory.div asChild data-testid="parent">
        <Factory.span asChild>
          <Factory.span>Child</Factory.span>
        </Factory.span>
      </Factory.div>
    );

    render(<AsChildTest />);

    const element = screen.getByText("Child");
    expect(element.getAttribute("data-testid")).toBe("parent");
  });

  it("stops asChild propagation", () => {
    const AsChildTest = () => (
      <Factory.div asChild data-testid="parent">
        <Factory.span asChild={false}>
          <Factory.span>Child</Factory.span>
        </Factory.span>
      </Factory.div>
    );

    render(<AsChildTest />);

    const element = screen.getByText("Child");
    expect(element.hasAttribute("data-testid")).toBe(false);
  });
});
