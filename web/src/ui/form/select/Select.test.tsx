import { screen, render, fireEvent, act } from "tests";
import { NotesIcon } from "ui/shared/icons/NotesIcon";

import { Select } from "./Select";

const selectInputProps = {
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onFocus: jest.fn(),
  value: "Test value",
};

const options = [
  <Select.Item key="1" value="1">
    Porsche
  </Select.Item>,
  <Select.Item key="2" value="2" icon={<NotesIcon />}>
    Mercedes
  </Select.Item>,
  <Select.Item key="3" value="3">
    Ford
  </Select.Item>,
];

describe("Select", () => {
  it("renders list of options on click or press arrowDown/arrowUp/Enter", async () => {
    jest.useFakeTimers();
    const onClear = jest.fn();

    render(
      <Select onClear={onClear} name="name" label="Name" placeholder="Select model" inputProps={selectInputProps}>
        {options}
      </Select>,
    );

    const selectButton = screen.getByText("Select model") as HTMLInputElement;

    // Show list on click
    expect(screen.queryAllByRole("option").length).toEqual(0);

    act(() => {
      fireEvent.click(selectButton);
      jest.runAllTimers();
    });

    expect(screen.queryAllByRole("option").length).toEqual(3);

    // Allows to select value and hides list on select
    act(() => {
      fireEvent.click(screen.getAllByRole("option")[0]);
      jest.runAllTimers();
    });

    expect(selectInputProps.onChange).toHaveBeenCalledWith("1");
    expect(screen.queryAllByRole("option").length).toEqual(0);

    // Allows to clear
    await act(async () => {
      await fireEvent.click(screen.getByTestId("clear-select"));
    });

    expect(onClear).toHaveBeenCalled();
  });

  it("renders input with error message", () => {
    render(
      <Select
        name="name"
        hasError
        hintMessage="Error message"
        label="Name"
        placeholder="Select model"
        inputProps={selectInputProps}
      >
        {options}
      </Select>,
    );

    const errorMessageElement = screen.getByText("Error message") as HTMLInputElement;

    expect(errorMessageElement).toBeInTheDocument();
  });

  it("renders disabled select", () => {
    render(
      <Select name="name" label="Name" placeholder="Select model" inputProps={selectInputProps} disabled>
        {options}
      </Select>,
    );

    const inputElement = screen.getByText("Select model").parentElement as HTMLInputElement;

    expect(inputElement).toHaveClass("select__field--disabled");
  });

  it("renders select with selected value", () => {
    render(
      <Select
        name="name"
        label="Name"
        placeholder="Select model"
        inputProps={{
          ...selectInputProps,
          value: "1",
        }}
      >
        {options}
      </Select>,
    );

    expect(screen.getByText("Porsche")).toBeInTheDocument();
  });
});
