import React, { useState, useRef, KeyboardEvent } from "react";
import { act } from "react-test-renderer";
import { render, screen, fireEvent, renderHook } from "tests";

import { useFocusableList } from "./useFocusableList";

const onChange = jest.fn();

const options = ["First", "Second", "Third"];

const DummyFocusableListComponent = () => {
  const [isListboxOpened, setListboxOpened] = useState(true);
  const listboxRef = useRef<HTMLUListElement>(null);

  const [focusedOption, handleInputKeyDown, setFocusedOption] = useFocusableList(listboxRef, {
    isListOpened: isListboxOpened,
    optionsLength: options.length,
    onSelect: (index: number) => {
      onChange(index);
      setListboxOpened(false);
    },
    onClose: () => setListboxOpened(false),
    onOpen: () => setListboxOpened(true),
  });

  return (
    <div>
      <button type="button" onClick={() => setFocusedOption(null)}>
        reset-focus
      </button>
      <button type="button" onClick={() => setListboxOpened(true)} onKeyDown={handleInputKeyDown}>
        open-list
      </button>
      {isListboxOpened && (
        <ul ref={listboxRef} role="listbox" tabIndex={0}>
          {options.map((option, index) => (
            <li
              key={option}
              data-option-index={index}
              data-focus={focusedOption === index}
              role="option"
              aria-selected={false}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

describe("useFocusableList", () => {
  it("allows to navigate with keyboard", async () => {
    render(<DummyFocusableListComponent />);
    const openButton = screen.getByText("open-list");
    fireEvent.click(openButton);

    // Allows to navigate with keyboard
    // Arrow down moves focus to first option and enter allows to select item
    fireEvent.keyDown(openButton, { key: "ArrowDown", code: "ArrowDown" });
    fireEvent.keyDown(openButton, { key: "Enter", code: "Enter" });
    expect(onChange).toHaveBeenCalledWith(0);

    // Allows to navigate with keyboards ArrowUp and ArrowDown (infinite) and scroll results to show focused item
    fireEvent.click(openButton);
    jest.spyOn(screen.getByRole("listbox"), "scrollHeight", "get").mockImplementation(() => 100);
    jest.spyOn(screen.getByRole("listbox"), "clientHeight", "get").mockImplementation(() => 50);
    jest.spyOn(screen.getByRole("listbox"), "scrollTop", "get").mockImplementation(() => 200);
    jest.spyOn(screen.getAllByRole("option")[0], "offsetTop", "get").mockImplementation(() => 0);
    jest.spyOn(screen.getAllByRole("option")[0], "offsetHeight", "get").mockImplementation(() => 50);

    fireEvent.keyDown(openButton, { key: "ArrowDown", code: "ArrowDown" });
    fireEvent.keyDown(openButton, { key: "ArrowDown", code: "ArrowDown" });
    fireEvent.keyDown(openButton, { key: "ArrowDown", code: "ArrowDown" });
    fireEvent.keyDown(openButton, { key: "ArrowDown", code: "ArrowDown" });
    fireEvent.keyDown(openButton, { key: "ArrowUp", code: "ArrowUp" });
    fireEvent.keyDown(openButton, { key: "ArrowUp", code: "ArrowUp" });
    fireEvent.keyDown(openButton, { key: "ArrowUp", code: "ArrowUp" });
    fireEvent.keyDown(openButton, { key: "ArrowUp", code: "ArrowUp" });
    fireEvent.keyDown(openButton, { key: "Enter", code: "Enter" });
    expect(onChange).toHaveBeenLastCalledWith(2);
  });

  it("fires onOpen when user press Enter, ArrowUp or ArrowDown", async () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    const onOpen = jest.fn();

    const { result } = renderHook(() =>
      useFocusableList(
        { current: null },
        {
          isListOpened: false,
          optionsLength: 10,
          onSelect,
          onClose,
          onOpen,
        },
      ),
    );

    const [focusIndex, handleInputKeyDown] = result.current;

    expect(focusIndex).toEqual(null);
    handleInputKeyDown({ key: "Enter" } as KeyboardEvent);
    handleInputKeyDown({ key: "ArrowUp" } as KeyboardEvent);
    handleInputKeyDown({ key: "ArrowDown" } as KeyboardEvent);

    expect(onOpen).toHaveBeenCalledTimes(3);
  });

  it("fires onClose when user press Esc or Tab", async () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    const onOpen = jest.fn();

    const { result } = renderHook(() =>
      useFocusableList(
        { current: null },
        {
          isListOpened: false,
          optionsLength: 10,
          onSelect,
          onClose,
          onOpen,
        },
      ),
    );

    const [, handleInputKeyDown] = result.current;

    handleInputKeyDown({ key: "Escape" } as KeyboardEvent);
    handleInputKeyDown({ key: "Tab" } as KeyboardEvent);

    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("fires onSelect when user press Enter", async () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    const onOpen = jest.fn();

    const { result, rerender } = renderHook(() =>
      useFocusableList(
        { current: null },
        {
          isListOpened: true,
          optionsLength: 10,
          onSelect,
          onClose,
          onOpen,
        },
      ),
    );

    const [focusIndex, handleInputKeyDown] = result.current;

    expect(focusIndex).toEqual(null);

    act(() => {
      handleInputKeyDown({ key: "ArrowDown", preventDefault: jest.fn } as unknown as KeyboardEvent);
    });

    rerender();

    act(() => {
      const [, handleInputKeyDownCurrent] = result.current;

      handleInputKeyDownCurrent({ key: "Enter", preventDefault: jest.fn } as unknown as KeyboardEvent);
    });

    expect(onSelect).toHaveBeenCalledWith(0);
  });

  it("allows to search by typing when options are provided", async () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    const onOpen = jest.fn();

    const { result, rerender } = renderHook(() =>
      useFocusableList(
        { current: null },
        {
          isListOpened: true,
          optionsLength: 10,
          options: ["first", "second"],
          onSelect,
          onClose,
          onOpen,
        },
      ),
    );

    const [focusIndex, handleInputKeyDown] = result.current;

    expect(focusIndex).toEqual(null);

    act(() => {
      handleInputKeyDown({ key: "S", preventDefault: jest.fn } as unknown as KeyboardEvent);
      handleInputKeyDown({ key: "e", preventDefault: jest.fn } as unknown as KeyboardEvent);
    });

    rerender();

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [focusIndexCurrent, handleInputKeyDownCurrent] = result.current;

      handleInputKeyDownCurrent({ key: "Enter", preventDefault: jest.fn } as unknown as KeyboardEvent);
    });

    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
