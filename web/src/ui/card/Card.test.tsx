import { screen, render } from "tests";

import { Card } from "./Card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(<Card>Card</Card>);

    const element = screen.getByText("Card");

    expect(element).toBeInTheDocument();
  });
});
