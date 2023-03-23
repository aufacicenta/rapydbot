import { screen, render } from "tests";

import { Tab } from "./Tab";

describe("Tab", () => {
  it("renders children correctly", () => {
    render(<Tab>Tab</Tab>);

    const element = screen.getByText("Tab");

    expect(element).toBeInTheDocument();
  });
});
