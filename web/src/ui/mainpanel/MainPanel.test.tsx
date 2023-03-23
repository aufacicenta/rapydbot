import { screen, render } from "tests";

import { MainPanel } from "./MainPanel";

describe("MainPanel", () => {
  it("renders children correctly", () => {
    render(<MainPanel>MainPanel</MainPanel>);

    const element = screen.getByText("MainPanel");

    expect(element).toBeInTheDocument();
  });
});
