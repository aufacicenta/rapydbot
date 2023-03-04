import { screen, render } from "tests";

import { HorizontalLine } from "./HorizontalLine";

describe("HorizontalLine", () => {
  it("renders children correctly", () => {
    render(<HorizontalLine>HorizontalLine</HorizontalLine>);

    const element = screen.getByText("HorizontalLine");

    expect(element).toBeInTheDocument();
  });
});
