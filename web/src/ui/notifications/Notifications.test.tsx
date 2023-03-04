import { screen, render } from "tests";

import { Notifications } from "./Notifications";

describe("Notifications", () => {
  it("renders children correctly", () => {
    render(<Notifications>Notifications</Notifications>);

    const element = screen.getByText("Notifications");

    expect(element).toBeInTheDocument();
  });
});
