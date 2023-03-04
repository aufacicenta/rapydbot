import { screen, render } from "tests";

import { Typography } from "./Typography";

describe("Typography", () => {
  it("renders children correctly", () => {
    render(<Typography>Typography</Typography>);

    const element = screen.getByText("Typography");

    expect(element).toBeInTheDocument();
  });
});
