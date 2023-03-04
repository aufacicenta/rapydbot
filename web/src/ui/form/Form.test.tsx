import { screen, render } from "tests";

import { Form } from "./Form";

describe("Form", () => {
  it("renders children correctly", () => {
    render(<Form>Form</Form>);

    const element = screen.getByText("Form");

    expect(element).toBeInTheDocument();
  });
});
