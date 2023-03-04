import userEvent from "@testing-library/user-event";
import { render, screen } from "tests";

import { useDebounce } from "./useDebounce";

describe("useDebounce test", () => {
  it("fires callback function after specified timeout", async () => {
    const callbackFn = jest.fn();
    const TIMEOUT = 500;
    jest.useFakeTimers();

    const CustomComponent = () => {
      const [debouncedCallback] = useDebounce(callbackFn, TIMEOUT);

      return (
        <div>
          <button type="button" onClick={debouncedCallback}>
            Click me
          </button>
        </div>
      );
    };

    render(<CustomComponent />);

    userEvent.click(screen.getByText("Click me"));
    expect(callbackFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(TIMEOUT);

    expect(callbackFn).toHaveBeenCalled();
  });
});
