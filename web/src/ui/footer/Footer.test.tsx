import { screen, render } from "tests";

import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders children correctly", () => {
    render(<Footer>Footer</Footer>);

    const element = screen.getByText("Footer");

    expect(element).toBeInTheDocument();
  });
});
