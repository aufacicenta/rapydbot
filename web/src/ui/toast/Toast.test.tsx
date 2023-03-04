import userEvent from "@testing-library/user-event";
import { render, screen } from "tests";

import { Toast } from "./Toast";

describe("Toast", () => {
  it("renders children correctly", () => {
    const handleClose = jest.fn();
    render(<Toast title="Vehicle added to your garage!" variant="info" onClose={handleClose} />);

    userEvent.click(screen.getByRole("button"));

    expect(handleClose).toBeCalled();
    expect(screen.getByText("Vehicle added to your garage!")).toBeInTheDocument();
  });

  it("renders error variant correctly", () => {
    const handleClose = jest.fn();

    render(<Toast title="Vehicle added to your garage!" variant="error" onClose={handleClose} />);

    userEvent.click(screen.getByRole("button"));

    expect(handleClose).toBeCalled();
  });

  it("Renders actionText if passed", () => {
    const handleClose = jest.fn();

    render(
      <Toast title="Vehicle added to your garage!" actionText="My action" variant="error" onClose={handleClose} />,
    );

    expect(screen.getByText("My action")).toBeInTheDocument();
  });
});
