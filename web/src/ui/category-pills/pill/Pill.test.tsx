import { screen, render } from "tests";

import { Pill } from "./Pill";

describe("Pill", () => {
  it("renders children correctly", () => {
    render(<Pill>Pill</Pill>);

    const element = screen.getByText("Pill");

    expect(element).toBeInTheDocument();
  });
});
