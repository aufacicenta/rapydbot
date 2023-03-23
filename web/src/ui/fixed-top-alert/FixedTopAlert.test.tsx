import { screen, render } from "tests";

import { FixedTopAlert } from "./FixedTopAlert";

describe("FixedTopAlert", () => {
  it("renders children correctly", () => {
    render(<FixedTopAlert>FixedTopAlert</FixedTopAlert>);

    const element = screen.getByText("FixedTopAlert");

    expect(element).toBeInTheDocument();
  });
});
