import { screen, render } from "tests";

import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  it("renders children correctly", () => {
    render(<Sidebar>Sidebar</Sidebar>);

    const element = screen.getByText("Sidebar");

    expect(element).toBeInTheDocument();
  });
});
