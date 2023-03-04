import { screen, render } from "tests";

import { Item } from "./Item";

describe("Item", () => {
  it("renders children correctly", () => {
    render(<Item>Item</Item>);

    const element = screen.getByText("Item");

    expect(element).toBeInTheDocument();
  });
});
