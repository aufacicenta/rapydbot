import { screen, render } from "tests";

import { Pane } from "./Pane";

describe("Pane", () => {
  it("renders children correctly", () => {
    render(<Pane>Pane</Pane>);

    const element = screen.getByText("Pane");

    expect(element).toBeInTheDocument();
  });
});
