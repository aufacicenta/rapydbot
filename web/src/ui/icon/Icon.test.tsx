import { screen, render } from "tests";

import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders children correctly", () => {
    render(<Icon>Icon</Icon>);

    const element = screen.getByText("Icon");

    expect(element).toBeInTheDocument();
  });
});
