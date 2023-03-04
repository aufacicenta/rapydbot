import { screen, render } from "tests";

import { Label } from "./Label";

describe("Label", () => {
  it("renders children correctly", () => {
    render(<Label>Label</Label>);

    const element = screen.getByText("Label");

    expect(element).toBeInTheDocument();
  });
});
