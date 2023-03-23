import { screen, render } from "tests";

import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders children correctly", () => {
    render(<Tooltip>Tooltip</Tooltip>);

    const element = screen.getByText("Tooltip");

    expect(element).toBeInTheDocument();
  });
});
