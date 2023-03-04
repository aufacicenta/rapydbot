import { screen, render } from "tests";

import { CircularProgress } from "./CircularProgress";

describe("CircularProgress", () => {
  it("renders children correctly", () => {
    render(<CircularProgress>CircularProgress</CircularProgress>);

    const element = screen.getByText("CircularProgress");

    expect(element).toBeInTheDocument();
  });
});
