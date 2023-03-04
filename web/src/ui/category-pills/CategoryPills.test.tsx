import { screen, render } from "tests";

import { CategoryPills } from "./CategoryPills";

describe("CategoryPills", () => {
  it("renders children correctly", () => {
    render(<CategoryPills>CategoryPills</CategoryPills>);

    const element = screen.getByText("CategoryPills");

    expect(element).toBeInTheDocument();
  });
});
