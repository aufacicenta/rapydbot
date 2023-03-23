import { screen, render } from "tests";

import { ThemeSelector } from "./ThemeSelector";

describe("ThemeSelector", () => {
  it("renders children correctly", () => {
    render(<ThemeSelector>ThemeSelector</ThemeSelector>);

    const element = screen.getByText("ThemeSelector");

    expect(element).toBeInTheDocument();
  });
});
