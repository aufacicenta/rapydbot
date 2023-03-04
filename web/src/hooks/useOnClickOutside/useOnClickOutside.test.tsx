import React, { useRef } from "react";
import { act, fireEvent, render } from "tests";

import { useOnClickOutside } from "./useOnClickOutside";

describe("useOnClickOutside test", () => {
  it("fires function on click outside ref element", async () => {
    const onClickOutsideFunction = jest.fn();

    const CustomComponent = () => {
      const ref = useRef(null);

      useOnClickOutside(ref, () => {
        onClickOutsideFunction();
      });

      return (
        <div>
          <div>Outside</div>
          <div ref={ref}>Inside</div>
        </div>
      );
    };

    const { getByText, findByText } = render(<CustomComponent />);

    await findByText("Inside");

    act(() => {
      fireEvent.mouseDown(getByText("Inside"));
    });

    expect(onClickOutsideFunction).not.toHaveBeenCalled();

    act(() => {
      fireEvent.mouseDown(getByText("Outside"));
    });

    expect(onClickOutsideFunction).toHaveBeenCalled();
  });
});
