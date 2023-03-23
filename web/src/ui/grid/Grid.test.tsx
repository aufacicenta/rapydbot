import { screen, render } from "tests";

import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders children correctly", () => {
    render(<Grid>Grid</Grid>);

    const element = screen.getByText("Grid");

    expect(element).toBeInTheDocument();
  });
});
