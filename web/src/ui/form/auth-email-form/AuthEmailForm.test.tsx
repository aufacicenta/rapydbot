import { screen, render } from "tests";

import { AuthEmailForm } from "./AuthEmailForm";

describe("AuthEmailForm", () => {
  it("renders children correctly", () => {
    render(<AuthEmailForm>AuthEmailForm</AuthEmailForm>);

    const element = screen.getByText("AuthEmailForm");

    expect(element).toBeInTheDocument();
  });
});
