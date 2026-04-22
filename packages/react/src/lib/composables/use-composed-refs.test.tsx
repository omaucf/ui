import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { useRef, useState } from "react";

import { useComposedRefs } from "./use-composed-refs.js";

describe("useComposedRefs", () => {
  it("should keep stable refs attached across re-renders", async () => {
    const callbackRef = vi.fn();

    const ComponentUnderTest = () => {
      const [, setCount] = useState(0);
      const objectRef = useRef<HTMLDivElement | null>(null);
      const composedRefs = useComposedRefs(callbackRef, objectRef);

      return (
        <>
          <div data-testid="node" ref={composedRefs} />
          <button onClick={() => setCount((count) => count + 1)} type="button">
            re-render
          </button>
        </>
      );
    };

    render(<ComponentUnderTest />);
    expect(callbackRef).toHaveBeenCalledWith(screen.getByTestId("node"));

    const callsAfterMount = callbackRef.mock.calls.length;
    // biome-ignore lint/performance/useTopLevelRegex: safe_to_set
    await user.click(screen.getByRole("button", { name: /re-render/i }));

    expect(callbackRef).toHaveBeenCalledTimes(callsAfterMount);
  });

  it("should reattach refs when a constituent callback ref changes", () => {
    const firstRef = vi.fn();
    const secondRef = vi.fn();

    const ComponentUnderTest = (props: {
      callbackRef: (node: HTMLDivElement | null) => void;
    }) => {
      const composedRefs = useComposedRefs(props.callbackRef);
      return <div data-testid="node" ref={composedRefs} />;
    };

    const { rerender } = render(<ComponentUnderTest callbackRef={firstRef} />);
    const node = screen.getByTestId("node");

    rerender(<ComponentUnderTest callbackRef={secondRef} />);

    expect(firstRef).toHaveBeenCalledWith(node);
    expect(firstRef).toHaveBeenCalledWith(null);
    expect(secondRef).toHaveBeenCalledWith(node);
  });
});
