import { screen, render, fireEvent, act } from "tests";
import { NotesIcon } from "ui/shared/icons/NotesIcon";

import { Dropdown } from "./Dropdown";

jest.mock("hooks/useUniqueId/useUniqueId", () => ({
  useUniqueId: jest.fn().mockImplementation(({ prefix, idFromProps }) => idFromProps || `${prefix}generated-unique-id`),
}));

const options = [
  <Dropdown.Item key="1">Porsche</Dropdown.Item>,
  <Dropdown.Item key="2" icon={<NotesIcon />}>
    Mercedes
  </Dropdown.Item>,
  <Dropdown.Item key="3">Ford</Dropdown.Item>,
];

describe("Dropdown", () => {
  it("renders element with provided id", async () => {
    jest.useFakeTimers();

    render(
      <Dropdown id="provided-id" trigger="Open">
        {options}
      </Dropdown>,
    );

    expect((await screen.findByText("Open")).id).toEqual("provided-id");
  });

  it("renders element with auto-generated id if none provided", async () => {
    jest.useFakeTimers();

    render(<Dropdown trigger="Open">{options}</Dropdown>);

    expect((await screen.findByText("Open")).id).toEqual("dropdown-generated-unique-id");
  });

  it("renders list of options on click", async () => {
    jest.useFakeTimers();

    render(<Dropdown trigger="Open">{options}</Dropdown>);

    const trigger = screen.getByRole("button") as HTMLButtonElement;

    // Show list on click
    expect(screen.queryAllByRole("option").length).toEqual(0);

    act(() => {
      fireEvent.click(trigger);
      jest.runAllTimers();
    });

    expect(screen.queryAllByRole("menuitem").length).toEqual(3);

    act(() => {
      fireEvent.keyDown(trigger, { key: "ArrowDown", code: "ArrowDown" });
      jest.runAllTimers();
    });

    expect(screen.queryAllByRole("menuitem").length).toEqual(3);
    fireEvent.keyDown(trigger, { key: "ArrowDown", code: "ArrowDown" });

    act(() => {
      fireEvent.keyDown(trigger, { key: "Enter", code: "Enter" });
      jest.runAllTimers();
    });

    expect(screen.queryAllByRole("menuitem").length).toEqual(0);
  });

  it("closes list of options on click outside, press TAB or press ESC", async () => {
    jest.useFakeTimers();

    render(
      <div>
        <Dropdown trigger="Open">{options}</Dropdown>
        <span data-testid="outside" />
      </div>,
    );

    const trigger = screen.getByRole("button") as HTMLButtonElement;

    await act(async () => {
      await fireEvent.click(trigger);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.queryAllByRole("menuitem").length).toEqual(3);

    // Click outside
    await act(async () => {
      await fireEvent.mouseDown(screen.getByTestId("outside"));
      jest.runAllTimers();
    });

    expect(screen.queryAllByRole("menuitem").length).toEqual(0);

    // Esc
    await act(async () => {
      await fireEvent.click(trigger);
      jest.runAllTimers();
    });

    expect(screen.queryAllByRole("menuitem").length).toEqual(3);

    await act(async () => {
      await fireEvent.keyDown(trigger, { key: "Escape", code: "Escape" });
      jest.runAllTimers();
    });

    expect(screen.queryAllByRole("menuitem").length).toEqual(0);
  });
});
