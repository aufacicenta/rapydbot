import { screen, render } from "tests";

import { Navigation } from "./Navigation";

describe("Navigation", () => {
  it("renders children correctly", () => {
    render(<Navigation>Navigation</Navigation>);

    const element = screen.getByText("Navigation");

    expect(element).toBeInTheDocument();
  });
});
