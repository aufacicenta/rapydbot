import { screen, render } from "tests";

import { Home } from "./Home";

describe("Home", () => {
  it("renders children correctly", () => {
    render(<Home>Home</Home>);

    const element = screen.getByText("Home");

    expect(element).toBeInTheDocument();
  });
});
